import { Alert, Button, Select } from 'antd';
import Spacer from '../../../components/Spacer';
import { useEffect, useRef, useState } from 'react';
import { Gender, UpdateStudentRequest } from '../../../dto/dto';
import FormInputField from '../../../components/FormInputField';

import SectionTitle from '../../../components/SectionTitle';

import { useAppDispatch } from '../../../redux/hooks';
import { Box, Collapse } from '@mui/material';
import FormInputTitle from '../../../components/FormInputTitle';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import studentSlice from '../../../redux/slices/studentSlice';
import EditStudentDialog from './EditStudentDialog';
import { Switch } from '@/components/ui/switch';
import { studentApi } from '@/!rtk-query/api/studentApi';
import { useToast } from '@/hooks/use-toast';

export default function EditStudentForm({ studentId }: { studentId: string }) {
    const dispatch = useAppDispatch();
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [deleteStudent] = studentApi.endpoints.deleteStudent.useMutation();
    const { student } = studentApi.endpoints.getStudents.useQuery(undefined, {
        selectFromResult: result => {
            const student = result.data?.studentIdToStudent?.[studentId] || null;
            return { student };
        },
    });
    const { successToast } = useToast();
    const [error, _setError] = useState<Partial<UpdateStudentRequest>>({});
    useEffect(() => {
        if (formData.current) {
            console.log('formData.current:', formData.current);
        }
    }, []);

    const formData = useRef<Partial<UpdateStudentRequest>>({
        id: studentId,
        studentCode: student?.studentCode,
        firstName: student?.firstName,
        lastName: student?.lastName,
        chineseFirstName: student?.chineseFirstName || '',
        chineseLastName: student?.chineseLastName || '',
        gender: student?.gender || 'MALE',
        grade: student?.grade || '',
        birthdate: student?.birthdate || 0,
        parentEmail: student?.parentEmail || '',
        schoolName: student?.schoolName || '',
        phoneNumber: student?.phoneNumber || '',
        wechatId: student?.wechatId || '',
        remark: student?.remark || '',
        shouldAutoRenewPackage: student?.shouldAutoRenewPackage || false,
    });

    const update = (update_: Partial<UpdateStudentRequest>) => {
        console.log('update_:', update_);
        formData.current = {
            ...formData.current, // Merge with existing values
            ...update_, // Override with new updates
        };
        console.log('formData.current:', formData.current);
    };

    const [updateStudent] = studentApi.endpoints.updateStudent.useMutation();

    const submit = async () => {
        console.log('formData.current:', formData.current);
        console.log('Hi!');
        await updateStudent({ studentId, req: formData.current })
            .unwrap()
            .then(() => {
                successToast('User Updated');
                EditStudentDialog.setOpen(false);
                dispatch(studentSlice.actions.resetStudentDetail());
            });
    };
    useEffect(() => {
        if (!student) {
            EditStudentDialog.close();
        }
    }, [student]);

    if (!student) return;

    const displayName = (() => {
        if (student.chineseLastName && student.chineseFirstName) {
            return `${student.chineseLastName} ${student.chineseFirstName}`;
        }
        return `${student.firstName} ${student.lastName}`;
    })();

    return (
        <Box
            style={{
                overflowY: 'auto',
            }}
        >
            <Collapse in={showDeleteConfirmation}>
                <div className="flex items-center mb-4">
                    <Alert
                        className="w-full"
                        showIcon
                        message={`Are you sure to delete student ${displayName}?`}
                        type="warning"
                    />
                </div>
                <div className="flex gap-6 justify-end">
                    <Button onClick={() => setShowDeleteConfirmation(false)}>Cancel</Button>
                    <Button
                        type="primary"
                        onClick={() =>
                            deleteStudent({ studentId })
                                .unwrap()
                                .then(() => {
                                    EditStudentDialog.close();
                                })
                        }
                    >
                        Delete
                    </Button>
                </div>
            </Collapse>

            <Collapse in={!showDeleteConfirmation}>
                <div className="flex items-center justify-between">
                    <SectionTitle>Edit Student Info</SectionTitle>
                    <div className="flex gap-2">
                        {!showDeleteConfirmation && (
                            <>
                                <div>
                                    <Button
                                        type="primary"
                                        className="!bg-red-500"
                                        onClick={async () => {
                                            setShowDeleteConfirmation(true);
                                            // EditStudentDialog.close();
                                            // await deleteStudent({ studentId }).unwrap();
                                        }}
                                    >
                                        Delete Student
                                    </Button>
                                </div>
                                <div className="flex items-center gap-2">
                                    Renew Package
                                    <Switch
                                        id="renewal-status"
                                        defaultChecked={student.shouldAutoRenewPackage}
                                        onCheckedChange={checked => update({ shouldAutoRenewPackage: checked })}
                                    />
                                </div>
                            </>
                        )}
                    </div>
                </div>
                <Spacer />
                <FormInputField
                    title="Student Code"
                    defaultValue={student.studentCode}
                    onChange={t => update({ studentCode: t })}
                    error={error?.['studentCode']}
                />
                <FormInputField
                    title="First Name"
                    defaultValue={student.firstName}
                    onChange={t => update({ firstName: t })}
                    error={error?.['firstName']}
                />
                <FormInputField
                    title="Last Name"
                    defaultValue={student.lastName}
                    onChange={t => update({ lastName: t })}
                    error={error?.['lastName']}
                />
                <FormInputField
                    title="Chinese Last Name"
                    defaultValue={student.chineseLastName}
                    onChange={t => update({ chineseLastName: t })}
                    error={error?.['chineseLastName']}
                />
                <FormInputField
                    title="Chinese First Name"
                    defaultValue={student.chineseFirstName}
                    onChange={t => update({ chineseFirstName: t })}
                    error={error?.['chineseFirstName']}
                />
                <div style={{ display: 'flex' }}>
                    <div>
                        <FormInputTitle>Gender</FormInputTitle>
                        <Spacer height={5} />
                        <Select
                            dropdownStyle={{ zIndex: 10 ** 4 }}
                            defaultValue={student.gender}
                            style={{ width: 130 }}
                            onChange={value => {
                                update({ gender: value as Gender });
                            }}
                            options={[
                                { value: 'MALE', label: 'Male' },
                                { value: 'FEMALE', label: 'Female' },
                            ]}
                        />
                    </div>
                    <Spacer />
                    <div>
                        <FormInputTitle>Date of Birth</FormInputTitle>
                        <Spacer height={5} />
                        <DatePicker
                            onChange={val => {
                                console.log('val.valueOf():', val.valueOf());
                                formData.current.birthdate = val.valueOf();
                            }}
                            popupStyle={{ zIndex: 10 ** 7 }}
                            defaultValue={dayjs(formData.current.birthdate)}
                        />
                    </div>
                </div>
                <Spacer />
                <FormInputField
                    title="Parent Email"
                    defaultValue={student.parentEmail}
                    onChange={t => update({ parentEmail: t })}
                    error={error?.['parentEmail']}
                />
                <FormInputField
                    title="School Name"
                    defaultValue={student.schoolName}
                    onChange={t => update({ schoolName: t })}
                    error={error?.['schoolName']}
                />
                <FormInputTitle>Grade</FormInputTitle>
                <Select
                    dropdownStyle={{ zIndex: 10 ** 4 }}
                    defaultValue={formData.current.grade}
                    style={{ width: 130 }}
                    onChange={value => {
                        update({ grade: value });
                    }}
                    options={[
                        { value: 'K1', label: 'K1' },
                        { value: 'K2', label: 'K2' },
                        { value: 'K3', label: 'K3' },
                        { value: 'P1', label: 'P1' },
                        { value: 'P2', label: 'P2' },
                        { value: 'P3', label: 'P3' },
                        { value: 'P4', label: 'P4' },
                        { value: 'P5', label: 'P5' },
                        { value: 'P6', label: 'P6' },
                        { value: 'F1', label: 'F1' },
                        { value: 'F2', label: 'F2' },
                        { value: 'F3', label: 'F3' },
                        { value: 'F4', label: 'F4' },
                        { value: 'F5', label: 'F5' },
                        { value: 'F6', label: 'F6' },
                        { value: 'G1', label: 'G1' },
                        { value: 'G2', label: 'G2' },
                        { value: 'G3', label: 'G3' },
                        { value: 'G4', label: 'G4' },
                        { value: 'G5', label: 'G5' },
                        { value: 'G6', label: 'G6' },
                        { value: 'G7', label: 'G7' },
                        { value: 'G8', label: 'G8' },
                        { value: 'G9', label: 'G9' },
                        { value: 'G10', label: 'G10' },
                        { value: 'G11', label: 'G11' },
                        { value: 'G12', label: 'G12' },
                    ]}
                />
                <Spacer />
                <FormInputField
                    title="Phone Number"
                    defaultValue={student.phoneNumber}
                    onChange={t => update({ phoneNumber: t })}
                    error={error?.['phoneNumber']}
                />
                <FormInputField
                    title="Wechat Id (Optional)"
                    defaultValue={student.wechatId}
                    onChange={t => update({ wechatId: t })}
                    error={error?.['wechatId']}
                />
                <FormInputField title="Remark" defaultValue={student.remark} onChange={t => update({ remark: t })} />
                <Spacer />
                <Spacer />
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button onClick={() => EditStudentDialog.close()}>Cancel</Button>
                    <Spacer />
                    <Button type="primary" onClick={submit}>
                        Submit
                    </Button>
                </div>
            </Collapse>
        </Box>
    );
}
