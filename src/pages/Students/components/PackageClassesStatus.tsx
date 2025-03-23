import { PropsWithChildren } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import Spacer from '../../../components/Spacer';
import SectionTitle from '../../../components/SectionTitle';
import dayjs from 'dayjs';
import { Box } from '@mui/material';
import { GetPackageClassStatusResponse } from '../../../dto/kotlinDto';
import useQueryThunk from '../../../queries/useQueryThunk';
import studentSlice, { StudentDetailPage, StudentThunkAction } from '../../../redux/slices/studentSlice';
import { FaChevronLeft } from 'react-icons/fa6';
import { Button, Spin } from 'antd';
import FadeIn from '../../../components/FadeIn';
import statues from '../../../constant/statues';
import boxShadow from '../../../constant/boxShadow';
import { ContextMenuTrigger, ContextMenu, MenuItem } from 'react-contextmenu';
import ViewClassDialog from '../../../components/ViewClassDialog';
import ViewClassForm from '../../../components/ViewClassForm';
import DeleteClassDialog from '../../../components/DeleteClassDialog';
import DeleteClassForm from '../../../components/DeleteClassForm';

export const Container = (props: PropsWithChildren) => {
    return (
        <Box
            sx={{
                '& th, & td': {
                    textAlign: 'left',
                    paddingRight: '20px',
                    paddingBottom: '10px',
                },
            }}
            style={{ padding: 30 }}
        >
            {props.children}
        </Box>
    );
};

export default function PackageClassesStatus() {
    const packageId = useAppSelector(s => s.student.studentDetailTimetablePage.selectedPackageId);
    const pkg = useAppSelector(
        s => s.student.studentDetailTimetablePage.studentPackages.idToPackageResponse?.[packageId]
    );
    const dispatch = useAppDispatch();
    const course = pkg?.course;
    const { query, invalidation: invalidateClassStatues } = useQueryThunk({
        thunk: StudentThunkAction.getClassesStatus,
    })({ packageId });
    const classInfos = query.data;
    const backToTimetable = () => {
        dispatch(studentSlice.actions.setDisplayType(StudentDetailPage.STUDENT_TIME_TABLE));
    };
    const { isLoading } = query;

    if (isLoading) {
        return <Spin />;
    }
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                overflowY: 'scroll',
                height: 'calc(100vh - 130px)',
            }}
        >
            <div>
                <Button style={{ display: 'flex', alignItems: 'center' }} onClick={backToTimetable}>
                    <FaChevronLeft /> Back
                </Button>
            </div>
            <FadeIn style={{ flex: 1 }}>
                <div>
                    <Spacer />
                    <SectionTitle>{course?.courseName || ''}</SectionTitle>
                    <Spacer />
                    <Box>
                        {classInfos?.map(classInfo => {
                            return (
                                <ClassStatusRow classInfo={classInfo} invalidateClassStatues={invalidateClassStatues} />
                            );
                        })}
                    </Box>
                </div>
            </FadeIn>
        </div>
    );
}

export const ClassStatusRow = (props: {
    classInfo: GetPackageClassStatusResponse;
    invalidateClassStatues: () => Promise<void>;
}) => {
    const { cls, course, dateUnixTimestamp, student, classGroup } = props.classInfo;
    const invalidateClassStatues = props.invalidateClassStatues;

    const dispatch = useAppDispatch();
    const hourUnixTimestamp = cls.hourUnixTimestamp;
    const classStatus = cls.classStatus;
    const formattedDay = dayjs(hourUnixTimestamp).format('YYYY-MM-DD');
    const formattedTime = dayjs(hourUnixTimestamp).format('HH:mm');
    const color = statues?.[classStatus.toLocaleLowerCase() as keyof typeof statues]?.color;
    const menuId = `${cls.id}_${hourUnixTimestamp}`;
    return (
        <>
            {/*@ts-expect-error - context menu has problem in typing */}
            <ContextMenuTrigger id={menuId}>
                <div
                    style={{
                        boxShadow: boxShadow.SHADOW_61,
                        display: 'flex',
                        marginBottom: 10,
                        background: 'white',
                        padding: 10,
                        borderRadius: 4,
                        marginRight: 10,
                    }}
                >
                    <div style={{ flex: 1, display: 'flex' }}>
                        <div>{formattedDay}</div>
                        <Spacer />
                        <div>{formattedTime}</div>
                    </div>
                    <div style={{ color: color || 'black' }}>{classStatus}</div>
                </div>
            </ContextMenuTrigger>
            {/*@ts-expect-error - context menu has problem in typing */}
            <ContextMenu
                id={menuId}
                style={{
                    borderRadius: '8px',
                    zIndex: 10 ** 7 + 1,
                    boxShadow: boxShadow.SHADOW_62,
                    backgroundColor: 'white',
                }}
            >
                <Box
                    sx={{
                        '& .menu-item': {
                            padding: '10px',
                            cursor: 'pointer',
                            '&:hover': {
                                '&:hover': {
                                    color: 'rgb(64, 150, 255)',
                                },
                            },
                        },
                    }}
                >
                    {/*@ts-expect-error - context menu has problem in typing */}
                    <MenuItem
                        className="menu-item"
                        onClick={() => {
                            ViewClassDialog.setWidth('xs');
                            ViewClassDialog.setContent(() => () => (
                                <ViewClassForm
                                    isEditing={false}
                                    dateUnixTimestamp={dateUnixTimestamp}
                                    cls={cls}
                                    course={course}
                                    student={student}
                                />
                            ));
                            ViewClassDialog.setOpen(true);
                        }}
                    >
                        View Class
                    </MenuItem>
                    {/*@ts-expect-error - context menu has problem in typing */}
                    <MenuItem
                        className="menu-item"
                        onClick={() => {
                            ViewClassDialog.setWidth('xs');
                            ViewClassDialog.setContent(() => () => (
                                <ViewClassForm
                                    isEditing={true}
                                    dateUnixTimestamp={dateUnixTimestamp}
                                    cls={cls}
                                    course={course}
                                    student={student}
                                />
                            ));
                            ViewClassDialog.setOpen(true);
                        }}
                    >
                        Edit Class
                    </MenuItem>
                    {/*@ts-expect-error - context menu has problem in typing */}
                    <MenuItem
                        className="menu-item"
                        onClick={() => {
                            DeleteClassDialog.setWidth('xs');
                            DeleteClassDialog.setContent(() => () => (
                                <DeleteClassForm
                                    classGroup={classGroup}
                                    cls={cls}
                                    course={course}
                                    onDeletion={async () => {
                                        const studentId = student.id;
                                        dispatch(
                                            StudentThunkAction.getStudentClassesForWeeklyTimetable({
                                                studentId,
                                            })
                                        );
                                        dispatch(
                                            StudentThunkAction.getStudentPackages({
                                                studentId,
                                            })
                                        );
                                        invalidateClassStatues();
                                    }}
                                />
                            ));
                            DeleteClassDialog.setOpen(true);
                        }}
                    >
                        <span
                            style={{
                                color: 'red',
                            }}
                        >
                            Delete Class
                        </span>
                    </MenuItem>
                </Box>
            </ContextMenu>
        </>
    );
};
