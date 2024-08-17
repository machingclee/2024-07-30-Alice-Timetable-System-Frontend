import { Box } from "@mui/material";
import SectionTitle from "../../../components/SectionTitle";
import Label from "../../../components/Label";
import Spacer from "../../../components/Spacer";
import { useRef, useState } from "react";
import { Button, Select, Input } from "antd";
import durations from "../../../constant/durations";
import { useAppDispatch } from "../../../redux/hooks";
import { StudentThunkAction } from "../../../redux/slices/studentSlice";
import UpdateClassDialog from "./UpdateClassDialog";
import { Class } from "../../../prismaTypes/types";
import classStatuses from "../../../constant/classStatuses";

export default (props: { classEvent: Class }) => {
    const { classEvent } = props;
    const { id, min, student_id, class_status, reason_for_absence } = classEvent;
    const status = class_status.toString();
    const formData = useRef({ min: min, class_status: status, reason_for_absence: reason_for_absence });
    const [hasAbsence, setHasAbsence] = useState<boolean>(class_status === "PRESENT" ? false : true);
    const dispatch = useAppDispatch();

    return (
        <Box style={{ maxWidth: 400, width: 600, padding: "40px 80px", overflowY: "auto", paddingBottom: 60 }}>
            <Label label="UpdateClassForm.tsx" offsetTop={0} offsetLeft={180} />
            <SectionTitle>Update Class</SectionTitle>
            <Spacer />
            <div style={{ margin: "10px 0" }}>Duration:</div>
            <Select
                dropdownStyle={{ zIndex: 10 ** 4 }}
                style={{ width: "100%" }}
                defaultValue={min}
                onChange={(value) => {
                    formData.current = { ...formData.current, min: value };
                }}
                options={durations}
            />
            <div style={{ margin: "10px 0" }}>Class Status:</div>
            <Select
                dropdownStyle={{ zIndex: 10 ** 4 }}
                style={{ width: "100%" }}
                defaultValue={status}
                onChange={(value) => {
                    setHasAbsence(!(value === "PRESENT"));
                    formData.current = { ...formData.current, class_status: value };
                }}
                options={classStatuses}
            />
            {hasAbsence && (
                <>
                    <div style={{ margin: "10px 0" }}>Reason for Absence</div>
                    <Input
                        defaultValue={reason_for_absence || ""}
                        onChange={(value) => {
                            formData.current = { ...formData.current, reason_for_absence: value.target.value };
                        }}
                    />
                </>
            )}
            <Spacer />
            <Spacer />
            <Button
                type="primary"
                block
                onClick={async () => {
                    await dispatch(
                        StudentThunkAction.updateClass({
                            classId: id,
                            min: formData.current.min,
                            class_status: formData.current.class_status,
                            reason_for_absence: formData.current.reason_for_absence || "",
                        })
                    ).unwrap();
                    dispatch(StudentThunkAction.getStudentPackages({ studentId: student_id }));
                    UpdateClassDialog.setOpen(false);
                }}
            >
                Submit
            </Button>
        </Box>
    );
};
