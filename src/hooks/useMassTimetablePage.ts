import { useEffect } from 'react';
import { ClassRoom } from '../dto/kotlinDto';
import studentSlice, { StudentThunkAction } from '../redux/slices/studentSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import dayjs from 'dayjs';

export default (classroom: ClassRoom) => {
    const dispatch = useAppDispatch();
    const anchorTimestamp = useAppSelector(s => s.student.massTimetablePage.selectedDate);
    const filter = useAppSelector(s => s.student.massTimetablePage.filter);
    const numOfDaysToDisplay = useAppSelector(s => s.student.massTimetablePage.numOfDaysToDisplay);

    useEffect(() => {
        dispatch(studentSlice.actions.setClassroom(classroom));
    }, [dispatch]);

    const getDailyTimetableClasses = async () => {
        await dispatch(
            StudentThunkAction.getFilteredStudentClassesForDailyTimetable({
                anchorTimestamp: dayjs(anchorTimestamp).startOf('day').toDate().getTime(),
                numOfDays: numOfDaysToDisplay,
                classRoom: classroom,
                filter: filter,
            })
        ).unwrap();
    };
    return { getDailyTimetableClasses };
};
