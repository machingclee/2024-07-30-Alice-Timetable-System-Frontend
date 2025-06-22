import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterToGetClassesForDailyTimetable } from '../../dto/dto';
import { cloneDeep } from 'lodash';
import { Classroom } from '../../prismaTypes/types';
import { StudentDTO } from '../../dto/kotlinDto';
import { WeeklyClassEvent } from '../../!!rtk-query/api/studentApi';

export enum StudentDetailPage {
    STUDENT_TIME_TABLE = 'STUDENT_TIME_TABLE',
    STUDENT_PACKAGE_CLASS_STATUES = 'STUDENT_PACKAGE_CLASS_STATUES',
}

export type StudentSliceState = {
    students: {
        ids?: string[];
        idToStudent?: {
            [key: string]: StudentDTO;
        };
    };
    studentDetailTimetablePage: {
        activePage: StudentDetailPage;
        showAllClassesForOneStudent: boolean;
        selectedPackageId: string;
    };
    massTimetablePage: {
        classRoom: Classroom | null;
        numOfDaysToDisplay: number;
        selectedDate: Date;
        totalClassesInHighlight: {
            hrUnixTimestampOnClick: number | null;
            numberOfClassesInHighlight: number;
        };
        filter: FilterToGetClassesForDailyTimetable;
    };
};

const initialState: StudentSliceState = {
    students: {},
    studentDetailTimetablePage: {
        activePage: StudentDetailPage.STUDENT_TIME_TABLE,
        selectedPackageId: '',
        showAllClassesForOneStudent: true,
    },
    massTimetablePage: {
        numOfDaysToDisplay: 1,
        selectedDate: new Date(),
        classRoom: null,
        totalClassesInHighlight: {
            hrUnixTimestampOnClick: 0,
            numberOfClassesInHighlight: 0,
        },
        filter: {
            present: true,
            suspicious_absence: true,
            illegit_absence: true,
            legit_absence: true,
            makeup: true,
            changeOfClassroom: true,
            trial: true,
            reserved: true,
            courseIds: [],
        },
    },
};

const studentSlice = createSlice({
    name: 'students',
    initialState,
    reducers: {
        seMassTimetableNumOfDaysToDisplay: (state, action: PayloadAction<number>) => {
            state.massTimetablePage.numOfDaysToDisplay = action.payload;
        },
        setStudentDetailPage: (state, action: PayloadAction<StudentDetailPage>) => {
            state.studentDetailTimetablePage.activePage = action.payload;
        },
        setNumberOfClassesInHighlight: (state, action: PayloadAction<number>) => {
            state.massTimetablePage.totalClassesInHighlight.numberOfClassesInHighlight = action.payload;
        },
        setHrUnixTimestampOnClick: (state, action: PayloadAction<number | null>) => {
            state.massTimetablePage.totalClassesInHighlight.hrUnixTimestampOnClick = action.payload;
        },
        setMassTimetableFilter: (state, action: PayloadAction<FilterToGetClassesForDailyTimetable>) => {
            state.massTimetablePage.filter = cloneDeep(action.payload);
        },
        setFilterCourseIds: (state, action: PayloadAction<number[]>) => {
            state.massTimetablePage.filter = {
                ...state.massTimetablePage.filter,
                courseIds: action.payload,
            };
        },
        updateFilter: (state, action: PayloadAction<Partial<FilterToGetClassesForDailyTimetable>>) => {
            state.massTimetablePage.filter = { ...state.massTimetablePage.filter, ...action.payload };
        },
        dropFilterCourseId: (state, action: PayloadAction<number>) => {
            const targetId = action.payload;
            const currentCourseIds = state.massTimetablePage.filter.courseIds;
            const newCourseIds = currentCourseIds.filter(id => id !== targetId);
            state.massTimetablePage.filter = {
                ...state.massTimetablePage.filter,
                courseIds: newCourseIds,
            };
        },
        setClassroom: (state, action: PayloadAction<Classroom>) => {
            state.massTimetablePage.classRoom = action.payload;
        },
        setSelectedPackageAndActiveAnchorTimestamp: (
            state,
            // desiredAnchorTimestamp and desiredAnchorTimestamp are mutually exclusive
            action: PayloadAction<
                | {
                      type: 'go-to-target-lesson';
                      packageId: string;
                      desiredAnchorTimestamp: number;
                      setURLAnchorTimestamp: (time: number) => void;
                  }
                | {
                      type: 'go-to-first-lesson';
                      packageId: string;
                      setURLAnchorTimestamp: (time: number) => void;
                      weeklyClassEvent: WeeklyClassEvent;
                  }
            >
        ) => {
            const { packageId, setURLAnchorTimestamp, type } = action.payload;
            state.studentDetailTimetablePage.selectedPackageId = packageId;

            if (type === 'go-to-target-lesson') {
                setURLAnchorTimestamp(action.payload.desiredAnchorTimestamp);
                // document
                //     .querySelector(`#${documentId.STUDENT_PACKAGE_ID(packageId)}`)
                //     ?.scrollIntoView({ block: 'start' });
            } else if (type === 'go-to-first-lesson') {
                // select the first date so that UI can start from the first class:
                const weeklyClassEvent = action.payload.weeklyClassEvent;
                const classesOfSelectedPackage = weeklyClassEvent?.timestamps?.filter(timestamp => {
                    const cls = weeklyClassEvent?.hrUnixTimestampToLesson?.[timestamp];
                    return cls?.studentPackage.id === Number(packageId);
                });
                const availableFirstDate = classesOfSelectedPackage
                    ?.sort((a, b) => Number(a) - Number(b))
                    .slice(0, 1)?.[0];
                if (availableFirstDate) {
                    setURLAnchorTimestamp(Number(availableFirstDate));
                }
            }
        },
        setDailyTimetableSelectedDate: (state, action: PayloadAction<{ date: Date }>) => {
            state.massTimetablePage.selectedDate = action.payload.date;
        },
        updateStudent: (state, action: PayloadAction<{ student: StudentDTO }>) => {
            const { student } = action.payload;
            if (state.students.idToStudent && student.id) {
                state.students.idToStudent[student.id] = student;
            }
        },
        resetStudentDetail: state => {
            state.studentDetailTimetablePage = initialState.studentDetailTimetablePage;
        },
        resetMassTimetablerFilter: state => {
            state.massTimetablePage = initialState.massTimetablePage;
        },
        reset: () => {
            return initialState;
        },
        setShowAllClassesForOneStudent: (state, action) => {
            state.studentDetailTimetablePage.showAllClassesForOneStudent = action.payload;
        },
    },
});

export default studentSlice;
