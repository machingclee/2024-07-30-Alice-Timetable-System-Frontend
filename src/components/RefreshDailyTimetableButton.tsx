import dayjs from 'dayjs';
import useQueryFilteredDailyTimetable from '../queries/useQueryFilteredDailyTimetable';
import { useAppSelector } from '../redux/hooks';
import { RiRefreshLine } from 'react-icons/ri';
import { Box } from '@mui/material';

export default function RefreshDailyTimetableButton() {
    const filter = useAppSelector(s => s.student.massTimetablePage.filter);
    const selectedDate = useAppSelector(s => s.student.massTimetablePage.selectedDate);

    const { invalidation } = useQueryFilteredDailyTimetable({
        dateUnixTimestamp: dayjs(selectedDate).startOf('day').toDate().getTime(),
        classRoom: 'PRINCE_EDWARD',
        filter: filter,
    });

    return (
        <Box
            sx={{
                '& svg': {
                    cursor: 'pointer',
                    transition: 'opacity 0.3s ease-in-out',
                    '&:hover': {
                        opacity: 0.5,
                    },
                },
            }}
        >
            <RiRefreshLine size={45} onClick={() => invalidation()} />
        </Box>
    );
}
