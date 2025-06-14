import { PropsWithChildren } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import Spacer from '../../../components/Spacer';
import SectionTitle from '../../../components/SectionTitle';
import dayjs from 'dayjs';
import { Box } from '@mui/material';
import { GetPackageClassStatusResponse } from '../../../dto/kotlinDto';
import useQueryThunk from '../../../reactQueries/query/useQueryThunk';
import studentSlice, { StudentDetailPage, StudentThunkAction } from '../../../redux/slices/studentSlice';
import { FaChevronLeft } from 'react-icons/fa6';
import { Button, Spin } from 'antd';
import FadeIn from '../../../components/FadeIn';
import statues from '../../../constant/statues';
import boxShadow from '../../../constant/boxShadow';
import ViewClassDialog from '../../../components/ViewClassDialog';
import ViewClassForm from '../../../components/ViewClassForm';
import DeleteClassDialog from '../../../components/DeleteClassDialog';
import DeleteClassForm from '../../../components/DeleteClassForm';
import getDisplayNameFromClassStatus from '@/utils/getDisplayNameFromClassStatus';
import { CiCalendarDate } from 'react-icons/ci';
import { IoMdTime } from 'react-icons/io';
import { AliceMenu } from '@/components/AliceMenu';
import ContentContainer from '@/components/ContentContainer';

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
        dispatch(studentSlice.actions.setStudentDetailPage(StudentDetailPage.STUDENT_TIME_TABLE));
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
                    <ContentContainer className="mr-4">
                        <Box>
                            {classInfos?.map(classInfo => {
                                return (
                                    <ClassStatusRow
                                        classInfo={classInfo}
                                        invalidateClassStatues={invalidateClassStatues}
                                    />
                                );
                            })}
                        </Box>
                    </ContentContainer>
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
    return (
        <>
            <AliceMenu
                items={[
                    {
                        item: ' View class detail',
                        onClick: () => {
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
                        },
                    },
                    {
                        item: 'Edit class',
                        onClick: () => {
                            ViewClassDialog.setWidth('xs');
                            ViewClassDialog.setContent(() => () => (
                                <ViewClassForm
                                    isEditing={true}
                                    onSubmit={() => {
                                        invalidateClassStatues();
                                    }}
                                    dateUnixTimestamp={dateUnixTimestamp}
                                    cls={cls}
                                    course={course}
                                    student={student}
                                />
                            ));
                            ViewClassDialog.setOpen(true);
                        },
                    },
                    {
                        item: 'Delete a class',
                        onClick: () => {
                            DeleteClassDialog.setWidth('xs');
                            DeleteClassDialog.setContent(() => () => (
                                <DeleteClassForm
                                    deleteSingleClass={true}
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
                        },
                    },
                    {
                        item: 'Delete a group of classes',
                        onClick: () => {
                            DeleteClassDialog.setWidth('xs');
                            DeleteClassDialog.setContent(() => () => (
                                <DeleteClassForm
                                    deleteSingleClass={false}
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
                        },
                    },
                ]}
            >
                <div
                    className="m-1 rounded-sm"
                    style={{
                        cursor: 'pointer',
                        boxShadow: boxShadow.SHADOW_61,
                        display: 'flex',
                        background: 'white',
                        padding: 10,
                        marginRight: 10,
                    }}
                >
                    <div className="flex flex-1 items-center gap-2">
                        <div className="flex w-40 items-center gap-2">
                            <CiCalendarDate size={24} /> {formattedDay}
                        </div>
                        <div className="flex w-40 items-center gap-2">
                            <IoMdTime size={22} />
                            {formattedTime}
                        </div>
                    </div>
                    <div style={{ color: color || 'black' }}>{getDisplayNameFromClassStatus[classStatus]}</div>
                </div>
            </AliceMenu>
        </>
    );
};
