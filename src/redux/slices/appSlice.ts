import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type AppSliceState = {
    theme: 'default' | 'cool';
    loading: boolean;
    activePath: string | null;
    // Used to control when to open a dialog component
    timetableAction: TimetableAction;
    createClassPopperFromHourTimestampOnShow: string;
    leftNavigatorCollapsed: boolean;
};

type TimetableAction = 'Create Class' | 'Move Class' | 'Resize Class' | null;

const initialState: AppSliceState = {
    theme: 'default',
    loading: false,
    activePath: null,
    timetableAction: null,
    createClassPopperFromHourTimestampOnShow: '',
    leftNavigatorCollapsed: false,
};

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setTheme: (state, action: PayloadAction<AppSliceState['theme']>) => {
            state.theme = action.payload;
        },
        setleftNavigatorCollapsed: (state, action: PayloadAction<boolean>) => {
            state.leftNavigatorCollapsed = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setActivePath: (state, action: PayloadAction<string>) => {
            state.activePath = action.payload;
        },
        reset: () => {
            return initialState;
        },
        setTimetableAction: (state, action: PayloadAction<TimetableAction>) => {
            state.timetableAction = action.payload;
        },
        setCreateClassPopperFromTimestampOnShow: (state, action: PayloadAction<string>) => {
            state.createClassPopperFromHourTimestampOnShow = action.payload;
        },
    },
});

export default appSlice;
