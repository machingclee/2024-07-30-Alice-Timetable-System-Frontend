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
import Label from '../../../components/Label';
import EditStudentDialog from './EditStudentDialog';

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
        student_code: student?.studentCode,
        first_name: student?.firstName,
        last_name: student?.lastName,
        chinese_first_name: student?.chineseFirstName || '',
        chinese_last_name: student?.chineseLastName || '',
        gender: student?.gender || 'MALE',
        grade: student?.grade || '',
        birthdate: student?.birthdate || 0,
        parent_email: student?.parentEmail || '',
        school_name: student?.schoolName || '',
        phone_number: student?.phoneNumber || '',
        wechat_id: student?.wechatId || '',
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
                dispatch(studentSlice.actions.resetStudentDetail);
            });
    };

    return (
        <Box
            style={{
                padding: '40px 80px',
                overflowY: 'auto',
                paddingBottom: 60,
            }}
        >
            <Label label="EditStudentForm.tsx" offsetTop={-20} />
            <SectionTitle>Edit Student Info</SectionTitle>
            <Spacer />
            <FormInputField
                title="Student Code"
                defaultValue={student.studentCode}
                onChange={t => update({ student_code: t })}
                error={error?.['student_code']}
            />
            <FormInputField
                title="First Name"
                defaultValue={student.firstName}
                onChange={t => update({ first_name: t })}
                error={error?.['first_name']}
            />
            <FormInputField
                title="Last Name"
                defaultValue={student.lastName}
                onChange={t => update({ last_name: t })}
                error={error?.['last_name']}
            />
            <FormInputField
                title="Chinese Last Name"
                defaultValue={student.chineseLastName}
                onChange={t => update({ chinese_last_name: t })}
                error={error?.['chinese_first_name']}
            />
            <FormInputField
                title="Chinese First Name"
                defaultValue={student.firstName}
                onChange={t => update({ chinese_first_name: t })}
                error={error?.['chinese_last_name']}
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
                onChange={t => update({ parent_email: t })}
                error={error?.['parent_email']}
            />
            <FormInputField
                title="School Name"
                defaultValue={student.schoolName}
                onChange={t => update({ school_name: t })}
                error={error?.['school_name']}
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
                onChange={t => update({ phone_number: t })}
                error={error?.['phone_number']}
            />
            <FormInputField
                title="Wechat Id (Optional)"
                defaultValue={student.wechatId}
                onChange={t => update({ wechat_id: t })}
                error={error?.['wechat_id']}
            />
            <Spacer />
            <Spacer />
            <Button type="primary" block onClick={submit}>
                Submit
            </Button>
        </Box>
    );
}
