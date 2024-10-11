import { useLocation } from "react-router-dom";
import { RouteEnum } from "../../../router/router";
import { Box } from "@mui/material";
import Spacer from "../../../components/Spacer";
import { Button } from "antd";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import authSlice from "../../../redux/slices/authSlice";
import boxShadow from "../../../constant/boxShadow";
import { useEffect } from "react";
import NavButton from "./NavButton";
import appSlice from "../../../redux/slices/appSlice";
import Label from "../../../components/Label";
import colors from "../../../constant/colors";
import CollapseButton from "../../../assets/collapse-button.png";
import studentSlice from "../../../redux/slices/studentSlice";

const pathRegex = {
    STUDENTS: /\/dashboard\/students/,
    COURSES: /\/dashboard\/courses/,
    USERS: /\/dashboard\/users/,
    PRINCE_EDWARD_TIMETABLE: /\/dashboard\/PE-timetable/,
    CWB_TIMETABLE: /\/dashboard\/CWB-timetable/,
};

export default () => {
    const dispatch = useAppDispatch();
    const { pathname } = useLocation();
    const authData = useAppSelector((s) => s.auth.user);
    const leftNavigatorCollapsed = useAppSelector((s) => s.app.leftNavigatorCollapsed);
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
            } else if (pathRegex.PRINCE_EDWARD_TIMETABLE.test(pathname)) {
                dispatch(appSlice.actions.setActivePath(RouteEnum.DASHBOARD_PRINCE_EDWARD_TIMETABLE));
            } else if (pathRegex.COURSES.test(pathname)) {
                dispatch(appSlice.actions.setActivePath(RouteEnum.DASHBOARD_COURSES));
            } else if (pathRegex.CWB_TIMETABLE.test(pathname)) {
                dispatch(appSlice.actions.setActivePath(RouteEnum.DASHBOARD_CWB_TIMETABLE));
            } else {
                dispatch(appSlice.actions.setActivePath(pathname));
            }
        }
    }, [pathname]);

    const isLogin = pathname === "/login";

    if (isLogin) {
        return null;
    }

    return (
        <Box
            style={{
                width: leftNavigatorCollapsed ? 0 : 160,
                height: "100%",
                marginTop: "20px",
                marginLeft: "30px",
                transition: "width 0.5s ease-out",
            }}
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
            }}
        >
            <div style={{ transition: "opacity 0.4s ease-in-out", opacity: leftNavigatorCollapsed ? 0 : 1 }}>
                <Spacer />
                <Label label="LeftNavigation.tsx" offsetTop={-10} />
                <NavButton activeNavigationRegex={pathRegex.STUDENTS} routeEnum={RouteEnum.DASHBOARD_STUDENTS} title="Students" />
                <Spacer height={10} />
                <NavButton activeNavigationRegex={pathRegex.COURSES} routeEnum={RouteEnum.DASHBOARD_COURSES} title="Courses" />
                <Spacer height={10} />
                <NavButton activeNavigationRegex={pathRegex.USERS} routeEnum={RouteEnum.DASHBOARD_USERS} title="Users" />
                <Spacer height={10} />
                <NavButton activeNavigationRegex={pathRegex.PRINCE_EDWARD_TIMETABLE} routeEnum={RouteEnum.DASHBOARD_PRINCE_EDWARD_TIMETABLE} title="Prince Ed. Timetable" />
                <Spacer height={10} />
                <NavButton activeNavigationRegex={pathRegex.CWB_TIMETABLE} routeEnum={RouteEnum.DASHBOARD_CWB_TIMETABLE} title="CWB Timetable" />
            </div>
            <div style={{ transition: "opacity 0.4s ease-in-out", opacity: leftNavigatorCollapsed ? 0 : 1 }}>
                {/* <div style={{ display: "flex", flexDirection: "row" }}>
                    <div>
                        <div style={{ width: "100%", height: "32px", fontWeight: "lighter", display: "flex" }}>Present</div>
                        <div style={{ width: "100%", height: "32px", fontWeight: "lighter", display: "flex" }}>Sus. Absence</div>
                        <div style={{ width: "100%", height: "32px", fontWeight: "lighter", display: "flex" }}>Illegit Absence</div>
                        <div style={{ width: "100%", height: "32px", fontWeight: "lighter", display: "flex" }}>Legit Absence</div>
                        <div style={{ width: "100%", height: "32px", fontWeight: "lighter", display: "flex" }}>Makeup</div>
                        <div style={{ width: "100%", height: "32px", fontWeight: "lighter", display: "flex" }}>Change of Classroom</div>
                    </div>
                    <div style={{ marginLeft: "30px" }}>
                        <div style={{ height: "32px", display: "flex", justifyContent: "center", marginLeft: "10px" }}>
                            <div style={{ background: colors.blue, width: "15px", height: "15px" }} />
                        </div>
                        <div style={{ height: "32px", display: "flex", justifyContent: "center", marginLeft: "10px" }}>
                            <div style={{ background: colors.amber, width: "15px", height: "15px" }} />
                        </div>

                        <div style={{ height: "32px", display: "flex", justifyContent: "center", marginLeft: "10px" }}>
                            <div style={{ background: colors.red, width: "15px", height: "15px" }} />
                        </div>
                        <div style={{ height: "32px", display: "flex", justifyContent: "center", marginLeft: "10px" }}>
                            <div style={{ background: colors.grey, width: "15px", height: "15px" }} />
                        </div>
                        <div style={{ height: "32px", display: "flex", justifyContent: "center", marginLeft: "10px" }}>
                            <div style={{ background: colors.green, width: "15px", height: "15px" }} />
                        </div>
                        <div style={{ height: "32px", display: "flex", justifyContent: "center", alignItems: "center", marginLeft: "10px" }}>
                            <div style={{ background: colors.purple, width: "15px", height: "15px" }} />
                        </div>
                    </div>
                </div> */}
                <Spacer height={30} />
                <div style={{ boxShadow: boxShadow.SHADOW_61, borderRadius: 4, padding: 10, position: "relative" }}>
                    <div style={{ display: "flex" }}>
                        <div
                            style={{
                                position: "absolute",
                                top: -10,
                                left: 5,
                                fontSize: 11,
                                background: "white",
                                fontWeight: 500,
                                padding: 4,
                                borderRadius: 4,
                                color: "rgb(150,150,150)",
                                fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
                            }}
                        >
                            {role_in_system}
                        </div>
                    </div>
                    <Spacer height={5} />
                    <div
                        style={{
                            width: "100%",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                        }}
                    >{`${first_name} ${last_name}`}</div>
                </div>
                <Spacer />
                <Button block onClick={logout}>
                    Logout
                </Button>
                <Spacer />
                <Spacer />
                <Spacer />
            </div>
            <img
                onClick={() => {
                    dispatch(appSlice.actions.setleftNavigatorCollapsed(!leftNavigatorCollapsed));
                }}
                style={{
                    position: "absolute",
                    bottom: "50%",
                    right: leftNavigatorCollapsed ? "0%" : "-8%",
                    width: 30,
                    height: 30,
                    cursor: "pointer",
                    transition: "rotate 1s ease-out-in,right 0.5s ease-out,",
                    zIndex: 10 ** 100,
                    transform: leftNavigatorCollapsed ? "rotate(180deg)" : "rotate(0deg)",
                }}
                src={CollapseButton}
            />
        </Box>
    );
};
