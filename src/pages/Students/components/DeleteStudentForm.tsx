import { Box } from '@mui/material';
import SectionTitle from '../../../components/SectionTitle';
import Spacer from '../../../components/Spacer';
import { useEffect } from 'react';
import { Button } from 'antd';
import { useAppSelector } from '../../../redux/hooks';
import DeleteClassDialog from '../../../components/DeleteClassDialog';
import colors from '../../../constant/colors';

export default function DeleteStudentForm(props: { studentId: string }) {
    const { studentId } = props;
    const student = useAppSelector(s => s.student.students.idToStudent?.[studentId]);

    const { firstName, lastName, chineseFirstName = '', chineseLastName = '' } = student || {};

    useEffect(() => {
        console.log(DeleteClassDialog);
    }, []);

    if (!student) {
        return null;
    }

    return (
        <Box
            style={{
                maxWidth: 400,
                width: 600,
                padding: '40px 80px',
                overflowY: 'auto',
                paddingBottom: 60,
            }}
        >
            <SectionTitle>Are you sure to delete this student?</SectionTitle>
            <Spacer height={40} />
            <div>English name: {firstName + ' ' + lastName}</div>
            <Spacer height={10} />
            <div>Chinese name: {chineseFirstName + chineseLastName ? chineseFirstName + chineseLastName : 'null'}</div>
            <Spacer />
            {/* {hasDuplicationGroup && (
                <Alert severity="warning">
                    <div>
                        This timeslot is <b>within a group of</b> duplicated classes, do you want to delete all of them?
                    </div>
                    <Spacer />
                    <div>If not, you may first detach this class from the group.</div>
                    <Spacer />
                </Alert>
            )} */}
            <Spacer />
            <Button
                style={{ backgroundColor: colors.RED }}
                type="primary"
                block
                onClick={async () => {
                    // await dispatch(
                    //     StudentThunkAction.deleteClass({
                    //         classId: id,
                    //     })
                    // ).unwrap();
                    // dispatch(StudentThunkAction.getStudentClassesForDailyTimetable({ dateUnixTimestamp: day_unix_timestamp.toString(), timetableType: props.timetableType }));
                    // dispatch(StudentThunkAction.getStudentClassesForWeeklyTimetable({ studentId: student_id }));
                    // dispatch(StudentThunkAction.getStudentPackages({ studentId: student_id }));
                    DeleteClassDialog.setOpen(false);
                }}
            >
                Confirm
            </Button>
            <Spacer height={5} />
            <Button
                type="text"
                block
                onClick={async () => {
                    DeleteClassDialog.setOpen(false);
                }}
            >
                Cancel
            </Button>
        </Box>
    );
}
