import { createListenerMiddleware, createSlice, PayloadAction } from '@reduxjs/toolkit';
import registerEffects from '../../utils/registerEffects';
import apiClient from '../../axios/apiClient';
import { CustomResponse } from '../../axios/responseTypes';
import apiRoutes from '../../axios/apiRoutes';
import { processRes } from '../../utils/processRes';
import {
    CreateClassRequest,
    MoveClassRequest,
    DuplicateClassRequest,
    DetachClassRequest,
    UpdateClassRequest,
    CreateStudentPackageRequest,
    DeleteClassRequest,
    UpdateStudentPackageRequest,
    CreateStudentRequest,
    UpdateStudentRequest,
    FilterToGetClassesForDailyTimetable,
} from '../../dto/dto';
import normalizeUtil from '../../utils/normalizeUtil';
import { loadingActions } from '../../utils/loadingActions';
import { RootState } from '../store';
import lodash from 'lodash';
import { Classroom } from '../../prismaTypes/types';
import { createApiThunk } from '../../utils/createApiThunk';
import {
    StudentDTO,
    StudentPackageRepsonse,
    TimetableClassEvent as ClassEvent,
    StudentPackageDTO,
} from '../../dto/kotlinDto';
import { omit } from 'lodash';

export type StudentSliceState = {
    students: {
        ids?: string[];
        idToStudent?: {
            [key: string]: StudentDTO;
        };
    };
    studentDetailTimetablePage: {
        showAllClassesForOneStudent: boolean;
        detail: StudentDTO | null;
        selectedPackageId: string;
        studentPackages: {
            ids?: string[];
            idToPackageResponse?: { [id: string]: StudentPackageRepsonse };
        };
        weeklyClassEvent: {
            selectedDate: Date; // we will list the timetables of the week containing this date (timestamp)
            hrUnixTimestamps?: string[];
            hrUnixTimestampToClassEvent?: {
                [id: string]: ClassEvent;
            };
        };
    };
    massTimetablePage: {
        classRoom: Classroom | null;
        selectedDate: Date;
        hrUnixTimestampToTimetableClasses: { [id: string]: ClassEvent[] };
        totalClassesInHighlight: {
            hrUnixTimestampOnClick: number | null;
            numberOfClassesInHighlight: number;
        };
        filter: FilterToGetClassesForDailyTimetable;
        summaryOfClassStatuses: {
            present: number;
            suspiciousAbsence: number;
            illegitAbsence: number;
            legitAbsence: number;
            makeup: number;
            changeOfClassroom: number;
            trial: number;
            reserved: number;
        };
    };
};

const initialState: StudentSliceState = {
    students: {},
    studentDetailTimetablePage: {
        selectedPackageId: '',
        studentPackages: {},
        detail: null,
        weeklyClassEvent: {
            selectedDate: new Date(),
        },
        showAllClassesForOneStudent: true,
    },
    massTimetablePage: {
        selectedDate: new Date(),
        classRoom: null,
        hrUnixTimestampToTimetableClasses: {},
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
        summaryOfClassStatuses: {
            present: 0,
            suspiciousAbsence: 0,
            illegitAbsence: 0,
            legitAbsence: 0,
            makeup: 0,
            changeOfClassroom: 0,
            trial: 0,
            reserved: 0,
        },
    },
};

