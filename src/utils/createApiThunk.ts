import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';

type API = Parameters<Parameters<typeof createAsyncThunk>[1]>[1];

export const createApiThunk = <T, R>(prefix: string, callback: (input: T, api: API) => Promise<R>) => {
    return createAsyncThunk(prefix, async (input_: T, api) => {
        try {
            const res = (await callback(input_, api)) as R;
            return res;
        } catch (err) {
            if (isAxiosError(err) && err.response) {
                const errorMessage = err?.response?.data?.errorMessage || '';
                return api.rejectWithValue(errorMessage);
            } else {
                return api.rejectWithValue('');
            }
        }
    });
};
