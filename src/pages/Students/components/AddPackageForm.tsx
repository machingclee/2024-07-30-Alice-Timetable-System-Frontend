import { Button, DatePicker, Select } from 'antd';
import Spacer from '../../../components/Spacer';
import { useRef, useState } from 'react';
import SectionTitle from '../../../components/SectionTitle';
import { useAppDispatch } from '../../../redux/hooks';
import { Autocomplete, Box, TextField } from '@mui/material';
import FormInputTitle from '../../../components/FormInputTitle';
import studentSlice from '../../../redux/slices/studentSlice';
import { TimePicker } from 'antd';
import { CreateStudentPackageRequest } from '../../../dto/dto';
import dayjs from 'dayjs';
import AddPackageDialog from './AddPackageDialog';
import { Classroom } from '../../../prismaTypes/types';
import { IoIosInformationCircle } from 'react-icons/io';
import colors from '../../../constant/colors';
import toastUtil from '../../../utils/toastUtil';
import useAnchorTimestamp from '../../../hooks/useStudentDetailPathParam';
import { courseApi } from '@/!rtk-query/api/courseApi';
import { studentApi } from '@/!rtk-query/api/studentApi';

// Function to convert timestamp to the start of the day (midnight)
const toMidnight = (timestamp: number): number => {
    // Create a dayjs object from the timestamp
    const date = dayjs(timestamp);

    // Set the time to midnight
    const midnight = date.hour(0).minute(0).second(0).millisecond(0);

    // Return the Unix timestamp in milliseconds
    return midnight.valueOf();
};

