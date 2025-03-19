import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import studentSlice, { StudentThunkAction } from '../../redux/slices/studentSlice';
import dayjs from 'dayjs';
import { Outlet } from 'react-router-dom';

const CausewaybayIndex = () => {
    const dispatch = useAppDispatch();
    const filter = useAppSelector(s => s.student.massTimetablePage.filter);

    useEffect(() => {
        dispatch(studentSlice.actions.setClassroom('CAUSEWAY_BAY'));
    }, [dispatch]);

    useEffect(() => {
        const currentTimestamp = dayjs(new Date().getTime()).startOf('day').valueOf().toString();
        dispatch(
            StudentThunkAction.getFilteredStudentClassesForDailyTimetable({
                dateUnixTimestamp: currentTimestamp,
                classRoom: 'CAUSEWAY_BAY',
                filter: filter,
            })
        );
    }, [dispatch, filter]);

    return <Outlet />;
};

export default CausewaybayIndex;
