import { useEffect } from 'react';
import { ClassRoom } from '../dto/kotlinDto';
import studentSlice, { StudentThunkAction } from '../redux/slices/studentSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import dayjs from 'dayjs';

export default (classroom: ClassRoom) => {
    const dispatch = useAppDispatch();

    const filter = useAppSelector(s => s.student.massTimetablePage.filter);

    useEffect(() => {
        dispatch(studentSlice.actions.setClassroom(classroom));
    }, [dispatch]);

    useEffect(() => {
        dispatch(
            StudentThunkAction.getFilteredStudentClassesForDailyTimetable({
                dateUnixTimestamp: dayjs(new Date()).startOf('day').toDate().getTime(),
                classRoom: classroom,
                filter: filter,
            })
        );
    }, [classroom]);
};
