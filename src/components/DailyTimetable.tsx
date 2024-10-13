import { Button } from "antd";
import CustomScrollbarContainer from "../components/CustomScrollbarContainer";
import { Box } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { useState, useEffect, useRef, useMemo } from "react";
import SectionTitle from "../components/SectionTitle";
import Spacer from "../components/Spacer";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import studentSlice, { StudentThunkAction } from "../redux/slices/studentSlice";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import timeUtil from "../utils/timeUtil";
import StudentsClassForDailyTimetableByHour from "./StudentsClassForDailyTimetableByHour";
import Label from "./Label";

export default () => {
    const dispatch = useAppDispatch();
    const classRoom = useAppSelector((s) => s.student.allStudents.classRoom);
    const selectedDate = useAppSelector((s) => s.student.allStudents.selectedDate);
    const [hoursColumnGrid, setHoursColumn] = useState<string[]>([]);
    const selectedDay = useAppSelector(s => s.student.allStudents.selectedDate);

    // Memoize the half-hour intervals to prevent recalculation on every render
    const oneForthHourIntervals = useMemo(() => {
        const startOfTodayDayjs = dayjs(selectedDate).startOf("day").add(9, "hour"); // Start from 9 AM
        const intervals: Dayjs[] = [];
        for (let offset = 0; offset < 44; offset++) {
            intervals.push(startOfTodayDayjs.add(offset * 0.25, "hour"));
        }
        return intervals;
    }, [selectedDate]);

    // Initialize the time grid based on `hrUnixTimestamps`
    useEffect(() => {
        const hoursOfTheDay = oneForthHourIntervals.map((dayJS) => String(dayJS.valueOf()));
        setHoursColumn(hoursOfTheDay);
        // Add another thing to listen to: change of the date (like next day and previous day)
    }, [selectedDay]);

    const timetableContainerRef = useRef<HTMLDivElement | null>(null);
    const gridHeight = 40;

    return (
        <Box
            ref={timetableContainerRef}
            sx={{
                overflowY: "hidden",
                height: "1000px",
                "& .draggable-container": {
                    borderTop: "1px solid rgba(0,0,0,0.1)",
                    borderLeft: "1px solid rgba(0, 0, 0, 0.1)",
                },
                "& .droppable:last-child": {
                    "& .draggable-container": {
                        borderRight: "1px solid rgba(0,0,0,0.1)",
                    },
                },
                "& .draggable-container:last-child": {
                    borderBottom: "1px solid rgba(0,0,0,0.1)",
                },
                "& .freeze": {
                    transform: "translate(0px,0px) !important",
                },
                "& .grid-time: nth-child(n+2)": {
                    paddingRight: "14px",
                    height: `${gridHeight}px`,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                },
                "& .grid-hour: nth-child(n+1)": {
                    width: "120px",
                    height: `${gridHeight - 1}px`,
                },
                "& .droppable": {
                    "& .grid-hour": {
                        "&.disbaletransform": { transform: "none !important" },
                        "&:hover": {
                            cursor: "pointer",
                            backgroundColor: "rgba(22,119,255,0.2)",
                        },
                    },
                },
            }}
        >
            <Label label="DailyTimetable.tsx" offsetLeft={40} offsetTop={20} />
            <SectionTitle style={{ justifyContent: "center" }}>
                <div style={{ display: "flex", alignItems: "center", padding: 10 }}>
                    <Button
                        onClick={() => {
                            if (!classRoom) {
                                return;
                            }
                            const prevDayjs = dayjs(selectedDate).subtract(1, "day");
                            dispatch(studentSlice.actions.setDailyTimetableSelectedDate({ date: prevDayjs.toDate() }));
                            dispatch(
                                StudentThunkAction.getStudentClassesForDailyTimetable({
                                    dateUnixTimestamp: prevDayjs.startOf("day").valueOf().toString(),
                                    classRoom: classRoom,
                                })
                            );
                        }}
                    >
                        <div style={{ display: "flex", alignItems: "center", fontSize: 14 }}>
                            <FaChevronLeft /> <Spacer width={5} /> Previous Day
                        </div>
                    </Button>
                    <Spacer width={20} />
                    <div>{dayjs(selectedDate).format("YYYY-MM-DD (ddd)")}</div>
                    <Spacer width={20} />
                    <Button
                        onClick={() => {
                            if (!classRoom) {
                                return;
                            }
                            dispatch(studentSlice.actions.setDailyTimetableSelectedDate({ date: dayjs(selectedDate).add(1, "day").toDate() }));
                            dispatch(
                                StudentThunkAction.getStudentClassesForDailyTimetable({
                                    dateUnixTimestamp: timeUtil.getDayUnixTimestamp(dayjs(selectedDate).add(1, "day").toDate().getTime()).toString(),
                                    classRoom: classRoom,
                                })
                            );
                        }}
                    >
                        <div style={{ display: "flex", alignItems: "center", fontSize: 14 }}>
                            Next Day <Spacer width={5} /> <FaChevronRight />
                        </div>
                    </Button>
                </div>
            </SectionTitle>

            <CustomScrollbarContainer style={{ height: "calc(100vh - 120px)" }}>
                <Spacer />
                <div style={{ display: "flex" }}>
                    <div style={{ flex: 1 }}>
                        <div style={{ display: "flex" }}>
                            <div>
                                <Spacer height={30} style={{ position: "sticky", top: 0, background: "white", width: "100%" }} />
                                {oneForthHourIntervals.map((dayJS) => {
                                    return (
                                        <div style={{ fontSize: 13 }} className="grid-time" key={dayJS.valueOf().toString()}>
                                            {dayJS.format("HH:mm")}
                                        </div>
                                    );
                                })}
                            </div>
                            <div style={{ flex: 1 }}>
                                {hoursColumnGrid
                                    .sort()
                                    .map((hourUnixTimestamp) => {
                                        return (
                                            <div key={hourUnixTimestamp} style={{ flex: 1 }} className="time-column" >
                                                <Spacer height={5} />
                                                <div className="droppable">

                                                    <StudentsClassForDailyTimetableByHour
                                                        key={hourUnixTimestamp}
                                                        dayUnixTimestamp={timeUtil.getDayUnixTimestamp(selectedDate.getTime())}
                                                        currHourUnixTimestamp={parseInt(hourUnixTimestamp)}
                                                    />
                                                </div>
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>
                    </div>
                    <Spacer />
                </div>
                <Spacer />
            </CustomScrollbarContainer>
        </Box>
    );
};
