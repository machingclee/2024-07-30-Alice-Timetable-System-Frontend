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
import Calendar from "../components/TestTimetable";
import { CourseThunkAction } from "../../../redux/slices/courseSlice";
import UpdateClassDialog from "../components/UpdateClassDialog";
import DuplicateClassDialog from "../components/DuplicateClassDialog";
import MoveConfirmationDialog from "../components/MoveConfirmationDialog";

export default () => {
    const { studentId } = useParams<{ studentId: string }>();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const studentDetail = useAppSelector((s) => s.student.studentDetail.detail);
    const {
        first_name,
        last_name,
        // birthdate,
        // gender,
        // grade,
        // id,
        // parent_email,
        // phone_number,
        // school_name,
        // wechat_id
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
            <WeeklyTimetable />
            <Calendar />
            <Spacer height={200} />
        </div>
    );
};
