import { createAsyncThunk, createListenerMiddleware, createSlice } from "@reduxjs/toolkit";
import registerDialogAndActions from '../../utils/registerEffects';
import { loadingActions } from "../../utils/loadingActions";
import apiClient from "../../axios/apiClient";
import { CustomResponse } from "../../axios/responseTypes";
import apiRoutes from "../../axios/apiRoutes";
import { processRes } from "../../utils/processRes";
import { CreateUserRequest, User } from "../../dto/dto";
import normalizeUtil from "../../utils/normalizeUtil";

export type UserSliceState = {
    users: {
        ids?: string[],
        idToObject?: {
            [key: string]: User
        }
    }
}

const initialState: UserSliceState = {
    users: {}
}

const userSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        reset: () => {
            return initialState;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(UserThunkAction.getUsers.fulfilled, (state, action) => {
                const users = action.payload;
                const { idToObject, ids } = normalizeUtil.normalize({ idAttribute: "id", targetArr: users });
                state.users.ids = ids;
                state.users.idToObject = idToObject;
            })
        builder
            .addCase(UserThunkAction.updateUser.fulfilled, (state, action) => {
                const user = action.payload.user;
                const id = user.id;
                if (state.users.idToObject?.[id]) {
                    state.users.idToObject[id] = user;
                }
            })
    }
})

export class UserThunkAction {
    public static createUser = createAsyncThunk(
        "userSlice/createUser",
        async (props: CreateUserRequest, api) => {
            const res = await apiClient.post<CustomResponse<undefined>>(apiRoutes.POST_CREATE_USER, props);
            return processRes(res, api);
        }
    )
    public static getUsers = createAsyncThunk(
        "userSlice/getUsers",
        async (_: undefined, api) => {
            const res = await apiClient.get<CustomResponse<User[]>>(apiRoutes.GET_USERS);
            return processRes(res, api);
        }
    )
    public static updateUser = createAsyncThunk(
        "userSlice/updateUser",
        async (props: User, api) => {
            const res = await apiClient.put<CustomResponse<{ user: User }>>(apiRoutes.PUT_UPDATE_USER, props);
            return processRes(res, api);
        }
    )
}

export const userMiddleware = createListenerMiddleware();
registerDialogAndActions(userMiddleware,
    [
        ...loadingActions(UserThunkAction.createUser),
        ...loadingActions(UserThunkAction.getUsers),
        ...loadingActions(UserThunkAction.updateUser),
        {
            rejections: [
                UserThunkAction.createUser.rejected,
                UserThunkAction.updateUser.rejected,
            ]
        }
    ]
)



export default userSlice;