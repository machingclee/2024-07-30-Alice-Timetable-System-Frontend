import { useAppSelector } from '../redux/hooks';
import { RiRefreshLine } from 'react-icons/ri';
import { Button } from 'antd';
import { studentApi } from '@/!rtk-query/api/studentApi';
import dayjs from 'dayjs';

export default function RefreshDailyTimetableButton() {
    const filter = useAppSelector(s => s.student.massTimetablePage.filter);
    const selectedDate = useAppSelector(s => s.student.massTimetablePage.selectedDate);
    const classroom = useAppSelector(s => s.student.massTimetablePage.classRoom);

    const { refetch: refetchFilteredStudentClassesForDailyTimetable } =
        studentApi.endpoints.getFilteredStudentClassesForDailyTimetable.useQuery(
            {
                classRoom: classroom || 'CAUSEWAY_BAY',
                anchorTimestamp: dayjs(selectedDate).startOf('day').valueOf(),
                numOfDays: 1,
                filter: JSON.parse(JSON.stringify(filter)),
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
