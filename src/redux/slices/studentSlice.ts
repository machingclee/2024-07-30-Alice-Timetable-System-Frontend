import { createAsyncThunk, createListenerMiddleware, createSlice, PayloadAction } from "@reduxjs/toolkit";
import registerDialogAndActions from "../../utils/registerEffects";
import apiClient from "../../axios/apiClient";
import { CustomResponse } from "../../axios/responseTypes";
import apiRoutes from "../../axios/apiRoutes";
import { processRes } from "../../utils/processRes";
import {
    Student,
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
    ClassAction,
} from "../../dto/dto";
import normalizeUtil from "../../utils/normalizeUtil";
import { loadingActions } from "../../utils/loadingActions";
import { RootState } from "../store";
import lodash from "lodash";
import { Class_status, Student_package } from "../../prismaTypes/types";

export type StudentSliceState = {
    students: {
        ids?: string[];
        idToStduent?: {
            [key: string]: Student;
        };
    };
    studentDetail: {
        detail: StudentDetail | null;
        selectedPackageId: string;
        packages: {
            ids?: string[];
            idToPackage?: { [id: string]: Augmented_Student_package };
        };
        timetable: {
            selectedDate: Date;
            hrUnixTimestamps?: string[];
            hrUnixTimestampToClass?: { [id: string]: Augmented_Class & { hide: boolean } };
        };
    };
    // To trigger rerendering in case a studentClass needs to react to the changes in other studentClasses
    classAction: ClassAction;
};

const initialState: StudentSliceState = {
    students: {},
    studentDetail: {
        selectedPackageId: "",
        packages: {},
        detail: null,
        timetable: {
            selectedDate: new Date(),
        },
    },
    classAction: null,
};

