import { Box } from '@mui/material';
import { LuCat } from 'react-icons/lu';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { useCallback, useEffect, useRef, useState } from 'react';
import { RoleInSystem, User } from '../../../dto/dto';
import { Button, Input, Select } from 'antd';
import Spacer from '../../../components/Spacer';
import { UserThunkAction } from '../../../redux/slices/userSlice';
import lodash, { debounce } from 'lodash';

export default function UserRow(props: { id: string }) {
    const { id } = props;
    const authData = useAppSelector(s => s.auth.user);
    const dipatch = useAppDispatch();
    const [hasDistinction, setHasDistinction] = useState(false);
    const [startEdit, setStartEdit] = useState(false);
    const user = useAppSelector(s => s.user.users.idToObject?.[id])!;

    const { company_email, first_name, last_name, mobile_number, role_in_company, role_in_system } = user;
    const formData = useRef(user);

    // eslint-disable-next-line
    const checkDataDistinction = useCallback(
        debounce(() => {
            const oldData = user;
            const newData = formData.current;
            const hasDistinction_ = !lodash.isEqual(oldData, newData);
            setHasDistinction(hasDistinction_);
        }, 300),
        [user]
    );

    const onFieldUpdate = (update: Partial<User>) => {
        formData.current = { ...formData.current, ...update };
        checkDataDistinction();
    };

    const roleSelections: { value: RoleInSystem; label: string }[] = [
        { value: 'STAFF', label: 'Staff' },
        { value: 'ADMIN', label: 'Admin' },
        { value: 'SUPER_ADMIN', label: 'Super Admin' },
    ];

    const handleSymRoleChange = (value: string) => {
        onFieldUpdate({ role_in_system: value as RoleInSystem });
    };

    const submitUpdate = async () => {
        await dipatch(UserThunkAction.updateUser({ ...user, ...formData.current })).unwrap();
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
                    {!startEdit && <td>{`${first_name} ${last_name}`}</td>}
                    {startEdit && (
                        <>
                            <div className="w-full flex">
                                <div>
                                    <Input
                                        defaultValue={first_name}
                                        onChange={e =>
                                            onFieldUpdate({
                                                first_name: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <Spacer height={1} width={15} />
                                <div>
                                    <Input
                                        defaultValue={last_name}
                                        onChange={e =>
                                            onFieldUpdate({
                                                last_name: e.target.value,
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
                    '& td:nth-child(1)': {
                        verticalAlign: 'middle',
                        width: '100px',
                        color: 'rgb(150,150,150)',
                        marginBottom: '5px',
                    },
                    '& td:nth-child(2), & td:nth-child(3)': {
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
                            <td>{company_email}</td>
                        </tr>
                        <tr>
                            <td>Position</td>
                            {!startEdit && <td>{role_in_company}</td>}
                            {startEdit && (
                                <td>
                                    <UpdateTextField
                                        defaultValue={role_in_company}
                                        onChange={t => {
                                            onFieldUpdate({ role_in_company: t });
                                        }}
                                    />
                                </td>
                            )}
                        </tr>
                        <tr>
                            <td>Phone</td>
                            {!startEdit && <td>{mobile_number}</td>}
                            {startEdit && (
                                <td>
                                    <UpdateTextField
                                        defaultValue={mobile_number}
                                        onChange={t => {
                                            onFieldUpdate({ mobile_number: t });
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
                                    {role_in_system}
                                </td>
                            )}
                            {startEdit && (
                                <td>
                                    <Select
                                        dropdownStyle={{ zIndex: 10 ** 4 }}
                                        defaultValue={role_in_system}
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
