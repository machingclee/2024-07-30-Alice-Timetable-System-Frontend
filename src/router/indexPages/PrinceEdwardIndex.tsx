import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import studentSlice, { StudentThunkAction } from '../../redux/slices/studentSlice';
import { Outlet } from 'react-router-dom';
import dayjs from 'dayjs';

const PrinceEdwardIndex = () => {
    const dispatch = useAppDispatch();
    const filter = useAppSelector(s => s.student.massTimetablePage.filter);

    useEffect(() => {
        dispatch(studentSlice.actions.setClassroom('PRINCE_EDWARD'));
    }, [dispatch]);

    useEffect(() => {
        const currentTimestamp = dayjs(new Date().getTime()).startOf('day').valueOf().toString();
        dispatch(
            StudentThunkAction.getFilteredStudentClassesForDailyTimetable({
                dateUnixTimestamp: currentTimestamp,
                classRoom: 'PRINCE_EDWARD',
                filter: filter,
            })
        );
    }, [dispatch, filter]);

    return <Outlet />;
};

export default PrinceEdwardIndex;
