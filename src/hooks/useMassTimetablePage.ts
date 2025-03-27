import { useEffect } from 'react';
import { ClassRoom } from '../dto/kotlinDto';
import studentSlice, { StudentThunkAction } from '../redux/slices/studentSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';

export default (classroom: ClassRoom) => {
    const dispatch = useAppDispatch();

    const filter = useAppSelector(s => s.student.massTimetablePage.filter);
    const numOfDaysToDisplay = useAppSelector(s => s.student.massTimetablePage.numOfDaysToDisplay);

    useEffect(() => {
        dispatch(studentSlice.actions.setClassroom(classroom));
    }, [dispatch]);

    useEffect(() => {
        dispatch(
            StudentThunkAction.getFilteredStudentClassesForDailyTimetable({
                anchorTimestamp: new Date().getTime(),
                numOfDays: numOfDaysToDisplay,
                classRoom: classroom,
                filter: filter,
            })
        );
    }, [classroom]);
};
