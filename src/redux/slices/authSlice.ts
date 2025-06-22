import { PayloadAction, createListenerMiddleware, createSlice } from '@reduxjs/toolkit';
import registerDialogAndActions from '../../utils/registerEffects';
import { processRes } from '../../utils/processRes';
import { loginApiClient } from '../../axios/apiClient';
import { CustomResponse } from '../../axios/responseTypes';
import apiRoutes from '../../axios/apiRoutes';
import { loadingActions } from '../../utils/loadingActions';
import { TokenPayload, UserDTO } from '../../dto/dto';
import { createApiThunk } from '@/utils/createApiThunk';

export type AuthSliceState = {
    accessToken: string;
    refreshToken: string;
    user: TokenPayload;
};

const initialState: AuthSliceState = {
    accessToken: '',
    refreshToken: '',
    user: {
        avatar_file_url: '',
        company_email: '',
        created_at: 0,
        first_name: '',
        is_blocked: false,
        last_name: '',
        mobile_number: '',
        role_in_company: '',
        role_in_system: 'STUDENT',
    },
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setClientAccessToken: (state, action: PayloadAction<string>) => {
            state.accessToken = action.payload;
        },
        updateAuthData: (state, action: PayloadAction<UserDTO>) => {
            const updatedUser = action.payload;
            if (updatedUser.companyEmail !== state.user.company_email) {
                return;
            }
            state.user.avatar_file_url = updatedUser.avatarFileUrl;
            state.user.company_email = updatedUser.companyEmail;
            state.user.created_at = updatedUser.createdAt || 0;
            state.user.first_name = updatedUser.firstName;
            state.user.is_blocked = updatedUser.isBlocked;
            state.user.last_name = updatedUser.lastName;
            state.user.mobile_number = updatedUser.mobileNumber;
            state.user.role_in_company = updatedUser.roleInCompany;
            state.user.role_in_system = updatedUser.roleInSystem;
        },
        reset: state => {
            const company_email = state.user?.company_email;
            return {
                ...initialState,
                user: {
                    ...initialState.user,
                    company_email,
                },
            };
        },
    },
    extraReducers: builder => {
        builder.addCase(AuthThunkAction.userLogin.fulfilled, (state, action) => {
            const { accessToken, refreshToken, user } = action.payload;
            state.accessToken = accessToken;
            state.refreshToken = refreshToken;
            state.user = user;
        });
    },
});

export class AuthThunkAction {
    public static userLogin = createApiThunk(
        'authSlice/user-login',
        async (props: { email: string; password: string }, api) => {
            const res = await loginApiClient.post<
                CustomResponse<{
                    accessToken: string;
                    refreshToken: string;
                    user: TokenPayload;
                }>
            >(apiRoutes.POST_LOGIN, props);
            return processRes(res, api);
        }
    );
}

export const authMiddleware = createListenerMiddleware();
registerDialogAndActions(authMiddleware, [
    ...loadingActions(AuthThunkAction.userLogin),
    {
        rejections: [AuthThunkAction.userLogin.rejected],
    },
]);

export default authSlice;
