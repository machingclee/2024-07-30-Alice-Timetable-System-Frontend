import axios, { AxiosInstance } from 'axios';
import type { ReduxToolkitStore, RootState } from '../redux/store';
import apiRoutes from './apiRoutes';
import { CustomResponse } from './responseTypes';
import getEnv from '../utils/getEnv';

const baseURL = getEnv().VITE_BACKEND_URL || '';
console.log('baseURLbaseURLbaseURL', baseURL);

const apiClient = axios.create({
    baseURL,
    responseEncoding: 'utf8',
    headers: {
        'Content-type': 'application/json',
    },
});

apiClient.defaults.withCredentials = true;

// const notificationSocketRef = { current: "" };
// inject store into interceptor at _layout.tsx

export const configApiClient = (apiClient: AxiosInstance, store: ReduxToolkitStore) => {
    apiClient.interceptors.request.use(req => {
        const token = store?.getState()?.auth?.accessToken || '';
        if (token) {
            req.headers['Authorization'] = 'Bearer ' + token;
            return req;
        } else {
            return Promise.reject('Request Cancelled');
        }
    });

    apiClient.interceptors.response.use(
        response => response,
        async error => {
            const originalConfig = error.config;
            if ((error?.response?.status === 403 || error?.response?.status === 401) && !originalConfig._retry) {
                const errorMessage = error?.response?.data?.errorMessage || '';
                if (errorMessage === 'JWT_EXPIRED') {
                    originalConfig._retry = true;
                    const refreshToken = (store?.getState() as RootState)?.auth.refreshToken;
                    const res = await apiClient.post<CustomResponse<{ accessToken: string }>>(
                        apiRoutes.POST_REFRESH_TOKEN,
                        { refreshToken }
                    );
                    const { success } = res.data;
                    if (!success) {
                        if (res.data.errorMessage === 'jwt expired') {
                            // this error message comes from .verify() method for refresh token,
                            // which means that user must be logged out since there is no way the user can get information
                            setTimeout(() => {
                                // msgUtil.persistedError("Session expired, please login again");
                                console.log('dispatch reset action');
                                store.dispatch({ type: 'auth/reset' });
                                setTimeout(() => {
                                    store.dispatch({
                                        type: 'app/closeLoading',
                                    });
                                }, 1);
                            }, 1000);
                        }
                    } else {
                        const { result } = res.data;
                        const newAccessToken = result.accessToken;
                        // avoid cycle dependecies.
                        const action = (token: string) => {
                            return {
                                type: 'auth/setClientAccessToken',
                                payload: token,
                            };
                        };
                        store.dispatch(action(newAccessToken));
                        return apiClient(originalConfig);
                    }
                }
            } else if (error?.response?.status === 404) {
                //404 page
            } else if (error?.response?.status === 500) {
                //do nothing
            } else {
                // snackbarUtils.info("Please try to login again");
            }
            return Promise.reject(error);
        }
    );
};

export default apiClient;
