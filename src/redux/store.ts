import { configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';

import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
import persistStore from 'redux-persist/es/persistStore';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import appSlice from './slices/appSlice';
import authSlice, { authMiddleware } from './slices/authSlice';
import userSlice, { userMiddleware } from './slices/userSlice';
import studentSlice, { studentMiddleware } from './slices/studentSlice';
import classSlice, { classMiddleware } from './slices/courseSlice';
import publicSlice, { publicMiddleware } from './slices/publicSlice';
import competitionSlice, { competitionMiddleware } from './slices/competitionSlice';

// a fix following the guide from https://www.youtube.com/watch?v=fjPIJZ1Eokg
const createNoopStorage = () => {
    return {
        getItem(_key: string) {
            return Promise.resolve(null);
        },
        // eslint-disable-next-line
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
        class: classSlice.reducer,
        public: publicSlice.reducer,
        competition: competitionSlice.reducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({ serializableCheck: false }).concat(
            authMiddleware.middleware,
            userMiddleware.middleware,
            studentMiddleware.middleware,
            classMiddleware.middleware,
            publicMiddleware.middleware,
            competitionMiddleware.middleware
        ),
});

export const persistor = persistStore(store);

// Infer the type of makeStore
export type AppStore = typeof store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = (typeof store)['dispatch'];
