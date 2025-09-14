import { Alert, Box } from '@mui/material';
import Spacer from '../../../components/Spacer';
import { Button } from 'antd';

import MoveConfirmationDialog from './MoveConfirmationDialog';
import SectionTitle from '../../../components/SectionTitle';
import { TimetableLesson } from '@/dto/kotlinDto';
import { studentApi } from '@/!rtk-query/api/studentApi';

export default function MoveConfirmationForm(props: {
    fromClassEvent: TimetableLesson;
    toDayTimestamp: number;
    toHourTimestamp: number;
}) {
    const { fromClassEvent, toDayTimestamp, toHourTimestamp } = props;
    const [moveStudentEvent, { isLoading: isMovingStudentEvent }] = studentApi.endpoints.moveStudentEvent.useMutation();

    const moveClassPayload = {
        fromClassEvent,
        toDayTimestamp: String(toDayTimestamp),
        toHourTimestamp: String(toHourTimestamp),
    };

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
            <Alert severity="warning">
                <div>
                    This timeslot is <b>within a group of duplicated classes</b>, do you want to move all of them?
                </div>
                <Spacer />
                <div>If not, you may first detach this class from the group.</div>
            </Alert>
            <Spacer />
            <div>
                <Button
                    loading={isMovingStudentEvent}
                    type="primary"
                    block
                    onClick={async () => {
                        await moveStudentEvent(moveClassPayload).unwrap();
                        MoveConfirmationDialog.setOpen(false);
                    }}
                >
                    Confirm
                </Button>
                <Spacer height={5} />
                <Button
                    disabled={isMovingStudentEvent}
                    type="text"
                    block
                    onClick={async () => {
                        // dispatch(StudentThunkAction.getStudentClassesForWeeklyTimetable({ studentId }));
                        MoveConfirmationDialog.setOpen(false);
                    }}
                >
                    Cancel
                </Button>
            </div>
        </Box>
    );
}