const studentSlice = createSlice({
    name: "student",
    initialState,
    reducers: {
        setSelectedPackageId: (state, action: PayloadAction<string>) => {
            const packageId = action.payload;
            state.studentDetail.selectedPackageId = packageId;
            const availableFirstDate = state.studentDetail.timetable.hrUnixTimestamps
                ?.filter((timestamp) => {
                    return state.studentDetail.timetable?.hrUnixTimestampToClass?.[timestamp].student_package_id == Number(packageId);
                })
                .sort((a, b) => Number(a) - Number(b))
                .slice(0, 1)?.[0];
            if (availableFirstDate) {
                state.studentDetail.timetable.selectedDate = new Date(Number(availableFirstDate));
            }
        },
        unsetStudentEvent: (state, action: PayloadAction<{ hrTimestamp: string }>) => {
            const { hrTimestamp } = action.payload;
            lodash.unset(state.studentDetail.timetable.hrUnixTimestampToClass, hrTimestamp);
        },
        hideClass: (state, action: PayloadAction<{ hrTimestamp: string }>) => {
            const { hrTimestamp } = action.payload;
            if (state.studentDetail.timetable?.hrUnixTimestampToClass?.[hrTimestamp]) {
                state.studentDetail.timetable.hrUnixTimestampToClass[hrTimestamp].hide = true;
            }
        },
        unHideClass: (state, action: PayloadAction<{ hrTimestamp: string }>) => {
            const { hrTimestamp } = action.payload;
            if (state.studentDetail.timetable?.hrUnixTimestampToClass?.[hrTimestamp]) {
                state.studentDetail.timetable.hrUnixTimestampToClass[hrTimestamp].hide = false;
            }
        },
        resetStudentDetail: (state) => {
            state.studentDetail = initialState.studentDetail;
        },
        reset: () => {
            return initialState;
        },
        setClassAction: (state, action: PayloadAction<ClassAction>) => {
            state.classAction = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(StudentThunkAction.getStudents.fulfilled, (state, action) => {
                const students = action.payload;
                const { idToObject, ids } = normalizeUtil.normalize({ idAttribute: "id", targetArr: students });
                state.students.ids = ids;
                state.students.idToStduent = idToObject;
            })
            .addCase(StudentThunkAction.updateStudent.fulfilled, (state, action) => {
                const student = action.payload.student;
                if (state.students.idToStduent?.[student.id]) {
                    state.students.idToStduent[student.id] = student;
                }
            })
            .addCase(StudentThunkAction.getStudentDetail.fulfilled, (state, action) => {
                const studentDetail = action.payload;
                state.studentDetail.detail = studentDetail;
            })
            .addCase(StudentThunkAction.getStudentClasses.fulfilled, (state, action) => {
                const classes = action.payload.classes.map((clz) => ({ ...clz, hide: false }));
                const { ids, idToObject } = normalizeUtil.normalize({ idAttribute: "hour_unix_timestamp", targetArr: classes });
                state.studentDetail.timetable.hrUnixTimestamps = ids;
                state.studentDetail.timetable.hrUnixTimestampToClass = idToObject;
            })
            .addCase(StudentThunkAction.moveStudentEvent.fulfilled, (state, action) => {
                if (action.payload?.type === "proceed") {
                    console.log("now proceed");
                    const { fromTimestamp = "", result } = action.payload;
                    const { event } = result || {};
                    const hour_unix_timestamp = event?.hour_unix_timestamp || "";
                    const index = (state.studentDetail.timetable.hrUnixTimestamps || []).indexOf(fromTimestamp);

                    if (index > -1 && state.studentDetail.timetable.hrUnixTimestamps?.[index]) {
                        console.log("index exists", index);
                        state.studentDetail.timetable.hrUnixTimestamps[index] = String(hour_unix_timestamp);
                    }
                    if (state.studentDetail.timetable.hrUnixTimestampToClass) {
                        lodash.setWith(state.studentDetail.timetable.hrUnixTimestampToClass, hour_unix_timestamp, event);
                    }
                }
            })
            .addCase(StudentThunkAction.detachFromGroup.fulfilled, (state, action) => {
                const hourTimeStamp = action.payload.hour_unix_timestamp;
                if (state.studentDetail?.timetable.hrUnixTimestampToClass?.[String(hourTimeStamp)]) {
                    state.studentDetail.timetable.hrUnixTimestampToClass[String(hourTimeStamp)].class_group_id = null;
                }
            })
            .addCase(StudentThunkAction.updateClass.fulfilled, (state, action) => {
                const { hour_unix_timestamp: hourTimeStamp, min, class_status, reason_for_absence, remark } = action.payload;
                if (state.studentDetail?.timetable.hrUnixTimestampToClass?.[String(hourTimeStamp)]) {
                    state.studentDetail.timetable.hrUnixTimestampToClass[String(hourTimeStamp)].min = min;
                    state.studentDetail.timetable.hrUnixTimestampToClass[String(hourTimeStamp)].class_status = class_status;
                    state.studentDetail.timetable.hrUnixTimestampToClass[String(hourTimeStamp)].remark = remark;
                    state.studentDetail.timetable.hrUnixTimestampToClass[String(hourTimeStamp)].reason_for_absence = reason_for_absence;
                }
            })
            .addCase(StudentThunkAction.getStudentPackages.fulfilled, (state, action) => {
                const packages = action.payload.packages;
                const { idToObject, ids } = normalizeUtil.normalize({ idAttribute: "id", targetArr: packages });
                state.studentDetail.packages.ids = ids.sort((id1, id2) => idToObject[id1].start_date - idToObject[id2].start_date);
                state.studentDetail.packages.idToPackage = idToObject;
            });
    },
});

export class StudentThunkAction {
    public static getStudents = createAsyncThunk("studentSlice/getStudents", async (_: undefined, api) => {
        const res = await apiClient.get<CustomResponse<Student[]>>(apiRoutes.GET_STUDENTS);
        return processRes(res, api);
    });
    public static createStudent = createAsyncThunk("studentSlice/createStudent", async (props: Student, api) => {
        const res = await apiClient.post<CustomResponse<undefined>>(apiRoutes.POST_CREATE_STUDNET, props);
        return processRes(res, api);
    });
    public static getStudentClasses = createAsyncThunk("studentSlice/getStudentClasses", async (props: { studentId: string }, api) => {
        const { studentId } = props;
        const res = await apiClient.get<CustomResponse<{ classes: Augmented_Class[] }>>(apiRoutes.GET_STUDENT_CLASSES(studentId));
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
            const existingRecord = (api.getState() as RootState).student.studentDetail.timetable.hrUnixTimestampToClass?.[toHourTimestamp];
            const currStudentId = (api.getState() as RootState).student.studentDetail.detail?.id || "";
            if (existingRecord) {
                return { type: "skipped" };
            }
            const event = lodash.cloneDeep((api.getState() as RootState).student?.studentDetail.timetable.hrUnixTimestampToClass?.[fromTimestamp])!;
            event.day_unix_timestamp = Number(toDayTimestamp);
            event.hour_unix_timestamp = Number(toHourTimestamp);

            api.dispatch({ type: "student/unsetStudentEvent", payload: { hrTimestamp: fromTimestamp } });

            const eventId = event.id;
            const requestBody: MoveClassRequest = {
                class_id: eventId,
                toDayTimestamp: parseInt(toDayTimestamp),
                toHourTimestamp: parseInt(toHourTimestamp),
            };
            apiClient
                .put<
                    CustomResponse<{
                        eventDetatil: {
                            student_id: string;
                            class_id: number;
                            day_unix_timestamp: number;
                            hour_unix_timestamp: number;
                        };
                    }>
                >(apiRoutes.PUT_MOVE_STUDNET_EVENT, requestBody)
                .then((result) => {
                    if (!result.data.success) {
                        api.dispatch(StudentThunkAction.getStudentClasses({ studentId: currStudentId }));
                    }
                });
            return { type: "proceed", fromTimestamp, result: { event } };
        }
    );
    public static updateStudent = createAsyncThunk("studentSlice/updateStudent", async (props: Student, api) => {
        const res = await apiClient.put<CustomResponse<{ student: Student }>>(apiRoutes.PUT_UPDATE_STUDENT, props);
        return processRes(res, api);
    });
    public static getStudentDetail = createAsyncThunk("studentSlice/getStudentDetail", async (props: { studentId: string }, api) => {
        const { studentId } = props;
        const res = await apiClient.get<CustomResponse<StudentDetail>>(apiRoutes.GET_STUDENT_DETAIL(studentId));
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
    public static deletePackage = createAsyncThunk("studentSlice/deletePackage", async (props: { packageId: number }, api) => {
        const { packageId } = props;
        const res = await apiClient.delete<CustomResponse<undefined>>(apiRoutes.DELETE_PACKAGE(packageId));
        return processRes(res, api);
    });
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
            dispatch(StudentThunkAction.getStudentClasses({ studentId }));
        },
    },
]);

export default studentSlice;
