import { Box } from '@mui/material';
import SectionTitle from '../../../../components/SectionTitle';
import Spacer from '../../../../components/Spacer';
import { useEffect, useRef, useState } from 'react';
import { Button, DatePicker, Select } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { StudentThunkAction } from '../../../../redux/slices/studentSlice';
import EditPackageDialog from './../components/EditPackageDialog';
import FormInputTitle from '../../../../components/FormInputTitle';
import { UpdateStudentPackageRequest } from '../../../../dto/dto';
import { CourseThunkAction } from '../../../../redux/slices/courseSlice';
import range from '../../../../utils/range';
import { Classroom } from '../../../../prismaTypes/types';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';

export default function EditPackageForm(props: { packageId: string }) {
    const { packageId } = props;
    const { studentId } = useParams<{ studentId: string }>();
    const packageInfo = useAppSelector(
        s => s.student.studentDetailTimetablePage.studentPackages.idToPackageResponse?.[packageId]
    );

    const [error, _] = useState<Partial<UpdateStudentPackageRequest>>({});
    const dispatch = useAppDispatch();
    const classes = useAppSelector(s => s.class.courses);
    const formData = useRef<Partial<UpdateStudentPackageRequest>>({});
    const updateFormData = (update: Partial<UpdateStudentPackageRequest>) => {
        formData.current = { ...formData.current, ...update };
    };

    const submit = async () => {
        if (!packageInfo) {
            return;
        }
        const reqBody: UpdateStudentPackageRequest = {
            id: parseInt(packageId),
            course_id: formData.current.course_id || packageInfo.packageId,
            start_date: formData.current.start_date || packageInfo.studentPackage.startDate,
            num_of_classes: formData.current.num_of_classes || packageInfo.studentPackage.numOfClasses,
            min: formData.current.min || packageInfo.studentPackage.min,
            default_classroom: formData.current.default_classroom || packageInfo.studentPackage.defaultClassroom,
            student_id: packageInfo.student.id,
            expiry_date: formData.current.expiry_date || 0,
        };
        EditPackageDialog.setOpen(false);
        await dispatch(StudentThunkAction.updatePackage(reqBody)).unwrap();
        await dispatch(
            StudentThunkAction.getStudentPackages({
                studentId: studentId || '',
            })
        );
    };

    useEffect(() => {
        dispatch(CourseThunkAction.getCourses());
    }, [dispatch]);

    const classroomOptions: Classroom[] = ['PRINCE_EDWARD', 'CAUSEWAY_BAY'];

    return (
        <Box
            style={{
                maxWidth: 400,
                width: 600,
                padding: '40px 80px',
                overflowY: 'auto',
                paddingBottom: 60,
            }}
        >
            <SectionTitle>Edit Package Information</SectionTitle>
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
                defaultValue={packageInfo?.course.id}
                onChange={value => {
                    updateFormData({ course_id: value });
                }}
                options={classes.ids?.map(id_ => {
                    const { courseName, id } = classes.idToCourse?.[id_] || {};
                    return {
                        value: id || 0,
                        label: courseName || '',
                    };
                })}
            />
            <Spacer />
            {/* <FormInputTitle>Start Date</FormInputTitle>
            <Spacer height={5} />
            <DatePicker
                onChange={(val) => {
                    formData.current.start_date = val.valueOf();
                }}
                popupStyle={{ zIndex: 10 ** 7 }}
                defaultValue={currentPackage?.start_date ? dayjs(new Date(currentPackage?.start_date)) : dayjs(new Date())}
            />
            <Spacer /> */}

            <div style={{ display: 'flex' }}>
                <FormInputTitle>Select a Duration (in minutes)</FormInputTitle>
                <Spacer />
                {error.min && <div>{error.min}</div>}
            </div>
            <Spacer height={5} />
            <Select
                disabled={true}
                dropdownStyle={{ zIndex: 10 ** 4 }}
                style={{ width: '100%' }}
                onChange={value => {
                    updateFormData({ min: value });
                }}
                defaultValue={packageInfo?.studentPackage.min}
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
            <Select
                dropdownStyle={{ zIndex: 10 ** 4 }}
                style={{ width: '100%' }}
                defaultValue={packageInfo?.studentPackage.numOfClasses}
                onChange={value => {
                    updateFormData({ num_of_classes: value });
                }}
                options={range({ from: 1, to: 100 }).map(value => ({
                    value,
                    label: value + '',
                }))}
            />
            <Spacer />
            <div style={{ display: 'flex' }}>
                <FormInputTitle>Select Classroom</FormInputTitle>
            </div>
            <Spacer height={5} />
            <Select
                dropdownStyle={{ zIndex: 10 ** 4 }}
                style={{ width: '100%' }}
                defaultValue={packageInfo?.studentPackage.defaultClassroom}
                onChange={value => {
                    updateFormData({ default_classroom: value });
                }}
                options={classroomOptions.map(value => ({
                    value,
                    label: value,
                }))}
            />
            <Spacer />
            {packageInfo?.studentPackage.expiryDate && (
                <>
                    <div style={{ display: 'flex' }}>
                        <FormInputTitle>Update Expiry Date</FormInputTitle>
                    </div>
                    <Spacer height={5} />
                    <DatePicker
                        onChange={val => {
                            updateFormData({ expiry_date: val.valueOf() });
                        }}
                        popupStyle={{ zIndex: 10 ** 7 }}
                        defaultValue={dayjs(packageInfo?.studentPackage.expiryDate)}
                    />
                </>
            )}

            <Spacer />
            <Spacer />
            <Button type="primary" block onClick={submit}>
                Submit
            </Button>
        </Box>
    );
}
