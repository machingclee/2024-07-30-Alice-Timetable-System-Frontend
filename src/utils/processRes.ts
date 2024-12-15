/* eslint-disable */
import { AxiosResponse } from 'axios';
import { CustomResponse } from '../axios/responseTypes';

export const processRes = <T>(res: AxiosResponse<CustomResponse<T>, any>, api: any): T => {
    if (!res.data.success) {
        // api.rejectWithValue(JSON.stringify(res.data.errorMessage)) is to ensure that it's string
        return api.rejectWithValue(JSON.stringify(res.data.errorMessage));
    } else {
        return res.data.result;
    }
};
