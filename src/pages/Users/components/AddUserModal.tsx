import { Select } from 'antd';
import Spacer from '../../../components/Spacer';
import { useRef, useState } from 'react';
import { CreateUserRequest, RoleInSystem } from '../../../dto/dto';
import FormInputField from '../../../components/FormInputField';
import toastUtil from '../../../utils/toastUtil';
import SectionTitle from '../../../components/SectionTitle';
import AddUserDialog from './AddUserDialog';
import { Box } from '@mui/material';
import FormInputTitle from '../../../components/FormInputTitle';
import { AliceModalProps } from '../../../components/AliceModalTrigger';
import { userApi } from '@/!rtk-query/api/userApi';

export default function AddUserModal(props: AliceModalProps) {
    const { setOnOk: setOnOk, setOkText } = props;
    const formData = useRef<Partial<CreateUserRequest>>({
        role_in_system: 'STAFF',
    });
    const [error, _setError] = useState<Partial<CreateUserRequest>>({});
    const update = (update_: Partial<CreateUserRequest>) => {
        formData.current = { ...formData.current, ...update_ };
    };
    const handleChange = (value: string) => {
        update({ role_in_system: value as RoleInSystem });
    };

    const roleSelections: { value: RoleInSystem; label: string }[] = [
        { value: 'STAFF', label: 'Staff' },
        { value: 'ADMIN', label: 'Admin' },
        { value: 'SUPER_ADMIN', label: 'Super Admin' },
    ];

    const [createUserMutation] = userApi.endpoints.createUser.useMutation();

    const submit = async () => {
        await createUserMutation(formData.current as CreateUserRequest).unwrap();
        AddUserDialog.setOpen(false);
        toastUtil.success('User Created');
    };
    setOnOk(submit);
    setOkText('Submit');

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
            <SectionTitle>Add Staff</SectionTitle>
            <Spacer />
            <FormInputField
                title="English First Name"
                onChange={t => update({ first_name: t })}
                error={error?.['first_name']}
            />
            <FormInputField
                title="English Last Name"
                onChange={t => update({ last_name: t })}
                error={error?.['last_name']}
            />
            <FormInputField
                title="Chinese First Name"
                onChange={t => update({ chinese_first_name: t })}
                error={error?.['chinese_first_name']}
            />
            <FormInputField
                title="Chinese Last Name"
                onChange={t => update({ chinese_last_name: t })}
                error={error?.['chinese_last_name']}
            />
            <FormInputField
                title="Company Email"
                onChange={t => update({ company_email: t })}
                error={error?.['company_email']}
            />
            <FormInputField title="Password" onChange={t => update({ password: t })} error={error?.['password']} />
            <FormInputField
                title="Phone Number"
                onChange={t => update({ mobile_number: t })}
                error={error?.['mobile_number']}
            />
            <FormInputField
                title="Role In Company"
                onChange={t => update({ role_in_company: t })}
                error={error?.['role_in_company']}
            />
            <FormInputTitle>Role in System</FormInputTitle>
            <Spacer height={5} />
            <Select
                dropdownStyle={{ zIndex: 10 ** 4 }}
                defaultValue="STAFF"
                style={{ width: 130 }}
                onChange={handleChange}
                options={roleSelections}
            />
            <Spacer />
            <Spacer />
        </Box>
    );
}
