import { BaseQueryFn } from '@reduxjs/toolkit/query';
import { AxiosError, AxiosRequestConfig } from 'axios';
import apiClient from './apiClient';
import { CustomResponse } from './responseTypes';

const baseQuery: BaseQueryFn<
    | {
          url: string;
          method?: AxiosRequestConfig['method'];
          // for post, put, patch, it's called body in fetchBaseQuery but it's called data in axios, so we need to transform it
          body?: AxiosRequestConfig['data'];
          params?: AxiosRequestConfig['params'];
          headers?: AxiosRequestConfig['headers'];
      }
    | string,
    unknown,
    {
        status?: number | string;
        message: string;
    }
> = async args => {
    let config: AxiosRequestConfig = {};
    if (typeof args === 'string') {
        config = { url: args, method: 'get' };
    } else {
        config = {
            url: args.url,
            method: args.method,
            data: args.body,
            params: args.params,
            headers: args.headers,
        };
    }
    try {
        const result = (await apiClient(config)).data as CustomResponse<unknown>;
        if (result.success) {
            return { data: result.result };
        } else {
            return {
                error: {
                    status: 'server-error',
                    message: result.errorMessage || 'Server error',
                },
            };
        }
    } catch (err: unknown) {
        if (err instanceof AxiosError) {
            return {
                error: {
                    status: err.response?.status,
                    message: err.message,
                },
            };
        } else {
            return {
                error: {
                    status: 'unknown',
                    message: (err as Error).message || 'Unknown error',
                },
            };
        }
    }
};

export default baseQuery;
