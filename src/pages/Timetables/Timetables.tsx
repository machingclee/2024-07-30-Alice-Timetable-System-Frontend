import { IoMdArrowBack } from "react-icons/io";
import SectionTitle from "../../components/SectionTitle";
import DailyTimetable from "../Students/components/DailyTimetable";
import Label from "../../components/Label";
import { Button } from "antd";
import Spacer from "../../components/Spacer";
import CalendarColumn from "./components/CalendarColumn";
import { useNavigate } from "react-router-dom";
import DuplicateClassDialog from "../../components/DuplicateClassDialog";
import ViewClassDialog from "../../components/ViewClassDialog";
import DeleteClassDialog from "../../components/DeleteClassDialog";
import AddClassEventDialog from "../../components/AddClassEventDialog";
import { useEffect } from "react";
import { StudentThunkAction } from "../../redux/slices/studentSlice";
import { useAppDispatch } from "../../redux/hooks";
import { CourseThunkAction } from "../../redux/slices/courseSlice";

export default () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(CourseThunkAction.getCourses());
    }, []);
    return (
        <div style={{ marginLeft: "10px", marginRight: "50px", height: "100%", display: "flex", flexDirection: "column" }}>
            <div style={{ width: "100%", display: "flex" }}>
                <div style={{ flex: 4 }}>
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
                        Daily Timetable
                    </SectionTitle>
                    <div style={{ height: "calc(100vh - 70px)", overflow: "hidden" }}>
                        <DailyTimetable />
                    </div>
                </div>
                <Spacer />
                <CalendarColumn packagesOffsetY={200} />
            </div>
            {/* <MoveConfirmationDialog.render /> */}
            <DuplicateClassDialog.render />
            <ViewClassDialog.render />
            <DeleteClassDialog.render />
            <AddClassEventDialog.render />
        </div>
    );
};
