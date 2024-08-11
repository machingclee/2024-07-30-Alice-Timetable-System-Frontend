import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import SectionTitle from "../../../components/SectionTitle";
import { useEffect } from "react";
import { StudentThunkAction } from "../../../redux/slices/studentSlice";
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
import AddPackageForm from "../components/AddPackageForm";
import { LuPlusCircle } from "react-icons/lu";
import Sep from "../../../components/Sep";
import Title from "../../../components/Title";
import StudentPackage from "./components/StudentPackage";
import CustomScrollbarContainer from "../../../components/CustomScrollbarContainer";
import { FaAngleDoubleRight } from "react-icons/fa";
import { Box } from "@mui/material";

export default () => {
    const { studentId } = useParams<{ studentId: string }>();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const packages = useAppSelector(s => s.student.studentDetail.packages)
    const studentDetail = useAppSelector((s) => s.student.studentDetail.detail);
    const {
        first_name,
        last_name,
    } = studentDetail || {};

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
    }, [studentId])

    if (!studentDetail) {
        return null;
    }

    return (
        <div style={{ marginLeft: "10px", marginRight: "50px", marginTop: "20px" }}>
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
                Student Detail
            </SectionTitle>
            <Spacer />
            <table>
                <tbody>
                    <tr>
                        <td>Name:</td> <td>{`${first_name} ${last_name}`}</td>
                    </tr>
                </tbody>
            </table>
            <Spacer />

            <div style={{ display: "flex" }}>
                <WeeklyTimetable />
                <Spacer />
                <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Title>Student Packages</Title>
                        <Button
                            style={{ width: 40, height: 40 }}
                            onClick={() => {
                                AddPackageDialog.setContent(() => () => <AddPackageForm
                                    studentId={studentId || ""}
                                    studentName={`${first_name} ${last_name}`}
                                />)
                                AddPackageDialog.setOpen(true)
                            }}
                            shape="circle"
                        >
                            <LuPlusCircle size={30} />
                        </Button>
                    </div>
                    <Spacer height={5} />
                    <Sep />
                    <Spacer />
                    <Box sx={{
                        flex: 1,
                        "& td": {
                            "& div": {
                                display: "flex",
                                alignItems: "center",
                                width: "100%",
                                height: "100%"
                            }
                        }
                    }}>
                        <table>
                            <tbody>
                                <tr>
                                    <td><div><FaAngleDoubleRight /><Spacer width={5} /> Next Class</div></td><td>???</td>
                                </tr>
                            </tbody>
                        </table>
                    </Box>
                    <Spacer />
                    <CustomScrollbarContainer style={{ height: 800, width: "100%" }}>
                        <div style={{ display: "flex", justifyContent: 'center', width: "100%" }}>
                            <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
                                {packages.ids?.map(id => {
                                    return (
                                        <StudentPackage packageId={id} />
                                    )
                                })}

                            </div>
                        </div>
                    </CustomScrollbarContainer>

                </div>
            </div>
            {/* <Calendar /> */}
            <MoveConfirmationDialog.render />
            <DuplicateClassDialog.render />
            <UpdateClassDialog.render />
            <AddClassEventDialog.render />
            <AddPackageDialog.render />
        </div >
    );
};
