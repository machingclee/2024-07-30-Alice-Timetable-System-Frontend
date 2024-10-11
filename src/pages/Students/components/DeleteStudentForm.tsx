import { Alert, Box } from "@mui/material";
import SectionTitle from "../../../components/SectionTitle";
import Label from "../../../components/Label";
import Spacer from "../../../components/Spacer";
import { useEffect, useRef } from "react";
import { Button } from "antd";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { StudentThunkAction } from "../../../redux/slices/studentSlice";
import DeleteClassDialog from "../../../components/DeleteClassDialog";
import { Class, Course, Student_package } from "../../../prismaTypes/types";
import colors from "../../../constant/colors";
import dayjs from "dayjs";
import { TimetableType } from "../../../dto/dto";

export default (props: { studentId: string }) => {
    const { studentId } = props;
    const { first_name, last_name, chinese_first_name, chinese_last_name, gender, birthdate, parent_email, school_name, grade, phone_number, wechat_id } = useAppSelector(
        (s) => s.student.students.idToStudent?.[studentId]
    );

    useEffect(() => {
        console.log(DeleteClassDialog);
    }, [DeleteClassDialog]);

    return (
        <Box style={{ maxWidth: 400, width: 600, padding: "40px 80px", overflowY: "auto", paddingBottom: 60 }}>
            <Label label="DeleteStudentForm.tsx" offsetTop={0} offsetLeft={300} />
            <SectionTitle>Are you sure to delete this student?</SectionTitle>
            <Spacer height={40} />
            <div>English name: {first_name + " " + last_name}</div>
            <Spacer height={10} />
            <div>Chinese name: {chinese_first_name + chinese_last_name ? chinese_first_name + chinese_last_name : "null"}</div>
            <Spacer />
            {/* {hasDuplicationGroup && (
                <Alert severity="warning">
                    <div>
                        This timeslot is <b>within a group of</b> duplicated classes, do you want to delete all of them?
                    </div>
                    <Spacer />
                    <div>If not, you may first detach this class from the group.</div>
                    <Spacer />
                </Alert>
            )} */}
            <Spacer />
            <Button
                style={{ backgroundColor: colors.red }}
                type="primary"
                block
                onClick={async () => {
                    // await dispatch(
                    //     StudentThunkAction.deleteClass({
                    //         classId: id,
                    //     })
                    // ).unwrap();
                    // dispatch(StudentThunkAction.getStudentClassesForDailyTimetable({ dateUnixTimestamp: day_unix_timestamp.toString(), timetableType: props.timetableType }));
                    // dispatch(StudentThunkAction.getStudentClassesForWeeklyTimetable({ studentId: student_id }));
                    // dispatch(StudentThunkAction.getStudentPackages({ studentId: student_id }));
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
