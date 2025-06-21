import { ClassRoom } from '../dto/kotlinDto';
import { studentsApi } from '../redux/slices/studentSlice';
import { useAppSelector } from '../redux/hooks';
import dayjs from 'dayjs';

export default () => {
    const classroom = useAppSelector(s => s.student.massTimetablePage.classRoom);
    const anchorTimestamp = useAppSelector(s => s.student.massTimetablePage.selectedDate);
    const filter = useAppSelector(s => s.student.massTimetablePage.filter);
    const numOfDaysToDisplay = useAppSelector(s => s.student.massTimetablePage.numOfDaysToDisplay);

    const { data: classes, isLoading: isFetchingClasses } =
        studentsApi.endpoints.getFilteredStudentClassesForDailyTimetable.useQuery(
            {
                classRoom: classroom || ('' as unknown as ClassRoom),
                anchorTimestamp: dayjs(anchorTimestamp).startOf('day').toDate().getTime(),
                numOfDays: numOfDaysToDisplay,
                filter: filter,
            },
            { skip: !classroom || !anchorTimestamp }
        );

    return { classes: classes, isFetchingClasses: isFetchingClasses };
};