const studentSlice = createSlice({
    name: 'student',
    initialState,
    reducers: {
        setNumberOfClassesInHighlight: (state, action: PayloadAction<number>) => {
            state.massTimetablePage.totalClassesInHighlight.numberOfClassesInHighlight = action.payload;
        },
        setHrUnixTimestampOnClick: (state, action: PayloadAction<number | null>) => {
            state.massTimetablePage.totalClassesInHighlight.hrUnixTimestampOnClick = action.payload;
        },
        setFilter: (state, action: PayloadAction<FilterToGetClassesForDailyTimetable>) => {
            state.massTimetablePage.filter = action.payload;
        },
        setCourseFilterItem: (state, action: PayloadAction<number[]>) => {
            state.massTimetablePage.filter.courseIds = action.payload;
        },
        addCourseFilterItem: (state, action: PayloadAction<number>) => {
            state.massTimetablePage.filter.courseIds.push(action.payload);
        },
        dropCourseFilterItem: (state, action: PayloadAction<number>) => {
            const newArray: number[] = [];
            state.massTimetablePage.filter.courseIds.forEach(id => {
                if (id !== action.payload) {
                    newArray.push(id);
                }
            });
            console.log('newArray:', newArray);
            state.massTimetablePage.filter.courseIds = newArray;
        },
        setClassroom: (state, action: PayloadAction<Classroom>) => {
            state.massTimetablePage.classRoom = action.payload;
        },
        setSelectedPackageId: (state, action: PayloadAction<string>) => {
            const packageId = action.payload;
            state.studentDetailTimetablePage.selectedPackageId = packageId;

            // select the first date so that UI can start from the first class:
            const availableFirstDate = state.studentDetailTimetablePage.weeklyClassEvent.hrUnixTimestamps
                ?.filter(timestamp => {
                    return (
                        state.studentDetailTimetablePage.weeklyClassEvent?.hrUnixTimestampToClassEvent?.[timestamp]
                            .package.id == Number(packageId)
                    );
                })
                .sort((a, b) => Number(a) - Number(b))
                .slice(0, 1)?.[0];
            if (availableFirstDate) {
                state.studentDetailTimetablePage.weeklyClassEvent.selectedDate = new Date(Number(availableFirstDate));
            }
        },
        setDailyTimetableSelectedDate: (state, action: PayloadAction<{ date: Date }>) => {
            state.massTimetablePage.selectedDate = action.payload.date;
        },
        setWeeklyTimetableSelectedDate: (state, action: PayloadAction<{ date: Date }>) => {
            state.studentDetailTimetablePage.weeklyClassEvent.selectedDate = action.payload.date;
        },
        unsetStudentEvent: (state, action: PayloadAction<{ hrTimestamp: string }>) => {
            const { hrTimestamp } = action.payload;
            lodash.unset(state.studentDetailTimetablePage.weeklyClassEvent.hrUnixTimestampToClassEvent, hrTimestamp);
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
        reset: () => {
            return initialState;
        },
        setShowAllClassesForOneStudent: (state, action) => {
            state.studentDetailTimetablePage.showAllClassesForOneStudent = action.payload;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(StudentThunkAction.getStudents.fulfilled, (state, action) => {
                const students = action.payload.students;
                const { idToObject, ids } = normalizeUtil.normalize({
                    idAttribute: 'id',
                    targetArr: students,
                });
                state.students.ids = ids;
                state.students.idToStudent = idToObject;
            })
            .addCase(StudentThunkAction.updateStudent.fulfilled, (state, action) => {
                const student = action.payload.student;
                if (state.students.idToStudent?.[student.id]) {
                    state.students.idToStudent[student.id] = student;
                }
            })
            .addCase(StudentThunkAction.getStudentDetail.fulfilled, (state, action) => {
                const studentDetail = action.payload;
                state.studentDetailTimetablePage.detail = studentDetail;
            })
            .addCase(StudentThunkAction.detachFromGroup.fulfilled, (state, action) => {
                const hourTimeStamp = action.payload.hour_unix_timestamp;
                if (
                    state.studentDetailTimetablePage?.weeklyClassEvent.hrUnixTimestampToClassEvent?.[
                        String(hourTimeStamp)
                    ]
                ) {
                    state.studentDetailTimetablePage.weeklyClassEvent.hrUnixTimestampToClassEvent[
                        String(hourTimeStamp)
                    ].classGroup = null;
                }
            })
            .addCase(StudentThunkAction.getStudentPackages.fulfilled, (state, action) => {
                const packages = action.payload;
                console.log('packagespackagespackages', packages);
                const { idToObject, ids } = normalizeUtil.normalize({
                    idAttribute: 'packageId',
                    targetArr: packages,
                });
                state.studentDetailTimetablePage.studentPackages.ids = ids.sort(
                    (id1, id2) => idToObject[id1].studentPackage.startDate - idToObject[id2].studentPackage.startDate
                );
                state.studentDetailTimetablePage.studentPackages.idToPackageResponse = idToObject;
            })
            .addCase(StudentThunkAction.getFilteredStudentClassesForDailyTimetable.fulfilled, (state, action) => {
                const classes = action.payload.classes;
                state.massTimetablePage.hrUnixTimestampToTimetableClasses = {};
                const hrTimestampToClasses: {
                    [key: string]: ClassEvent[];
                } = {};
                let presentClasses = 0;
                let suspiciousAbsenceClasses = 0;
                let illegitAbsenceClasses = 0;
                let legitAbsenceClasses = 0;
                let makeupClasses = 0;
                let changeOfClassroomClasses = 0;
                let trialClasses = 0;
                let reservedClasses = 0;
                for (const class_ of classes) {
                    const timestamp = class_.hourUnixTimestamp.toString();
                    const classesForNow = hrTimestampToClasses?.[timestamp];
                    if (!classesForNow) {
                        lodash.setWith(hrTimestampToClasses, `["${timestamp}"]`, [class_], Object);
                    } else {
                        hrTimestampToClasses[timestamp].push(class_);
                    }
                }
                Object.entries(hrTimestampToClasses).forEach(([hrTimestamp, timetableClasses]) => {
                    const existingTimetableClasses =
                        state.massTimetablePage.hrUnixTimestampToTimetableClasses?.[hrTimestamp] || [];
                    const existingIds = existingTimetableClasses.map(timetableClass => timetableClass.class.id);

                    for (const timetableClass of timetableClasses) {
                        if (!existingIds.includes(timetableClass.class.id)) {
                            existingTimetableClasses.push(timetableClass);
                        }
                        switch (timetableClass.class.classStatus) {
                            case 'PRESENT':
                                presentClasses++;
                                break;
                            case 'RESERVED':
                                reservedClasses++;
                                break;
                            case 'SUSPICIOUS_ABSENCE':
                                suspiciousAbsenceClasses++;
                                break;
                            case 'ILLEGIT_ABSENCE':
                                illegitAbsenceClasses++;
                                break;
                            case 'LEGIT_ABSENCE':
                                legitAbsenceClasses++;
                                break;
                            case 'MAKEUP':
                                makeupClasses++;
                                break;
                            case 'TRIAL':
                                trialClasses++;
                                break;
                            case 'CHANGE_OF_CLASSROOM':
                                changeOfClassroomClasses++;
                                break;
                        }
                    }
                    lodash.setWith(
                        state.massTimetablePage.hrUnixTimestampToTimetableClasses,
                        `["${hrTimestamp}"]`,
                        existingTimetableClasses,
                        Object
                    );
                });
                state.massTimetablePage.summaryOfClassStatuses = {
                    present: presentClasses,
                    suspiciousAbsence: suspiciousAbsenceClasses,
                    illegitAbsence: illegitAbsenceClasses,
                    legitAbsence: legitAbsenceClasses,
                    makeup: makeupClasses,
                    changeOfClassroom: changeOfClassroomClasses,
                    trial: trialClasses,
                    reserved: reservedClasses,
                };
            })
            .addCase(StudentThunkAction.getMassiveStudentsClassesForDailyTimetable.fulfilled, (state, action) => {
                const timetableClasses = action.payload.timetableClasses;
                const hrTimestampToClasses: {
                    [key: string]: ClassEvent[];
                } = {};
                for (const timetableClass of timetableClasses) {
                    const timestamp = timetableClass.class.hourUnixTimestamp.toString();
                    const classesForNow = hrTimestampToClasses?.[timestamp];
                    if (!classesForNow) {
                        lodash.setWith(hrTimestampToClasses, `["${timestamp}"]`, [timetableClass], Object);
                    } else {
                        hrTimestampToClasses[timestamp].push(timetableClass);
                    }
                }
                Object.entries(hrTimestampToClasses).forEach(([hrTimestamp, timetableClasses]) => {
                    const existingTimetableClasses =
                        state.massTimetablePage.hrUnixTimestampToTimetableClasses?.[hrTimestamp] || [];
                    const existingIds = existingTimetableClasses.map(timetableClass => timetableClass.class.id);

                    for (const timetableClass of timetableClasses) {
                        if (!existingIds.includes(timetableClass.class.id)) {
                            existingTimetableClasses.push(timetableClass);
                        }
                    }

                    lodash.setWith(
                        state.massTimetablePage.hrUnixTimestampToTimetableClasses,
                        `["${hrTimestamp}"]`,
                        existingTimetableClasses,
                        Object
                    );
                });
            })
            .addCase(StudentThunkAction.getStudentClassesForWeeklyTimetable.fulfilled, (state, action) => {
                const classes = action.payload.map(clz => ({
                    ...clz,
                    hide: false,
                }));
                const { ids, idToObject } = normalizeUtil.normalize({
                    idAttribute: 'hourUnixTimestamp',
                    targetArr: classes,
                });
                state.studentDetailTimetablePage.weeklyClassEvent.hrUnixTimestamps = ids;
                state.studentDetailTimetablePage.weeklyClassEvent.hrUnixTimestampToClassEvent = idToObject;
            })
            .addCase(StudentThunkAction.moveStudentEvent.fulfilled, (state, action) => {
                const { fromTimestamp = '' } = action.payload;
                // remove the key and value
                const index = state.studentDetailTimetablePage.weeklyClassEvent.hrUnixTimestamps?.findIndex(
                    t => t === String(fromTimestamp)
                );
                if (index != null) {
                    state.studentDetailTimetablePage.weeklyClassEvent.hrUnixTimestamps?.splice(index, 1);
                }
                omit(
                    state.studentDetailTimetablePage.weeklyClassEvent.hrUnixTimestampToClassEvent,
                    String(fromTimestamp)
                );
            });
    },
});

export class StudentThunkAction {
    public static getStudents = createApiThunk('studentSlice/getStudents', async (_: undefined, api) => {
        const res = await apiClient.get<CustomResponse<{ students: StudentDTO[]; total: number }>>(
            apiRoutes.GET_STUDENTS
        );
        return processRes(res, api);
    });
    public static updatePackage = createApiThunk(
        'studentSlice/updatePackage',
        async (props: UpdateStudentPackageRequest, api) => {
            const res = await apiClient.put<CustomResponse<undefined>>(apiRoutes.PUT_UPDATE_PACKAGE, props);
            return processRes(res, api);
        }
    );
    public static createStudent = createApiThunk(
        'studentSlice/createStudent',
        async (props: CreateStudentRequest, api) => {
            const res = await apiClient.post<CustomResponse<StudentDTO>>(apiRoutes.POST_CREATE_STUDNET, props);
            return processRes(res, api);
        }
    );

    public static getStudentClassesForWeeklyTimetable = createApiThunk(
        'studentSlice/getStudentClassesForWeeklyTimetable',
        async (props: { studentId: string }, api) => {
            const { studentId } = props;
            const res = await apiClient.get<CustomResponse<ClassEvent[]>>(
                apiRoutes.GET_STUDENT_CLASSES_FOR_WEEKLY_TIMETABLE(studentId)
            );
            return processRes(res, api);
        }
    );
    public static getStudentDetail = createApiThunk(
        'studentSlice/getStudentDetail',
        async (props: { studentId: string }, api) => {
            const { studentId } = props;
            const res = await apiClient.get<CustomResponse<StudentDTO>>(apiRoutes.GET_STUDENT_DETAIL(studentId));
            return processRes(res, api);
        }
    );
    public static createStudentEvent = createApiThunk(
        'studentSlice/createStudentEvent',
        async (props: CreateClassRequest, api) => {
            const res = await apiClient.post<CustomResponse<undefined>>(apiRoutes.POST_CREATE_STUDENT_CLASS, props);
            return processRes(res, api);
        }
    );
    public static moveStudentEvent = createApiThunk(
        'studentSlice/moveStudentEvent',
        async (
            props: {
                fromHourTimestamp: string;
                toDayTimestamp: string;
                toHourTimestamp: string;
            },
            api
        ) => {
            const { fromHourTimestamp: fromTimestamp, toDayTimestamp, toHourTimestamp } = props;
            const existingRecord = (api.getState() as RootState).student.studentDetailTimetablePage.weeklyClassEvent
                .hrUnixTimestampToClassEvent?.[toHourTimestamp];

            if (existingRecord) {
                return { type: 'skipped' };
            }

            const classEvent = lodash.cloneDeep(
                (api.getState() as RootState).student?.studentDetailTimetablePage.weeklyClassEvent
                    .hrUnixTimestampToClassEvent?.[fromTimestamp]
            )!;
            classEvent.class.dayUnixTimestamp = Number(toDayTimestamp);
            classEvent.class.hourUnixTimestamp = Number(toHourTimestamp);

            api.dispatch({
                type: 'student/unsetStudentEvent',
                payload: { hrTimestamp: fromTimestamp },
            });

            const classId = classEvent.class.id;
            const requestBody: MoveClassRequest = {
                class_id: classId,
                toDayTimestamp: parseInt(toDayTimestamp),
                toHourTimestamp: parseInt(toHourTimestamp),
            };
            await apiClient.put<CustomResponse<null>>(apiRoutes.PUT_MOVE_STUDNET_CLASS, requestBody);
            return {
                fromTimestamp,
            };
        }
    );
    public static updateStudent = createApiThunk(
        'studentSlice/updateStudent',
        async (props: Partial<UpdateStudentRequest>, api) => {
            const res = await apiClient.put<CustomResponse<{ student: StudentDTO }>>(
                apiRoutes.PUT_UPDATE_STUDENT,
                props
            );
            return processRes(res, api);
        }
    );

    public static getFilteredStudentClassesForDailyTimetable = createApiThunk(
        'studentSlice/getFilteredStudentClassesForDailyTimetable',
        async (
            props: {
                dateUnixTimestamp: string;
                classRoom: Classroom;
                filter: FilterToGetClassesForDailyTimetable;
            },
            api
        ) => {
            const res = await apiClient.post<CustomResponse<{ classes: ClassEvent[] }>>(
                apiRoutes.POST_GET_STUDENT_CLASSES_FOR_DAILY_TIMETABLE,
                props
            );
            return processRes(res, api);
        }
    );
    public static getMassiveStudentsClassesForDailyTimetable = createApiThunk(
        'studentSlice/getStudentClassesForDailyTimetable',
        async (props: { dateUnixTimestamp: string; classRoom: Classroom }, api) => {
            const res = await apiClient.get<CustomResponse<{ timetableClasses: ClassEvent[] }>>(
                apiRoutes.GET_STUDENT_CLASSES_FOR_DAILY_TIMETABLE(props.dateUnixTimestamp, props.classRoom)
            );
            return processRes(res, api);
        }
    );
    public static deleteClass = createApiThunk('studentSlice/deleteClass', async (props: DeleteClassRequest, api) => {
        const res = await apiClient.delete<CustomResponse<{ classId: number }>>(apiRoutes.DELETE_CLASS(props.classId));
        return processRes(res, api);
    });
    public static duplicateClases = createApiThunk(
        'studentSlice/duplicateClases',
        async (props: DuplicateClassRequest, api) => {
            const res = await apiClient.post<CustomResponse<undefined>>(apiRoutes.POST_DUPLICATE_CLASSES, props);
            return processRes(res, api);
        }
    );

    public static detachFromGroup = createApiThunk(
        'studentSlice/detachFromGroup',
        async (props: DetachClassRequest, api) => {
            const res = await apiClient.put<CustomResponse<{ hour_unix_timestamp: number }>>(
                apiRoutes.PUT_DETACH_CLASS_FROM_GROUP,
                props
            );
            return processRes(res, api);
        }
    );
    public static updateClass = createApiThunk('studentSlice/updateClass', async (props: UpdateClassRequest, api) => {
        const res = await apiClient.put<CustomResponse<undefined>>(apiRoutes.PUT_UPDATE_CLASS, props);
        return processRes(res, api);
    });

    public static createStudentPackage = createApiThunk(
        'studentSlice/createStudentPackage',
        async (props: CreateStudentPackageRequest, api) => {
            const res = await apiClient.post<CustomResponse<StudentPackageDTO>>(
                apiRoutes.POST_CREATE_STUDENT_PACKAGE,
                props
            );
            return processRes(res, api);
        }
    );
    public static getStudentPackages = createApiThunk(
        'studentSlice/getStudentPackages',
        async (props: { studentId: string }, api) => {
            const { studentId } = props;
            const res = await apiClient.get<CustomResponse<StudentPackageRepsonse[]>>(
                apiRoutes.GET_STUDENT_PACKAGES(studentId)
            );
            return processRes(res, api);
        }
    );
    public static markPackageAsPaid = createApiThunk(
        'studentSlice/markPackageAsPaid',
        async (props: { packageId: number; paidAt: number }, api) => {
            const res = await apiClient.put<CustomResponse<undefined>>(apiRoutes.PUT_MARK_PACAKGE_AS_PAID, props);
            return processRes(res, api);
        }
    );
    public static markPackageAsUnPaid = createApiThunk(
        'studentSlice/markPackageAsUnPaid',
        async (props: { packageId: number }, api) => {
            const { packageId } = props;
            const res = await apiClient.put<CustomResponse<undefined>>(apiRoutes.PUT_MARK_PACAKGE_AS_UNPAID, {
                packageId,
            });
            return processRes(res, api);
        }
    );
    public static deletePackage = createApiThunk(
        'studentSlice/deletePackage',
        async (
            props: {
                studentId: string;
                packageId: number;
            },
            api
        ) => {
            const { studentId, packageId } = props;
            const res = await apiClient.delete<CustomResponse<undefined>>(
                apiRoutes.DELETE_PACKAGE(studentId, packageId)
            );
            return processRes(res, api);
        }
    );
}

export const studentMiddleware = createListenerMiddleware();

registerEffects(studentMiddleware, [
    ...loadingActions(StudentThunkAction.getStudentDetail),
    ...loadingActions(StudentThunkAction.getStudents),
    ...loadingActions(StudentThunkAction.updateClass),
    ...loadingActions(StudentThunkAction.createStudentEvent),
    ...loadingActions(StudentThunkAction.createStudentPackage),
    ...loadingActions(StudentThunkAction.moveStudentEvent),
    {
        rejections: [
            StudentThunkAction.getStudentDetail.rejected,
            StudentThunkAction.getStudents.rejected,
            StudentThunkAction.createStudent.rejected,
            StudentThunkAction.duplicateClases.rejected,
            StudentThunkAction.updateClass.rejected,
            StudentThunkAction.createStudentPackage.rejected,
            StudentThunkAction.markPackageAsPaid.rejected,
            StudentThunkAction.markPackageAsUnPaid.rejected,
            StudentThunkAction.deletePackage.rejected,
        ],
    },
    {
        action: StudentThunkAction.duplicateClases.fulfilled,
        effect: (_, { dispatch, getState }) => {
            const studentId = (getState() as RootState).student.studentDetailTimetablePage.detail?.id || '';
            dispatch(
                StudentThunkAction.getStudentClassesForWeeklyTimetable({
                    studentId,
                })
            );
        },
    },
]);

export default studentSlice;
