import { Button } from 'antd';
import Spacer from '../../components/Spacer';
import SectionTitle from '../../components/SectionTitle';
import UserRow from './components/UserRow';
import AliceModalTrigger from '../../components/AliceModalTrigger';
import AddUserModal from './components/AddUserModal';
import { userApi } from '@/!rtk-query/api/userApi';
import LoadingContainer from '@/components/LoadingContainer';

export default function User() {
    const { emails, isFetching } = userApi.endpoints.getUsers.useQuery(undefined, {
        selectFromResult: result => {
            const emails = result.data?.userEmails || [];
            return { emails, isFetching: result.isFetching };
        },
    });

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
                <LoadingContainer isLoading={isFetching}>
                    {emails.map(email => {
                        return (
                            <>
                                <UserRow email={email} key={email} />
                            </>
                        );
                    })}
                </LoadingContainer>
            </div>
            {/* <AddUserDialog.render /> */}
        </div>
    );
}
