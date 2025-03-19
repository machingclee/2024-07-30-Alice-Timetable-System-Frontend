import { Button, Select } from 'antd';
import Spacer from '../components/Spacer';
import { useEffect, useRef } from 'react';
import SectionTitle from '../components/SectionTitle';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { Box } from '@mui/material';
import FormInputTitle from '../components/FormInputTitle';
import Label from '../components/Label';
import { CourseThunkAction } from '../redux/slices/courseSlice';
import { StudentThunkAction } from '../redux/slices/studentSlice';
import toastUtil from '../utils/toastUtil';
import AddClassEventDialog from '../components/AddClassEventDialog';
import { CreateClassRequest } from '../dto/dto';
import durations from '../constant/durations';
import dayjs from 'dayjs';
import range from '../utils/range';
import { Classroom } from '../prismaTypes/types';
import appSlice from '../redux/slices/appSlice';

export default function AddClassEventForm(props: {
    dayUnixTimestamp: number;
    hourUnixTimestamp: number;
    studentId: string;
}) {
    const { dayUnixTimestamp, hourUnixTimestamp, studentId } = props;
    const selectedPackageId = useAppSelector(s => s.student.studentDetailTimetablePage.selectedPackageId);
    const defaultClassroom = useAppSelector(
        s =>
            s.student.studentDetailTimetablePage.studentPackages.idToPackageResponse?.[selectedPackageId]
                ?.studentPackage.defaultClassroom
    );
    const defaultCourseId = useAppSelector(
        s =>
            s.student.studentDetailTimetablePage.studentPackages.idToPackageResponse?.[selectedPackageId]?.course.id ||
            0
    );
    const defaultMin = useAppSelector(
        s =>
            s.student.studentDetailTimetablePage.studentPackages.idToPackageResponse?.[selectedPackageId]
                ?.studentPackage.min || 0
    );
    const defaultNumOfClasses = useAppSelector(
        s =>
            s.student.studentDetailTimetablePage.studentPackages.idToPackageResponse?.[selectedPackageId]
                ?.studentPackage.numOfClasses || 1
    );
    const dispatch = useAppDispatch();
    const courses = useAppSelector(s => s.class.courses);
    const formData = useRef<Partial<CreateClassRequest>>({
        dayUnixTimestamp: dayUnixTimestamp,
        hourUnixTimestamp: hourUnixTimestamp,
        studentPackageId: Number(selectedPackageId || '0'),
        min: defaultMin,
        numOfClasses: defaultNumOfClasses,
        actualClassroom: defaultClassroom,
    });
    const updateFormData = (update: Partial<CreateClassRequest>) => {
        formData.current = {
            ...formData.current,
            ...update,
        };
    };

    const submit = async () => {
        dispatch(appSlice.actions.setLoading(true));
        try {
            AddClassEventDialog.setOpen(false);
            await dispatch(
                StudentThunkAction.createStudentClassEvent({
                    req: formData.current as CreateClassRequest,
                    studentId,
                })
            ).unwrap();
            toastUtil.success('Event Created');
            dispatch(
                StudentThunkAction.getStudentClassesForWeeklyTimetable({
                    studentId,
                })
            );
            dispatch(StudentThunkAction.getStudentPackages({ studentId }));
        } finally {
            dispatch(appSlice.actions.setLoading(false));
        }
    };

    useEffect(() => {
        dispatch(CourseThunkAction.getCourses());
    }, [dispatch]);

    const classroomOptions: Classroom[] = ['PRINCE_EDWARD', 'CAUSEWAY_BAY'];

    return (
        <Box
            style={{
                padding: '40px 80px',
                overflowY: 'auto',
                paddingBottom: 60,
            }}
        >
            <Label label="AddClassEventForm.tsx" offsetTop={0} offsetLeft={180} />
            <SectionTitle>Add Class at {dayjs(hourUnixTimestamp).format('HH:mm')}</SectionTitle>
            <Spacer />
            <div style={{ display: 'flex' }}>
                <FormInputTitle>Course </FormInputTitle>
                <Spacer />
            </div>
            <Select
                disabled={true}
                dropdownStyle={{ zIndex: 10 ** 4 }}
                style={{ width: '100%' }}
                defaultValue={defaultCourseId}
                options={courses.ids?.map(id_ => {
                    const { courseName, id } = courses.idToCourse?.[id_] || {};
                    return {
                        value: id || 0,
                        label: courseName || '',
                    };
                })}
            />
            <Spacer />
            <div style={{ display: 'flex' }}>
                <FormInputTitle>Classroom</FormInputTitle>
                <Spacer />
            </div>
            <Spacer height={5} />
            <Select
                dropdownStyle={{ zIndex: 10 ** 4 }}
                style={{ width: '100%' }}
                defaultValue={defaultClassroom}
                onChange={value => {
                    updateFormData({ actualClassroom: value });
                }}
                options={classroomOptions.map(classroom => {
                    return {
                        value: classroom,
                        label: classroom,
                    };
                })}
            />
            <Spacer />
            <div style={{ display: 'flex' }}>
                <FormInputTitle>Select a Duration (in minutes)</FormInputTitle>
                <Spacer />
            </div>
            <Spacer height={5} />
            <Select
                dropdownStyle={{ zIndex: 10 ** 4 }}
                defaultValue={defaultMin}
                style={{ width: '100%' }}
                onChange={value => {
                    updateFormData({ min: value });
                }}
                options={durations}
            />
            <Spacer />
            <div style={{ display: 'flex' }}>
                <FormInputTitle>Number of Lessons</FormInputTitle>
                <Spacer />
            </div>
            <Spacer height={5} />
            <Select
                dropdownStyle={{ zIndex: 10 ** 4 }}
                defaultValue={defaultNumOfClasses}
                style={{ width: '100%' }}
                onChange={value => {
                    updateFormData({ numOfClasses: value });
                }}
                options={range({ from: 1, to: 100 }).map(i => ({
                    value: i,
                    label: i + '',
                }))}
            />
            <Spacer />
            <Spacer />
            <Button type="primary" block onClick={submit}>
                Submit
            </Button>
        </Box>
    );
}
