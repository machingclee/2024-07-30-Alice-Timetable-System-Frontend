import { useAppSelector } from '../redux/hooks';
import { RiRefreshLine } from 'react-icons/ri';
import { Button } from 'antd';
import { studentsApi } from '@/redux/slices/studentSlice';

export default function RefreshDailyTimetableButton() {
    const filter = useAppSelector(s => s.student.massTimetablePage.filter);
    const selectedDate = useAppSelector(s => s.student.massTimetablePage.selectedDate);
    const classroom = useAppSelector(s => s.student.massTimetablePage.classRoom);

    const { refetch: refetchFilteredStudentClassesForDailyTimetable } =
        studentsApi.endpoints.getFilteredStudentClassesForDailyTimetable.useQuery(
            {
                classRoom: classroom || 'CAUSEWAY_BAY',
                anchorTimestamp: selectedDate.getTime(),
                filter,
            },
            { skip: !classroom }
        );

    const refresh = () => {
        if (!classroom) {
            return;
        }
        refetchFilteredStudentClassesForDailyTimetable;
    };
    return (
        <Button className="flex items-center" onClick={() => refresh()}>
            <RiRefreshLine size={20} />
            Refresh
        </Button>
    );
}
