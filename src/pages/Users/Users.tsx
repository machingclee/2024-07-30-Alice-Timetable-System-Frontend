import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { UserThunkAction } from '../../redux/slices/userSlice';
import { Button } from 'antd';

import Spacer from '../../components/Spacer';
import SectionTitle from '../../components/SectionTitle';
import UserRow from './components/UserRow';
import AliceModalTrigger from '../../components/AliceModalTrigger';
import AddUserModal from './components/AddUserModal';

export default function User() {
    const dispatch = useAppDispatch();
    const emails = useAppSelector(s => s.user.users.ids) || [];

    useEffect(() => {
        dispatch(UserThunkAction.getUsers());
    }, [dispatch]);

    return (
        <div>
            <SectionTitle>Staffs</SectionTitle>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <AliceModalTrigger modalContent={AddUserModal}>
                    <Button type="primary">Add Staff</Button>
                </AliceModalTrigger>
            </div>
            <Spacer />
            <div className="space-y-2">
                {emails.map(email => {
                    return <UserRow id={email} key={email} />;
                })}
            </div>
            {/* <AddUserDialog.render /> */}
        </div>
    );
}
