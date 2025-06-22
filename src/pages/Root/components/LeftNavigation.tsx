import { useLocation } from 'react-router-dom';
import { Box } from '@mui/material';
import Spacer from '../../../components/Spacer';
import { Button } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import authSlice from '../../../redux/slices/authSlice';
import boxShadow from '../../../constant/boxShadow';
import { useEffect } from 'react';
import NavButton from './NavButton';
import appSlice from '../../../redux/slices/appSlice';
import escapeStringRegexp from 'escape-string-regexp';
import RouteEnum from '../../../enum/RouteEnum';
import { IoBook } from 'react-icons/io5';
import { FaLocationDot, FaUserGraduate, FaUserLock } from 'react-icons/fa6';
import { GiChampions } from 'react-icons/gi';
import { TiTicket } from 'react-icons/ti';
import { GoLog } from 'react-icons/go';

const pathRegex = {
    STUDENTS: new RegExp(escapeStringRegexp(RouteEnum.DASHBOARD_STUDENTS)),
    COURSES: new RegExp(escapeStringRegexp(RouteEnum.DASHBOARD_COURSES)),
    USERS: new RegExp(escapeStringRegexp(RouteEnum.DASHBOARD_USERS)),
    CUSTOM_HOLIDAYS: new RegExp(escapeStringRegexp(RouteEnum.DASHBOARD_CUSTOM_HOLIDAYS)),
    COMPETITIONS: new RegExp(escapeStringRegexp(RouteEnum.DASHBOARD_COMPETITIONS)),
    PRINCE_EDWARD_TIMETABLE: new RegExp(escapeStringRegexp(RouteEnum.DASHBOARD_PRINCE_EDWARD_TIMETABLE)),
    CAUSEWAY_BAY_TIMETABLE: new RegExp(escapeStringRegexp(RouteEnum.DASHBOARD_CAUSEWAY_BAY_TIMETABLE)),
    LOGGING: new RegExp(escapeStringRegexp(RouteEnum.DASHBOARD_LOGGING)),
    TICKET: new RegExp(escapeStringRegexp(RouteEnum.DAHSBOARD_TICKETS)),
};

