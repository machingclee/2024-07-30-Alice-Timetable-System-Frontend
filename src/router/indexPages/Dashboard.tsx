import { Outlet, useNavigate } from 'react-router-dom';
import RouteEnum from '../../enum/RouteEnum';
import { useAppSelector } from '../../redux/hooks';
import { useEffect } from 'react';

const Dashboard = () => {
    const accessToken = useAppSelector(s => s.auth.accessToken);
    const navigate = useNavigate();

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

    return (
        <div style={{ display: 'flex', flexDirection: 'row', height: '100vh' }} className="bg-teal-200">
            <div
                className="ml-10"
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
