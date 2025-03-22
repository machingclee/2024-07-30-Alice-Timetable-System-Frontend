import { Collapse, Container } from '@mui/material';
import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import LeftNavigation from './components/LeftNavigation';
import appSlice from '../../redux/slices/appSlice';
import AppLoading from '../../components/AppLoading';
import CloseLeftColumnButton from './components/CloseLeftColumnButton';
import Spacer from '../../components/Spacer';
import colors from '../../constant/colors';

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
                    <Collapse style={{ height: '100vh' }} in={!leftNavigatorCollapsed} orientation="horizontal">
                        <div style={{ height: '100%', flexDirection: 'column', display: 'flex' }}>
                            <Spacer />
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'flex-end',
                                }}
                            >
                                <CloseLeftColumnButton />
                            </div>
                            <div style={{ flex: 1 }}>
                                <LeftNavigation />
                            </div>
                        </div>
                    </Collapse>
                )}
                <Collapse style={{ height: '100vh' }} in={leftNavigatorCollapsed} orientation="horizontal">
                    <Spacer />
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                        }}
                    >
                        <CloseLeftColumnButton />
                    </div>
                </Collapse>
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
