import { Button, Select } from 'antd';
import Spacer from '../../../components/Spacer';
import { useRef } from 'react';
import { CreateStudentRequest, Gender } from '../../../dto/dto';
import FormInputField from '../../../components/FormInputField';
import toastUtil from '../../../utils/toastUtil';
import SectionTitle from '../../../components/SectionTitle';
import AddUserDialog from './AddStudentDialog';
import { useAppDispatch } from '../../../redux/hooks';
import { Box } from '@mui/material';
import FormInputTitle from '../../../components/FormInputTitle';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import { StudentThunkAction } from '../../../redux/slices/studentSlice';
import Label from '../../../components/Label';

const initialDate = '2015-01-01';

export default function AddStudentForm() {
    const dispatch = useAppDispatch();
    const formData = useRef<CreateStudentRequest>({
        gender: 'MALE',
        birthdate: dayjs(new Date(initialDate)).valueOf(),
        chinese_first_name: '',
        chinese_last_name: '',
        first_name: '',
        grade: '',
        last_name: '',
        parent_email: '',
        phone_number: '',
        school_name: '',
        student_code: '',
        wechat_id: '',
    });
    const update = (update_: Partial<CreateStudentRequest>) => {
        formData.current = { ...formData.current, ...update_ };
    };

    const submit = async () => {
        await dispatch(StudentThunkAction.createStudent(formData.current)).unwrap();
        toastUtil.success('User Created');
        AddUserDialog.setOpen(false);
        dispatch(StudentThunkAction.getStudents());
    };

    const dateFormat = 'YYYY-MM-DD';

    return (
        <Box
            style={{
                padding: '40px 80px',
                overflowY: 'auto',
                paddingBottom: 60,
            }}
        >
            <Label label="AddStudentForm.tsx" offsetTop={-20} />
            <SectionTitle>Add Student</SectionTitle>
            <Spacer />
            <FormInputField title="Student Code" onChange={t => update({ student_code: t })} />
            <FormInputField title="Chinese Surname" onChange={t => update({ chinese_last_name: t })} />
            <FormInputField title="Chinese Name" onChange={t => update({ chinese_first_name: t })} />
            <FormInputField title="Last Name" onChange={t => update({ last_name: t })} />
            <FormInputField title="First Name" onChange={t => update({ first_name: t })} />
            <div style={{ display: 'flex' }}>
                <div>
                    <FormInputTitle>Gender</FormInputTitle>
                    <Spacer height={5} />
                    <Select
                        dropdownStyle={{ zIndex: 10 ** 4 }}
                        defaultValue="MALE"
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
                    <FormInputTitle>Birth Date</FormInputTitle>
                    <Spacer height={5} />
                    <DatePicker
                        onChange={val => {
                            formData.current.birthdate = val.valueOf();
                        }}
                        popupStyle={{ zIndex: 10 ** 7 }}
                        defaultValue={dayjs('2015-01-01', dateFormat)}
                    />
                </div>
            </div>
            <Spacer />
            <FormInputField title="Parent Email" onChange={t => update({ parent_email: t })} />
            <FormInputField title="School Name" onChange={t => update({ school_name: t })} />
            <FormInputField
                title="Grade"
                onChange={t => update({ grade: t })}
                remark={`(before ${dayjs(new Date()).format('YYYY')}-09-01)`}
            />
            <FormInputField title="Phone Number" onChange={t => update({ phone_number: t })} />
            <FormInputField title="Wechat Id (Optional)" onChange={t => update({ wechat_id: t })} />
            <Spacer />
            <Spacer />
            <Button type="primary" block onClick={submit}>
                Submit
            </Button>
        </Box>
    );
}
