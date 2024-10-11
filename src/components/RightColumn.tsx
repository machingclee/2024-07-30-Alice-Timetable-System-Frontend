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

export default ({ timetableType }: { timetableType: TimetableType }) => {
    const selectedDate = useAppSelector((s) => s.student.studentDetail.dailyTimetable.selectedDate);
    const dispatch = useDispatch<AppDispatch>();

    const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>["mode"]) => {
        console.log(value.format("YYYY-MM-DD"), mode);
        console.log("mode:", mode);
        dispatch(studentSlice.actions.setDailyTimetableSelectedDate({ date: value.toDate() }));
    };

    return (
        <div style={{ width: "300px", marginRight: "50px" }}>
            <div style={{ height: "calc(100vh - 40px)", overflow: "hidden", display: "flex", flexDirection: "column" }}>
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
                    <table>
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
                    </table>
                </Box>
                {/* Calendar */}
            </div>
        </div>
        // </LocalizationProvider>
    );
};
