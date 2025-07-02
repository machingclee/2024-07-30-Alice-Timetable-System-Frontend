import { Select, Switch } from 'antd';
import Spacer from '../../../components/Spacer';
import { CreateStudentRequest, Gender } from '../../../dto/dto';
import FormInputField from '../../../components/FormInputField';
import toastUtil from '../../../utils/toastUtil';
import SectionTitle from '../../../components/SectionTitle';
import { Box } from '@mui/material';
import FormInputTitle from '../../../components/FormInputTitle';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import { AliceModalProps } from '../../../components/AliceModalTrigger';
import { studentApi } from '@/!rtk-query/api/studentApi';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import studentSlice from '@/redux/slices/studentSlice';

export default function AddStudentModal(props: AliceModalProps) {
    const { setOkText, setOnOk, setOnClose } = props;

    const dispatch = useAppDispatch();
    const formData = useAppSelector(state => state.student.addStudentForm);

    const update = (update_: Partial<CreateStudentRequest>) => {
        dispatch(studentSlice.actions.updateAddStudentForm(update_));
    };

    const [createStudentMutation] = studentApi.endpoints.createStudent.useMutation();

    const submit = async () => {
        const wechatId = formData.wechat_id?.trim();
        const createStudetnRequest = { ...formData, wechat_id: wechatId ? wechatId : null };
        await createStudentMutation(createStudetnRequest).unwrap();
        dispatch(studentSlice.actions.resetAddStudentForm());
        toastUtil.success('User Created');
    };
    const resetForm = () => {
        dispatch(studentSlice.actions.resetAddStudentForm());
    };

    setOkText('Ok');
    setOnOk(submit);
    setOnClose(resetForm);

    return (
        <Box
            style={{
                overflowY: 'auto',
            }}
        >
            <SectionTitle>Add Student</SectionTitle>
            <Spacer />
            <FormInputField
                title="Student Code*"
                value={formData.student_code}
                onChange={t => update({ student_code: t })}
            />
            <FormInputField
                title="Preferred Name*"
                value={formData.preferred_name}
                onChange={t => update({ preferred_name: t })}
            />
            <div style={{ display: 'flex' }}>
                <FormInputField
                    title="姓氏*"
                    value={formData.chinese_last_name}
                    onChange={t => update({ chinese_last_name: t })}
                />
                <Spacer />
                <FormInputField
                    title="名字*"
                    value={formData.chinese_first_name}
                    onChange={t => update({ chinese_first_name: t })}
                    style={{ flex: 1 }}
                />
            </div>
            <div style={{ display: 'flex', marginTop: -15 }}>
                <FormInputField title="Last Name" value={formData.last_name} onChange={t => update({ last_name: t })} />
                <Spacer />
                <FormInputField
                    title="First Name"
                    value={formData.first_name}
                    onChange={t => update({ first_name: t })}
                    style={{ flex: 1 }}
                />
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <div> Auto Renew Packages?</div>
                <Spacer />
                <Switch
                    size="small"
                    value={formData.shouldAutoRenewPackage}
                    onChange={checked => {
                        update({ shouldAutoRenewPackage: checked });
                    }}
                />
            </div>

            <Spacer />

            <div style={{ display: 'flex' }}>
                <div>
                    <FormInputTitle>Gender</FormInputTitle>
                    <Spacer height={5} />
                    <Select
                        dropdownStyle={{ zIndex: 10 ** 4 }}
                        value={formData.gender}
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
                            update({ birthdate: val.valueOf() });
                        }}
                        value={dayjs(formData.birthdate)}
                        popupStyle={{ zIndex: 10 ** 7 }}
                    />
                </div>
            </div>
            <Spacer />
            <FormInputField
                title="Parent Email"
                value={formData.parent_email}
                onChange={t => update({ parent_email: t })}
            />
            <FormInputField
                title="School Name"
                value={formData.school_name}
                onChange={t => update({ school_name: t })}
            />
            <FormInputField
                title="Grade"
                value={formData.grade}
                onChange={t => update({ grade: t })}
                remark={`(before ${dayjs(new Date()).format('YYYY')}-09-01)`}
            />
            <FormInputField
                title="Phone Number*"
                value={formData.phone_number}
                onChange={t => update({ phone_number: t })}
            />
            <FormInputField
                title="Wechat Id (Optional)"
                value={formData.wechat_id || ''}
                onChange={t => update({ wechat_id: t })}
            />
        </Box>
    );
}
