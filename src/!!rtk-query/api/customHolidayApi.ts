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
        // change the following GET_CUSTOM_HOLIDAYS and POST_ADD_CUSTOM_HOLIDAY api in the comment into query and mutation in rtk
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

// const updateHoliday = useMutation({
//     mutationKey: queryKeys.CUSTOM_HOLIDAYS,
//     onMutate: () => {
//         dispatch(appSlice.actions.setLoading(true));
//     },
//     onSettled: () => {
//         dispatch(appSlice.actions.setLoading(false));
//     },
//     mutationFn: async () => {
//         return await apiClient.put<CustomResponse<void>, UpodateHolidayDTO>(
//             apiRoutes.PUT_UPDATE_CUSTOM_HOLIDAY(holidayId),
//             {
//                 date: date.valueOf(),
//                 desc,
//                 name,
//             }
//         );
//     },
//     onSuccess: async () => {
//         queryClient.invalidateQueries({ queryKey: queryKeys.CUSTOM_HOLIDAYS });
//     },
// });

// const deleteHoliday = useMutation({
//     mutationKey: queryKeys.CUSTOM_HOLIDAYS,
//     mutationFn: async () => {
//         return await apiClient.delete<CustomResponse<void>>(apiRoutes.DELETE_CUSTOM_HOLIDAY(holidayId));
//     },
//     onMutate: () => {
//         dispatch(appSlice.actions.setLoading(true));
//     },
//     onSettled: () => {
//         dispatch(appSlice.actions.setLoading(false));
//     },
//     onSuccess: () => {
//         queryClient.invalidateQueries({ queryKey: queryKeys.CUSTOM_HOLIDAYS });
//     },
// });
