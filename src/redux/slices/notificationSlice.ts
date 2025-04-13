import { createAsyncThunk, createListenerMiddleware, createSlice } from '@reduxjs/toolkit';
import registerDialogAndActions from '../../utils/registerEffects';
import { processRes } from '../../utils/processRes';
import apiClient from '../../axios/apiClient';
import { CustomResponse } from '../../axios/responseTypes';
import apiRoutes from '../../axios/apiRoutes';
import { loadingActions } from '../../utils/loadingActions';
import { NotificationDTO, NotificationResponse } from '@/dto/kotlinDto';

export type NotificationSliceState = {
    notificationResponses: NotificationResponse[];
};

const initialState: NotificationSliceState = {
    notificationResponses: [],
};

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        reset: () => {
            return initialState;
        },
    },
    extraReducers: builder => {
        builder.addCase(NotificationThunkAction.getNotifications.fulfilled, (state, action) => {
            state.notificationResponses = action.payload;
        });
        builder.addCase(NotificationThunkAction.updateReadOrUnread.fulfilled, (state, action) => {
            const notificationDTO = action.payload;
            const notificationResponse = state.notificationResponses.find(
                n => n.notification.id === notificationDTO.id
            );
            if (notificationResponse && notificationResponse?.notification) {
                notificationResponse.notification = notificationDTO;
            }
        });
    },
});

export class NotificationThunkAction {
    public static getNotifications = createAsyncThunk('notificationSlice/getNotifications', async (_undefined, api) => {
        const res = await apiClient.get<CustomResponse<NotificationResponse[]>>(apiRoutes.GET_NOTIFICATIONS);
        return processRes(res, api);
    });
    public static updateReadOrUnread = createAsyncThunk(
        'notificationSlice/updateReadOrUnread',
        async (notificationId: number, api) => {
            const res = await apiClient.patch<CustomResponse<NotificationDTO>>(
                apiRoutes.PATCH_UPDATE_NOTIFICATION(notificationId)
            );
            return processRes(res, api);
        }
    );
}

export const notificationMiddleware = createListenerMiddleware();
registerDialogAndActions(notificationMiddleware, [
    ...loadingActions(NotificationThunkAction.getNotifications),
    {
        rejections: [NotificationThunkAction.getNotifications.rejected],
    },
]);

export default notificationSlice;
