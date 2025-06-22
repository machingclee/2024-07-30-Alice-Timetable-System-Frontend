import { Button, Select } from 'antd';
import Spacer from '../../../components/Spacer';
import { useEffect, useRef, useState } from 'react';
import { Gender, UpdateStudentRequest } from '../../../dto/dto';
import FormInputField from '../../../components/FormInputField';
import toastUtil from '../../../utils/toastUtil';
import SectionTitle from '../../../components/SectionTitle';

import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { Box } from '@mui/material';
import FormInputTitle from '../../../components/FormInputTitle';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import studentSlice, { StudentThunkAction } from '../../../redux/slices/studentSlice';
import EditStudentDialog from './EditStudentDialog';
import { Switch } from '@/components/ui/switch';

export default function EditStudentForm({ studentId }: { studentId: string }) {
    const dispatch = useAppDispatch();
    const student = useAppSelector(s => s.student.students.idToStudent?.[studentId]);
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
    });

    if (!student) return;

    const update = (update_: Partial<UpdateStudentRequest>) => {
        console.log('update_:', update_);
        formData.current = {
            ...formData.current, // Merge with existing values
            ...update_, // Override with new updates
        };
        console.log('formData.current:', formData.current);
    };

    const submit = async () => {
        console.log('formData.current:', formData.current);
        console.log('Hi!');
        dispatch(StudentThunkAction.updateStudent(formData.current))
            .unwrap()
            .then(() => {
                toastUtil.success('User Created');
                EditStudentDialog.setOpen(false);
                dispatch(studentSlice.actions.resetStudentDetail());
            });
    };

    return (
        <Box
            style={{
                overflowY: 'auto',
            }}
        >
            <div className="flex items-center justify-between">
                <SectionTitle>Edit Student Info</SectionTitle>
                <div>
                    <div className="flex items-center gap-2">
                        Rew Package
                        <Switch id="renewal-status" />
                    </div>
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
                error={error?.['chineseFirstName']}
            />
            <FormInputField
                title="Chinese First Name"
                defaultValue={student.firstName}
                onChange={t => update({ chineseFirstName: t })}
                error={error?.['chineseLastName']}
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
            <FormInputField
                title="Grade"
                defaultValue={student.grade}
                onChange={t => update({ grade: t })}
                error={error?.['grade']}
            />
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
            <Spacer />
            <Spacer />
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button onClick={() => EditStudentDialog.close()}>Cancel</Button>
                <Spacer />
                <Button type="primary" onClick={submit}>
                    Submit
                </Button>
            </div>
        </Box>
    );
}
