import { configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';

import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
import persistStore from 'redux-persist/es/persistStore';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import appSlice from './slices/appSlice';
import authSlice, { authMiddleware } from './slices/authSlice';
import userSlice, { userMiddleware } from './slices/userSlice';
import studentSlice, { studentsApi } from './slices/studentSlice';
import classSlice, { coursesApi } from './slices/courseSlice';
import competitionSlice, { competitionMiddleware } from './slices/competitionSlice';
import ticketSlice, { ticketMiddleware } from './slices/ticketSlice';
import notificationSlice, { notificationMiddleware } from './slices/notificationSlice';

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
        user: userSlice.reducer,
        student: studentSlice.reducer,
        studentsApi: studentsApi.reducer,
        courseApi: coursesApi.reducer,
        class: classSlice.reducer,
        competition: competitionSlice.reducer,
        ticket: ticketSlice.reducer,
        notification: notificationSlice.reducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({ serializableCheck: false }).concat([
            authMiddleware.middleware,
            userMiddleware.middleware,
            competitionMiddleware.middleware,
            ticketMiddleware.middleware,
            notificationMiddleware.middleware,
            studentsApi.middleware,
            coursesApi.middleware,
        ]),
});

export const persistor = persistStore(store);

// Infer the type of makeStore
export type AppStore = typeof store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = (typeof store)['dispatch'];
