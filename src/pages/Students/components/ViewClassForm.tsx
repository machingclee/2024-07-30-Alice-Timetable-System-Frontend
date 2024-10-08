import { Box } from "@mui/material";
import SectionTitle from "../../../components/SectionTitle";
import Label from "../../../components/Label";
import Spacer from "../../../components/Spacer";
import { useRef, useState } from "react";
import { Button, Select, Input } from "antd";
import durations from "../../../constant/durations";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { StudentThunkAction } from "../../../redux/slices/studentSlice";
import { Class } from "../../../prismaTypes/types";
import { MdEdit } from "react-icons/md";
import classStatuses from "../../../constant/classStatuses";
import ViewClassDialog from "./ViewClassDialog";
import getColorForClassStatus from "../../../utils/getColorForClassStatus";
import getNumberSuffix from "../../../utils/getNumberSuffix";

export default (props: { classEvent: Class; classNumber: number; course_id: number; student_id: string }) => {
    const [editing, setEditing] = useState(false);
    const { classEvent, classNumber } = props;
    const { id, min, class_status, reason_for_absence, remark } = classEvent;
    const courseInfo = useAppSelector((s) => s.class.courses?.idToCourse?.[props.course_id || 0]);
    const idsToCourse = useAppSelector((s) => s.class.courses?.idToCourse);
    const status = class_status.toString();
    const formData = useRef({ min: min, class_status: status, reason_for_absence: reason_for_absence, remark: remark });
    const [hasAbsence, setHasAbsence] = useState<boolean>(class_status === "PRESENT" ? false : true);
    const dispatch = useAppDispatch();

    return (
        <Box style={{ maxWidth: 400, width: 600, padding: "40px 80px", overflowY: "auto", paddingBottom: 60 }}>
            <Label label="ViewClassForm.tsx" offsetTop={0} offsetLeft={380} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", width: "100%" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <div style={{ fontWeight: "bold", fontSize: "23px", marginLeft: "5px" }}>{courseInfo?.course_name}</div>
                    {classNumber !== 0 && <span style={{ fontWeight: "lighter", fontSize: "12px", marginLeft: "5px" }}>{getNumberSuffix(classNumber)}</span>}
                </div>
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
                <div style={{ margin: "10px 0", fontSize: "16px", fontWeight: "bold" }}>Duration:</div>
                {!editing && <div style={{ width: "100%", height: "32px", fontWeight: "lighter" }}>{min} minutes</div>}
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
                <div style={{ marginBottom: "10px", marginTop: "5px", fontSize: "16px", fontWeight: "bold" }}>Class Status:</div>
                {!editing && (
                    <div style={{ width: "100%", height: "32px", fontWeight: "lighter", display: "flex" }}>
                        {status}
                        <div style={{ display: "flex", justifyContent: "center", marginLeft: "10px" }}>
                            <div style={{ background: getColorForClassStatus(class_status), width: "15px", height: "15px" }} />
                        </div>
                    </div>
                )}
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
                        <div style={{ margin: "10px 0", fontWeight: "bold", fontSize: "16px" }}>Reason for Absence</div>
                        {!editing && <div style={{ width: "100%", height: "32px", fontWeight: "lighter" }}>{reason_for_absence === "" ? "Null" : reason_for_absence}</div>}
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
                <div style={{ marginBottom: "10px", marginTop: "5px", fontWeight: "bold", fontSize: "16px" }}>Remark:</div>
                {!editing && <div style={{ width: "100%", height: "32px", fontWeight: "lighter" }}>{remark === "" || remark === null ? "Null" : remark}</div>}
                {editing && (
                    <Input
                        defaultValue={remark || ""}
                        onChange={(value) => {
                            formData.current = { ...formData.current, remark: value.target.value };
                        }}
                    />
                )}
            </div>
            {editing && (
                <div>
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
                                    remark: formData.current.remark || "",
                                })
                            ).unwrap();
                            dispatch(StudentThunkAction.getStudentPackages({ studentId: props.student_id }));
                            ViewClassDialog.setOpen(false);
                        }}
                    >
                        Submit
                    </Button>
                </div>
            )}
        </Box>
    );
};
