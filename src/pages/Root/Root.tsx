import { Container } from "@mui/material";
import { useEffect, useRef } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import LeftNavigation from "./components/LeftNavigation";
import { OverlayScrollbarsComponent, OverlayScrollbarsComponentRef } from "overlayscrollbars-react";
import appSlice from "../../redux/slices/appSlice";
import AppLoading from "../../components/AppLoading";
import RouteEnum from "../../enum/RouteEnum";

export default () => {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const navgiate = useNavigate();
    const accessToken = useAppSelector((s) => s.auth.accessToken);
    const ref = useRef<OverlayScrollbarsComponentRef<"div"> | null>(null);
    console.log("This is root");

    useEffect(() => {
        // document.title = titles?.[location.pathname as RouteEnum] || ""
    }, [location.pathname]);

    useEffect(() => {
        if (location.pathname === "/") {
            navgiate("/login");
        }
        if (location.pathname === "/login") {
            dispatch(appSlice.actions.setActivePath("/login"));
        }
    }, [location.pathname]);

    useEffect(() => {
        if (!accessToken) {
            navgiate("/login");
        } else {
            const inDashboard = location.pathname.includes("/dashboard");
            if (!inDashboard) {
                navgiate(RouteEnum.DASHBOARD_STUDENTS);
            }
        }
    }, [accessToken, location.pathname]);

    return (
        <>
            <OverlayScrollbarsComponent
                style={{ height: "100vh", width: "100%", overflowY: "auto" }}
                ref={ref}
                options={{
                    scrollbars: {
                        autoHide: "scroll",
                        autoHideDelay: 100,
                    },
                }}
            >
                <Container
                    sx={{
                        "@media (min-width: 1200px)": {
                            maxWidth: "none",
                        },
                        "&.MuiContainer-root": {
                            paddingLeft: "0",
                            paddingRight: "0",
                        },
                    }}
                    style={{ display: "flex", position: "relative" }}
                >
                    <div style={{ position: "fixed", height: "100%" }}>
                        <LeftNavigation />
                    </div>
                    <RootOutlet />
                </Container>
            </OverlayScrollbarsComponent>
            <AppLoading />
        </>
    );
};

const RootOutlet = () => {
    const { pathname } = useLocation();
    const islogin = pathname === "/login";
    const leftNavigatorCollapsed = useAppSelector((s) => s.app.leftNavigatorCollapsed);
    return (
        <div style={{ flex: 1, marginLeft: islogin ? 0 : leftNavigatorCollapsed ? 40 : 200, height: "100vh", width: "100%" }}>
            <Outlet />
        </div>
    );
};
