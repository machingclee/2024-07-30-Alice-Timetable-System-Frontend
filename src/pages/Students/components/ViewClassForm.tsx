import { Box } from "@mui/material";
import SectionTitle from "../../../components/SectionTitle";
import Label from "../../../components/Label";
import Spacer from "../../../components/Spacer";
import { useRef, useState } from "react";
import { Button, Select, Input } from "antd";
import durations from "../../../constant/durations";
import { useAppDispatch } from "../../../redux/hooks";
import { StudentThunkAction } from "../../../redux/slices/studentSlice";
import { Class } from "../../../prismaTypes/types";
import { MdEdit } from "react-icons/md";
import classStatuses from "../../../constant/classStatuses";
import ViewClassDialog from "./ViewClassDialog";

export default (props: { classEvent: Class }) => {
    const [editing, setEditing] = useState(false);
    const { classEvent } = props;
    const { id, min, student_id, class_status, reason_for_absence } = classEvent;
    const status = class_status.toString();
    const formData = useRef({ min: min, class_status: status, reason_for_absence: reason_for_absence });
    const [hasAbsence, setHasAbsence] = useState<boolean>(class_status === "PRESENT" ? false : true);
    const dispatch = useAppDispatch();

    return (
        <Box style={{ maxWidth: 400, width: 600, padding: "40px 80px", overflowY: "auto", paddingBottom: 60 }}>
            <Label label="UpdateClassForm.tsx" offsetTop={0} offsetLeft={180} />
            <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                <SectionTitle>Class Information</SectionTitle>
                <div
                    style={{
                        display: "inline-block",
                        cursor: "pointer",
                        padding: "5px",
                        width: "20px",
                        height: "auto",
                        transition: "background-color 0.3s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f0f0f0")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                    onClick={() => {
                        setEditing(!editing);
                    }}
                >
                    <MdEdit style={{ width: "100%", height: "100%" }} />
                </div>
            </div>
            <Spacer />
            <div>
                <div style={{ margin: "10px 0" }}>Duration:</div>
                {!editing && <div style={{ width: "100%", height: "32px" }}>{min}</div>}
                {editing && (
                    <Select
                        dropdownStyle={{ zIndex: 10 ** 4 }}
                        style={{ width: "100%" }}
                        defaultValue={min}
                        onChange={(value) => {
                            formData.current = { ...formData.current, min: value };
                        }}
                        options={durations}
                    />
                )}
            </div>
            <div>
                <div style={{ marginBottom: "10px", marginTop: "5px" }}>Class Status:</div>
                {!editing && <div style={{ width: "100%", height: "32px" }}>{status}</div>}
                {editing && (
                    <Select
                        dropdownStyle={{ zIndex: 10 ** 4 }}
                        style={{ width: "100%" }}
                        defaultValue={status}
                        onChange={(value) => {
                            setHasAbsence(!(value === "PRESENT" || value === "MAKEUP"));
                            formData.current = { ...formData.current, class_status: value };
                        }}
                        options={classStatuses}
                    />
                )}
            </div>
            <div>
                {hasAbsence && (
                    <>
                        <div style={{ margin: "10px 0" }}>Reason for Absence</div>
                        {!editing && <div style={{ width: "100%", height: "32px" }}>{reason_for_absence === "" ? "Null" : reason_for_absence}</div>}
                        {editing && (
                            <Input
                                defaultValue={reason_for_absence || ""}
                                onChange={(value) => {
                                    formData.current = { ...formData.current, reason_for_absence: value.target.value };
                                }}
                            />
                        )}
                    </>
                )}
            </div>
            <div>
                {!editing && <div style={{ width: "100%", height: "32px" }}>{reason_for_absence === "" ? "Null" : reason_for_absence}</div>}
                {editing && (
                    <Input
                        defaultValue={reason_for_absence || ""}
                        onChange={(value) => {
                            formData.current = { ...formData.current, reason_for_absence: value.target.value };
                        }}
                    />
                )}
            </div>
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
                    ViewClassDialog.setOpen(false);
                }}
            >
                Submit
            </Button>
        </Box>
    );
};
