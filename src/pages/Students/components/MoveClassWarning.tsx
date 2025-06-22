import { Alert, Box } from '@mui/material';
import SectionTitle from '../../../components/SectionTitle';
import Spacer from '../../../components/Spacer';
import { TimetableLesson } from '../../../dto/kotlinDto';
import dayjs from 'dayjs';

export default function MoveClassWarning(props: { classToMove: TimetableLesson | null }) {
    const { classToMove } = props;
    if (!classToMove) {
        return null;
    }
    const { class: cls, course } = classToMove;
    return (
        <Box
            style={{
                overflowY: 'auto',
            }}
        >
            <SectionTitle>Are you sure to move the classes?</SectionTitle>
            <div>
                <Spacer />
            </div>
            <div>
                Class {course.courseName} at {dayjs(cls.hourUnixTimestamp).format('YYYY-MM-DD H:mm:ss')}
            </div>
            <Spacer />
            <Alert severity="warning">
                <div>
                    This timeslot is <b>within a group of duplicated classes</b>, do you want to move all of them?
                </div>
                <Spacer />
                <div>If not, you may first detach this class from the group.</div>
            </Alert>
            <Spacer />
        </Box>
    );
}
