import { Button, Select } from 'antd';
import Spacer from '../components/Spacer';
import { useRef } from 'react';
import SectionTitle from '../components/SectionTitle';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { Box } from '@mui/material';
import FormInputTitle from '../components/FormInputTitle';
import { studentApi } from '../!rtk-query/api/studentApi';
import toastUtil from '../utils/toastUtil';
import AddClassEventDialog from '../components/AddClassEventDialog';
import { CreateClassRequest } from '../dto/dto';
import durations from '../constant/durations';
import dayjs from 'dayjs';
import range from '../utils/range';
import { Classroom } from '../prismaTypes/types';
import appSlice from '../redux/slices/appSlice';
import { courseApi } from '@/!rtk-query/api/courseApi';

export default function AddClassEventForm(props: {
    isTimeslotInThePast: boolean;
    dayUnixTimestamp: number;
    hourUnixTimestamp: number;
    studentId: string;
    resetDefaultNumOfClasses?: boolean;
}) {
    const { dayUnixTimestamp, hourUnixTimestamp, studentId, resetDefaultNumOfClasses, isTimeslotInThePast } = props;
    const selectedPackageId = useAppSelector(s => s.student.studentDetailTimetablePage.selectedPackageId);
    const [addClass] = studentApi.endpoints.addClass.useMutation();
    const { selectedPackageDetail: selectedPackageDetail } = studentApi.endpoints.getStudentPackages.useQuery(
        { studentId },
        {
            selectFromResult: result => {
                const { idToStudentPackage } = result?.data || {};
                const studentPackage = idToStudentPackage?.[selectedPackageId];
                return { selectedPackageDetail: studentPackage };
            },
            skip: !selectedPackageId,
        }
    );
    const defaultClassroom = selectedPackageDetail?.studentPackage.defaultClassroom;
    const defaultCourseId = selectedPackageDetail?.course.id;
    const defaultMin = selectedPackageDetail?.studentPackage.min;

    const defaultNumOfClasses_ = selectedPackageDetail?.studentPackage.numOfClasses || 1;
    const defaultNumOfClasses = resetDefaultNumOfClasses ? 1 : defaultNumOfClasses_;

    const dispatch = useAppDispatch();
    const { courses } = courseApi.endpoints.getCourses.useQuery(undefined, {
        selectFromResult: result => {
            const { idToCourse, ids } = result?.data || {};
            return { courses: { idToCourse, ids } };
        },
    });
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
        const createClassForm = formData.current as CreateClassRequest;
        try {
            AddClassEventDialog.setOpen(false);
            await addClass({ studentId, createClassRequest: createClassForm }).unwrap();
            toastUtil.success('Class Created');
        } finally {
            dispatch(appSlice.actions.setLoading(false));
        }
    };

    const classroomOptions: Classroom[] = ['PRINCE_EDWARD', 'CAUSEWAY_BAY'];

    return (
        <Box
            style={{
                overflowY: 'auto',
            }}
        >
            <SectionTitle>
                {isTimeslotInThePast ? 'Insert historical record at' : 'Add Class at'}{' '}
                {dayjs(hourUnixTimestamp).format('HH:mm')}
            </SectionTitle>
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
