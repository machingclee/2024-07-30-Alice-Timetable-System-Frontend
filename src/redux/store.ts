import { configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
import persistStore from 'redux-persist/es/persistStore';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import appSlice from './slices/appSlice';
import authSlice, { authMiddleware } from './slices/authSlice';
import studentSlice from './slices/studentSlice';
import { studentApi } from '../!!rtk-query/api/studentApi';
import { coursesApi } from './slices/courseSlice';
import classSlice from './slices/courseSlice';
import competitionSlice, { competitionMiddleware } from './slices/competitionSlice';
import ticketSlice, { ticketMiddleware } from './slices/ticketSlice';
import { userApi } from '../!!rtk-query/api/userApi';
import { notificationApi } from '@/!!rtk-query/api/notificationApi';
import { massDailyTimetableApi } from '@/!!rtk-query/api/massDailyTimetableApi';
import { studentDetailWeeklyTimetablApi } from '@/!!rtk-query/api/studentDetailWeeklyTimetablApi';
import { customHolidayApi } from '@/!!rtk-query/api/customHolidayApi';

// a fix following the guide from https://www.youtube.com/watch?v=fjPIJZ1Eokg
const createNoopStorage = () => {
    return {
        getItem(_key: string) {
            return Promise.resolve(null);
        },
        setItem(_key: string, value: any) {
            return Promise.resolve(value);
        },
        removeItem(_key: string) {
            return Promise.resolve();
        },
    };
};

const storage = typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage();

export type ReduxToolkitStore = typeof store;

const authPersistConfig = {
    key: 'auth',
    timeout: 100,
    storage: storage,
    stateReconciler: autoMergeLevel2,
};

export const store = configureStore({
    reducer: {
        auth: persistReducer<ReturnType<typeof authSlice.reducer>>(authPersistConfig, authSlice.reducer),
        app: appSlice.reducer,
        student: studentSlice.reducer,
        userApi: userApi.reducer,
        studentApi: studentApi.reducer,
        courseApi: coursesApi.reducer,
        class: classSlice.reducer,
        competition: competitionSlice.reducer,
        ticket: ticketSlice.reducer,
        notificationApi: notificationApi.reducer,
        massDailyTimetableApi: massDailyTimetableApi.reducer,
        studentDetailWeeklyTimetablApi: studentDetailWeeklyTimetablApi.reducer,
        customHolidayApi: customHolidayApi.reducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({ serializableCheck: false }).concat([
            authMiddleware.middleware,
            competitionMiddleware.middleware,
            ticketMiddleware.middleware,
            studentApi.middleware,
            coursesApi.middleware,
            userApi.middleware,
            notificationApi.middleware,
            massDailyTimetableApi.middleware,
            studentDetailWeeklyTimetablApi.middleware,
            customHolidayApi.middleware,
        ]),
});

export const persistor = persistStore(store);

// Infer the type of makeStore
export type AppStore = typeof store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = (typeof store)['dispatch'];
