import { Alert, Box } from "@mui/material";
import SectionTitle from "./SectionTitle";
import Label from "./Label";
import Spacer from "./Spacer";
import { useEffect } from "react";
import { Button } from "antd";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { StudentThunkAction } from "../redux/slices/studentSlice";
import DeleteClassDialog from "./DeleteClassDialog";
import colors from "../constant/colors";
import dayjs from "dayjs";
import { TimetableType, WeeklyTimetableClass } from "../dto/dto";

export default (props: { classEvent: WeeklyTimetableClass }) => {
    const { classEvent } = props;
    const { id, student_id, class_status, class_group_id, course_id, hour_unix_timestamp, day_unix_timestamp } = classEvent;
    const courseName = useAppSelector((s) => s.class.courses.idToCourse?.[course_id || 0])?.course_name;
    const classAt = dayjs(hour_unix_timestamp).format("HH:mm");
    const classOn = dayjs(day_unix_timestamp).format("dddd");
    const status = class_status.toString();
    const dispatch = useAppDispatch();
    const hasDuplicationGroup = class_group_id != null;

    useEffect(() => {
        console.log(DeleteClassDialog);
    }, [DeleteClassDialog]);

    return (
        <Box style={{ maxWidth: 400, width: 600, padding: "40px 80px", overflowY: "auto", paddingBottom: 60 }}>
            <Label label="DeleteClassForm.tsx" offsetTop={0} offsetLeft={300} />
            <SectionTitle>Are you sure to delete this class?</SectionTitle>
            <Spacer />
            Class Detail:
            <Spacer height={10} />
            <div style={{ display: "flex", justifyContent: "center" }}>{courseName}</div>
            <Spacer height={10} />
            <div>
                scheduled at {classAt} on {hasDuplicationGroup ? `every ${classOn}` : classOn}
            </div>
            <Spacer />
            {hasDuplicationGroup && (
                <Alert severity="warning">
                    <div>
                        This timeslot is <b>within a group of</b> duplicated classes, do you want to delete all of them?
                    </div>
                    <Spacer />
                    <div>If not, you may first detach this class from the group.</div>
                    <Spacer />
                </Alert>
            )}
            <Spacer />
            <Button
                style={{ backgroundColor: colors.red }}
                type="primary"
                block
                onClick={async () => {
                    await dispatch(
                        StudentThunkAction.deleteClass({
                            classId: id,
                        })
                    ).unwrap();
                    // dispatch(StudentThunkAction.getStudentClassesForDailyTimetable({ dateUnixTimestamp: day_unix_timestamp.toString(), timetableType: props.timetableType }));
                    dispatch(StudentThunkAction.getStudentClassesForWeeklyTimetable({ studentId: student_id }));
                    dispatch(StudentThunkAction.getStudentPackages({ studentId: student_id }));
                    DeleteClassDialog.setOpen(false);
                }}
            >
                Confirm
            </Button>
            <Spacer height={5} />
            <Button
                type="text"
                block
                onClick={async () => {
                    DeleteClassDialog.setOpen(false);
                }}
            >
                Cancel
            </Button>
        </Box>
    );
};
