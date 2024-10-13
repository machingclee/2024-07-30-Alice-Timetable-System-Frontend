import Title from "../components/Title";
import Spacer from "../components/Spacer";
import { useAppSelector } from "../redux/hooks";
import { useDispatch } from "react-redux";
import Sep from "../components/Sep";
import Label from "../components/Label";
import { Calendar } from "antd";
import type { CalendarProps } from "antd";
import dayjs, { Dayjs } from "dayjs";
import studentSlice, { StudentThunkAction } from "../redux/slices/studentSlice";
import timeUtil from "../utils/timeUtil";
import { AppDispatch } from "../redux/store";
import appSlice from "../redux/slices/appSlice";
import CollapseButton from "../assets/collapse-button.png";
import { FaFilter } from "react-icons/fa";
import Checkbox from "@mui/material/Checkbox";
import colors from "../constant/colors";

export default () => {
    const classRoom = useAppSelector((s) => s.student.allStudents.classRoom);
    const selectedDate = useAppSelector((s) => s.student.allStudents.selectedDate);
    const rightColumnCollapsed = useAppSelector((s) => s.app.rightColumnCollapsed);
    const dispatch = useDispatch<AppDispatch>();

    const onPanelChange = (value: Dayjs, _: CalendarProps<Dayjs>["mode"]) => {
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
                        dispatch(
                            StudentThunkAction.getStudentClassesForDailyTimetable({
                                dateUnixTimestamp: timeUtil.getDayUnixTimestamp(date.toDate().getTime()).toString(),
                                classRoom,
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
                            <Checkbox {...label} />
                            Present
                        </div>
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Checkbox {...label} />
                            Suspicious Absence
                        </div>
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Checkbox {...label} />
                            Illegit Absence
                        </div>
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Checkbox {...label} />
                            Legit Absence
                        </div>
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Checkbox {...label} />
                            Makeup
                        </div>
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Checkbox {...label} />
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
                    {/* <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: "9px", marginTop: "12px" }}>
                        <div style={{ height: "32px", display: "flex", justifyContent: "center", marginLeft: "10px" }}>({summaryOfClassStatues.present})</div>
                        <div style={{ height: "32px", display: "flex", justifyContent: "center", marginLeft: "10px" }}>({summaryOfClassStatues.suspiciousAbsence})</div>

                        <div style={{ height: "32px", display: "flex", justifyContent: "center", marginLeft: "10px" }}>({summaryOfClassStatues.illegitAbsence})</div>
                        <div style={{ height: "32px", display: "flex", justifyContent: "center", marginLeft: "10px" }}>({summaryOfClassStatues.legitAbsence})</div>
                        <div style={{ height: "32px", display: "flex", justifyContent: "center", marginLeft: "10px" }}>({summaryOfClassStatues.makeup})</div>
                        <div style={{ height: "32px", display: "flex", justifyContent: "center", alignItems: "center", marginLeft: "10px" }}>
                            ({summaryOfClassStatues.changeOfClassroom})
                        </div>
                    </div> */}
                </div>
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
