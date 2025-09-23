import apiRoutes from '@/axios/apiRoutes';
import baseQuery from '@/axios/baseQuery';
import { EventDTO } from '@/dto/dto';
import { createApi } from '@reduxjs/toolkit/query/react';

export const eventApi = createApi({
    reducerPath: 'eventApi',
    baseQuery: baseQuery,
    tagTypes: ['Event'],
    endpoints: builder => ({
        getEvents: builder.query<{ events: EventDTO[]; total: number }, { page: number; limit: number }>({
            query: ({ page, limit }) => apiRoutes.GET_EVENTS(page, limit),
            providesTags: (_, __, { limit, page }) => [{ type: 'Event', id: `${page}-${limit}` }],
            keepUnusedDataFor: 5,
        }),
    }),
});
