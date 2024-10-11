import { Button } from "antd";
import Title from "../components/Title";
import { useParams } from "react-router-dom";
import Spacer from "../components/Spacer";
import { useAppSelector } from "../redux/hooks";
import { useDispatch } from "react-redux";
import Sep from "../components/Sep";
import Label from "../components/Label";
import { Calendar, theme } from "antd";
import type { CalendarProps } from "antd";
import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import studentSlice, { StudentThunkAction } from "../redux/slices/studentSlice";
import timeUtil from "../utils/timeUtil";
import { AppDispatch } from "../redux/store";
import { Box } from "@mui/material";
import { FaAngleDoubleRight } from "react-icons/fa";
import { TimetableType } from "../dto/dto";
import appSlice from "../redux/slices/appSlice";
import CollapseButton from "../assets/collapse-button.png";

export default ({ timetableType }: { timetableType: TimetableType }) => {
    const selectedDate = useAppSelector((s) => s.student.studentDetail.dailyTimetable.selectedDate);
    const rightColumnCollapsed = useAppSelector((s) => s.app.rightColumnCollapsed);
    const dispatch = useDispatch<AppDispatch>();

    const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>["mode"]) => {
        console.log(value.format("YYYY-MM-DD"), mode);
        console.log("mode:", mode);
        dispatch(studentSlice.actions.setDailyTimetableSelectedDate({ date: value.toDate() }));
    };

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
                    onSelect={(date, { source }) => {
                        dispatch(studentSlice.actions.setDailyTimetableSelectedDate({ date: date.toDate() }));
                        dispatch(
                            StudentThunkAction.getStudentClassesForDailyTimetable({
                                dateUnixTimestamp: timeUtil.getDayUnixTimestamp(date.toDate().getTime()).toString(),
                                timetableType: timetableType,
                            })
                        );
                    }}
                    style={{ width: 290 }}
                />
                <Spacer height={5} />
                <Sep />
                <Spacer />
                <Box
                    sx={{
                        flex: 1,
                        "& td": {
                            "& div": {
                                display: "flex",
                                alignItems: "center",
                                width: "100%",
                                height: "100%",
                            },
                        },
                    }}
                >
                    {/* <table>
                        <tbody>
                            <tr>
                                <td>
                                    <div>
                                        <FaAngleDoubleRight />
                                        <Spacer width={5} /> Filter
                                    </div>
                                </td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table> */}
                </Box>
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
        // </LocalizationProvider>
    );
};
