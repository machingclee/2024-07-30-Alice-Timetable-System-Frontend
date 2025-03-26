import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { StudentThunkAction } from '../redux/slices/studentSlice';

export default () => {
    const dispatch = useAppDispatch();
    const numOfDaysToDisplay = useAppSelector(s => s.student.massTimetablePage.numOfDaysToDisplay);
    const classroom = useAppSelector(s => s.student.massTimetablePage.classRoom);
    const filter = useAppSelector(s => s.student.massTimetablePage.filter);

    const refetchMassTimetableAnchoredAt = (dateTimestamp: number) => {
        if (!classroom) {
            return;
        }
        dispatch(
            StudentThunkAction.getFilteredStudentClassesForDailyTimetable({
                dateUnixTimestamp: dateTimestamp,
                numOfDays: numOfDaysToDisplay,
                classRoom: classroom,
                filter: filter,
            })
        );
    };

    return { refetchMassTimetableAnchoredAt };
};
