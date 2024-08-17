import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import SectionTitle from "../../../components/SectionTitle";
import { useEffect } from "react";
import studentSlice, { StudentThunkAction } from "../../../redux/slices/studentSlice";
import Spacer from "../../../components/Spacer";
import { IoMdArrowBack } from "react-icons/io";
import { Button } from "antd";
import WeeklyTimetable from "../components/WeeklyTimetable";
import Label from "../../../components/Label";
import AddClassEventDialog from "../components/AddClassEventDialog";
import { CourseThunkAction } from "../../../redux/slices/courseSlice";
import UpdateClassDialog from "../components/UpdateClassDialog";
import DuplicateClassDialog from "../components/DuplicateClassDialog";
import MoveConfirmationDialog from "../components/MoveConfirmationDialog";
import AddPackageDialog from "../components/AddPackageDialog";
import CustomScrollbarContainer from "../../../components/CustomScrollbarContainer";
import StudentPackageColumn from "./components/StudentPackageColumn";
import DeleteClassDialog from "../components/DeleteClassDialog";

export default () => {
    const { studentId } = useParams<{ studentId: string }>();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const studentDetail = useAppSelector((s) => s.student.studentDetail.detail);
    const { first_name, last_name } = studentDetail || {};

    useEffect(() => {
        if (studentId) {
            dispatch(StudentThunkAction.getStudentDetail({ studentId }));
            dispatch(StudentThunkAction.getStudentClasses({ studentId }));
        }
    }, [studentId]);

    // To get courses in case the user wants to add a course to the timetable
    useEffect(() => {
        dispatch(CourseThunkAction.getCourses());
    }, []);

    useEffect(() => {
        if (studentId) {
            dispatch(StudentThunkAction.getStudentPackages({ studentId }));
        }
    }, [studentId]);

    useEffect(() => {
        return () => {
            dispatch(studentSlice.actions.reset());
        };
    }, []);

    if (!studentDetail) {
        return null;
    }

    return (
        <div style={{ marginLeft: "10px", marginRight: "50px", height: "100%", display: "flex", flexDirection: "column" }}>
            <div style={{ width: "100%", display: "flex" }}>
                <div>
                    <SectionTitle>
                        <Label label="StudenDetail.tsx" offsetTop={-20} />
                        <Button
                            shape="circle"
                            onClick={() => {
                                navigate(-1);
                            }}
                        >
                            <IoMdArrowBack />
                        </Button>
                        <Spacer height={1} />
                        {`${first_name} ${last_name}`}
                    </SectionTitle>

                    <div style={{ height: "calc(100vh - 70px)", overflow: "hidden" }}>
                        <WeeklyTimetable />
                    </div>
                </div>
                <Spacer />
                <StudentPackageColumn packagesOffsetY={200} />
            </div>

            {/* <Calendar /> */}
            <MoveConfirmationDialog.render />
            <DuplicateClassDialog.render />
            <UpdateClassDialog.render />
            <DeleteClassDialog.render />
            <AddClassEventDialog.render />
            <AddPackageDialog.render />
        </div>
    );
};
