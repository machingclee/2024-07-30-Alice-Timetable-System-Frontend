import { createListenerMiddleware, createSlice } from '@reduxjs/toolkit';
import { TicketDTO } from '../../dto/kotlinDto';
import { CreateTicketRequest, UpdateTicketRequest } from '../../dto/dto';
import apiRoutes from '../../axios/apiRoutes';
import { CustomResponse } from '../../axios/responseTypes';
import { processRes } from '../../utils/processRes';
import { createApiThunk } from '../../utils/createApiThunk';
import apiClient from '../../axios/apiClient';
import registerEffects from '../../utils/registerEffects';

export type TicketSliceState = {
    tickets: TicketDTO[];
};

const initialState: TicketSliceState = {
    tickets: [],
};

const ticketSlice = createSlice({
    name: 'tickets',
    initialState,
    reducers: {
        reset: () => {
            return initialState;
        },
    },
    extraReducers: builder => {
        builder.addCase(TicketThunkAction.getTickets.fulfilled, (state, action) => {
            state.tickets = action.payload;
        });
    },
});

export class TicketThunkAction {
    public static createTicket = createApiThunk('ticketSlice/createTicket', async (props: CreateTicketRequest, api) => {
        const res = await apiClient.post<CustomResponse<undefined>>(apiRoutes.POST_CREATE_TICKET, props);
        return processRes(res, api);
    });

    public static getTickets = createApiThunk('ticketSlice/getTicktes', async (_: undefined, api) => {
        const res = await apiClient.get<CustomResponse<TicketDTO[]>>(apiRoutes.GET_TICKETS);
        return processRes(res, api);
    });

    public static updateTicket = createApiThunk('ticketSlice/editTicket', async (props: UpdateTicketRequest, api) => {
        const res = await apiClient.put<CustomResponse<undefined[]>>(apiRoutes.PUT_TICKETS, props);
        return processRes(res, api);
    });

    public static deleteTicket = createApiThunk(
        'ticketSlice/deleteTicket',
        async (props: { ticketId: number }, api) => {
            const { ticketId } = props;
            const res = await apiClient.delete<CustomResponse<number>>(apiRoutes.DELETE_TICKET(ticketId));
            return processRes(res, api);
        }
    );
}

export default ticketSlice;

export const ticketMiddleware = createListenerMiddleware();

registerEffects(ticketMiddleware, [
    {
        rejections: [TicketThunkAction.createTicket.rejected, TicketThunkAction.getTickets.rejected],
    },
    {
        // action: StudentThunkAction.duplicateClases.fulfilled,
        // effect: (_, { dispatch, getState }) => {
        //     const studentId = (getState() as RootState).student.studentDetailTimetablePage.detail?.id || '';
        //     dispatch(
        //         StudentThunkAction.getStudentClassesForWeeklyTimetable({
        //             studentId,
        //         })
        //     );
        // },
    },
]);
