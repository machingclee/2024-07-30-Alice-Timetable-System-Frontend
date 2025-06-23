import { Container } from '@mui/material';
import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import LeftNavigation from './components/LeftNavigation';
import appSlice from '../../redux/slices/appSlice';
import AppLoading from '../../components/AppLoading';
import CloseLeftColumnButton from './components/CloseLeftColumnButton';
import Spacer from '../../components/Spacer';
import colors from '../../constant/colors';
import classnames from 'classnames';
import { IoNotifications } from 'react-icons/io5';
import { Badge, Button } from 'antd';
import RouteEnum from '@/enum/RouteEnum';
import dashboard_background from '../../assets/dashboard_background.png';
import { notificationApi } from '@/!rtk-query/api/notificationApi';

const NotificationButton = () => {
    const navigiate = useNavigate();
    // get notification count from rtk query endpoints
    const { data: notificationCount } = notificationApi.endpoints.getNotificationCount.useQuery();
    const numOfNotifications = notificationCount?.count || 0;
    const { pathname } = useLocation();
    const active = /notifications/.test(pathname);

    return (
        <Badge count={numOfNotifications}>
            <Button
                shape="circle"
                onClick={() => navigiate(RouteEnum.DASHBOARD_NOTIFICATIONS)}
                type={active ? 'primary' : 'default'}
            >
                <IoNotifications size={18} />
            </Button>
        </Badge>
    );
};

export default function Root() {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const navigiate = useNavigate();
    const leftNavigatorCollapsed = useAppSelector(s => s.app.leftNavigatorCollapsed);
    const accessToken = useAppSelector(s => s.auth.accessToken);
    const isInDashboard = /dashboard/.test(location.pathname);

    useEffect(() => {
        // document.title = titles?.[location.pathname as RouteEnum] || ""
    }, [location.pathname]);

    const inFirstPage = location.pathname === '/' || location.pathname === '/login';

    useEffect(() => {
        if (!accessToken) {
            if (location.pathname === '/') {
                navigiate('/login');
            }
            if (location.pathname === '/login') {
                dispatch(appSlice.actions.setActivePath('/login'));
            }
        } else {
            if (inFirstPage) {
                navigiate(RouteEnum.DASHBOARD_STUDENTS);
            }
        }
    }, [location.pathname, dispatch, navigiate, accessToken]);

    return (
        <>
            <Container
                sx={{
                    background: colors.BACKGORUND_GREY,
                    '@media (min-width: 1200px)': {
                        maxWidth: 'none',
                    },
                    '&.MuiContainer-root': {
                        paddingLeft: '0',
                        paddingRight: '0',
                    },
                }}
                style={{
                    display: 'flex',
                    position: 'relative',
                }}
            >
                {isInDashboard && (
                    <div
                        style={{ height: '100vh' }}
                        className={classnames('ease-in-out max-[1100px]:!w-0 !overflow-hidden w-[240px] relative', {
                            '!w-0': leftNavigatorCollapsed,
                        })}
                    >
                        <img
                            src={dashboard_background}
                            className="absolute bottom-[50%] left-[calc(50%+220px)] scale-400 translate-x-[-50%] translate-y-[0] opacity-20"
                        />
                        <div
                            style={{ height: '100%', flexDirection: 'column', display: 'flex' }}
                            className="bg-teal-300 border-r-1 border-emerald-400"
                        >
                            <Spacer />
                            <div className="flex justify-between pr-4 items-center">
                                <CloseLeftColumnButton />
                                <NotificationButton />
                            </div>
                            <div style={{ flex: 1 }}>
                                <LeftNavigation />
                            </div>
                        </div>
                    </div>
                )}
                {leftNavigatorCollapsed && (
                    <div style={{ height: '100vh' }}>
                        <Spacer />
                        <div
                            className="pt-1"
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'flex-end',
                            }}
                        >
                            <CloseLeftColumnButton />
                        </div>
                    </div>
                )}
                <RootOutlet />
            </Container>
            <AppLoading />
        </>
    );
}

export const RootOutlet = () => {
    return (
        <div style={{ flex: 1, height: '100vh', width: '100%' }}>
            <Outlet />
        </div>
    );
};
