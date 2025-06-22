import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from '@/axios/baseQuery';

export const studentDetailWeeklyTimetablApi = createApi({
    reducerPath: 'studentDetailWeeklyTimetablApi',
    baseQuery: baseQuery,
    tagTypes: [''],
    endpoints: _builder => ({}),
});
