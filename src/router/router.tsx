import { createBrowserRouter, createRoutesFromElements, Outlet, Route } from "react-router-dom";
import Root from "../pages/Root/Root";
import Students from "../pages/Students/Students.tsx";
import Users from "../pages/Users/Users";
import Timetables from "../pages/Timetables/Timetables";
import Login from "../pages/Login/Login";
import StudentDetail from "../pages/Students/StudentDetail/StudentDetail.tsx";
import RouteIndex from "../components/RouteIndex.tsx";
import Classes from "../pages/Courses/Courses.tsx";

export enum RouteEnum {
    LOGIN = "/login",
    DASHBOARD_STUDENTS = "/dashboard/students",
    DASHBOARD_COURSES = "/dashboard/courses",
    DASHBOARD_USERS = "/dashboard/users",
    DASHBOARD_TIMETABLE = "/dashboard/timetables",
}

export const getRouter = (_: any) => {
    return createBrowserRouter(
        createRoutesFromElements(
            <Route path={"/"} element={<Root />}>
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />}>
                    <Route path={"students"} element={<RouteIndex />}>
                        <Route index element={<Students />} />
                        <Route path=":studentId" element={<StudentDetail />} />
                    </Route>
                    <Route />
                    <Route path={"courses"} element={<Classes />} />
                    <Route path={"users"} element={<Users />} />
                    <Route path={"timetables"} element={<Timetables />} />
                </Route>
            </Route>
        )
    );
};
export default getRouter;

const Dashboard = () => {
    return (
        <div style={{ display: "flex", flexDirection: "row", height: "100vh" }}>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", width: "100%" }}>
                <div style={{ flex: 1, padding: "0px 10px", paddingTop: 20, position: "relative" }}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};
