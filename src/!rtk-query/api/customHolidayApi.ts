import apiRoutes from '@/axios/apiRoutes';
import baseQuery from '@/axios/baseQuery';
import { CustomHolidayDTO, UpdateHolidayDTO } from '@/dto/dto';
import { createApi } from '@reduxjs/toolkit/query/react';

export type CreateCustomHolidayRequest = {
    name: string;
    desc: string;
    date: number;
};

export const customHolidayApi = createApi({
    reducerPath: 'customHolidayApi',
    baseQuery: baseQuery,
    tagTypes: ['CustomHoliday'],
    endpoints: builder => ({
        getCustomHolidays: builder.query<CustomHolidayDTO[], void>({
            query: () => apiRoutes.GET_CUSTOM_HOLIDAYS,
            providesTags: ['CustomHoliday'],
        }),
        addCustomHoliday: builder.mutation<CustomHolidayDTO, CreateCustomHolidayRequest>({
            query: customHoliday => ({
                url: apiRoutes.POST_ADD_CUSTOM_HOLIDAY,
                method: 'POST',
                body: customHoliday,
            }),
            invalidatesTags: ['CustomHoliday'],
        }),
        deleteCustomHoliday: builder.mutation<CustomHolidayDTO, { holidayId: number }>({
            query: ({ holidayId }) => ({
                url: apiRoutes.DELETE_CUSTOM_HOLIDAY(holidayId),
                method: 'DELETE',
            }),
            invalidatesTags: ['CustomHoliday'],
        }),
        updateCustomHoliday: builder.mutation<CustomHolidayDTO, UpdateHolidayDTO>({
            query: ({ holidayId, date, desc, name }) => ({
                url: apiRoutes.PUT_UPDATE_CUSTOM_HOLIDAY(holidayId),
                method: 'PUT',
                body: { date, desc, name },
            }),
            invalidatesTags: ['CustomHoliday'],
        }),
    }),
});
