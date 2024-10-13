import { Box } from "@mui/material";
import Label from "./Label";
import Spacer from "./Spacer";
import { useEffect, useRef, useState } from "react";
import { Button, Select, Input } from "antd";
import durations from "../constant/durations";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { StudentThunkAction } from "../redux/slices/studentSlice";
import { $Enums, Classroom } from "../prismaTypes/types";
import { MdEdit } from "react-icons/md";
import classStatuses from "../constant/classStatuses";
import ViewClassDialog from "./ViewClassDialog";
import getColorForClassStatus from "../utils/getColorForClassStatus";
import getNumberSuffix from "../utils/getNumberSuffix";
import { TimetableClass } from "../dto/dto";

export default (props: { classEvent: TimetableClass }) => {
    const [editing, setEditing] = useState(false);
    const { classEvent } = props;
    const { id, min, class_status, reason_for_absence, remark, actual_classroom, default_classroom, class_number } = classEvent;
    const courseInfo = useAppSelector((s) => s.class.courses?.idToCourse?.[classEvent.course_id || 0]);
    const formData = useRef({ min: min, class_status: class_status, reason_for_absence: reason_for_absence, remark: remark, actual_classroom: actual_classroom });
    const [hasAbsence, setHasAbsence] = useState<boolean>(["PRESENT", "CHANGE_OF_CLASSROOM"].includes(class_status) ? false : true);
    const dispatch = useAppDispatch();

    useEffect(() => { }, []);

    const classroomOptions: Classroom[] = ["PRINCE_EDWARD", "CAUSEWAY_BAY"];

    return (
        <Box style={{ maxWidth: 400, width: 600, padding: "40px 80px", overflowY: "auto", paddingBottom: 60, marginLeft: "10px" }}>
            <Label label="ViewClassForm.tsx" offsetTop={0} offsetLeft={380} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", width: "100%" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <div style={{ fontWeight: "bold", fontSize: "23px" }}>{courseInfo?.course_name}</div>
                    {class_number !== 0 && <span style={{ fontWeight: "lighter", fontSize: "12px" }}>{getNumberSuffix(class_number)}</span>}
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
                <div style={{ marginBottom: "10px", marginTop: "5px", fontSize: "16px", fontWeight: "bold" }}>Duration:</div>
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
                <div style={{ marginBottom: "10px", marginTop: "5px", fontSize: "16px", fontWeight: "bold" }}>Classroom:</div>
                {!editing && <div style={{ width: "100%", height: "32px", fontWeight: "lighter" }}>{actual_classroom ? actual_classroom : default_classroom}</div>}
                {editing && (
                    <Select
                        dropdownStyle={{ zIndex: 10 ** 4 }}
                        style={{ width: "100%" }}
                        defaultValue={classEvent.actual_classroom}
                        onChange={(value) => {
                            console.log("value:", value);
                            formData.current = { ...formData.current, actual_classroom: value };
                        }}
                        options={classroomOptions.map((classroom) => {
                            return { value: classroom, label: classroom };
                        })}
                    />
                )}
            </div>
            <div>
                <div style={{ marginBottom: "10px", marginTop: "5px", fontSize: "16px", fontWeight: "bold" }}>Class Status:</div>
                {!editing && (
                    <div style={{ width: "100%", height: "32px", fontWeight: "lighter", display: "flex" }}>
                        {class_status}
                        <div style={{ display: "flex", justifyContent: "center", marginLeft: "10px" }}>
                            <div style={{ background: getColorForClassStatus(class_status), width: "15px", height: "15px" }} />
                        </div>
                    </div>
                )}
                {editing && (
                    <Select
                        dropdownStyle={{ zIndex: 10 ** 4 }}
                        style={{ width: "100%" }}
                        defaultValue={class_status}
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
                            await dispatch(StudentThunkAction.updateClass({
                                classId: id,
                                min: formData.current.min,
                                class_status: formData.current.class_status,
                                reason_for_absence: formData.current.reason_for_absence || "",
                                remark: formData.current.remark || "",
                                actual_classroom: formData.current.actual_classroom as $Enums.Classroom,
                            })
                            ).unwrap();
                            dispatch(StudentThunkAction.getStudentClassesForWeeklyTimetable({ studentId: classEvent.student_id }))
                            dispatch(StudentThunkAction.getStudentPackages({ studentId: classEvent.student_id }));
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
