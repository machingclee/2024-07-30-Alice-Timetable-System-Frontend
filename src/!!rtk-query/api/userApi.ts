import apiRoutes from '../../axios/apiRoutes';
import { CreateUserRequest, UserDTO } from '../../dto/dto';
import normalizeUtil from '../../utils/normalizeUtil';
import { createApi } from '@reduxjs/toolkit/dist/query/react';
import baseQuery from '@/axios/baseQuery';

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: baseQuery,
    tagTypes: ['Users'],
    endpoints: builder => ({
        getUsers: builder.query<
            {
                userEmails: string[];
                userToUser: { [key: string]: UserDTO };
            },
            void
        >({
            query: () => apiRoutes.GET_USERS,
            transformResponse: (users: UserDTO[], _api, _arg) => {
                const { idToObject: emailToUser = {}, ids: emails = [] } = normalizeUtil.normalize({
                    idAttribute: 'companyEmail',
                    targetArr: users,
                });
                return { userEmails: emails, userToUser: emailToUser };
            },
            providesTags: ['Users'],
        }),
        updateUser: builder.mutation<UserDTO, UserDTO>({
            query: user => ({
                url: apiRoutes.PUT_UPDATE_USER,
                method: 'PUT',
                body: user,
            }),
            invalidatesTags: ['Users'],
        }),
        createUser: builder.mutation<{ user: UserDTO }, CreateUserRequest>({
            query: user => ({
                url: apiRoutes.POST_CREATE_USER,
                method: 'POST',
                body: user,
            }),
            invalidatesTags: ['Users'],
        }),
    }),
});
