// turn the following thunk actions into api

import apiRoutes from '@/axios/apiRoutes';
import baseQuery from '@/axios/baseQuery';
import { CreateTicketRequest, UpdateTicketRequest } from '@/dto/dto';
import { TicketDTO } from '@/dto/kotlinDto';
import { createApi } from '@reduxjs/toolkit/query/react';

export const ticketApi = createApi({
    reducerPath: 'ticketApi',
    baseQuery: baseQuery,
    tagTypes: ['Ticket'],
    endpoints: builder => ({
        createTicket: builder.mutation<undefined, CreateTicketRequest>({
            query: props => ({
                url: apiRoutes.POST_CREATE_TICKET,
                method: 'POST',
                body: props,
            }),
            invalidatesTags: ['Ticket'],
        }),
        getTickets: builder.query<TicketDTO[], void>({
            query: () => ({
                url: apiRoutes.GET_TICKETS,
                method: 'GET',
            }),

            providesTags: ['Ticket'],
        }),
        updateTicket: builder.mutation<undefined, UpdateTicketRequest>({
            query: props => ({
                url: apiRoutes.PUT_TICKETS,
                method: 'PUT',
                body: props,
            }),
            invalidatesTags: ['Ticket'],
        }),
        deleteTicket: builder.mutation<undefined, { ticketId: number }>({
            query: ({ ticketId }) => ({
                url: apiRoutes.DELETE_TICKET(ticketId),
                method: 'DELETE',
            }),
            invalidatesTags: ['Ticket'],
        }),
    }),
});
