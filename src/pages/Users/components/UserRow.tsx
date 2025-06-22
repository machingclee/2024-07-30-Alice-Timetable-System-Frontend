import { Box } from '@mui/material';
import { LuCat } from 'react-icons/lu';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { useCallback, useEffect, useRef, useState } from 'react';
import { RoleInSystem, UserDTO } from '../../../dto/dto';
import { Button, Input, Select } from 'antd';
import Spacer from '../../../components/Spacer';
import lodash, { debounce } from 'lodash';
import { userApi } from '@/!!rtk-query/api/userApi';
import toastUtil from '@/utils/toastUtil';
import authSlice from '@/redux/slices/authSlice';

export default function UserRow(props: { email: string }) {
    const { email: email } = props;
    const authData = useAppSelector(s => s.auth.user);
    const [hasDistinction, setHasDistinction] = useState(false);
    const [startEdit, setStartEdit] = useState(false);
    const dispatch = useAppDispatch();
    const [updateUserMutation] = userApi.endpoints.updateUser.useMutation();

    const { user } = userApi.endpoints.getUsers.useQuery(undefined, {
        selectFromResult: result => {
            const user = result.data?.userToUser?.[email] || null;
            return { user };
        },
    });

    const formData = useRef(user);

    const checkDataDistinction = useCallback(
        debounce(() => {
            const oldData = user;
            const newData = formData.current;
            const hasDistinction_ = !lodash.isEqual(oldData, newData);
            setHasDistinction(hasDistinction_);
        }, 300),
        [user]
    );

    const onFieldUpdate = (update: Partial<UserDTO>) => {
        if (!formData.current) {
            return;
        }
        formData.current = { ...formData.current, ...update };
        checkDataDistinction();
    };

    const roleSelections: { value: RoleInSystem; label: string }[] = [
        { value: 'STAFF', label: 'Staff' },
        { value: 'ADMIN', label: 'Admin' },
        { value: 'SUPER_ADMIN', label: 'Super Admin' },
    ];

    const handleSymRoleChange = (value: string) => {
        onFieldUpdate({ roleInSystem: value as RoleInSystem });
    };

    const submitUpdate = async () => {
        if (!user) {
            return;
        }
        const updatedUser = await updateUserMutation({ ...user, ...formData.current }).unwrap();
        toastUtil.success('User Updated');
        dispatch(authSlice.actions.updateAuthData(updatedUser));
        setStartEdit(false);
    };

    useEffect(() => {
        if (startEdit) {
            formData.current = user;
        }
    }, [startEdit, user]);

    useEffect(() => {
        checkDataDistinction();
    }, [startEdit, checkDataDistinction]);

    if (!user) {
        return null;
    }

    return (
        <div className="bg-white shadow-sm rounded-md border-1 border-teal-400 overflow-hidden">
            <div className="flex bg-emerald-50 border-b-[1px] border-emerald-200 px-4 py-1.5 items-center justify-between">
                <div className="flex items-center gap-2 text-xl ">
                    <LuCat />
                    {!startEdit && <td>{`${user.firstName} ${user.lastName}`}</td>}
                    {startEdit && (
                        <>
                            <div className="w-full flex">
                                <div>
                                    <Input
                                        defaultValue={user.firstName}
                                        onChange={e =>
                                            onFieldUpdate({
                                                firstName: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <Spacer height={1} width={15} />
                                <div>
                                    <Input
                                        defaultValue={user.lastName}
                                        onChange={e =>
                                            onFieldUpdate({
                                                lastName: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <Spacer height={1} width={3} />
                            </div>
                        </>
                    )}
                </div>
                <div className="flex gap-2">
                    {startEdit && (
                        <Button onClick={submitUpdate} disabled={!hasDistinction}>
                            Update
                        </Button>
                    )}
                    <Button
                        disabled={authData.role_in_system !== 'SUPER_ADMIN'}
                        onClick={() => {
                            setStartEdit(isEditing => !isEditing);
                        }}
                    >
                        {!startEdit ? 'Edit' : 'Cancel'}
                    </Button>
                </div>
            </div>
            <Box
                className="px-4 pt-3 pb-2"
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    '& input': {
                        width: '100%',
                        backgroundColor: 'rgba(255,255,255,0.7)',
                        flex: 1,
                        padding: '1.4px',
                        border: 'none',
                        outline: 'none',
                    },
                    '& td:nth-of-type(1)': {
                        verticalAlign: 'middle',
                        width: '100px',
                        color: 'rgb(150,150,150)',
                        marginBottom: '5px',
                    },
                    '& td:nth-of-type(2), & td:nth-of-type(3)': {
                        display: 'flex',
                        width: '300px',
                        borderRadius: '4px',
                        background: 'rgb(240,240,240)',
                        padding: '5px',
                        marginBottom: '5px',
                    },
                }}
            >
                <table>
                    <tbody>
                        <tr>
                            <td>Email</td>
                            <td>{user.companyEmail}</td>
                        </tr>
                        <tr>
                            <td>Position</td>
                            {!startEdit && <td>{user.roleInCompany}</td>}
                            {startEdit && (
                                <td>
                                    <UpdateTextField
                                        defaultValue={user.roleInCompany}
                                        onChange={t => {
                                            onFieldUpdate({ roleInCompany: t });
                                        }}
                                    />
                                </td>
                            )}
                        </tr>
                        <tr>
                            <td>Phone</td>
                            {!startEdit && <td>{user.mobileNumber}</td>}
                            {startEdit && (
                                <td>
                                    <UpdateTextField
                                        defaultValue={user.mobileNumber}
                                        onChange={t => {
                                            onFieldUpdate({ mobileNumber: t });
                                        }}
                                    />
                                </td>
                            )}
                        </tr>
                        {/* <Spacer height={startEdit ? 0 : 0} /> */}
                        <tr>
                            <td>System Role</td>
                            {!startEdit && (
                                <td
                                    style={{
                                        fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
                                    }}
                                >
                                    {user.roleInSystem}
                                </td>
                            )}
                            {startEdit && (
                                <td>
                                    <Select
                                        dropdownStyle={{ zIndex: 10 ** 4 }}
                                        defaultValue={user.roleInSystem}
                                        style={{ width: 130 }}
                                        onChange={handleSymRoleChange}
                                        options={roleSelections}
                                    />
                                </td>
                            )}
                        </tr>
                    </tbody>
                </table>
            </Box>
        </div>
    );
}

export const UpdateTextField = (props: { defaultValue: string; onChange: (t: string) => void }) => {
    const { defaultValue, onChange } = props;
    return <input defaultValue={defaultValue} onChange={e => onChange(e.target.value)} />;
};
