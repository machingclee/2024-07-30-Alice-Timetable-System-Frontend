import { Button } from "antd";
import Title from "../../../components/Title";
import { useParams } from "react-router-dom";
import Spacer from "../../../components/Spacer";
import { useAppSelector } from "../../../redux/hooks";
import { useDispatch } from "react-redux";
import Sep from "../../../components/Sep";
import Label from "../../../components/Label";
import { Calendar, theme } from "antd";
import type { CalendarProps } from "antd";
import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import studentSlice from "../../../redux/slices/studentSlice";

export default (props: { packagesOffsetY: number }) => {
    const { packagesOffsetY } = props;
    const selectedDate = useAppSelector((s) => s.student.studentDetail.dailyTimetable.selectedDate);
    const dispatch = useDispatch();

    const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>["mode"]) => {
        console.log(value.format("YYYY-MM-DD"), mode);
        console.log("mode:", mode);
        dispatch(studentSlice.actions.setDailyTimetableSelectedDate({ date: value.toDate() }));
    };

    return (
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <div style={{ height: "calc(100vh - 40px)", overflow: "hidden", display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Label label="StudentPackageColumn.tsx" offsetTop={-15} offsetLeft={20} />
                    <Title>Calendar</Title>
                </div>
                <Calendar
                    fullscreen={false}
                    onPanelChange={onPanelChange}
                    value={dayjs(selectedDate)}
                    onSelect={(date, { source }) => {
                        dispatch(studentSlice.actions.setDailyTimetableSelectedDate({ date: date.toDate() }));
                    }}
                    style={{ width: 290 }}
                />
                <Spacer height={5} />
                <Sep />
                <Spacer />
                {/* <Box
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
                                        <Spacer width={5} /> Next Class
                                    </div>
                                </td>
                                <td>???</td>
                            </tr>
                        </tbody>
                    </table>
                </Box> */}
                {/* Calendar */}
            </div>
        </div>
        // </LocalizationProvider>
    );
};
