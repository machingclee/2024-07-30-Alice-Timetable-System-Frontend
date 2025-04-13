import { Outlet, useNavigate } from 'react-router-dom';
import RouteEnum from '../../enum/RouteEnum';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useEffect } from 'react';
import { NotificationThunkAction } from '@/redux/slices/notificationSlice';

const Dashboard = () => {
    const accessToken = useAppSelector(s => s.auth.accessToken);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!accessToken) {
            navigate('/login');
        } else {
            const inDashboard = location.pathname.includes('/dashboard');
            if (!inDashboard) {
                navigate(RouteEnum.DASHBOARD_STUDENTS);
            }
        }
    }, [accessToken, navigate]);

    useEffect(() => {
        dispatch(NotificationThunkAction.getNotifications());
    }, [dispatch]);

    return (
        <div style={{ display: 'flex', flexDirection: 'row', height: '100vh' }}>
            <div
                style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                }}
            >
                <div
                    style={{
                        flex: 1,
                        paddingRight: 20,
                        paddingTop: 20,
                        position: 'relative',
                    }}
                >
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
