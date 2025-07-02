import { CustomResponse } from '../../axios/responseTypes';
import apiRoutes from '../../axios/apiRoutes';
import { createApi } from '@reduxjs/toolkit/query/react';
import {
    CreateClassRequest,
    DuplicateClassRequest,
    DetachClassRequest,
    UpdateClassRequest,
    CreateStudentPackageRequest,
    DeleteClassRequest,
    UpdateStudentPackageRequest,
    CreateStudentRequest,
    UpdateStudentRequest,
    PreDailyTimetableRequest,
    DailyTimetableRequest,
    UpdateStudentRenewalStatusRequest,
} from '../../dto/dto';
import normalizeUtil from '../../utils/normalizeUtil';
import lodash, { cloneDeep } from 'lodash';
import {
    StudentDTO,
    StudentPackageRepsonse,
    TimetableLesson as TimetableLesson,
    StudentPackageDTO,
    UIStudentDetail,
    GetPackageClassStatusResponse,
    ClassRoom,
} from '../../dto/kotlinDto';
import dayjs from 'dayjs';
import getEnv from '@/utils/getEnv';
import axios from 'axios';
import baseQuery from '@/axios/baseQuery';
import createSortedJson from '@/utils/createSortedJson';
import appSlice from '@/redux/slices/appSlice';
import studentSlice from '@/redux/slices/studentSlice';

export type HrUnixTimestampToLessons = {
    [timestamp: string]: (TimetableLesson & { isPlaceHolderForPaddingDisplay?: boolean })[];
};

export type WeeklyClassEvent = {
    timestamps: string[];
    hrUnixTimestampToLesson?: { [id: string]: TimetableLesson };
};

export type UIStudentPackage = StudentPackageRepsonse & { display: 'CLASSES' | 'EXTENDED_CLASSES' };

