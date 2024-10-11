import { IoMdArrowBack } from "react-icons/io";
import SectionTitle from "../../components/SectionTitle";
import DailyTimetable from "../../components/DailyTimetable";
import Label from "../../components/Label";
import { Button } from "antd";
import Spacer from "../../components/Spacer";
import RightColumn from "../../components/RightColumn";
import { useNavigate } from "react-router-dom";
import DuplicateClassDialog from "../../components/DuplicateClassDialog";
import ViewClassDialog from "../../components/ViewClassDialog";
import DeleteClassDialog from "../../components/DeleteClassDialog";
import AddClassEventDialog from "../../components/AddClassEventDialog";
import { useEffect } from "react";
import studentSlice, { StudentThunkAction } from "../../redux/slices/studentSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { CourseThunkAction } from "../../redux/slices/courseSlice";

export default () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(studentSlice.actions.setTimetableType("Prince_Edward_Timetable"));
        dispatch(CourseThunkAction.getCourses());
    }, []);
    return (
        <div style={{ marginLeft: "10px", marginRight: "50px", height: "100%", width: "100%", display: "flex", flexDirection: "column" }}>
            <div style={{ width: "100%", display: "flex" }}>
                <div style={{ width: "100%" }}>
                    <SectionTitle>
                        <Label label="Timetables.tsx" offsetTop={-20} />
                        <Button
                            shape="circle"
                            onClick={() => {
                                navigate(-1);
                            }}
                        >
                            <IoMdArrowBack />
                        </Button>
                        <Spacer height={1} />
                        Prince Edward Daily Timetable
                    </SectionTitle>
                    <div style={{ height: "calc(100vh - 70px)", overflow: "hidden" }}>
                        <DailyTimetable />
                    </div>
                </div>
                <Spacer />
                <RightColumn />
            </div>
            {/* <MoveConfirmationDialog.render /> */}
            <DuplicateClassDialog.render />
            <ViewClassDialog.render />
            <DeleteClassDialog.render />
            <AddClassEventDialog.render />
        </div>
    );
};
