import { createSlice } from '@reduxjs/toolkit';

export type ClassSliceState = Record<string, never>;

const initialState: ClassSliceState = {};

const classSlice = createSlice({
    name: 'courses',
    initialState,
    reducers: {
        reset: () => {
            return initialState;
        },
    },
});

export default classSlice;
