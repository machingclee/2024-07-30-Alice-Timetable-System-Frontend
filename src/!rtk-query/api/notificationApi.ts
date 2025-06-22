import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from '@/axios/baseQuery';
import apiRoutes from '@/axios/apiRoutes';
import { NotificationDTO, NotificationResponse } from '@/dto/kotlinDto';

export const notificationApi = createApi({
    reducerPath: 'notificationApi',
    baseQuery: baseQuery,
    tagTypes: ['Notifications', 'NotificationCount'],
    endpoints: builder => ({
        getNotifications: builder.query<NotificationResponse[], void>({
            query: () => apiRoutes.GET_NOTIFICATIONS,
            transformResponse: (notifications: NotificationResponse[]) => {
                return notifications;
            },
            providesTags: ['Notifications'],
        }),
        getNotificationCount: builder.query<{ count: number }, void>({
            query: () => apiRoutes.GET_NOTIFICATIONS_COUNT,
            transformResponse: (res: number) => {
                return { count: res };
            },
            providesTags: ['NotificationCount'],
        }),
        updateReadOrUnread: builder.mutation<NotificationDTO, number>({
            query: notificationId => ({
                url: apiRoutes.PATCH_UPDATE_NOTIFICATION(notificationId),
                method: 'PATCH',
            }),
            transformResponse: (res: NotificationDTO) => {
                return res;
            },
            invalidatesTags: ['Notifications', 'NotificationCount'],
        }),
        activelyScheduleForDeadlineNotifications: builder.mutation<null, void>({
            query: () => {
                return {
                    url: apiRoutes.POST_CREATE_NOTIFICATION_FOR_DEADLINE_PACKAGES,
                    method: 'POST',
                };
            },
            transformResponse: (res: null) => {
                return res;
            },
            invalidatesTags: ['Notifications', 'NotificationCount'],
        }),
    }),
});