export const studentApi = createApi({
    reducerPath: 'studentApi',
    baseQuery: baseQuery,
    tagTypes: [
        'Students',
        'StudentWeeklyClasses',
        'StudentClasses',
        'StudentPackages',
        'StudentDailyClasses',
        'StudentDetail',
    ],
    endpoints: builder => ({
        deleteStudent: builder.mutation<void, { studentId: string }>({
            query: ({ studentId }) => ({
                url: apiRoutes.DELETE_STUDENT(studentId),
                method: 'DELETE',
            }),
            onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
                try {
                    dispatch(appSlice.actions.setLoading(true));
                    await queryFulfilled;
                } finally {
                    dispatch(appSlice.actions.setLoading(false));
                }
            },
            invalidatesTags: ['Students'],
        }),
        getStudents: builder.query<
            { studentIdToStudent: { [id: string]: StudentDTO }; studentIds: string[]; total: number },
            void
        >({
            keepUnusedDataFor: 0, // 5 minutes instead of 5000 seconds
            query: () => apiRoutes.GET_STUDENTS,
            transformResponse: (response: { students: StudentDTO[]; total: number }, _api, _arg) => {
                const { students, total } = response;
                const { idToObject, ids } = normalizeUtil.normalize({ idAttribute: 'id', targetArr: students });
                return { studentIdToStudent: idToObject, studentIds: ids, total };
            },
            providesTags: ['Students'],
        }),
        createExtendedClassesForHoliday: builder.mutation<void, { classroom: ClassRoom; dayTimestamp: number }>({
            query: ({ classroom, dayTimestamp }) => ({
                url: apiRoutes.POST_CREATE_EXTENDED_CLASSES_FOR_HOLIDAY(classroom, dayTimestamp),
                method: 'POST',
            }),
            invalidatesTags: (_, __, { classroom, dayTimestamp }) => {
                return [
                    { type: 'StudentDailyClasses', id: createSortedJson({ classroom, dayTimestamp }) },
                    'StudentDailyClasses',
                ];
            },
            onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
                try {
                    dispatch(appSlice.actions.setLoading(true));
                    await queryFulfilled;
                } finally {
                    dispatch(appSlice.actions.setLoading(false));
                }
            },
        }),

        updateStudent: builder.mutation<StudentDTO, { studentId: string; req: Partial<UpdateStudentRequest> }>({
            query: ({ req }) => ({
                url: apiRoutes.PUT_UPDATE_STUDENT,
                method: 'PUT',
                body: req,
            }),
            onQueryStarted: async ({ studentId, req }, { dispatch, queryFulfilled }) => {
                try {
                    await queryFulfilled;
                    dispatch(
                        studentApi.util.updateQueryData('getStudents', undefined, draft => {
                            if (draft?.studentIdToStudent?.[studentId]) {
                                draft.studentIdToStudent[studentId] = {
                                    ...draft.studentIdToStudent[studentId],
                                    ...req,
                                };
                            }
                        })
                    );
                } catch (error) {
                    console.error('Error updating student:', error);
                }
            },
        }),
        getStudentClassesForWeeklyTimetable: builder.query<
            {
                hrUnixTimestampToLesson: { [id: string]: TimetableLesson };
                hrUnixTimestamps: string[];
            },
            { studentId: string }
        >({
            query: ({ studentId }) => apiRoutes.GET_STUDENT_CLASSES_FOR_WEEKLY_TIMETABLE(studentId),
            transformResponse: (classes: TimetableLesson[]) => {
                const { idToObject, ids } = normalizeUtil.normalize({
                    idAttribute: 'hourUnixTimestamp',
                    targetArr: classes,
                });

                return { hrUnixTimestampToLesson: idToObject, hrUnixTimestamps: ids };
            },
            providesTags: (_, __, param) => [
                'StudentDailyClasses',
                { type: 'StudentWeeklyClasses', id: param?.studentId },
            ],
            keepUnusedDataFor: 60, // 60s
        }),
        addClass: builder.mutation<StudentDTO, { studentId: string; createClassRequest: CreateClassRequest }>({
            query: ({ studentId, createClassRequest }) => ({
                url: apiRoutes.POST_CREATE_STUDENT_CLASS(studentId),
                method: 'POST',
                body: createClassRequest,
            }),
            invalidatesTags: (_result, _error, _arg) => {
                return ['StudentClasses', 'StudentWeeklyClasses', 'StudentDailyClasses', 'StudentPackages'];
            },
        }),
        createStudent: builder.mutation<StudentDTO, CreateStudentRequest>({
            query: req => ({
                url: apiRoutes.POST_CREATE_STUDNET,
                method: 'POST',
                body: req,
            }),
            invalidatesTags: ['Students'],
        }),
        getStudentPackages: builder.query<
            {
                idToStudentPackage: {
                    [id: string]: UIStudentPackage;
                };
                packageIds: string[];
            },
            { studentId: string }
        >({
            query: ({ studentId }) => apiRoutes.GET_STUDENT_PACKAGES(studentId),
            transformResponse: (packages: StudentPackageRepsonse[]) => {
                const uiPackages: UIStudentPackage[] = packages.map(pkg => ({ ...pkg, display: 'CLASSES' }));
                const { idToObject: idToStudentPackage, ids: packageIds } = normalizeUtil.normalize({
                    idAttribute: 'packageId',
                    targetArr: uiPackages,
                });
                packageIds.sort(
                    (id1, id2) =>
                        idToStudentPackage[id1].studentPackage.startDate -
                        idToStudentPackage[id2].studentPackage.startDate
                );

                return { idToStudentPackage, packageIds: packageIds };
            },
            providesTags: ['StudentPackages'],
        }),
        updatePackageRenewalStatus: builder.mutation<
            StudentPackageRepsonse,
            { studentId: string; req: UpdateStudentRenewalStatusRequest }
        >({
            query: ({ studentId, req }) => ({
                url: apiRoutes.PATCH_PACKAGE_RENEWAL_STATUS(studentId),
                method: 'PATCH',
                body: req,
            }),
            invalidatesTags: ['StudentPackages'],
        }),
        getClassesStatus: builder.query<GetPackageClassStatusResponse[], { packageId: string }>({
            query: ({ packageId }) => apiRoutes.GET_PACKAGE_CLASS_STATUS(packageId),
            providesTags: ['StudentPackages'],
        }),
        updatePackage: builder.mutation<StudentPackageRepsonse, { req: UpdateStudentPackageRequest }>({
            query: ({ req }) => ({
                url: apiRoutes.PUT_UPDATE_PACKAGE,
                method: 'PUT',
                body: req,
            }),
            invalidatesTags: (_, __, param) => [
                { type: 'StudentPackages', id: param.req.packageId },
                'StudentPackages',
                'StudentWeeklyClasses',
            ],
            onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
                try {
                    dispatch(appSlice.actions.setLoading(true));
                    await queryFulfilled;
                } finally {
                    dispatch(appSlice.actions.setLoading(false));
                }
            },
        }),
        getStudentDetail: builder.query<UIStudentDetail, { studentId: string }>({
            query: ({ studentId }) => apiRoutes.GET_STUDENT_DETAIL(studentId),
            providesTags: ['StudentDetail'],
        }),
        getStudentInfo: builder.query<UIStudentDetail, { studentId: string }>({
            queryFn: async ({ studentId }) => {
                try {
                    const baseURL = getEnv().VITE_BACKEND_URL || '';
                    const clientWithoutTokenChecking = axios.create({
                        baseURL,
                        headers: {
                            'Content-type': 'application/json',
                        },
                    });
                    const response = await clientWithoutTokenChecking.get<CustomResponse<UIStudentDetail>>(
                        apiRoutes.GET_STUDENT_INFO(studentId)
                    );
                    if (response.data.success) {
                        return { data: response.data.result };
                    } else {
                        return {
                            error: {
                                status: 'server-error',
                                message: response.data.errorMessage || 'Server error',
                            },
                        };
                    }
                } catch (error: any) {
                    return {
                        error: {
                            status: error.response?.status || 'unknown',
                            message: error.message || 'Unknown error',
                        },
                    };
                }
            },
            providesTags: (_result, _error, { studentId }) => [{ type: 'StudentDetail', id: studentId }],
        }),
        createStudentClassEvent: builder.mutation<StudentDTO, { studentId: string; req: CreateClassRequest }>({
            query: ({ studentId, req }) => ({
                url: apiRoutes.POST_CREATE_STUDENT_CLASS(studentId),
                method: 'POST',
                body: req,
            }),
            invalidatesTags: ['StudentPackages'],
        }),
        moveStudentEvent: builder.mutation<
            void,
            { fromClassEvent: TimetableLesson; toDayTimestamp: string; toHourTimestamp: string }
        >({
            query: ({ fromClassEvent, toDayTimestamp, toHourTimestamp }) => ({
                url: apiRoutes.PUT_MOVE_STUDNET_CLASS,
                method: 'PUT',
                body: { class_id: fromClassEvent.class.id, toDayTimestamp, toHourTimestamp },
            }),
            invalidatesTags: (_result, _error, _arg) => {
                return [
                    'StudentPackages',
                    'StudentDailyClasses',
                    { type: 'StudentDailyClasses', id: 'LIST' }, // Invalidate all daily timetable queries
                ];
            },
            onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
                try {
                    dispatch(studentSlice.actions.setMutatingClass(true));
                    await queryFulfilled;
                } finally {
                    dispatch(studentSlice.actions.setMutatingClass(false));
                }
            },
        }),

        getFilteredStudentClassesForDailyTimetable: builder.query<
            {
                hrUnixTimestampToTimetableClasses: { [timestamp: string]: TimetableLesson[] };
                hrUnixTimestamps: string[];
                lessons: TimetableLesson[];
            },
            PreDailyTimetableRequest
        >({
            serializeQueryArgs: ({ queryArgs }) => {
                // Create a stable cache key that includes the filter object
                // Deep clone the filter to avoid reference issues
                const normalizedFilter = cloneDeep(queryArgs.filter);

                // Normalize the anchor timestamp to start of day to ensure consistency
                const normalizedAnchorTimestamp = dayjs(queryArgs.anchorTimestamp).startOf('day').valueOf();

                const cacheKey = createSortedJson({
                    classRoom: queryArgs.classRoom,
                    anchorTimestamp: normalizedAnchorTimestamp,
                    filter: normalizedFilter,
                    numOfDays: queryArgs.numOfDays,
                });

                return cacheKey;
            },
            query: ({ classRoom, anchorTimestamp: dateUnixTimestamp, filter, numOfDays = 1 }) => {
                const timestamps = Array(numOfDays)
                    .fill(null)
                    .map((_, dayOffset) => {
                        return dayjs(dateUnixTimestamp).add(dayOffset, 'day').toDate().getTime();
                    });
                const request: DailyTimetableRequest = {
                    classRoom: classRoom,
                    dateUnixTimestamps: timestamps,
                    filter,
                };
                return {
                    url: apiRoutes.POST_GET_FILTERED_STUDENT_CLASSES_FOR_DAILY_TIMETABLE,
                    method: 'POST',
                    body: request,
                };
            },
            transformResponse: (response: { classes: TimetableLesson[] }, _meta, _arg) => {
                const { classes: lessons } = response;
                const hrUnixTimestampToTimetableClasses: HrUnixTimestampToLessons = {};
                const studentIdsToNull: { [id: string]: null } = {};

                for (const lesson of lessons) {
                    studentIdsToNull[lesson.student.id] = null;
                    const timestamp = lesson.class.hourUnixTimestamp.toString();
                    const classesForNow = hrUnixTimestampToTimetableClasses?.[timestamp];
                    if (!classesForNow) {
                        lodash.setWith(hrUnixTimestampToTimetableClasses, `["${timestamp}"]`, [lesson], Object);
                    } else {
                        hrUnixTimestampToTimetableClasses[timestamp].push(lesson);
                    }
                }
                const studentIds = Object.keys(studentIdsToNull);
                const latestHrToLessonsMapping = reorderClassesByConsecutiveClassesOfStudents(
                    hrUnixTimestampToTimetableClasses,
                    studentIds
                );

                return {
                    hrUnixTimestampToTimetableClasses: latestHrToLessonsMapping,
                    hrUnixTimestamps: Object.keys(hrUnixTimestampToTimetableClasses),
                    lessons,
                };
            },
            providesTags: (_result, _error, arg) => {
                const normalizedFilter = cloneDeep(arg.filter);
                const normalizedAnchorTimestamp = dayjs(arg.anchorTimestamp).startOf('day').valueOf();
                const cacheKey = createSortedJson({
                    classRoom: arg.classRoom,
                    anchorTimestamp: normalizedAnchorTimestamp,
                    filter: normalizedFilter,
                    numOfDays: arg.numOfDays,
                });
                return [
                    { type: 'StudentDailyClasses', id: cacheKey },
                    'StudentDailyClasses', // Keep the general tag for broad invalidation when needed
                ];
            },
        }),
        deleteClass: builder.mutation<{ classId: number }, { classId: number }>({
            query: ({ classId }) => ({
                url: apiRoutes.DELETE_CLASSES_BY_GROUP(classId),
                method: 'DELETE',
            }),
            invalidatesTags: ['StudentPackages', 'StudentDailyClasses'],
        }),
        deleteSingleClass: builder.mutation<{ classId: number }, DeleteClassRequest>({
            query: ({ classId }) => ({
                url: apiRoutes.DELETE_CLASS_BY_INDIVIDUAL(classId),
                method: 'DELETE',
            }),
            invalidatesTags: ['StudentPackages', 'StudentDailyClasses'],
        }),
        duplicateClass: builder.mutation<{ classId: number }, DuplicateClassRequest>({
            query: ({ classId, numberOfWeeks, isTimeslotInThePast }) => ({
                url: apiRoutes.POST_DUPLICATE_CLASSES,
                method: 'POST',
                body: { classId, numberOfWeeks, isTimeslotInThePast },
            }),
            invalidatesTags: ['StudentPackages', 'StudentDailyClasses'],
        }),
        detachFromGroup: builder.mutation<{ hour_unix_timestamp: number }, DetachClassRequest>({
            query: ({ classId }) => ({
                url: apiRoutes.PUT_DETACH_CLASS_FROM_GROUP,
                method: 'PUT',
                body: { classId },
            }),
            invalidatesTags: () => ['StudentDailyClasses'],
        }),
        updateClass: builder.mutation<void, UpdateClassRequest>({
            query: props => ({
                url: apiRoutes.PATCH_UPDATE_CLASS,
                method: 'PATCH',
                body: props,
            }),
            invalidatesTags: ['StudentPackages', 'StudentWeeklyClasses', 'StudentDailyClasses'],
            onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
                try {
                    dispatch(studentSlice.actions.setMutatingClass(true));
                    await queryFulfilled;
                } finally {
                    dispatch(studentSlice.actions.setMutatingClass(false));
                }
            },
        }),
        createStudentPackage: builder.mutation<
            StudentPackageDTO,
            { req: CreateStudentPackageRequest; studentId: string }
        >({
            query: ({ req, studentId }) => ({
                url: apiRoutes.POST_CREATE_STUDENT_PACKAGE(studentId),
                method: 'POST',
                body: req,
            }),
            invalidatesTags: ['StudentPackages', 'StudentWeeklyClasses', 'StudentDailyClasses'],
            onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
                try {
                    dispatch(appSlice.actions.setLoading(true));
                    await queryFulfilled;
                } finally {
                    dispatch(appSlice.actions.setLoading(false));
                }
            },
        }),
        markPackageAsPaid: builder.mutation<void, { packageId: number; paidAt: number }>({
            query: props => ({
                url: apiRoutes.PUT_MARK_PACAKGE_AS_PAID,
                method: 'PUT',
                body: props,
            }),
            invalidatesTags: ['StudentPackages'],
        }),
        markPackageAsUnPaid: builder.mutation<void, { packageId: number }>({
            query: ({ packageId }) => ({
                url: apiRoutes.PUT_MARK_PACAKGE_AS_UNPAID,
                method: 'PUT',
                body: { packageId },
            }),
            invalidatesTags: ['StudentPackages'],
        }),
        deletePackage: builder.mutation<void, { studentId: string; packageId: number }>({
            query: ({ studentId, packageId }) => ({
                url: apiRoutes.DELETE_PACKAGE(studentId, packageId),
                method: 'DELETE',
            }),
            invalidatesTags: ['StudentPackages', 'StudentWeeklyClasses', 'StudentDailyClasses'],
            onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
                try {
                    dispatch(appSlice.actions.setLoading(true));
                    await queryFulfilled;
                } finally {
                    dispatch(appSlice.actions.setLoading(false));
                }
            },
        }),
    }),
});

