import Title from "../components/Title";
import Spacer from "../components/Spacer";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useDispatch } from "react-redux";
import Sep from "../components/Sep";
import Label from "../components/Label";
import { Button, Calendar } from "antd";
import type { CalendarProps } from "antd";
import dayjs, { Dayjs } from "dayjs";
import studentSlice, { StudentThunkAction } from "../redux/slices/studentSlice";
import timeUtil from "../utils/timeUtil";
import { AppDispatch } from "../redux/store";
import { FilterToGetClassesForDailyTimetable } from "../dto/dto";
import appSlice from "../redux/slices/appSlice";
import CollapseButton from "../assets/collapse-button.png";
import { FaFilter } from "react-icons/fa";
import Checkbox from "@mui/material/Checkbox";
import colors from "../constant/colors";
import React from "react";

export default () => {
    const classRoom = useAppSelector((s) => s.student.allStudents.classRoom);
    const summaryOfClassStatues = useAppSelector((s) => s.student.allStudents.summaryOfClassStatues);
    const selectedDate = useAppSelector((s) => s.student.allStudents.selectedDate);
    const rightColumnCollapsed = useAppSelector((s) => s.app.rightColumnCollapsed);
    const filter = useAppSelector((s) => s.student.allStudents.filter);
    const dispatch = useDispatch<AppDispatch>();

    const [formData, setFormData] = React.useState<FilterToGetClassesForDailyTimetable>({
        present: filter.present,
        suspicious_absence: filter.suspicious_absence,
        illegit_absence: filter.illegit_absence,
        legit_absence: filter.legit_absence,
        makeup: filter.makeup,
        changeOfClassroom: filter.changeOfClassroom,
    });

    const submit = () => {
        console.log("formData:", formData);
        if (!classRoom) return;
        dispatch(studentSlice.actions.setFilter(formData));
        const currentTimestamp = dayjs(selectedDate.getTime()).startOf("day").valueOf().toString();
        dispatch(
            StudentThunkAction.getFilteredStudentClassesForDailyTimetable({
                dateUnixTimestamp: currentTimestamp,
                classRoom: classRoom,
                filter: formData,
            })
        );
    };

    const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>["mode"]) => {
        dispatch(studentSlice.actions.setDailyTimetableSelectedDate({ date: value.toDate() }));
    };

    const label = { inputProps: { "aria-label": "Checkbox demo" } };

    return (
        <div style={{ width: rightColumnCollapsed ? "0px" : "300px", marginRight: "50px", transition: "width 0.3s ease-in-out" }}>
            <div
                style={{
                    height: "calc(100vh - 40px)",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    transition: "opacity 0.3s ease-in-out",
                    opacity: rightColumnCollapsed ? 0 : 1,
                }}
            >
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Label label="RightColumn.tsx" offsetTop={0} offsetLeft={-70} />
                    <Title>Calendar</Title>
                </div>
                <Calendar
                    fullscreen={false}
                    onPanelChange={onPanelChange}
                    value={dayjs(selectedDate)}
                    onSelect={(date, _) => {
                        if (!classRoom) {
                            return;
                        }
                        dispatch(studentSlice.actions.setDailyTimetableSelectedDate({ date: date.toDate() }));
                        console.log("I am being called");
                        // dispatch(
                        //     StudentThunkAction.getStudentClassesForDailyTimetable({
                        //         dateUnixTimestamp: timeUtil.getDayUnixTimestamp(date.toDate().getTime()).toString(),
                        //         classRoom: classRoom,
                        //     })
                        // );
                        dispatch(
                            StudentThunkAction.getFilteredStudentClassesForDailyTimetable({
                                dateUnixTimestamp: timeUtil.getDayUnixTimestamp(date.toDate().getTime()).toString(),
                                classRoom,
                                filter: formData,
                            })
                        );
                    }}
                    style={{ width: 290 }}
                />
                <Spacer height={5} />
                <Sep />
                <Spacer height={60} />
                <div
                    style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        marginBottom: "30px",
                        marginLeft: "10px",
                        marginTop: "20px",
                        fontSize: 19,
                        fontWeight: "bold",
                    }}
                >
                    <FaFilter />
                    <Spacer width={5} /> Filter By Class Status
                </div>
                <div style={{ display: "flex", justifyContent: "flex-start", alignContent: "center", gap: "15px" }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Checkbox
                                onChange={(event) => {
                                    setFormData((prev) => ({ ...prev, present: event.target.checked }));
                                }}
                                checked={formData.present}
                                {...label}
                            />
                            Present
                        </div>
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Checkbox
                                onChange={(event) => {
                                    setFormData((prev) => ({ ...prev, suspicious_absence: event.target.checked }));
                                }}
                                checked={formData.suspicious_absence}
                                {...label}
                            />
                            Suspicious Absence
                        </div>
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Checkbox
                                onChange={(event) => {
                                    setFormData((prev) => ({ ...prev, illegit_absence: event.target.checked }));
                                }}
                                checked={formData.illegit_absence}
                                {...label}
                            />
                            Illegit Absence
                        </div>
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Checkbox
                                onChange={(event) => {
                                    setFormData((prev) => ({ ...prev, legit_absence: event.target.checked }));
                                }}
                                checked={formData.legit_absence}
                                {...label}
                            />
                            Legit Absence
                        </div>
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Checkbox
                                onChange={(event) => {
                                    setFormData((prev) => ({ ...prev, makeup: event.target.checked }));
                                }}
                                checked={formData.makeup}
                                {...label}
                            />
                            Makeup
                        </div>
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Checkbox
                                onChange={(event) => {
                                    setFormData((prev) => ({ ...prev, changeOfClassroom: event.target.checked }));
                                }}
                                checked={formData.changeOfClassroom}
                                {...label}
                            />
                            Change of Classroom
                        </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: "9px", marginTop: "12px" }}>
                        <div style={{ height: "32px", display: "flex", justifyContent: "center", marginLeft: "10px" }}>
                            <div style={{ background: colors.blue, width: "15px", height: "15px" }} />
                        </div>
                        <div style={{ height: "32px", display: "flex", justifyContent: "center", marginLeft: "10px" }}>
                            <div style={{ background: colors.amber, width: "15px", height: "15px" }} />
                        </div>

                        <div style={{ height: "32px", display: "flex", justifyContent: "center", marginLeft: "10px" }}>
                            <div style={{ background: colors.red, width: "15px", height: "15px" }} />
                        </div>
                        <div style={{ height: "32px", display: "flex", justifyContent: "center", marginLeft: "10px" }}>
                            <div style={{ background: colors.grey, width: "15px", height: "15px" }} />
                        </div>
                        <div style={{ height: "32px", display: "flex", justifyContent: "center", marginLeft: "10px" }}>
                            <div style={{ background: colors.green, width: "15px", height: "15px" }} />
                        </div>
                        <div style={{ height: "32px", display: "flex", justifyContent: "center", alignItems: "center", marginLeft: "10px" }}>
                            <div style={{ background: colors.purple, width: "15px", height: "15px" }} />
                        </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: "9px", marginTop: "12px" }}>
                        <div style={{ height: "32px", display: "flex", justifyContent: "center", marginLeft: "10px" }}>({summaryOfClassStatues.present})</div>
                        <div style={{ height: "32px", display: "flex", justifyContent: "center", marginLeft: "10px" }}>({summaryOfClassStatues.suspiciousAbsence})</div>
                        <div style={{ height: "32px", display: "flex", justifyContent: "center", marginLeft: "10px" }}>({summaryOfClassStatues.illegitAbsence})</div>
                        <div style={{ height: "32px", display: "flex", justifyContent: "center", marginLeft: "10px" }}>({summaryOfClassStatues.legitAbsence})</div>
                        <div style={{ height: "32px", display: "flex", justifyContent: "center", marginLeft: "10px" }}>({summaryOfClassStatues.makeup})</div>
                        <div style={{ height: "32px", display: "flex", justifyContent: "center", alignItems: "center", marginLeft: "10px" }}>
                            ({summaryOfClassStatues.changeOfClassroom})
                        </div>
                    </div>
                </div>
                <Button type="primary" block onClick={submit} style={{ marginTop: "10px" }}>
                    Confirm
                </Button>
            </div>
            <img
                onClick={() => {
                    dispatch(appSlice.actions.setRightColumnCollapsed(!rightColumnCollapsed));
                }}
                style={{
                    position: "absolute",
                    bottom: "50%",
                    right: rightColumnCollapsed ? "0%" : "25%",
                    width: 30,
                    height: 30,
                    cursor: "pointer",
                    transition: "right 0.5s ease-out, transform 1s ease-out",
                    zIndex: 10 ** 100,
                    transform: rightColumnCollapsed ? "rotate(0deg)" : "rotate(180deg)",
                }}
                src={CollapseButton}
            />
        </div>
    );
};
