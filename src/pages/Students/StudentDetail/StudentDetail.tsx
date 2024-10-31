import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import SectionTitle from "../../../components/SectionTitle";
import { useEffect, useState } from "react";
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
import { FaChevronLeft } from "react-icons/fa6";
import { Box, Collapse } from "@mui/material";
import { transform } from "lodash";

export default () => {
    const { studentId } = useParams<{ studentId: string }>();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [collapseTimetable, setCollapseTimetable] = useState(false);
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
                <Collapse
                    sx={{
                        "& .MuiCollapse-wrapperInner": {
                            width: "100%"
                        }
                    }}
                    style={{ width: collapseTimetable ? "unset" : "100%", height: "calc(100vh - 70px)", overflow: "hidden" }}
                    in={!collapseTimetable}
                    orientation="horizontal"
                >
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
                        <WeeklyTimetable />
                    </div>
                </Collapse>
                <CollapseTriggerBar
                    collapseTimetable={collapseTimetable}
                    onClick={() => { setCollapseTimetable(t => !t) }} />
                <Spacer />
                <StudentPackageColumn packagesOffsetY={200} collapseTimtable={collapseTimetable} />
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

const CollapseTriggerBar = (props: { collapseTimetable: boolean, onClick: () => void }) => {
    const { collapseTimetable, onClick } = props;
    return (
        <Box
            onClick={onClick}
            sx={{
                "&:hover": {
                    opacity: 0.5
                }
            }}
            style={{
                cursor: "pointer",
                height: "100%",
                width: 35,
                backgroundColor: "rgba(113, 98, 159,0.5)",
                position: "relative"
            }}>
            <div
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%,-50%)"
                }}
            >
                <FaChevronLeft style={{ transform: `rotate(${!collapseTimetable ? 0 : 180}deg)` }} />
            </div>

        </Box>
    )
}