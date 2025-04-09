import { Alert, Box } from '@mui/material';
import Spacer from '../../../components/Spacer';
import { Button } from 'antd';

import MoveConfirmationDialog from './MoveConfirmationDialog';
import SectionTitle from '../../../components/SectionTitle';

export default function MoveConfirmationForm(props: { moveClassesAction: () => Promise<void> }) {
    const { moveClassesAction: moveClasses } = props;
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
                    type="primary"
                    block
                    onClick={async () => {
                        await moveClasses();
                        MoveConfirmationDialog.setOpen(false);
                    }}
                >
                    Confirm
                </Button>
                <Spacer height={5} />
                <Button
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
