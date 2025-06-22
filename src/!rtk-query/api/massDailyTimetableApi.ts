import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from '@/axios/baseQuery';
import apiRoutes from '@/axios/apiRoutes';
import { ClassRoom } from '@/dto/kotlinDto';

export type DayTimestampToNumOfClassesQueryResult = {
    [timestamp: string]: number;
};

export const massDailyTimetableApi = createApi({
    reducerPath: 'massDailyTimetableApi',
    baseQuery: baseQuery,
    tagTypes: [''],
    endpoints: builder => ({
        getTimestampToNumOfClassesQuery: builder.query<DayTimestampToNumOfClassesQueryResult, { classRoom: ClassRoom }>(
            {
                keepUnusedDataFor: 0,
                query: ({ classRoom }) => apiRoutes.GET_CLASS_TIMESTAMPS(classRoom),
            }
        ),
    }),
});
