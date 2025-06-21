import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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
    FilterToGetClassesForDailyTimetable,
    PreDailyTimetableRequest,
    DailyTimetableRequest,
    UpdateStudentRenewalStatusRequest,
} from '../../dto/dto';
import normalizeUtil from '../../utils/normalizeUtil';
import lodash, { cloneDeep } from 'lodash';
import { Classroom } from '../../prismaTypes/types';
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
import documentId from '../../constant/documentId';
import getEnv from '@/utils/getEnv';
import axios from 'axios';
import baseQuery from '@/axios/baseQuery';

export enum StudentDetailPage {
    STUDENT_TIME_TABLE = 'STUDENT_TIME_TABLE',
    STUDENT_PACKAGE_CLASS_STATUES = 'STUDENT_PACKAGE_CLASS_STATUES',
}

export type HrUnixTimestampToLessons = {
    [timestamp: string]: (TimetableLesson & { isPlaceHolderForPaddingDisplay?: boolean })[];
};

export type StudentSliceState = {
    students: {
        ids?: string[];
        idToStudent?: {
            [key: string]: StudentDTO;
        };
    };
    studentDetailTimetablePage: {
        activePage: StudentDetailPage;
        showAllClassesForOneStudent: boolean;
        selectedPackageId: string;
    };
    massTimetablePage: {
        classRoom: Classroom | null;
        numOfDaysToDisplay: number;
        selectedDate: Date;
        totalClassesInHighlight: {
            hrUnixTimestampOnClick: number | null;
            numberOfClassesInHighlight: number;
        };
        filter: FilterToGetClassesForDailyTimetable;
    };
};

const initialState: StudentSliceState = {
    students: {},
    studentDetailTimetablePage: {
        activePage: StudentDetailPage.STUDENT_TIME_TABLE,
        selectedPackageId: '',
        showAllClassesForOneStudent: true,
    },
    massTimetablePage: {
        numOfDaysToDisplay: 1,
        selectedDate: new Date(),
        classRoom: null,
        totalClassesInHighlight: {
            hrUnixTimestampOnClick: 0,
            numberOfClassesInHighlight: 0,
        },
        filter: {
            present: true,
            suspicious_absence: true,
            illegit_absence: true,
            legit_absence: true,
            makeup: true,
            changeOfClassroom: true,
            trial: true,
            reserved: true,
            courseIds: [],
        },
    },
};

