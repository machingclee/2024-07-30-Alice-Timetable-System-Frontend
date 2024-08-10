import appSlice from "../redux/slices/appSlice";

type Action = {
    meta: { arg: { showLoading?: boolean } }
}

export const loadingActions = (thunkAction: any) => {
    return [
        {
            action: thunkAction.pending,
            effect: (action: any, api: any) => {
                const showLoading = (action as Action).meta?.arg?.showLoading;
                if (showLoading != null && !showLoading) {

                    return;
                }
                api.dispatch(appSlice.actions.setLoading(true));
            }
        },
        {
            action: thunkAction.fulfilled,
            effect: (_: any, api: any) => {
                api.dispatch(appSlice.actions.setLoading(false));
            }
        },
        {
            action: thunkAction.rejected,
            effect: (_: any, api: any) => {
                api.dispatch(appSlice.actions.setLoading(false));
            }
        }
    ]
}