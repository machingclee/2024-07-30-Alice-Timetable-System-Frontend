import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { UserThunkAction } from '../../redux/slices/userSlice';
import AddUserDialog from './components/AddUserDialog';
import { Button } from 'antd';
import AddUserForm from './components/AddUserForm';
import Spacer from '../../components/Spacer';
import { Box } from '@mui/material';
import SectionTitle from '../../components/SectionTitle';
import UserRow from './components/UserRow';

export default function User() {
    const dispatch = useAppDispatch();
    const emails = useAppSelector(s => s.user.users.ids) || [];
    const openAddUserDialog = () => {
        AddUserDialog.setContent(() => () => <AddUserForm />);
        AddUserDialog.setOpen(true);
    };

    useEffect(() => {
        dispatch(UserThunkAction.getUsers());
    }, [dispatch]);
    return (
        <div>
            <SectionTitle>Users</SectionTitle>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button type="primary" onClick={openAddUserDialog}>
                    Add User
                </Button>
            </div>
            <Spacer />
            <Box>
                {emails.map(email => {
                    return <UserRow id={email} key={email} />;
                })}
            </Box>
            <AddUserDialog.render />
        </div>
    );
}
