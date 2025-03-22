import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import studentSlice, { StudentThunkAction } from '../../redux/slices/studentSlice';
import dayjs from 'dayjs';
import { Outlet } from 'react-router-dom';
import useQueryThunk from '../../queries/useQueryThunk';
import { CourseThunkAction } from '../../redux/slices/courseSlice';

const CausewaybayIndex = () => {
    const dispatch = useAppDispatch();
    const filter = useAppSelector(s => s.student.massTimetablePage.filter);
    const selectedDate = useAppSelector(s => s.student.massTimetablePage.selectedDate);

    useEffect(() => {
        dispatch(studentSlice.actions.setClassroom('CAUSEWAY_BAY'));
    }, [dispatch]);

    useQueryThunk({ thunk: CourseThunkAction.getCourses })();

    useQueryThunk({
        thunk: StudentThunkAction.getFilteredStudentClassesForDailyTimetable,
        staleTime: 5000,
    })({
        dateUnixTimestamp: dayjs(selectedDate).startOf('day').toDate().getTime(),
        classRoom: 'CAUSEWAY_BAY',
        filter: filter,
    });

    return <Outlet />;
};

export default CausewaybayIndex;
