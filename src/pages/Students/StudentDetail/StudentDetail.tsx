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
            <MoveConfirmationDialog.render />
            <DuplicateClassDialog.render />
            <UpdateClassDialog.render />
            <AddClassEventDialog.render />
            <div style={{ display: "flex" }}>
                <WeeklyTimetable />
                <Spacer />
                <div style={{ flex: 1 }}>
                    <Title>Student Packages</Title>
                    <Sep />
                    <Spacer />
                    <div style={{ display: "flex", justifyContent: 'center', height: "100%", width: "100%" }}>
                        <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
                            <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                                <Button
                                    style={{ width: 70, height: 70 }}
                                    onClick={() => {
                                        AddPackageDialog.setContent(() => () => <AddPackageForm
                                            studentId={studentId || ""}
                                            studentName={`${first_name} ${last_name}`}
                                        />)
                                        AddPackageDialog.setOpen(true)
                                    }}
                                    shape="circle"
                                >
                                    <LuPlusCircle size={50} />
                                </Button>

                            </div>
                            <Spacer />
                            <div style={{ flex: 1, overflowY: "auto" }}>
                                {packages.ids?.map(id => {
                                    return (
                                        <StudentPackage packageId={id} />
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <Calendar /> */}
            <AddPackageDialog.render />
            <Spacer height={200} />
        </div>
    );
};