function reorderClassesByConsecutiveClassesOfStudents(
    hrUnixTimestampToLessons: HrUnixTimestampToLessons,
    studentIds: string[]
) {
    const hrToLessonList = cloneDeep(
        Object.entries(hrUnixTimestampToLessons).map(([time, classEvents]) => ({
            time,
            classEvents,
        }))
    ).sort((events1, events2) => Number(events1.time) - Number(events2.time));

    for (const studentId of studentIds) {
        // whenever we move a student to front, we add placholder as a padding for the rest of the time-classes-row
        // since otherwise the "move to front" logic will override each another
        // when the class durations are not consistent.
        // in UI we use the boolean isPlaceHolderForPaddingDisplay to make it transparent and unclickable
        let placeHolderEventForPadding: HrUnixTimestampToLessons[string][number] | null = null;
        // timestamp that is consecutive to the current class has been swapped to the front, no placeholder needed.
        let skippedTimeForPlaceholder: string | null = null;

        for (let i = 0; i < hrToLessonList.length - 1; i++) {
            const currentLesson = hrToLessonList[i];
            const currEventIndex = currentLesson.classEvents.findIndex(e => e.student.id === studentId);
            const currEvent = currentLesson.classEvents[currEventIndex];
            const { hourUnixTimestamp: startTimestamp, min } = currEvent?.class || {};
            const nextConsecutiveTimestamp = dayjs(startTimestamp).add(min, 'minute').valueOf();
            const nextEventsList = hrToLessonList.find(events => events.time === String(nextConsecutiveTimestamp));
            const nextEventIndex = (() => {
                const index = nextEventsList?.classEvents?.findIndex(e => e.student.id === studentId);
                if (index != null) {
                    return index;
                } else {
                    return -1;
                }
            })();
            if (
                placeHolderEventForPadding &&
                skippedTimeForPlaceholder &&
                currentLesson.time !== skippedTimeForPlaceholder
            ) {
                prependPlaceholder(currentLesson.classEvents, placeHolderEventForPadding);
            }

            if (currEventIndex > -1 && nextEventIndex > -1) {
                moveToFrontByMutation(currentLesson.classEvents, currEventIndex);
                moveToFrontByMutation(nextEventsList?.classEvents || [], nextEventIndex);
                placeHolderEventForPadding = { ...currEvent, isPlaceHolderForPaddingDisplay: true };
                skippedTimeForPlaceholder = nextEventsList?.time || null;
            }
        }

        // for last index, determine if we should insert the padding as well
        const index = hrToLessonList.length - 1;
        const currentEvents = hrToLessonList[index];
        if (
            placeHolderEventForPadding &&
            skippedTimeForPlaceholder &&
            currentEvents.time !== skippedTimeForPlaceholder
        ) {
            prependPlaceholder(currentEvents.classEvents, placeHolderEventForPadding);
        }
    }

    const newMap: HrUnixTimestampToLessons = {};
    for (const events of hrToLessonList) {
        const { classEvents, time } = events;
        newMap[time] = classEvents;
    }
    return newMap;
}

function moveToFrontByMutation<T>(array: T[], index: number) {
    if (index > 0) {
        const item = array.splice(index, 1)[0];
        array.unshift(item);
    }
}

function prependPlaceholder(
    classEvents: HrUnixTimestampToLessons[string],
    event: HrUnixTimestampToLessons[string][number]
) {
    console.log('generate placeholder', event);
    event['isPlaceHolderForPaddingDisplay'] = true;
    classEvents.unshift(event);
}
