import { Collapse, Container } from "@mui/material";
import { useEffect, useRef } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import LeftNavigation from "./components/LeftNavigation";
import { OverlayScrollbarsComponent, OverlayScrollbarsComponentRef } from "overlayscrollbars-react";
import appSlice from "../../redux/slices/appSlice";
import AppLoading from "../../components/AppLoading";
import CloseLeftColumnButton from "./components/CloseLeftColumnButton";
import Spacer from "../../components/Spacer";

export default () => {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const navgiate = useNavigate();
    const { pathname } = useLocation();
    const islogin = pathname === "/login";
    const leftNavigatorCollapsed = useAppSelector((s) => s.app.leftNavigatorCollapsed);

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
                    style={{
                        display: "flex",
                        position: "relative",
                        marginRight: 20
                    }}
                >
                    <Collapse style={{ height: "100vh" }} in={!leftNavigatorCollapsed} orientation="horizontal">
                        <Spacer />
                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end" }}>
                            <CloseLeftColumnButton />
                        </div>
                        <div >
                            <LeftNavigation />
                        </div>
                    </Collapse>
                    <Collapse style={{ height: "100vh" }} in={leftNavigatorCollapsed} orientation="horizontal">
                        <Spacer />
                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end" }}>
                            <CloseLeftColumnButton />
                        </div>
                    </Collapse>
                    <RootOutlet />
                </Container>
            </OverlayScrollbarsComponent>
            <AppLoading />
        </>
    );
};

const RootOutlet = () => {
    return (
        <div style={{ flex: 1, height: "100vh", width: "100%" }}>
            <Outlet />
        </div>
    );
};
