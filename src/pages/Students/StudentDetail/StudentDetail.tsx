import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import SectionTitle from '../../../components/SectionTitle';
import { useEffect, useState } from 'react';
import studentSlice, { StudentDetailPage } from '../../../redux/slices/studentSlice';
import { studentApi } from '../../../!rtk-query/api/studentApi';
import Spacer from '../../../components/Spacer';
import WeeklyTimetable from '../components/WeeklyTimetable';
import AddClassEventDialog from '../../../components/AddClassEventDialog';
import DuplicateClassDialog from '../../../components/DuplicateClassDialog';
import MoveConfirmationDialog from '../components/MoveConfirmationDialog';
import AddPackageDialog from '../components/AddPackageDialog';
import StudentPackageColumn from './components/StudentPackageColumn';
import DeleteClassDialog from '../../../components/DeleteClassDialog';
import AddPaymentDetailDialog from './components/AddPaymentDetailDialog';
import ViewClassDialog from '../../../components/ViewClassDialog';
import EditPackageDialog from './components/EditPackageDialog';
import { FaChevronLeft } from 'react-icons/fa6';
import { Box, CircularProgress } from '@mui/material';
import { Button, Input } from 'antd';
import RouteEnum from '../../../enum/RouteEnum';
import PackageClassesStatus from '../components/PackageClassesStatus';
import useStudentDetailPathParam from '../../../hooks/useStudentDetailPathParam';
import { IoMdReturnLeft } from 'react-icons/io';
import ContentContainer from '@/components/ContentContainer';

export default function StudentDetail() {
    const { anchorTimestamp, packageId, setPathParam } = useStudentDetailPathParam();
    const { studentId } = useParams<{ studentId: string }>();
    const displayType = useAppSelector(s => s.student.studentDetailTimetablePage.activePage);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [collapseTimetable, setCollapseTimetable] = useState(false);

    const { studentDetail, isLoading: studentDetailLoading } = studentApi.endpoints.getStudentDetail.useQuery(
        { studentId: studentId || '' },
        {
            skip: !studentId,
            selectFromResult: result => {
                const studentDetail = result.data;
                return { studentDetail, isLoading: result.isLoading };
            },
        }
    );

    const { firstName, lastName, chineseFirstName, chineseLastName, studentCode } = studentDetail?.student || {};
    const selectedPackageId = useAppSelector(s => s.student.studentDetailTimetablePage.selectedPackageId);

    const isLoading = studentDetailLoading;

    const navAttendences = () => {
        const destination = `${RouteEnum.STUDENT_INFO}/${studentId}`;
        window.open(destination, '_blank', 'noopener,noreferrer');
    };

    const navPackageAttendence = () => {
        if (!selectedPackageId) {
            return;
        }
        dispatch(studentSlice.actions.setStudentDetailPage(StudentDetailPage.STUDENT_PACKAGE_CLASS_STATUES));
    };

    // To get courses in case the user wants to add a course to the timetable

    useEffect(() => {
        dispatch(
            studentSlice.actions.setSelectedPackageAndActiveAnchorTimestamp({
                type: 'go-to-target-lesson',
                packageId: packageId || '',
                desiredAnchorTimestamp: anchorTimestamp,
                setURLAnchorTimestamp: (timestamp: number) => {
                    setPathParam({ anchorTimestamp: timestamp, packageId: packageId || '' });
                },
            })
        );
    }, [anchorTimestamp, packageId, dispatch, setPathParam]);

    useEffect(() => {
        return () => {
            dispatch(studentSlice.actions.reset());
        };
    }, [dispatch]);

    useEffect(() => {
        dispatch(studentSlice.actions.setStudentDetailPage(StudentDetailPage.STUDENT_TIME_TABLE));
    }, [dispatch]);

    const studentNameDisplay = () => {
        return (
            <>
                <ContentContainer className="mr-4 !border-0">
                    <div className="flex justify-between mb-2">
                        <SectionTitle style={{ fontSize: 30 }}>
                            <Button
                                type="primary"
                                style={{ display: 'flex', alignItems: 'center' }}
                                onClick={() => navigate(RouteEnum.DASHBOARD_STUDENTS)}
                            >
                                <IoMdReturnLeft />
                                Students
                            </Button>
                            <Spacer />
                            <div>{`${chineseLastName} ${chineseFirstName}`}</div>
                            <Spacer width={20} />
                            {`${firstName} ${lastName}`}
                            <Spacer width={20} />
                        </SectionTitle>
                        <div className="rounded-2xl mr-4 flex overflow-hidden">
                            <div className="flex pl-4 pr-2 text-xs font-mono items-center">Student Code</div>
                            <div className="pl-1 font-mono text-xs py-1 flex items-center ">
                                <Input
                                    value={studentCode}
                                    className="!w-full !rounded-2xl !py-0"
                                    contentEditable={false}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div>
                            <Button block type="default" onClick={navAttendences}>
                                Attendences (Sharable)
                            </Button>
                        </div>
                        <div>
                            <Button block type="primary" onClick={navPackageAttendence} disabled={!selectedPackageId}>
                                Show package attendences
                            </Button>
                        </div>
                    </div>
                </ContentContainer>
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
                                {displayType === StudentDetailPage.STUDENT_TIME_TABLE && (
                                    <>
                                        {isLoading && <CircularProgress />}
                                        {!isLoading && <WeeklyTimetable />}
                                    </>
                                )}
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
            className="cursor-pointer"
            sx={{
                flexDirection: 'row',
                justifyContent: 'center',
                '&:hover': {
                    opacity: 0.5,
                },
            }}
            style={{
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
