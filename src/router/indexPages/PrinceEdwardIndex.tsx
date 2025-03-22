import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import studentSlice, { StudentThunkAction } from '../../redux/slices/studentSlice';
import { Outlet } from 'react-router-dom';
import dayjs from 'dayjs';
import useQueryThunk from '../../queries/useQueryThunk';
import { CourseThunkAction } from '../../redux/slices/courseSlice';

const PrinceEdwardIndex = () => {
    const dispatch = useAppDispatch();
    const filter = useAppSelector(s => s.student.massTimetablePage.filter);
    const selectedDate = useAppSelector(s => s.student.massTimetablePage.selectedDate);

    useEffect(() => {
        dispatch(studentSlice.actions.setClassroom('PRINCE_EDWARD'));
    }, [dispatch]);

    useQueryThunk({ thunk: CourseThunkAction.getCourses })();

    useQueryThunk({
        thunk: StudentThunkAction.getFilteredStudentClassesForDailyTimetable,
        staleTime: 5000,
    })({
        dateUnixTimestamp: dayjs(selectedDate).startOf('day').toDate().getTime(),
        classRoom: 'PRINCE_EDWARD',
        filter: filter,
    });

    return <Outlet />;
};

export default PrinceEdwardIndex;