export const studentsApi = createApi({
    reducerPath: 'studentsApi',
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
        getStudents: builder.query<
            { studentIdToStudent: { [id: string]: StudentDTO }; studentIds: string[]; total: number },
            void
        >({
            query: () => apiRoutes.GET_STUDENTS,
            transformResponse: (response: { students: StudentDTO[]; total: number }, _api, _arg) => {
                const { students, total } = response;
                const { idToObject, ids } = normalizeUtil.normalize({ idAttribute: 'id', targetArr: students });
                return { studentIdToStudent: idToObject, studentIds: ids, total };
            },
            providesTags: ['Students'],
            keepUnusedDataFor: 60, // 60s
        }),
        createExtendedClassesForHoliday: builder.mutation<void, { classroom: ClassRoom; dayTimestamp: number }>({
            query: ({ classroom, dayTimestamp }) => ({
                url: apiRoutes.POST_CREATE_EXTENDED_CLASSES_FOR_HOLIDAY(classroom, dayTimestamp),
                method: 'POST',
            }),
            invalidatesTags: ['StudentDailyClasses'],
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
                        studentsApi.util.updateQueryData('getStudents', undefined, draft => {
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
            transformResponse: (response: { classes: TimetableLesson[] }) => {
                const { classes } = response;
                const { idToObject, ids } = normalizeUtil.normalize({
                    idAttribute: 'hourUnixTimestamp',
                    targetArr: classes,
                });
                return { hrUnixTimestampToLesson: idToObject, hrUnixTimestamps: ids };
            },
            providesTags: ['StudentWeeklyClasses'],
            keepUnusedDataFor: 60, // 60s
        }),
        addClass: builder.mutation<StudentDTO, { studentId: string; createClassRequest: CreateClassRequest }>({
            query: ({ studentId, createClassRequest }) => ({
                url: apiRoutes.POST_CREATE_STUDENT_CLASS(studentId),
                method: 'POST',
                body: createClassRequest,
            }),
            invalidatesTags: ['StudentClasses', 'StudentWeeklyClasses', 'StudentDailyClasses', 'StudentPackages'],
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
            { idToStudentPackage: { [id: string]: StudentPackageRepsonse }; packageIds: string[] },
            { studentId: string }
        >({
            query: ({ studentId }) => apiRoutes.GET_STUDENT_PACKAGES(studentId),
            transformResponse: (response: { packages: StudentPackageRepsonse[] }) => {
                const { packages } = response;
                const { idToObject: idToStudentPackage, ids: packageIds } = normalizeUtil.normalize({
                    idAttribute: 'packageId',
                    targetArr: packages,
                });
                packageIds.sort(
                    (id1, id2) =>
                        idToStudentPackage[id1].studentPackage.startDate -
                        idToStudentPackage[id2].studentPackage.startDate
                );

                return { idToStudentPackage, packageIds: packageIds };
            },
            providesTags: ['StudentPackages'],
            keepUnusedDataFor: 60, // 60s
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
            keepUnusedDataFor: 60, // 60s
        }),
        updatePackage: builder.mutation<StudentPackageRepsonse, { req: UpdateStudentPackageRequest }>({
            query: ({ req }) => ({
                url: apiRoutes.PUT_UPDATE_PACKAGE,
                method: 'PUT',
                body: req,
            }),
            invalidatesTags: ['StudentPackages'],
        }),
        getStudentDetail: builder.query<UIStudentDetail, { studentId: string }>({
            query: ({ studentId }) => apiRoutes.GET_STUDENT_DETAIL(studentId),
            providesTags: ['StudentDetail'],
            keepUnusedDataFor: 60, // 60s,
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
            keepUnusedDataFor: 60, // 60s
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
                body: { fromClassEvent, toDayTimestamp, toHourTimestamp },
            }),
            invalidatesTags: ['StudentPackages', 'StudentDailyClasses', 'StudentWeeklyClasses'],
        }),

        getFilteredStudentClassesForDailyTimetable: builder.query<
            {
                hrUnixTimestampToTimetableClasses: { [timestamp: string]: TimetableLesson[] };
                hrUnixTimestamps: string[];
                lessons: TimetableLesson[];
            },
            PreDailyTimetableRequest
        >({
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
            transformResponse: (response: { classes: TimetableLesson[] }) => {
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
            providesTags: ['StudentDailyClasses'],
            keepUnusedDataFor: 60, // 60s
        }),
        deleteClass: builder.mutation<{ classId: number }, { classId: number }>({
            query: ({ classId }) => ({
                url: apiRoutes.DELETE_CLASSES_BY_GROUP(classId),
                method: 'DELETE',
            }),
            invalidatesTags: ['StudentPackages'],
        }),
        deleteSingleClass: builder.mutation<{ classId: number }, DeleteClassRequest>({
            query: ({ classId }) => ({
                url: apiRoutes.DELETE_CLASS_BY_INDIVIDUAL(classId),
                method: 'DELETE',
            }),
            invalidatesTags: ['StudentPackages'],
        }),
        duplicateClass: builder.mutation<{ classId: number }, DuplicateClassRequest>({
            query: ({ classId, numberOfWeeks, isTimeslotInThePast }) => ({
                url: apiRoutes.POST_DUPLICATE_CLASSES,
                method: 'POST',
                body: { classId, numberOfWeeks, isTimeslotInThePast },
            }),
            invalidatesTags: ['StudentPackages'],
        }),
        detachFromGroup: builder.mutation<{ hour_unix_timestamp: number }, DetachClassRequest>({
            query: ({ classId }) => ({
                url: apiRoutes.PUT_DETACH_CLASS_FROM_GROUP,
                method: 'PUT',
                body: { classId },
            }),
            onQueryStarted: async ({ studentId }, { dispatch, queryFulfilled, getState: _getState }) => {
                try {
                    const { hour_unix_timestamp } = (await queryFulfilled).data;

                    if (studentId) {
                        dispatch(
                            studentsApi.util.updateQueryData(
                                'getStudentClassesForWeeklyTimetable',
                                { studentId },
                                draft => {
                                    if (draft.hrUnixTimestampToLesson?.[String(hour_unix_timestamp)]) {
                                        draft.hrUnixTimestampToLesson![String(hour_unix_timestamp)]!.classGroup = null;
                                    }
                                }
                            )
                        );
                    }
                } catch (error) {
                    console.error('Error detaching class:', error);
                }
            },
            invalidatesTags: ['StudentPackages'],
        }),
        updateClass: builder.mutation<void, UpdateClassRequest>({
            query: props => ({
                url: apiRoutes.PATCH_UPDATE_CLASS,
                method: 'PATCH',
                body: props,
            }),
            invalidatesTags: ['StudentPackages', 'StudentDailyClasses', 'StudentWeeklyClasses'],
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
            invalidatesTags: ['StudentPackages', 'StudentWeeklyClasses'],
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
            invalidatesTags: ['StudentPackages', 'StudentWeeklyClasses'],
        }),
    }),
});

const studentSlice = createSlice({
    name: 'students',
    initialState,
    reducers: {
        seMassTimetableNumOfDaysToDisplay: (state, action: PayloadAction<number>) => {
            state.massTimetablePage.numOfDaysToDisplay = action.payload;
        },
        setStudentDetailPage: (state, action: PayloadAction<StudentDetailPage>) => {
            state.studentDetailTimetablePage.activePage = action.payload;
        },
        setNumberOfClassesInHighlight: (state, action: PayloadAction<number>) => {
            state.massTimetablePage.totalClassesInHighlight.numberOfClassesInHighlight = action.payload;
        },
        setHrUnixTimestampOnClick: (state, action: PayloadAction<number | null>) => {
            state.massTimetablePage.totalClassesInHighlight.hrUnixTimestampOnClick = action.payload;
        },
        setMassTimetableFilter: (state, action: PayloadAction<FilterToGetClassesForDailyTimetable>) => {
            state.massTimetablePage.filter = cloneDeep(action.payload);
        },
        setFilterCourseIds: (state, action: PayloadAction<number[]>) => {
            state.massTimetablePage.filter.courseIds = action.payload;
        },
        updateFilter: (state, action: PayloadAction<Partial<FilterToGetClassesForDailyTimetable>>) => {
            state.massTimetablePage.filter = { ...state.massTimetablePage.filter, ...action.payload };
        },
        dropFilterCourseId: (state, action: PayloadAction<number>) => {
            const targetId = action.payload;
            const index = state.massTimetablePage.filter.courseIds.findIndex(id => id === targetId);

            state.massTimetablePage.filter.courseIds.splice(index, 1);
        },
        setClassroom: (state, action: PayloadAction<Classroom>) => {
            state.massTimetablePage.classRoom = action.payload;
        },
        setSelectedPackageAndActiveAnchorTimestamp: (
            state,
            action: PayloadAction<{
                packageId: string;
                desiredAnchorTimestamp?: number;
                setURLAnchorTimestamp: (time: number) => void;
                weeklyClassEvent?: {
                    timestamps: string[];
                    hrUnixTimestampToLesson?: { [id: string]: TimetableLesson };
                };
            }>
        ) => {
            const { packageId, setURLAnchorTimestamp, desiredAnchorTimestamp, weeklyClassEvent } = action.payload;
            state.studentDetailTimetablePage.selectedPackageId = packageId;
            if (desiredAnchorTimestamp) {
                setURLAnchorTimestamp(desiredAnchorTimestamp);
                document
                    .querySelector(`#${documentId.STUDENT_PACKAGE_ID(packageId)}`)
                    ?.scrollIntoView({ block: 'start' });
            } else {
                // select the first date so that UI can start from the first class:
                const classesOfSelectedPackage = weeklyClassEvent?.timestamps?.filter(timestamp => {
                    const cls = weeklyClassEvent?.hrUnixTimestampToLesson?.[timestamp];
                    return cls?.studentPackage.id === Number(packageId);
                });
                const availableFirstDate = classesOfSelectedPackage
                    ?.sort((a, b) => Number(a) - Number(b))
                    .slice(0, 1)?.[0];
                if (availableFirstDate) {
                    setURLAnchorTimestamp(Number(availableFirstDate));
                }
            }
        },
        setDailyTimetableSelectedDate: (state, action: PayloadAction<{ date: Date }>) => {
            state.massTimetablePage.selectedDate = action.payload.date;
        },
        updateStudent: (state, action: PayloadAction<{ student: StudentDTO }>) => {
            const { student } = action.payload;
            if (state.students.idToStudent && student.id) {
                state.students.idToStudent[student.id] = student;
            }
        },
        resetStudentDetail: state => {
            state.studentDetailTimetablePage = initialState.studentDetailTimetablePage;
        },
        resetMassTimetablerFilter: state => {
            state.massTimetablePage = initialState.massTimetablePage;
        },
        reset: () => {
            return initialState;
        },
        setShowAllClassesForOneStudent: (state, action) => {
            state.studentDetailTimetablePage.showAllClassesForOneStudent = action.payload;
        },
    },
});

export default studentSlice;

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
