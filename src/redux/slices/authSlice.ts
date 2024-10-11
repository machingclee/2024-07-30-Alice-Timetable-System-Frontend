import { PayloadAction, createAsyncThunk, createListenerMiddleware, createSlice } from "@reduxjs/toolkit";
import registerDialogAndActions from '../../utils/registerEffects';
import { processRes } from "../../utils/processRes";
import apiClient from "../../axios/apiClient";
import { CustomResponse } from "../../axios/responseTypes";
import apiRoutes from "../../axios/apiRoutes";
import { loadingActions } from "../../utils/loadingActions";
import { TokenPayload } from "../../dto/dto";

export type AuthSliceState = {
    accessToken: string,
    refreshToken: string,
    user: TokenPayload,
}

const initialState: AuthSliceState = {
    accessToken: "",
    refreshToken: "",
    user: {
        avatar_file_url: "",
        company_email: "",
        created_at: 0,
        first_name: "",
        is_blocked: false,
        last_name: "",
        mobile_number: "",
        role_in_company: "",
        role_in_system: "STUDENT"
    },
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setClientAccessToken: (state, action: PayloadAction<string>) => {
            state.accessToken = action.payload;
        },
        reset: (state) => {
            const company_email = state.user?.company_email;
            return {
                ...initialState,
                user: {
                    ...initialState.user,
                    company_email
                }
            };
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(AuthThunkAction.userLogin.fulfilled, (state, action) => {
                const { accessToken, refreshToken, user } = action.payload;
                state.accessToken = accessToken;
                state.refreshToken = refreshToken;
                state.user = user;
            })
    }
})

export class AuthThunkAction {
    public static userLogin = createAsyncThunk(
        "authSlice/user-login",
        async (props: { email: string, password: string }, api) => {
            const res = await apiClient.post<CustomResponse<{
                accessToken: string,
                refreshToken: string,
                user: TokenPayload
            }>>(apiRoutes.POST_LOGIN, props);
            return processRes(res, api);
        }
    )
}



export const authMiddleware = createListenerMiddleware();
registerDialogAndActions(authMiddleware,
    [

        ...loadingActions(AuthThunkAction.userLogin),
        {
            rejections: [
                AuthThunkAction.userLogin.rejected,
            ]
        }
    ]
)


export default authSlice;