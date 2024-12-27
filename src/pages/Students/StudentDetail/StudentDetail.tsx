import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import SectionTitle from '../../../components/SectionTitle';
import { useEffect, useState } from 'react';
import studentSlice, { StudentThunkAction } from '../../../redux/slices/studentSlice';
import Spacer from '../../../components/Spacer';
import WeeklyTimetable from '../components/WeeklyTimetable';
import Label from '../../../components/Label';
import AddClassEventDialog from '../../../components/AddClassEventDialog';
import { CourseThunkAction } from '../../../redux/slices/courseSlice';
import DuplicateClassDialog from '../../../components/DuplicateClassDialog';
import MoveConfirmationDialog from '../components/MoveConfirmationDialog';
import AddPackageDialog from '../components/AddPackageDialog';
import StudentPackageColumn from './components/StudentPackageColumn';
import DeleteClassDialog from '../../../components/DeleteClassDialog';
import AddPaymentDetailDialog from './components/AddPaymentDetailDialog';
import ViewClassDialog from '../../../components/ViewClassDialog';
import EditPackageDialog from './components/EditPackageDialog';
import { FaChevronLeft } from 'react-icons/fa6';
import { Box, Collapse } from '@mui/material';

export default function StudentDetail() {
    const [userOnClickTimestamp, _] = useState(new Date());
    const { studentId } = useParams<{ studentId: string }>();

    const dispatch = useAppDispatch();
    const [collapseTimetable, setCollapseTimetable] = useState(false);
    const studentDetail = useAppSelector(s => s.student.studentDetailTimetablePage.detail);
    const { firstName, lastName, chineseFirstName, chineseLastName, studentCode } = studentDetail || {};

    useEffect(() => {
        if (studentId) {
            dispatch(StudentThunkAction.getStudentDetail({ studentId }));
            dispatch(
                StudentThunkAction.getStudentClassesForWeeklyTimetable({
                    studentId,
                })
            );
            dispatch(StudentThunkAction.getStudentPackages({ studentId }));
        }
    }, [studentId, dispatch]);

    // To get courses in case the user wants to add a course to the timetable
    useEffect(() => {
        dispatch(
            studentSlice.actions.setWeeklyTimetableSelectedDate({
                date: userOnClickTimestamp,
            })
        );
        dispatch(CourseThunkAction.getCourses());
        return () => {
            dispatch(studentSlice.actions.reset());
        };
    }, [userOnClickTimestamp, dispatch]);

    const studentNameDisplay = () => {
        return (
            <>
                <SectionTitle style={{ fontSize: 30 }}>
                    <div>{`${chineseLastName} ${chineseFirstName}`}</div>
                    <Spacer width={20} />
                    {`${firstName} ${lastName}`}
                    <Spacer width={20} />
                </SectionTitle>
                <Box
                    sx={{
                        '& td:nth-child(1)': {
                            paddingRight: '8px',
                        },
                        '& td:nth-child(2)': {
                            padding: '1px 4px',
                            borderRadius: '4px',
                            background: 'rgba(0,0,0,0.1)',
                        },
                    }}
                >
                    <table>
                        <tbody>
                            <tr>
                                <td>Student Code:</td>
                                <td>{studentCode}</td>
                            </tr>
                        </tbody>
                    </table>
                </Box>
            </>
        );
    };

    if (!studentDetail) {
        return null;
    }

    return (
        <div
            style={{
                marginLeft: '10px',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <div style={{ display: 'flex' }}>
                <Collapse
                    sx={{
                        '& .MuiCollapse-wrapperInner': {
                            width: '100%',
                        },
                    }}
                    style={{
                        width: collapseTimetable ? 'unset' : '100%',
                        overflow: 'hidden',
                    }}
                    in={!collapseTimetable}
                    orientation="horizontal"
                >
                    <div className="w-full mb-4">{studentNameDisplay()}</div>
                    <div style={{ width: '100%' }}>
                        <WeeklyTimetable />
                    </div>
                </Collapse>
                <CollapseTriggerBar
                    collapseTimetable={collapseTimetable}
                    onClick={() => {
                        setCollapseTimetable(t => !t);
                    }}
                />
                <StudentPackageColumn packagesOffsetY={200} collapseTimtable={collapseTimetable} />
            </div>

            {/* <Calendar /> */}
            <DuplicateClassDialog.render />
            <ViewClassDialog.render />
            <DeleteClassDialog.render />
            <AddClassEventDialog.render />
            <AddPackageDialog.render />
            <EditPackageDialog.render />
            <MoveConfirmationDialog.render />
            <AddPaymentDetailDialog.render />
        </div>
    );
}

const CollapseTriggerBar = (props: { collapseTimetable: boolean; onClick: () => void }) => {
    const { collapseTimetable, onClick } = props;
    return (
        <Box
            onClick={onClick}
            sx={{
                flexDirection: 'row',
                justifyContent: 'center',
                '&:hover': {
                    opacity: 0.5,
                },
            }}
            style={{
                cursor: 'pointer',
                height: '100%',
                width: 35,
                position: 'relative',
            }}
        >
            <Label label="const CollapseTriggerBar" offsetTop={60} />
            <div
                style={{
                    height: '100%',
                    justifyContent: 'center',
                    flexDirection: 'row',
                }}
            >
                <div
                    style={{
                        width: 1,
                        background: 'rgba(0,0,0,0.15)',
                        height: '100%',
                    }}
                ></div>
            </div>
            <div
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%,-50%)',
                }}
            >
                <FaChevronLeft
                    style={{
                        transform: `rotate(${!collapseTimetable ? 0 : 180}deg)`,
                    }}
                />
            </div>
        </Box>
    );
};