export default function LeftNavigation() {
    const dispatch = useAppDispatch();
    const { pathname } = useLocation();
    const authData = useAppSelector(s => s.auth.user);
    const leftNavigatorCollapsed = useAppSelector(s => s.app.leftNavigatorCollapsed);
    const { first_name, last_name, role_in_system } = authData;
    const logout = () => {
        dispatch(authSlice.actions.reset());
    };

    useEffect(() => {
        if (pathname) {
            if (pathRegex.STUDENTS.test(pathname)) {
                dispatch(appSlice.actions.setActivePath(RouteEnum.DASHBOARD_STUDENTS));
            } else if (pathRegex.USERS.test(pathname)) {
                dispatch(appSlice.actions.setActivePath(RouteEnum.DASHBOARD_USERS));
            } else if (pathRegex.CUSTOM_HOLIDAYS.test(pathname)) {
                dispatch(appSlice.actions.setActivePath(RouteEnum.DASHBOARD_CUSTOM_HOLIDAYS));
            } else if (pathRegex.PRINCE_EDWARD_TIMETABLE.test(pathname)) {
                dispatch(appSlice.actions.setActivePath(RouteEnum.DASHBOARD_PRINCE_EDWARD_TIMETABLE));
            } else if (pathRegex.COURSES.test(pathname)) {
                dispatch(appSlice.actions.setActivePath(RouteEnum.DASHBOARD_COURSES));
            } else if (pathRegex.CAUSEWAY_BAY_TIMETABLE.test(pathname)) {
                dispatch(appSlice.actions.setActivePath(RouteEnum.DASHBOARD_CAUSEWAY_BAY_TIMETABLE));
            } else if (pathRegex.COMPETITIONS.test(pathname)) {
                dispatch(appSlice.actions.setActivePath(RouteEnum.DASHBOARD_COMPETITIONS));
            } else if (pathRegex.TICKET.test(pathname)) {
                dispatch(appSlice.actions.setActivePath(RouteEnum.DAHSBOARD_TICKETS));
            } else {
                dispatch(appSlice.actions.setActivePath(pathname));
            }
        }
    }, [pathname, dispatch]);

    const isLogin = pathname === '/login';

    if (isLogin) {
        return null;
    }

    if (!pathname.startsWith(RouteEnum.DASHBOARD)) {
        return null;
    }

    return (
        <Box
            style={{
                height: '100%',
                transition: 'width 0.5s ease-out',
            }}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
            }}
        >
            <div
                style={{
                    height: '100%',
                    flexDirection: 'column',
                    transition: 'opacity 0.4s ease-in-out',
                    opacity: leftNavigatorCollapsed ? 0 : 1,
                }}
                className="px-4 space-y-2"
            >
                <Spacer />
                <NavButton
                    icon={<FaUserGraduate size={20} />}
                    activeNavigationRegex={pathRegex.STUDENTS}
                    routeEnum={RouteEnum.DASHBOARD_STUDENTS}
                    title="Students"
                />

                <NavButton
                    icon={<IoBook size={20} />}
                    activeNavigationRegex={pathRegex.COURSES}
                    routeEnum={RouteEnum.DASHBOARD_COURSES}
                    title="Courses"
                />

                <NavButton
                    icon={<FaUserLock size={20} />}
                    activeNavigationRegex={pathRegex.USERS}
                    routeEnum={RouteEnum.DASHBOARD_USERS}
                    title="Staffs"
                />

                <NavButton
                    icon={<FaUserLock size={20} />}
                    activeNavigationRegex={pathRegex.CUSTOM_HOLIDAYS}
                    routeEnum={RouteEnum.DASHBOARD_CUSTOM_HOLIDAYS}
                    title="Custom Holidays"
                />
                <NavButton
                    icon={<FaLocationDot size={20} />}
                    activeNavigationRegex={pathRegex.PRINCE_EDWARD_TIMETABLE}
                    routeEnum={RouteEnum.DASHBOARD_PRINCE_EDWARD_TIMETABLE}
                    title="Prince Ed. Timetable"
                />

                <NavButton
                    icon={<FaLocationDot size={20} />}
                    activeNavigationRegex={pathRegex.CAUSEWAY_BAY_TIMETABLE}
                    routeEnum={RouteEnum.DASHBOARD_CAUSEWAY_BAY_TIMETABLE}
                    title="CWB Timetable"
                />

                <NavButton
                    icon={<GiChampions size={20} />}
                    activeNavigationRegex={pathRegex.COMPETITIONS}
                    routeEnum={RouteEnum.DASHBOARD_COMPETITIONS}
                    title="Competitions"
                />

                <NavButton
                    icon={<TiTicket size={20} />}
                    activeNavigationRegex={pathRegex.TICKET}
                    routeEnum={RouteEnum.DAHSBOARD_TICKETS}
                    title="Tickets"
                />

                <NavButton
                    icon={<GoLog size={20} />}
                    activeNavigationRegex={pathRegex.LOGGING}
                    routeEnum={RouteEnum.DASHBOARD_LOGGING}
                    title="Logging"
                />
            </div>
            <div
                className="px-2"
                style={{
                    transition: 'opacity 0.4s ease-in-out',
                    opacity: leftNavigatorCollapsed ? 0 : 1,
                }}
            >
                <Spacer height={30} />
                <div
                    style={{
                        boxShadow: boxShadow.SHADOW_61,
                        borderRadius: 4,
                        padding: 10,
                        position: 'relative',
                    }}
                >
                    <div style={{ display: 'flex' }}>
                        <div
                            style={{
                                position: 'absolute',
                                top: -10,
                                left: 5,
                                fontSize: 11,
                                background: 'white',
                                fontWeight: 500,
                                padding: 4,
                                borderRadius: 4,
                                color: 'rgb(150,150,150)',
                                fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
                            }}
                        >
                            {role_in_system}
                        </div>
                    </div>
                    <Spacer height={5} />
                    <div
                        style={{
                            width: '100%',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                        }}
                    >{`${first_name} ${last_name}`}</div>
                </div>
                <div style={{ flex: 1 }}></div>
                <Spacer />
                <Button block onClick={logout}>
                    Logout
                </Button>
                <Spacer />
                <Spacer />
                <Spacer />
            </div>
        </Box>
    );
}
