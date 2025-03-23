import { Alert, Box, Table } from '@mui/material';
import SectionTitle from './SectionTitle';
import Spacer from './Spacer';
import { Button } from 'antd';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { StudentThunkAction } from '../redux/slices/studentSlice';
import DeleteClassDialog from './DeleteClassDialog';
import colors from '../constant/colors';
import dayjs from 'dayjs';
import { ClassDTO, ClassGroupDTO, CourseDTO } from '../dto/kotlinDto';
import Sep from './Sep';

export default function DeleteClassForm(props: {
    course: CourseDTO;
    classGroup: ClassGroupDTO | null;
    cls: ClassDTO;
    onDeletion: () => Promise<void>;
}) {
    const { course, classGroup, cls: class_, onDeletion } = props;
    const courseName = useAppSelector(s => s.class.courses.idToCourse?.[course.id || 0])?.courseName;
    const classAt = dayjs(class_.hourUnixTimestamp).format('HH:mm');
    const classOn = dayjs(class_.dayUnixTimestamp).format('dddd');
    const startedFromDate = dayjs(class_.hourUnixTimestamp).format('YYYY-MM-DD');
    const dispatch = useAppDispatch();
    const hasDuplicationGroup = classGroup?.id != null;

    const deleteClass = async () => {
        await dispatch(
            StudentThunkAction.deleteClass({
                classId: class_.id,
            })
        ).unwrap();
        onDeletion?.();
        DeleteClassDialog.setOpen(false);
    };

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
            <Sep />
            <Spacer height={10} />
            <div style={{}}>
                <Table
                    sx={{
                        '& td:nth-child(1)': {
                            width: '120px',
                        },
                    }}
                >
                    <tbody>
                        <tr>
                            <td>Start From:</td>
                            <td>{startedFromDate}</td>
                        </tr>
                        <tr>
                            <td>Scheduled At:</td>
                            <td>{classAt}</td>
                        </tr>
                        <tr>
                            <td>On{hasDuplicationGroup ? ' every:' : ':'}</td>
                            <td>{classOn}</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
            <Spacer height={10} />
            <Sep />
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
            <Button style={{ backgroundColor: colors.RED }} type="primary" block onClick={deleteClass}>
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
