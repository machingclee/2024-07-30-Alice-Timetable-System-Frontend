import { Alert, Box } from '@mui/material';
import SectionTitle from './SectionTitle';
import Spacer from './Spacer';
import { useEffect } from 'react';
import { Button } from 'antd';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { StudentThunkAction } from '../redux/slices/studentSlice';
import DeleteClassDialog from './DeleteClassDialog';
import colors from '../constant/colors';
import dayjs from 'dayjs';
import useGetStudentIdFromParam from '../hooks/useGetStudentIdFromParam';
import { TimetableClassEvent } from '../dto/kotlinDto';

export default function DeleteClassForm(props: { classEvent: TimetableClassEvent }) {
    const { classEvent } = props;
    const { studentId: student_id } = useGetStudentIdFromParam();
    const { course, classGroup, class: class_ } = classEvent;
    const courseName = useAppSelector(s => s.class.courses.idToCourse?.[course.id || 0])?.courseName;
    const classAt = dayjs(class_.hourUnixTimestamp).format('HH:mm');
    const classOn = dayjs(class_.dayUnixTimestamp).format('dddd');
    const dispatch = useAppDispatch();
    const hasDuplicationGroup = classGroup?.id != null;

    useEffect(() => {
        console.log(DeleteClassDialog);
    }, []);

    return (
        <Box
            style={{
                width: '100%',
                padding: '40px 80px',
                overflowY: 'auto',
                paddingBottom: 60,
            }}
        >
            <SectionTitle>Are you sure to delete this class?</SectionTitle>
            <Spacer />
            Class Detail:
            <Spacer height={10} />
            <div style={{ display: 'flex', justifyContent: 'center' }}>{courseName}</div>
            <Spacer height={10} />
            <div>
                scheduled at {classAt} on {hasDuplicationGroup ? `every ${classOn}` : classOn}
            </div>
            <Spacer />
            {hasDuplicationGroup && (
                <Alert severity="warning">
                    <div>
                        This timeslot is <b>within a group of</b> duplicated classes, do you want to delete all of them?
                    </div>
                    <Spacer />
                    <div>If not, you may first detach this class from the group.</div>
                    <Spacer />
                </Alert>
            )}
            <Spacer />
            <Button
                style={{ backgroundColor: colors.RED }}
                type="primary"
                block
                onClick={async () => {
                    await dispatch(
                        StudentThunkAction.deleteClass({
                            classId: class_.id,
                        })
                    ).unwrap();
                    dispatch(
                        StudentThunkAction.getStudentClassesForWeeklyTimetable({
                            studentId: student_id,
                        })
                    );
                    dispatch(
                        StudentThunkAction.getStudentPackages({
                            studentId: student_id,
                        })
                    );
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
