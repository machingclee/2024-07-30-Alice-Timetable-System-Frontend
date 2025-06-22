import { createSlice } from '@reduxjs/toolkit';
import apiRoutes from '../../axios/apiRoutes';
import { CourseDTO, CreateCourseRequest } from '../../dto/dto';
import normalizeUtil from '../../utils/normalizeUtil';
import baseQuery from '@/axios/baseQuery';
import { createApi } from '@reduxjs/toolkit/query/react';

export type ClassSliceState = Record<string, never>;

const initialState: ClassSliceState = {};

const classSlice = createSlice({
    name: 'courses',
    initialState,
    reducers: {
        reset: () => {
            return initialState;
        },
    },
});

export const coursesApi = createApi({
    reducerPath: 'courseApi',
    baseQuery: baseQuery,
    tagTypes: ['Courses'],
    endpoints: builder => ({
        getCourses: builder.query<{ idToCourse: { [id: number]: CourseDTO }; ids: number[] }, void>({
            query: () => apiRoutes.GET_COURSES,
            transformResponse: (courses: CourseDTO[]) => {
                const { idToObject, ids } = normalizeUtil.normalize<CourseDTO, number>({
                    idAttribute: 'id',
                    targetArr: courses,
                });
                return { idToCourse: idToObject, ids };
            },
            providesTags: ['Courses'],
            keepUnusedDataFor: 60, // 60s
        }),
        createCourse: builder.mutation<CourseDTO, { course: CreateCourseRequest }>({
            query: ({ course }) => ({
                url: apiRoutes.POST_CREATE_COURSE,
                method: 'POST',
                body: course,
            }),
        }),
        updateCourse: builder.mutation<CourseDTO, { course: CourseDTO }>({
            query: ({ course: req }) => ({
                url: apiRoutes.PATCH_UPDATE_COURSE,
                method: 'PATCH',
                body: req,
            }),
            onQueryStarted: async ({ course: req }, { dispatch, queryFulfilled }) => {
                try {
                    await queryFulfilled;
                    dispatch(
                        coursesApi.util.updateQueryData('getCourses', undefined, draft => {
                            if (draft?.idToCourse?.[req.id]) {
                                draft.idToCourse[req.id] = req;
                            }
                        })
                    );
                } catch (error) {
                    console.error(error);
                }
            },
        }),
    }),
});

export default classSlice;
