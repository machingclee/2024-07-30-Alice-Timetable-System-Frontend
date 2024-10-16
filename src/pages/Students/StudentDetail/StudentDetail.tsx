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
import AddClassEventDialog from "../../../components/AddClassEventDialog";
import { CourseThunkAction } from "../../../redux/slices/courseSlice";
import DuplicateClassDialog from "../../../components/DuplicateClassDialog";
import MoveConfirmationDialog from "../components/MoveConfirmationDialog";
import AddPackageDialog from "../components/AddPackageDialog";
import StudentPackageColumn from "./components/StudentPackageColumn";
import DeleteClassDialog from "../../../components/DeleteClassDialog";
import AddPaymentDetailDialog from "./components/AddPaymentDetailDialog";
import ViewClassDialog from "../../../components/ViewClassDialog";
import EditPackageDialog from "./components/EditPackageDialog";
import appSlice from "../../../redux/slices/appSlice";
import CollapseButton from "../../../../src/assets/collapse-button.png";

export default () => {
    const { studentId } = useParams<{ studentId: string }>();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const rightColumnCollapsed = useAppSelector((s) => s.app.rightColumnCollapsed);

    const studentDetail = useAppSelector((s) => s.student.studentDetail.detail);
    const { first_name, last_name } = studentDetail || {};

    useEffect(() => {
        if (studentId) {
            dispatch(StudentThunkAction.getStudentDetail({ studentId }));
            dispatch(StudentThunkAction.getStudentClassesForWeeklyTimetable({ studentId }));
            dispatch(StudentThunkAction.getStudentPackages({ studentId }));
        }
    }, [studentId]);

    // To get courses in case the user wants to add a course to the timetable
    useEffect(() => {
        dispatch(CourseThunkAction.getCourses());
        return () => {
            dispatch(studentSlice.actions.reset());
        };
    }, []);

    if (!studentDetail) {
        return null;
    }

    return (
        <div style={{ marginLeft: "10px", marginRight: "50px", height: "100%", display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex" }}>
                <div style={{ width: "100%" }}>
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

                    <div style={{ height: "calc(100vh - 70px)", width: "100%", overflow: "hidden" }}>
                        <WeeklyTimetable />
                    </div>
                </div>
                <Spacer style={{ position: "relative" }} width={rightColumnCollapsed ? 0 : 40} />
                <StudentPackageColumn packagesOffsetY={200} />
            </div>

            {/* <Calendar /> */}
            <MoveConfirmationDialog.render />
            <DuplicateClassDialog.render />
            <ViewClassDialog.render />
            <DeleteClassDialog.render />
            <AddClassEventDialog.render />
            <AddPackageDialog.render />
            <EditPackageDialog.render />
            <AddPaymentDetailDialog.render />
        </div>
    );
};
