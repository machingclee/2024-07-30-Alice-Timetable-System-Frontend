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
import { Button } from 'antd';
import RouteEnum from '@/enum/RouteEnum';

export default function Root() {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const navigiate = useNavigate();
    const leftNavigatorCollapsed = useAppSelector(s => s.app.leftNavigatorCollapsed);
    const isInDashboard = /dashboard/.test(location.pathname);

    useEffect(() => {
        // document.title = titles?.[location.pathname as RouteEnum] || ""
    }, [location.pathname]);

    useEffect(() => {
        if (location.pathname === '/') {
            navigiate('/login');
        }
        if (location.pathname === '/login') {
            dispatch(appSlice.actions.setActivePath('/login'));
        }
    }, [location.pathname, dispatch, navigiate]);

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
                        className={classnames('ease-in-out max-[1100px]:!w-0 !overflow-hidden w-[210px]', {
                            '!w-0': leftNavigatorCollapsed,
                        })}
                    >
                        <div style={{ height: '100%', flexDirection: 'column', display: 'flex' }}>
                            <Spacer />
                            <div className="flex justify-between pr-6 items-center">
                                <CloseLeftColumnButton />
                                <Button shape="circle" onClick={() => navigiate(RouteEnum.DASHBOARD_NOTIFICATIONS)}>
                                    <IoNotifications size={18} />
                                </Button>
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
