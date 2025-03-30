/* eslint-disable */
import {
    // @ts-expect-error - don't want to deal with redux types which are too complex
    UnknownAction,
    ListenerEffect,
    ListenerMiddlewareInstance,
    ThunkDispatch,
    isAnyOf,
} from '@reduxjs/toolkit';
import 'react-toastify/dist/ReactToastify.css';
import toastUtil from './toastUtil';

type Effect = ListenerEffect<any, unknown, ThunkDispatch<unknown, unknown, UnknownAction>, unknown>;

/**
 * actionMessageList consists of objects either of the form { action, content } or  of the form { rejections } / { rejections, content }. When content is absent, the error message is supposed to be returned by thunkAPI.rejectWithValue
 * in createAsyncThunk function.
 */

export default (
    middleware: ListenerMiddlewareInstance<unknown, ThunkDispatch<unknown, unknown, UnknownAction>, unknown>,
    actionMessageList: {
        action?: any;
        rejections?: any[];
        content?: string;
        effect?: Effect;
    }[]
) => {
    for (const actionMessage of actionMessageList) {
        const { action, rejections, effect } = actionMessage;

        if (action) {
            if (effect) {
                middleware.startListening({ actionCreator: action, effect });
            }
        } else if (rejections) {
            middleware.startListening({
                // @ts-expect-error - don't want to deal with complex redux types
                matcher: isAnyOf(...rejections),
                effect: async (action, { dispatch: _ }) => {
                    console.log('actionactionactionaction', action);
                    const msg = action?.payload as string;
                    let errMsg = 'Failed';
                    if (msg) {
                        errMsg = msg;
                        toastUtil.error(errMsg);
                    }
                },
            });
        }
    }
};