export default function AddPackageForm(props: { studentId: string; studentName: string }) {
    const { studentName, studentId } = props;
    const [error, _] = useState<Partial<CreateStudentPackageRequest>>({});
    const { setURLAnchorTimestamp } = useAnchorTimestamp();
    const dispatch = useAppDispatch();
    const { courses } = courseApi.endpoints.getCourses.useQuery(undefined, {
        selectFromResult: result => {
            const courses = result?.data;
            return { courses };
        },
    });
    const [createStudentPackage] = studentApi.endpoints.createStudentPackage.useMutation();
    const formData = useRef<Partial<CreateStudentPackageRequest>>({});
    const updateFormData = (update: Partial<CreateStudentPackageRequest>) => {
        formData.current = { ...formData.current, ...update };
    };

    const submit = async () => {
        const { course_id, min, start_date, num_of_classes, start_time, default_classroom } = formData.current || {};

        if (!(course_id != null && min != null && num_of_classes != null && default_classroom != null)) {
            toastUtil.error('None of the field can be empty.');
            return;
        }
        console.log('Hi!');
        // Solve the issue of chosen start_time starts from today, not from the start_date
        const chosenStartTimeResolvingUndefinedIssue = start_time ? start_time : dayjs('09:00', 'HH:mm').valueOf();
        const chosenStartDateResolvingUndefinedIssue = start_date ? start_date : toMidnight(new Date().getTime());
        const timestampToAdd =
            chosenStartTimeResolvingUndefinedIssue -
            toMidnight(start_time ? start_time : dayjs('09:00', 'HH:mm').valueOf());
        const realStartTime = chosenStartDateResolvingUndefinedIssue + timestampToAdd;

        const reqBody: CreateStudentPackageRequest = {
            num_of_classes,
            course_id,
            min,
            start_date: chosenStartDateResolvingUndefinedIssue,
            start_time: realStartTime,
            default_classroom,
        };
        console.log('reqBody:', reqBody);
        AddPackageDialog.setOpen(false);
        const result = await createStudentPackage({ req: reqBody, studentId }).unwrap();
        toastUtil.success('Package added successfully.');
        dispatch(
            studentSlice.actions.setSelectedPackageAndActiveAnchorTimestamp({
                type: 'go-to-target-lesson',
                packageId: result.id + '',
                setURLAnchorTimestamp: setURLAnchorTimestamp,
                desiredAnchorTimestamp: result.startDate,
            })
        );
    };

    const allowedOptionsForNumberOfClasses = [1, 7, 15, 30, 50];

    const classroomOptions: Classroom[] = ['PRINCE_EDWARD', 'CAUSEWAY_BAY'];

    return (
        <Box
            style={{
                overflowY: 'auto',
            }}
        >
            <SectionTitle>Add Student Package for {studentName}</SectionTitle>
            <Spacer />
            <div style={{ display: 'flex' }}>
                <FormInputTitle>Select a Course</FormInputTitle>
                <Spacer />
                {error.course_id && <div>{error.course_id}</div>}
            </div>
            <Spacer height={5} />
            <Select
                dropdownStyle={{ zIndex: 10 ** 4 }}
                style={{ width: '100%' }}
                onChange={value => {
                    updateFormData({ course_id: value });
                }}
                options={courses?.ids?.map(id_ => {
                    const { courseName, id } = courses.idToCourse?.[id_] || {};
                    return {
                        value: id || 0,
                        label: courseName || '',
                    };
                })}
            />
            <Spacer />
            <FormInputTitle>Start Date</FormInputTitle>
            <Spacer height={5} />
            <DatePicker
                disabledDate={_ => {
                    // Can't select days before today
                    // return current && current < dayjs().startOf('day');
                    return false;
                }}
                onChange={val => {
                    formData.current.start_date = val.valueOf();
                }}
                popupStyle={{ zIndex: 10 ** 7 }}
                // defaultValue={dayjs(new Date())}
            />
            <Spacer />
            <FormInputTitle>Start Time</FormInputTitle>
            <Spacer height={5} />
            <Box style={{ display: 'flex', alignItems: 'center' }}>
                {/* used <style></style> in index.html to forcefully remove 00-08 and 20-24 */}
                <TimePicker
                    onChange={val => {
                        formData.current.start_time = val.valueOf();
                    }}
                    minuteStep={15}
                    // defaultValue={dayjs("09:00", "HH:mm")}
                    format={'HH:mm'}
                    popupClassName="custome-timepicker"
                    popupStyle={{ zIndex: 10 ** 7 }}
                />
                <Spacer width={15} />
                <div
                    style={{
                        color: colors.GREY_DEEP,
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <IoIosInformationCircle size={20} /> <Spacer width={5} /> (double click to confirm)
                </div>
            </Box>
            <Spacer />
            <div style={{ display: 'flex' }}>
                <FormInputTitle>Select a Duration (in minutes)</FormInputTitle>
                <Spacer />
                {error.min && <div>{error.min}</div>}
            </div>
            <Spacer height={5} />
            <Select
                dropdownStyle={{ zIndex: 10 ** 4 }}
                style={{ width: '100%' }}
                onChange={value => {
                    updateFormData({ min: value });
                }}
                options={[
                    { value: 45, label: '45' },
                    { value: 60, label: '60' },
                    { value: 75, label: '75' },
                ]}
            />
            <Spacer />
            <div style={{ display: 'flex' }}>
                <FormInputTitle>Select Number of Classes</FormInputTitle>
            </div>
            <Spacer height={5} />
            <Autocomplete
                size="small"
                style={{ width: '100%' }}
                disablePortal
                options={allowedOptionsForNumberOfClasses}
                getOptionLabel={option => option.toString()}
                freeSolo
                onChange={(_, newValue) => {
                    if (Number.isNaN(Number(newValue))) {
                        toastUtil.error(`${newValue} is an invalid input`);
                    } else {
                        updateFormData({ num_of_classes: Number(newValue) });
                    }
                }}
                sx={{ width: 300 }}
                renderInput={params => <TextField {...params} />}
            />
            <Spacer />
            <div style={{ display: 'flex' }}>
                <FormInputTitle>Select Default Classroom</FormInputTitle>
            </div>
            <Spacer height={5} />
            <Select
                dropdownStyle={{ zIndex: 10 ** 4 }}
                style={{ width: '100%' }}
                onChange={value => {
                    updateFormData({ default_classroom: value });
                }}
                options={classroomOptions.map(value => ({
                    value: value,
                    label: `${value}`,
                }))} // Map allowed options to Select options
            />
            <Spacer />
            <Spacer />
            <Button type="primary" block onClick={submit}>
                Submit
            </Button>
        </Box>
    );
}
