import { createAsyncThunk, createListenerMiddleware, createSlice, PayloadAction } from "@reduxjs/toolkit";
import registerDialogAndActions from "../../utils/registerEffects";
import apiClient from "../../axios/apiClient";
import { CustomResponse } from "../../axios/responseTypes";
import apiRoutes from "../../axios/apiRoutes";
import { processRes } from "../../utils/processRes";
import {
    LimitedStudentInfo,
    StudentDetail,
    CreateClassRequest,
    MoveClassRequest,
    DuplicateClassRequest,
    DetachClassRequest,
    UpdateClassRequest,
    CreateStudentPackageRequest,
    Augmented_Student_package,
    Augmented_Class,
    DeleteClassRequest,
    UpdateStudentPackageRequest,
} from "../../dto/dto";
import normalizeUtil from "../../utils/normalizeUtil";
import { loadingActions } from "../../utils/loadingActions";
import { RootState } from "../store";
import lodash from "lodash";
import { Class, Class_status, Course, Student_package } from "../../prismaTypes/types";

export type StudentSliceState = {
    students: {
        ids?: string[];
        idToStuduent?: {
            [key: string]: LimitedStudentInfo;
        };
    };
    studentDetail: {
        detail: StudentDetail | null;
        selectedPackageId: string;
        packages: {
            ids?: string[];
            idToPackage?: { [id: string]: Augmented_Student_package };
        };
        weeklyTimetable: {
            selectedDate: Date;
            hrUnixTimestamps?: string[];
            hrUnixTimestampToClass?: { [id: string]: Class & Course & Student_package & { hide: boolean } };
        };
        dailyTimetable: {
            selectedDate: Date;
            hrUnixTimestamps?: string[];
            hrUnixTimestampToClass?: { [id: string]: Augmented_Class & { student_id: string } & { hide: boolean } };
        };
    };
    showAllClassesForOneStudent: boolean;
};

const initialState: StudentSliceState = {
    students: {},
    studentDetail: {
        selectedPackageId: "",
        packages: {},
        detail: null,
        weeklyTimetable: {
            selectedDate: new Date(),
        },
        dailyTimetable: {
            selectedDate: new Date(),
        },
    },
    showAllClassesForOneStudent: true,
};

