import { configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
import persistStore from 'redux-persist/es/persistStore';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import appSlice from './slices/appSlice';
import authSlice from './slices/authSlice';
import studentSlice from './slices/studentSlice';
import { studentApi } from '../!rtk-query/api/studentApi';
import classSlice from './slices/courseSlice';
import competitionSlice, { competitionMiddleware } from './slices/competitionSlice';
import { userApi } from '../!rtk-query/api/userApi';
import { notificationApi } from '@/!rtk-query/api/notificationApi';
import { massDailyTimetableApi } from '@/!rtk-query/api/massDailyTimetableApi';
import { studentDetailWeeklyTimetablApi } from '@/!rtk-query/api/studentDetailWeeklyTimetablApi';
import { customHolidayApi } from '@/!rtk-query/api/customHolidayApi';
import { courseApi } from '@/!rtk-query/api/courseApi';
import { ticketApi } from '@/!rtk-query/api/ticketApi';

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

// example for multiple persisted slices
// const persisedReducers = [conversationSlice, authSlice, persisSlice];
// const rootRudcer = combineReducers({
//     auth: authSlice.reducer,
//     team: teamSlice.reducer,
//     persist: persisSlice.reducer,
// });
// const persistedRootReducer = persistReducer<ReturnType<typeof rootRudcer>>(
//     {
//         key: 'root',
//         storage: reduxStorage,
//         whitelist: [...persisedReducers?.map(reducer => reducer.name), userSettingApi.reducerPath],
//     },
//     rootRudcer
// );

export const store = configureStore({
    reducer: {
        auth: persistReducer<ReturnType<typeof authSlice.reducer>>(authPersistConfig, authSlice.reducer),
        app: appSlice.reducer,
        student: studentSlice.reducer,
        userApi: userApi.reducer,
        studentApi: studentApi.reducer,
        courseApi: courseApi.reducer,
        class: classSlice.reducer,
        competition: competitionSlice.reducer,
        notificationApi: notificationApi.reducer,
        massDailyTimetableApi: massDailyTimetableApi.reducer,
        studentDetailWeeklyTimetablApi: studentDetailWeeklyTimetablApi.reducer,
        customHolidayApi: customHolidayApi.reducer,
        ticketApi: ticketApi.reducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({ serializableCheck: false }).concat([
            competitionMiddleware.middleware,
            studentApi.middleware,
            courseApi.middleware,
            userApi.middleware,
            notificationApi.middleware,
            massDailyTimetableApi.middleware,
            studentDetailWeeklyTimetablApi.middleware,
            customHolidayApi.middleware,
            ticketApi.middleware,
        ]),
});

export const persistor = persistStore(store);

// Infer the type of makeStore
export type AppStore = typeof store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = (typeof store)['dispatch'];
