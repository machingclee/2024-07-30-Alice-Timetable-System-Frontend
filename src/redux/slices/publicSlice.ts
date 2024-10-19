import { createAsyncThunk, createListenerMiddleware, createSlice } from "@reduxjs/toolkit";
import apiClient from "../../axios/apiClient";
import { CustomResponse } from "../../axios/responseTypes";
import { TimetableClass } from "../../dto/dto";
import { processRes } from "../../utils/processRes";
import apiRoutes from "../../axios/apiRoutes";
import registerDialogAndActions from '../../utils/registerEffects';
import { loadingActions } from "../../utils/loadingActions";

export type PublicSliceState = {
    classes: TimetableClass[]
};

const initialState: PublicSliceState = {
    classes: []
};

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        reset: () => {
            return initialState;
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(PublicThunkAction.getClassesStatus.fulfilled, (state, action) => {
                state.classes = action.payload;
            })
    }
});


export class PublicThunkAction {
    public static getClassesStatus = createAsyncThunk(
        "publicSlice/getClassesStatus",
        async (props: { pkgUUID: string }, api) => {
            const { pkgUUID } = props;
            const res = await apiClient.get<CustomResponse<TimetableClass[]>>(apiRoutes.GET_PACKAGE_CLASS_STATUS(pkgUUID));
            return processRes(res, api);
        }
    )
}

export const publicMiddleware = createListenerMiddleware();
registerDialogAndActions(publicMiddleware,
    [
        ...loadingActions(PublicThunkAction.getClassesStatus),
        {
            rejections: [
                PublicThunkAction.getClassesStatus.rejected,
            ]
        }
    ]
)


export default appSlice;
