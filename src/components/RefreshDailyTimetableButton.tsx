import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { RiRefreshLine } from 'react-icons/ri';
import { Box } from '@mui/material';
import { StudentThunkAction } from '../redux/slices/studentSlice';

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
                dateUnixTimestamp: selectedDate.getTime(),
                filter,
            })
        );
    };
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
            <RiRefreshLine size={35} onClick={() => refresh()} />
        </Box>
    );
}
