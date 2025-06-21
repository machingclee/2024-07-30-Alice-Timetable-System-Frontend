import { Select, Switch } from 'antd';
import Spacer from '../../../components/Spacer';
import { useRef } from 'react';
import { CreateStudentRequest, Gender } from '../../../dto/dto';
import FormInputField from '../../../components/FormInputField';
import toastUtil from '../../../utils/toastUtil';
import SectionTitle from '../../../components/SectionTitle';
import { Box } from '@mui/material';
import FormInputTitle from '../../../components/FormInputTitle';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import { studentsApi } from '../../../redux/slices/studentSlice';
import { AliceModalProps } from '../../../components/AliceModalTrigger';

const initialDate = '2015-01-01';

export default function AddStudentModal(props: AliceModalProps) {
    const { setOkText, setOnOk } = props;
    const formData = useRef<CreateStudentRequest>({
        gender: 'MALE',
        preferred_name: '',
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
        shouldAutoRenewPackage: false,
    });

    const update = (update_: Partial<CreateStudentRequest>) => {
        formData.current = { ...formData.current, ...update_ };
    };

    const [createStudentMutation] = studentsApi.endpoints.createStudent.useMutation();

    const submit = async () => {
        const wechatId = formData.current.wechat_id?.trim();
        const createStudetnRequest = { ...formData.current, wechat_id: wechatId ? wechatId : null };
        await createStudentMutation(createStudetnRequest).unwrap();
        toastUtil.success('User Created');
    };

    const dateFormat = 'YYYY-MM-DD';
    setOkText('Ok');
    setOnOk(submit);

    return (
        <Box
            style={{
                overflowY: 'auto',
            }}
        >
            <SectionTitle>Add Student</SectionTitle>
            <Spacer />
            <FormInputField title="Student Code*" onChange={t => update({ student_code: t })} />
            <FormInputField title="Preferred Name*" onChange={t => update({ preferred_name: t })} />
            <div style={{ display: 'flex' }}>
                <FormInputField title="姓氏*" onChange={t => update({ chinese_last_name: t })} />
                <Spacer />
                <FormInputField title="名字*" onChange={t => update({ chinese_first_name: t })} style={{ flex: 1 }} />
            </div>
            <div style={{ display: 'flex', marginTop: -15 }}>
                <FormInputField title="Last Name" onChange={t => update({ last_name: t })} />
                <Spacer />
                <FormInputField title="First Name" onChange={t => update({ first_name: t })} style={{ flex: 1 }} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <div> Auto Renew Packages?</div>
                <Spacer />
                <Switch
                    size="small"
                    defaultValue={false}
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
            <FormInputField title="Phone Number*" onChange={t => update({ phone_number: t })} />
            <FormInputField title="Wechat Id (Optional)" onChange={t => update({ wechat_id: t })} />
        </Box>
    );
}