const studentSlice = createSlice({
    name: "student",
    initialState,
    reducers: {
        setSelectedPackageId: (state, action: PayloadAction<string>) => {
            const packageId = action.payload;
            state.studentDetail.selectedPackageId = packageId;
            const availableFirstDate = state.studentDetail.weeklyTimetable.hrUnixTimestamps
                ?.filter((timestamp) => {
                    return state.studentDetail.weeklyTimetable?.hrUnixTimestampToClass?.[timestamp].student_package_id == Number(packageId);
                })
                .sort((a, b) => Number(a) - Number(b))
                .slice(0, 1)?.[0];
            if (availableFirstDate) {
                state.studentDetail.weeklyTimetable.selectedDate = new Date(Number(availableFirstDate));
            }
        },
        setDailyTimetableSelectedDate: (state, action: PayloadAction<{ date: Date }>) => {
            state.studentDetail.dailyTimetable.selectedDate = action.payload.date;
        },
        unsetStudentEvent: (state, action: PayloadAction<{ hrTimestamp: string }>) => {
            const { hrTimestamp } = action.payload;
            lodash.unset(state.studentDetail.weeklyTimetable.hrUnixTimestampToClass, hrTimestamp);
        },
        hideClass: (state, action: PayloadAction<{ hrTimestamp: string }>) => {
            const { hrTimestamp } = action.payload;
            if (state.studentDetail.weeklyTimetable?.hrUnixTimestampToClass?.[hrTimestamp]) {
                state.studentDetail.weeklyTimetable.hrUnixTimestampToClass[hrTimestamp].hide = true;
            }
        },
        unHideClass: (state, action: PayloadAction<{ hrTimestamp: string }>) => {
            const { hrTimestamp } = action.payload;
            if (state.studentDetail.weeklyTimetable?.hrUnixTimestampToClass?.[hrTimestamp]) {
                state.studentDetail.weeklyTimetable.hrUnixTimestampToClass[hrTimestamp].hide = false;
            }
        },
        resetStudentDetail: (state) => {
            state.studentDetail = initialState.studentDetail;
        },
        reset: () => {
            return initialState;
        },
        setShowAllClassesForOneStudent: (state, action) => {
            state.showAllClassesForOneStudent = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(StudentThunkAction.getStudents.fulfilled, (state, action) => {
                const students = action.payload;
                const { idToObject, ids } = normalizeUtil.normalize({ idAttribute: "id", targetArr: students });
                state.students.ids = ids;
                state.students.idToStuduent = idToObject;
            })
            .addCase(StudentThunkAction.updateStudent.fulfilled, (state, action) => {
                const student = action.payload.student;
                if (state.students.idToStuduent?.[student.id]) {
                    state.students.idToStuduent[student.id] = student;
                }
            })
            .addCase(StudentThunkAction.getStudentDetail.fulfilled, (state, action) => {
                const studentDetail = action.payload;
                state.studentDetail.detail = studentDetail;
            })
            .addCase(StudentThunkAction.moveStudentEvent.fulfilled, (state, action) => {
                if (action.payload?.type === "proceed") {
                    console.log("now proceed");
                    const { fromTimestamp = "", result, newOfficialEndDate, packageIdToChangeOfficialEndDate } = action.payload;
                    const { event } = result || {};
                    const hour_unix_timestamp = event?.hour_unix_timestamp || "";
                    const index = (state.studentDetail.weeklyTimetable.hrUnixTimestamps || []).indexOf(fromTimestamp);

                    if (newOfficialEndDate && packageIdToChangeOfficialEndDate && state.studentDetail.packages.idToPackage) {
                        state.studentDetail.packages.idToPackage[packageIdToChangeOfficialEndDate].official_end_date = newOfficialEndDate;
                    }

                    if (index > -1 && state.studentDetail.weeklyTimetable.hrUnixTimestamps?.[index]) {
                        console.log("index exists", index);
                        state.studentDetail.weeklyTimetable.hrUnixTimestamps[index] = String(hour_unix_timestamp);
                    }
                    if (state.studentDetail.weeklyTimetable.hrUnixTimestampToClass) {
                        lodash.setWith(state.studentDetail.weeklyTimetable.hrUnixTimestampToClass, hour_unix_timestamp, event);
                    }
                }
            })
            .addCase(StudentThunkAction.detachFromGroup.fulfilled, (state, action) => {
                const hourTimeStamp = action.payload.hour_unix_timestamp;
                if (state.studentDetail?.weeklyTimetable.hrUnixTimestampToClass?.[String(hourTimeStamp)]) {
                    state.studentDetail.weeklyTimetable.hrUnixTimestampToClass[String(hourTimeStamp)].class_group_id = null;
                }
            })
            .addCase(StudentThunkAction.updateClass.fulfilled, (state, action) => {
                const { hour_unix_timestamp: hourTimeStamp, min, class_status, reason_for_absence, remark } = action.payload;
                if (state.studentDetail?.weeklyTimetable.hrUnixTimestampToClass?.[String(hourTimeStamp)]) {
                    state.studentDetail.weeklyTimetable.hrUnixTimestampToClass[String(hourTimeStamp)].min = min;
                    state.studentDetail.weeklyTimetable.hrUnixTimestampToClass[String(hourTimeStamp)].class_status = class_status;
                    state.studentDetail.weeklyTimetable.hrUnixTimestampToClass[String(hourTimeStamp)].remark = remark;
                    state.studentDetail.weeklyTimetable.hrUnixTimestampToClass[String(hourTimeStamp)].reason_for_absence = reason_for_absence;
                }
            })
            .addCase(StudentThunkAction.updatePackage.fulfilled, (state, action) => {
                const updatedPackage = action.payload;
                if (state.studentDetail.packages.idToPackage?.[String(updatedPackage.id)]) {
                    state.studentDetail.packages.idToPackage[String(updatedPackage.id)].start_date = updatedPackage.start_date;
                    state.studentDetail.packages.idToPackage[String(updatedPackage.id)].course_id = updatedPackage.course_id;
                    state.studentDetail.packages.idToPackage[String(updatedPackage.id)].min = updatedPackage.min;
                    state.studentDetail.packages.idToPackage[String(updatedPackage.id)].num_of_classes = updatedPackage.num_of_classes;
                }
            })
            .addCase(StudentThunkAction.getStudentPackages.fulfilled, (state, action) => {
                const packages = action.payload.packages;
                const { idToObject, ids } = normalizeUtil.normalize({ idAttribute: "id", targetArr: packages });
                state.studentDetail.packages.ids = ids.sort((id1, id2) => idToObject[id1].start_date - idToObject[id2].start_date);
                state.studentDetail.packages.idToPackage = idToObject;
            })
            .addCase(StudentThunkAction.getStudentClassesForDailyTimetable.fulfilled, (state, action) => {
                console.log("action.payload:", action.payload);
                const classes = action.payload.classes.map((clz) => ({ ...clz, hide: false }));
                const { ids, idToObject } = normalizeUtil.normalize({ idAttribute: "hour_unix_timestamp", targetArr: classes });
                state.studentDetail.dailyTimetable.hrUnixTimestamps = ids;
                state.studentDetail.dailyTimetable.hrUnixTimestampToClass = idToObject;
            })
            .addCase(StudentThunkAction.getStudentClassesForWeeklyTimetable.fulfilled, (state, action) => {
                const classes = action.payload.classes.map((clz) => ({ ...clz, hide: false }));
                const { ids, idToObject } = normalizeUtil.normalize({ idAttribute: "hour_unix_timestamp", targetArr: classes });
                state.studentDetail.weeklyTimetable.hrUnixTimestamps = ids;
                state.studentDetail.weeklyTimetable.hrUnixTimestampToClass = idToObject;
            });
    },
});

export class StudentThunkAction {
    public static getStudents = createAsyncThunk("studentSlice/getStudents", async (_: undefined, api) => {
        const res = await apiClient.get<CustomResponse<LimitedStudentInfo[]>>(apiRoutes.GET_STUDENTS);
        return processRes(res, api);
    });
    public static updatePackage = createAsyncThunk("studentSlice/updatePackage", async (props: UpdateStudentPackageRequest, api) => {
        const res = await apiClient.put<CustomResponse<Student_package>>(apiRoutes.PUT_UPDATE_PACKAGE, props);
        return processRes(res, api);
    });
    public static createStudent = createAsyncThunk("studentSlice/createStudent", async (props: LimitedStudentInfo, api) => {
        const res = await apiClient.post<CustomResponse<undefined>>(apiRoutes.POST_CREATE_STUDNET, props);
        return processRes(res, api);
    });

    public static getStudentClassesForWeeklyTimetable = createAsyncThunk("studentSlice/getStudentClassesForWeeklyTimetable", async (props: { studentId: string }, api) => {
        const { studentId } = props;
        const res = await apiClient.get<CustomResponse<{ classes: (Student_package & Class & Course)[] }>>(apiRoutes.GET_STUDENT_CLASSES_FOR_WEEKLY_TIMETABLE(studentId));
        return processRes(res, api);
    });
    public static getStudentDetail = createAsyncThunk("studentSlice/getStudentDetail", async (props: { studentId: string }, api) => {
        const { studentId } = props;
        const res = await apiClient.get<CustomResponse<StudentDetail>>(apiRoutes.GET_STUDENT_DETAIL(studentId));
        return processRes(res, api);
    });
    public static createStudentEvent = createAsyncThunk("studentSlice/createStudentEvent", async (props: CreateClassRequest, api) => {
        const res = await apiClient.post<CustomResponse<undefined>>(apiRoutes.POST_CREATE_STUDENT_CLASS, props);
        return processRes(res, api);
    });
    public static moveStudentEvent = createAsyncThunk(
        "studentSlice/moveStudentEvent",
        async (props: { fromHourTimestamp: string; toDayTimestamp: string; toHourTimestamp: string }, api) => {
            const { fromHourTimestamp: fromTimestamp, toDayTimestamp, toHourTimestamp } = props;
            const existingRecord = (api.getState() as RootState).student.studentDetail.weeklyTimetable.hrUnixTimestampToClass?.[toHourTimestamp];
            const currStudentId = (api.getState() as RootState).student.studentDetail.detail?.id || "";
            if (existingRecord) {
                return { type: "skipped" };
            }
            const event = lodash.cloneDeep((api.getState() as RootState).student?.studentDetail.weeklyTimetable.hrUnixTimestampToClass?.[fromTimestamp])!;
            event.day_unix_timestamp = Number(toDayTimestamp);
            event.hour_unix_timestamp = Number(toHourTimestamp);

            api.dispatch({ type: "student/unsetStudentEvent", payload: { hrTimestamp: fromTimestamp } });

            const eventId = event.id;
            const requestBody: MoveClassRequest = {
                class_id: eventId,
                toDayTimestamp: parseInt(toDayTimestamp),
                toHourTimestamp: parseInt(toHourTimestamp),
            };
            const res = await apiClient.put<
                CustomResponse<{
                    eventDetatil: {
                        student_id: string;
                        class_id: number;
                        day_unix_timestamp: number;
                        hour_unix_timestamp: number;
                    };
                    packageIdToChangeOfficialEndDate: number;
                    newOfficialEndDate: number;
                }>
            >(apiRoutes.PUT_MOVE_STUDNET_EVENT, requestBody);
            if (!res.data.success) {
                api.dispatch(StudentThunkAction.getStudentClassesForWeeklyTimetable({ studentId: currStudentId }));
                return { type: "proceed", fromTimestamp, result: { event } };
            } else {
                const { packageIdToChangeOfficialEndDate, newOfficialEndDate } = res.data.result;
                return { type: "proceed", fromTimestamp, result: { event }, packageIdToChangeOfficialEndDate, newOfficialEndDate };
            }
        }
    );
    public static updateStudent = createAsyncThunk("studentSlice/updateStudent", async (props: LimitedStudentInfo, api) => {
        const res = await apiClient.put<CustomResponse<{ student: LimitedStudentInfo }>>(apiRoutes.PUT_UPDATE_STUDENT, props);
        return processRes(res, api);
    });
    public static getStudentClassesForDailyTimetable = createAsyncThunk("studentSlice/getStudentClassesForDailyTimetable", async (props: { dateUnixTimestamp: string }, api) => {
        const res = await apiClient.get<CustomResponse<{ classes: (Student_package & Class & Course)[] }>>(
            apiRoutes.GET_STUDENT_CLASSES_FOR_DAILY_TIMETABLE(props.dateUnixTimestamp)
        );
        return processRes(res, api);
    });
    public static deleteClass = createAsyncThunk("studentSlice/deleteClass", async (props: DeleteClassRequest, api) => {
        const res = await apiClient.delete<CustomResponse<{ classId: number }>>(apiRoutes.DELETE_CLASS(props.classId));
        return processRes(res, api);
    });
    public static duplicateClases = createAsyncThunk("studentSlice/duplicateClases", async (props: DuplicateClassRequest, api) => {
        const res = await apiClient.post<CustomResponse<undefined>>(apiRoutes.POST_DUPLICATE_CLASSES, props);
        return processRes(res, api);
    });

    public static detachFromGroup = createAsyncThunk("studentSlice/detachFromGroup", async (props: DetachClassRequest, api) => {
        const res = await apiClient.put<CustomResponse<{ hour_unix_timestamp: number }>>(apiRoutes.PUT_DETACH_CLASS_FROM_GROUP, props);
        return processRes(res, api);
    });
    public static updateClass = createAsyncThunk("studentSlice/updateClass", async (props: UpdateClassRequest, api) => {
        const res = await apiClient.put<CustomResponse<{ hour_unix_timestamp: number; min: number; class_status: Class_status; reason_for_absence: string; remark: string }>>(
            apiRoutes.PUT_UPDATE_CLASS,
            props
        );
        return processRes(res, api);
    });

    public static createStudentPackage = createAsyncThunk("studentSlice/createStudentPackage", async (props: CreateStudentPackageRequest, api) => {
        const res = await apiClient.post<CustomResponse<Student_package>>(apiRoutes.POST_CREATE_STUDENT_PACKAGE, props);
        return processRes(res, api);
    });
    public static getStudentPackages = createAsyncThunk("studentSlice/getStudentPackages", async (props: { studentId: string }, api) => {
        const { studentId } = props;
        const res = await apiClient.get<CustomResponse<{ packages: Augmented_Student_package[] }>>(apiRoutes.GET_STUDENT_PACKAGES(studentId));
        return processRes(res, api);
    });
    public static markPackageAsPaid = createAsyncThunk("studentSlice/markPackageAsPaid", async (props: { packageId: number; paidAt: number }, api) => {
        const res = await apiClient.put<CustomResponse<undefined>>(apiRoutes.PUT_MARK_PACAKGE_AS_PAID, props);
        return processRes(res, api);
    });
    public static markPackageAsUnPaid = createAsyncThunk("studentSlice/markPackageAsUnPaid", async (props: { packageId: number }, api) => {
        const { packageId } = props;
        const res = await apiClient.put<CustomResponse<undefined>>(apiRoutes.PUT_MARK_PACAKGE_AS_UNPAID, { packageId });
        return processRes(res, api);
    });
    public static deletePackage = createAsyncThunk(
        "studentSlice/deletePackage",
        async (
            props: {
                studentId: string;
                packageId: number;
            },
            api
        ) => {
            const { studentId, packageId } = props;
            const res = await apiClient.delete<CustomResponse<undefined>>(apiRoutes.DELETE_PACKAGE(studentId, packageId));
            return processRes(res, api);
        }
    );
}

export const studentMiddleware = createListenerMiddleware();
registerDialogAndActions(studentMiddleware, [
    ...loadingActions(StudentThunkAction.getStudentDetail),
    ...loadingActions(StudentThunkAction.getStudents),
    ...loadingActions(StudentThunkAction.updateClass),
    // ...loadingActions(StudentThunkAction.createStudentPackage),
    {
        rejections: [
            StudentThunkAction.getStudentDetail.rejected,
            StudentThunkAction.getStudents.rejected,
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
            const studentId = (getState() as RootState).student.studentDetail.detail?.id || "";
            dispatch(StudentThunkAction.getStudentClassesForWeeklyTimetable({ studentId }));
        },
    },
]);

export default studentSlice;
