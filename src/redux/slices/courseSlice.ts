import { createAsyncThunk, createListenerMiddleware, createSlice } from "@reduxjs/toolkit";
import registerDialogAndActions from '../../utils/registerEffects';
import apiClient from "../../axios/apiClient";
import { CustomResponse } from "../../axios/responseTypes";
import apiRoutes from "../../axios/apiRoutes";
import { processRes } from "../../utils/processRes";
import { Course, CreateCourseRequest, Class } from "../../dto/dto";
import normalizeUtil from "../../utils/normalizeUtil";
import { loadingActions } from "../../utils/loadingActions";

export type ClassSliceState = {
    courses: {
        ids?: number[],
        idToObject?: { [id: number]: Course }
    }
    classTimetable: Class[]
}

const initialState: ClassSliceState = {
    courses: {},
    classTimetable: []
}

const classSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        reset: () => {
            return initialState;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(CourseThunkAction.getCourses.fulfilled, (state, action) => {
                const classes = action.payload;
                const { idToObject, ids } = normalizeUtil.normalize({
                    idAttribute: "id",
                    targetArr: classes
                });
                state.courses.ids = ids.map(id => Number(id));
                state.courses.idToObject = idToObject
            })
            .addCase(CourseThunkAction.updateCourse.fulfilled, (state, action) => {
                const id = action.payload.course.id;
                if (state.courses.idToObject?.[id]) {
                    state.courses.idToObject[id] = action.payload.course;
                }
            })
    }
})

export class CourseThunkAction {
    public static getCourses = createAsyncThunk(
        "courseSlice/getClasses",
        async (_: undefined, api) => {
            const res = await apiClient.get<CustomResponse<Course[]>>(apiRoutes.GET_COURSES);
            return processRes(res, api);
        }
    )
    public static createCourse = createAsyncThunk(
        "courseSlice/createClass",
        async (props: CreateCourseRequest, api) => {
            const res = await apiClient.post<CustomResponse<undefined>>(apiRoutes.POST_CREATE_COURSE, props);
            return processRes(res, api);
        }
    )
    public static updateCourse = createAsyncThunk(
        "courseSlice/updateCourse",
        async (props: Course, api) => {
            const res = await apiClient.put<CustomResponse<{ course: Course }>>(apiRoutes.PUT_UPDATE_COURSE, props);
            return processRes(res, api);
        }
    )
}

export const classMiddleware = createListenerMiddleware();
registerDialogAndActions(classMiddleware,
    [
        ...loadingActions(CourseThunkAction.createCourse),
        ...loadingActions(CourseThunkAction.getCourses),
        ...loadingActions(CourseThunkAction.updateCourse),
        {
            rejections: [
                CourseThunkAction.createCourse.rejected,
                CourseThunkAction.updateCourse.rejected,
                CourseThunkAction.getCourses.rejected,
            ]
        }
    ]
)



export default classSlice;