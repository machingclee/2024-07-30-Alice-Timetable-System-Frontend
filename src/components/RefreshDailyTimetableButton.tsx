import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { RiRefreshLine } from 'react-icons/ri';
import { StudentThunkAction } from '../redux/slices/studentSlice';
import { Button } from 'antd';

export default function RefreshDailyTimetableButton() {
    const dispatch = useAppDispatch();
    const filter = useAppSelector(s => s.student.massTimetablePage.filter);
    const selectedDate = useAppSelector(s => s.student.massTimetablePage.selectedDate);
    const classroom = useAppSelector(s => s.student.massTimetablePage.classRoom);

    const refresh = () => {
        if (!classroom) {
            return;
        }
        dispatch(
            StudentThunkAction.getFilteredStudentClassesForDailyTimetable({
                classRoom: classroom,
                anchorTimestamp: selectedDate.getTime(),
                filter,
            })
        );
    };
    return (
        <Button className="flex items-center" onClick={() => refresh()}>
            <RiRefreshLine size={20} />
            Refresh
        </Button>
    );
}
