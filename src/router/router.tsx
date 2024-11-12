import { createBrowserRouter, createRoutesFromElements, Outlet, Route, useNavigate } from "react-router-dom";
import Root from "../pages/Root/Root";
import Students from "../pages/Students/Students.tsx";
import Users from "../pages/Users/Users";
import PrinceEdwardTimetable from "../pages/PrinceEdwardTimetable/PrinceEdwardTimetable.tsx";
import Login from "../pages/Login/Login";
import StudentDetail from "../pages/Students/StudentDetail/StudentDetail.tsx";
import RouteIndex from "../components/RouteIndex.tsx";
import Classes from "../pages/Courses/Courses.tsx";
import CausewayBayTimetable from "../pages/CausewayBayTimetable/CausewayBayTimetable.tsx";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks.ts";
import studentSlice, { StudentThunkAction } from "../redux/slices/studentSlice.ts";
import dayjs from "dayjs";
import { CourseThunkAction } from "../redux/slices/courseSlice.ts";
import RouteEnum from "../enum/RouteEnum.ts";
import PackageClassesStatus from "../pages/Students/components/PackageClassesStatus.tsx";

const getRouter = (_store: any) => {
    return createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<Root />}>
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />}>
                    <Route path={"students"} element={<RouteIndex />}>
                        <Route index element={<Students />} />
                        <Route path=":studentId/:timestamp" element={<StudentDetail />} />
                    </Route>
                    <Route path="courses" element={<Classes />} />
                    <Route path="users" element={<Users />} />
                    <Route path="all-students" element={<AllStudentsIndex />}>
                        <Route path="prince-edward" element={<PrinceEdwardIndex />}>
                            <Route index element={<PrinceEdwardTimetable />} />
                        </Route>
                        <Route path="causeway-bay" element={<CausewaybayIndex />}>
                            <Route index element={<CausewayBayTimetable />} />
                        </Route>
                    </Route>
                </Route>
                <Route path="/class-status" element={<ClassStatusIndex />}>
                    <Route path=":packageUUID" element={<PackageClassesStatus />} />
                </Route>
            </Route>
        )
    );
};

const ClassStatusIndex = () => {
    return <Outlet />;
};

const CausewaybayIndex = () => {
    const dispatch = useAppDispatch();
    const filter = useAppSelector((s) => s.student.allStudents.filter);

    useEffect(() => {
        dispatch(studentSlice.actions.setClassroom("CAUSEWAY_BAY"));
    }, []);

    useEffect(() => {
        const currentTimestamp = dayjs(new Date().getTime()).startOf("day").valueOf().toString();
        dispatch(
            StudentThunkAction.getFilteredStudentClassesForDailyTimetable({
                dateUnixTimestamp: currentTimestamp,
                classRoom: "CAUSEWAY_BAY",
                filter: filter,
            })
        );
    }, []);

    return <Outlet />;
};

const PrinceEdwardIndex = () => {
    const dispatch = useAppDispatch();
    const filter = useAppSelector((s) => s.student.allStudents.filter);

    useEffect(() => {
        dispatch(studentSlice.actions.setClassroom("PRINCE_EDWARD"));
    }, []);

    useEffect(() => {
        const currentTimestamp = dayjs(new Date().getTime()).startOf("day").valueOf().toString();
        dispatch(
            StudentThunkAction.getFilteredStudentClassesForDailyTimetable({
                dateUnixTimestamp: currentTimestamp,
                classRoom: "PRINCE_EDWARD",
                filter: filter,
            })
        );
        // dispatch(
        //     StudentThunkAction.getStudentClassesForDailyTimetable({
        //         dateUnixTimestamp: currentTimestamp,
        //         classRoom: "PRINCE_EDWARD",
        //     })
        // );
    }, []);

    return <Outlet />;
};

const AllStudentsIndex = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(CourseThunkAction.getCourses());
        dispatch(StudentThunkAction.getStudents());
        return () => {
            dispatch(studentSlice.actions.reset());
        };
    }, []);

    return (
        <>
            <Outlet />
        </>
    );
};

const Dashboard = () => {
    const accessToken = useAppSelector((s) => s.auth.accessToken);
    const navgiate = useNavigate();
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
        <div style={{ display: "flex", flexDirection: "row", height: "100vh" }}>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", width: "100%" }}>
                <div style={{ flex: 1, padding: "0px 10px", paddingTop: 20, position: "relative" }}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default getRouter;
