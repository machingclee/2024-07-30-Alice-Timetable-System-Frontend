import { Box } from '@mui/material';
import SectionTitle from '../../../../components/SectionTitle';
import Spacer from '../../../../components/Spacer';
import { useEffect, useRef, useState } from 'react';
import { Button, DatePicker, Select } from 'antd';
import EditPackageDialog from './../components/EditPackageDialog';
import FormInputTitle from '../../../../components/FormInputTitle';
import { UpdateStudentPackageRequest } from '../../../../dto/dto';
import range from '../../../../utils/range';
import { Classroom } from '../../../../prismaTypes/types';
import dayjs from 'dayjs';
import { useParams } from 'react-router-dom';
import { courseApi } from '@/!rtk-query/api/courseApi';
import { studentApi } from '@/!rtk-query/api/studentApi';

export default function EditPackageForm(props: { packageId: string }) {
    const { packageId } = props;
    const { studentId } = useParams<{ studentId: string }>();
    // get package info from package id
    const { packageInfo } = studentApi.endpoints.getStudentPackages.useQuery(
        { studentId: studentId || '' },
        {
            skip: !studentId,
            selectFromResult: ({ data }) => {
                return {
                    packageInfo: data?.idToStudentPackage?.[packageId],
                };
            },
        }
    );

    const [error, _] = useState<Partial<UpdateStudentPackageRequest>>({});
    const { data: courses } = courseApi.endpoints.getCourses.useQuery();
    const formData = useRef<Partial<UpdateStudentPackageRequest>>({});
    const updateFormData = (update: Partial<UpdateStudentPackageRequest>) => {
        formData.current = { ...formData.current, ...update };
    };
    // update package mutation
    const [updatePackage] = studentApi.endpoints.updatePackage.useMutation();
    const submit = async () => {
        if (!packageInfo) {
            return;
        }
        const reqBody: UpdateStudentPackageRequest = {
            id: parseInt(packageId),
            expiry_date: formData.current.expiry_date || packageInfo.studentPackage.expiryDate,
            course_id: formData.current.course_id || packageInfo.packageId,
            start_date: formData.current.start_date || packageInfo.studentPackage.startDate,
            num_of_classes: formData.current.num_of_classes || packageInfo.studentPackage.numOfClasses,
            min: formData.current.min || packageInfo.studentPackage.min,
            default_classroom: formData.current.default_classroom || packageInfo.studentPackage.defaultClassroom,
        };
        EditPackageDialog.setOpen(false);
        await updatePackage({ req: reqBody }).unwrap();
    };

    const classroomOptions: Classroom[] = ['PRINCE_EDWARD', 'CAUSEWAY_BAY'];

    useEffect(() => {
        if (packageInfo) {
            formData.current.course_id = packageInfo.course.id;
            formData.current.start_date = packageInfo.studentPackage.startDate;
            formData.current.num_of_classes = packageInfo.studentPackage.numOfClasses;
            formData.current.min = packageInfo.studentPackage.min;
            formData.current.default_classroom = packageInfo.studentPackage.defaultClassroom;
            formData.current.expiry_date = packageInfo.studentPackage.expiryDate;
        }
    }, [packageInfo]);

    return (
        <Box
            style={{
                width: '100%',
                overflowY: 'auto',
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
                options={courses?.ids?.map(id_ => {
                    const { courseName, id } = courses?.idToCourse?.[id_] || {};
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
            {packageInfo?.studentPackage.expiryDate != null && (
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
