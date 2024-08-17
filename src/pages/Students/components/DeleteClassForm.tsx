import { Box } from "@mui/material";
import SectionTitle from "../../../components/SectionTitle";
import Label from "../../../components/Label";
import Spacer from "../../../components/Spacer";
import { useRef, useState } from "react";
import { Button, Select, Input } from "antd";
import durations from "../../../constant/durations";
import { useAppDispatch } from "../../../redux/hooks";
import { StudentThunkAction } from "../../../redux/slices/studentSlice";
import DeleteClassDialog from "./DeleteClassDialog";
import { Class } from "../../../prismaTypes/types";
import classStatuses from "../../../constant/classStatuses";
import colors from "../../../constant/colors";

export default (props: { classEvent: Class }) => {
    const { classEvent } = props;
    const { id, min, student_id, class_status, reason_for_absence } = classEvent;
    const status = class_status.toString();
    const formData = useRef({ min: min, class_status: status, reason_for_absence: reason_for_absence });
    const dispatch = useAppDispatch();

    return (
        <Box style={{ maxWidth: 400, width: 600, padding: "40px 80px", overflowY: "auto", paddingBottom: 60 }}>
            <Label label="DeleteClassForm.tsx" offsetTop={0} offsetLeft={300} />
            <SectionTitle>Are you sure to delete this class?</SectionTitle>
            <Spacer />
            <Button
                style={{ backgroundColor: colors.red }}
                type="primary"
                block
                onClick={async () => {
                    await dispatch(
                        StudentThunkAction.deleteClass({
                            classId: id,
                            student_id: student_id,
                        })
                    ).unwrap();
                    dispatch(StudentThunkAction.getStudentPackages({ studentId: student_id }));
                    DeleteClassDialog.setOpen(false);
                }}
            >
                Submit
            </Button>
        </Box>
    );
};
