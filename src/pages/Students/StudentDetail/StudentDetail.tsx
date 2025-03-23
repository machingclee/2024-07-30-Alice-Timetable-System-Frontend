import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import SectionTitle from '../../../components/SectionTitle';
import { useEffect, useState } from 'react';
import studentSlice, { StudentDetailPage, StudentThunkAction } from '../../../redux/slices/studentSlice';
import Spacer from '../../../components/Spacer';
import WeeklyTimetable from '../components/WeeklyTimetable';
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
import { Box } from '@mui/material';
import useQueryThunk from '../../../queries/useQueryThunk';
import { Button } from 'antd';
import RouteEnum from '../../../enum/RouteEnum';
import PackageClassesStatus from '../components/PackageClassesStatus';

export default function StudentDetail() {
    const [userOnClickTimestamp, _] = useState(new Date());
    const { studentId } = useParams<{ studentId: string }>();
    const displayType = useAppSelector(s => s.student.studentDetailTimetablePage.activePage);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [collapseTimetable, setCollapseTimetable] = useState(false);
    const studentDetail = useAppSelector(s => s.student.studentDetailTimetablePage.detail);
    const { firstName, lastName, chineseFirstName, chineseLastName, studentCode } = studentDetail || {};
    const selectedPackageId = useAppSelector(s => s.student.studentDetailTimetablePage.selectedPackageId);

    useQueryThunk({ thunk: StudentThunkAction.getStudentDetail })({ studentId: studentId || '' });
    useQueryThunk({ thunk: StudentThunkAction.getStudentPackages })({ studentId: studentId || '' });
    useQueryThunk({ thunk: StudentThunkAction.getStudentClassesForWeeklyTimetable })({
        studentId: studentId || '',
    });

    const navAttendences = () => {
        navigate(`${RouteEnum.STUDENT_INFO}/${studentId}`);
    };

    const navPackageAttendence = () => {
        if (!selectedPackageId) {
            return;
        }
        dispatch(studentSlice.actions.setStudentDetailPage(StudentDetailPage.STUDENT_PACKAGE_CLASS_STATUES));
    };

    // To get courses in case the user wants to add a course to the timetable

    useQueryThunk({ thunk: CourseThunkAction.getCourses })();

    useEffect(() => {
        dispatch(
            studentSlice.actions.setWeeklyTimetableSelectedDate({
                date: userOnClickTimestamp,
            })
        );
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
                                <td style={{ paddingLeft: 10 }}>
                                    <Button block type="default" onClick={navAttendences}>
                                        Attendences (Sharable)
                                    </Button>
                                </td>
                                <td style={{ paddingLeft: 10 }}>
                                    <Button
                                        block
                                        type="primary"
                                        onClick={navPackageAttendence}
                                        disabled={!selectedPackageId}
                                    >
                                        Show package attendences
                                    </Button>
                                </td>
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
                <Box
                    sx={{
                        '& .MuiCollapse-wrapperInner': {
                            width: '100%',
                        },
                    }}
                    style={{
                        width: collapseTimetable ? 'unset' : '100%',
                        overflow: 'hidden',
                    }}
                >
                    {!collapseTimetable && (
                        <>
                            <div className="w-full mb-4">{studentNameDisplay()}</div>
                            <div style={{ width: '100%' }}>
                                {displayType === StudentDetailPage.STUDENT_TIME_TABLE && <WeeklyTimetable />}
                                {displayType === StudentDetailPage.STUDENT_PACKAGE_CLASS_STATUES && (
                                    <PackageClassesStatus />
                                )}
                            </div>
                        </>
                    )}
                </Box>
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
