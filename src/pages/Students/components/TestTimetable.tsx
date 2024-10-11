// src/components/Calendar.tsx
import React, { useState, useRef, MouseEvent, useEffect, useCallback } from "react";
import dayjs, { Dayjs } from "dayjs";
import { eachDayOfInterval, startOfWeek, endOfWeek } from "date-fns";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import GridItem from "./GridItem";
import { StudentThunkAction } from "../../../redux/slices/studentSlice";
import appSlice from "../../../redux/slices/appSlice";

export type WeeklyCoordinate = {
    [dateUnixTimestamp: string]: {
        [halfHourUnixTimestamp: string]: null;
    };
};

type Timeslot = { [day: number]: SlotInfo };

type SlotInfo = { [startTime: number]: { endTime: number; course_id: number; course_name: string; min: number; student_id: string } };

const convertMinutesToTime = (minutes: number) => {
    const startOfDay = dayjs().startOf("day");

    // Add the minutes to the start of the day
    const time = startOfDay.add(minutes, "minute");

    // Format the time as HH:mm
    return time.format("HH:mm");
};

const Calendar: React.FC = () => {
    // For the timetable grid
    const currDate = new Date();
    const weekStart = dayjs(startOfWeek(currDate, { weekStartsOn: 1 })).valueOf();
    const weekEnd = dayjs(endOfWeek(currDate, { weekStartsOn: 1 })).valueOf();
    const daysOfWeek = eachDayOfInterval({ start: new Date(weekStart), end: new Date(weekEnd) });

    const dispatch = useAppDispatch();
    const [timeSlots, setTimeSlots] = useState<Timeslot>({});
    const [currentSlot, setCurrentSlot] = useState<{ start: number; end: number } | null>(null);
    const [resizingSlot, setResizingSlot] = useState<{ day: number; start: number } | null>(null);
    const [draggingSlot, setDraggingSlot] = useState<{ day: number; start: number; end: number; courseId: number; courseName: string } | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const { studentId } = useParams<{ studentId: string }>();
    const hrUnixTimestampdToObject = useAppSelector((s) => s.student.studentDetail.weeklyTimetable.hrUnixTimestampToClass);

    // Clicking behavior
    const handleMouseDown = (e: MouseEvent, day: number, time: number) => {
        setCurrentSlot({ start: time, end: time + 60 });
        dispatch(appSlice.actions.setTimetableAction("Create Class"));
    };

    // Dragging+resizing behavior
    const handleMouseMove = (e: MouseEvent) => {
        if (currentSlot && containerRef.current) {
            const containerTop = containerRef.current.getBoundingClientRect().top;
            const yOffset = e.clientY - containerTop;
            const time = Math.max(9 * 60, Math.floor(yOffset / 30) * 15 + 9 * 60);
            setCurrentSlot({ ...currentSlot, end: time });
            // Resizing
        } else if (resizingSlot && containerRef.current) {
            const containerTop = containerRef.current.getBoundingClientRect().top;
            const yOffset = e.clientY - containerTop;
            const newEndTime = Math.max(9 * 60, Math.floor(yOffset / 30) * 15 + 9 * 60);
            setTimeSlots((prev) => ({
                ...prev,
                [resizingSlot.day]: {
                    ...prev[resizingSlot.day],
                    [resizingSlot.start]: {
                        ...prev[resizingSlot.day][resizingSlot.start],
                        endTime: newEndTime,
                    },
                },
            }));
            //
        }
    };

    const handleMouseUp = (day: number, timeThatGetsMovedUp: number) => {
        if (draggingSlot) {
            console.log("draggingSlot!");
            setTimeSlots((prev) => {
                const newSlots = { ...prev };
                delete newSlots[draggingSlot.day][draggingSlot.start];
                if (Object.keys(newSlots[draggingSlot.day]).length === 0) {
                    delete newSlots[draggingSlot.day];
                }
                console.log("timeThatGetsMovedUp:", timeThatGetsMovedUp);
                dispatch(
                    StudentThunkAction.moveStudentEvent({
                        fromHourTimestamp: timeThatGetsMovedUp.toString(),
                        toDayTimestamp: day.toString(),
                        toHourTimestamp: draggingSlot.start.toString(),
                    })
                );
                return {
                    ...newSlots,
                    [day]: {
                        ...newSlots[day],
                        [timeThatGetsMovedUp]: {
                            endTime: timeThatGetsMovedUp + (draggingSlot.end - draggingSlot.start),
                            course_id: draggingSlot.courseId,
                            course_name: draggingSlot.courseName,
                            min: draggingSlot.end - draggingSlot.start,
                            student_id: studentId || "",
                        },
                    },
                };
            });
        } else if (currentSlot) {
            console.log("currentSlot!");
            setTimeSlots((prev) => ({
                ...prev,
                [day]: {
                    ...prev[day],
                    [currentSlot.start]: {
                        endTime: currentSlot.end,
                        course_id: 0,
                        course_name: "",
                        min: currentSlot.end - currentSlot.start,
                        student_id: studentId || "",
                    },
                },
            }));
        }
        setDraggingSlot(null);
        setCurrentSlot(null);
        setResizingSlot(null);
    };

    const handleResizeMouseDown = (e: MouseEvent, day: number, start: number) => {
        e.stopPropagation();
        setResizingSlot({ day, start });
        dispatch(appSlice.actions.setTimetableAction("Resize Class"));
    };

    const handleDragMouseDown = (e: MouseEvent, day: number, start: number, end: number, courseId: number, courseName: string) => {
        e.stopPropagation();
        setDraggingSlot({ day, start, end, courseId, courseName });
        setCurrentSlot({ start: start, end: end + 30 });
        dispatch(appSlice.actions.setTimetableAction("Move Class"));
    };

    const generateAllTimeSlotsForWeeklyTimetable = () => {
        const startTime = 9 * 60; // 9:00 AM in minutes
        const endTime = 19 * 60; // 11:00 PM in minutes
        const timeSlots: number[] = [];
        for (let time = startTime; time <= endTime; time += 15) {
            timeSlots.push(time);
        }
        return timeSlots;
    };

    const allWeeklyTimetableTimeslots = generateAllTimeSlotsForWeeklyTimetable();

    useEffect(() => {
        if (hrUnixTimestampdToObject) {
            let newTimeSlots: Timeslot = {};

            Object.keys(hrUnixTimestampdToObject).forEach((item) => {
                const classInfo = hrUnixTimestampdToObject[item];
                const startTime = (classInfo.hour_unix_timestamp - classInfo.day_unix_timestamp) / 60 / 1000;

                if (startTime < 0) {
                    console.error("Negative startTime detected:", startTime, classInfo);
                    return;
                }

                const endTime = startTime + classInfo.min;
                const day = classInfo.day_unix_timestamp;
                const newEntry = {
                    endTime,
                    course_id: classInfo.course_id,
                    course_name: classInfo.course_name,
                    min: classInfo.min,
                    student_id: classInfo.student_id,
                };

                if (!newTimeSlots[day]) {
                    newTimeSlots[day] = {};
                }

                newTimeSlots[day][startTime] = newEntry;
                console.log("newTimeSlots after each iteration:", newTimeSlots);
            });

            console.log("final newTimeSlots:", newTimeSlots);

            setTimeSlots((prev) => ({
                ...prev,
                ...newTimeSlots,
            }));
        }
    }, [hrUnixTimestampdToObject]);

    return (
        <div style={{ display: "flex" }}>
            {/* Time */}
            <div style={{ width: "60px", borderRight: "1px solid #ccc" }}>
                <div style={{ height: "29.2px" }}></div> {/* Empty top-left corner */}
                {allWeeklyTimetableTimeslots.map((time) => (
                    <div
                        key={time}
                        style={{
                            height: "30px",
                            borderTop: time % 30 === 0 ? "1px solid #eee" : "none",
                            textAlign: "right",
                            paddingRight: "5px",
                            fontSize: "12px",
                        }}
                    >
                        {time % 30 === 0 ? dayjs().startOf("day").add(time, "minute").format("HH:mm") : ""}
                    </div>
                ))}
            </div>
            {/* Days */}
            {daysOfWeek.map((day) => {
                const dayTimestamp = dayjs(day).startOf("day").valueOf();
                return (
                    <div key={dayTimestamp} style={{ flex: 1, borderRight: "1px solid #ccc", borderBottom: "1px solid #ccc" }}>
                        <div style={{ textAlign: "center", borderBottom: "1px solid #ccc", height: "30px" }}>{dayjs(day).format("dddd, MMM D")}</div>
                        <div style={{ position: "relative", height: "800px" }} onMouseMove={handleMouseMove} ref={containerRef}>
                            {/* Empty timeslots */}
                            {allWeeklyTimetableTimeslots.map((time) => {
                                return (
                                    <GridItem
                                        key={dayTimestamp + time * 1000}
                                        time={time}
                                        dayTimestamp={dayTimestamp}
                                        handleMouseDown={handleMouseDown}
                                        handleMouseUp={handleMouseUp}
                                    />
                                );
                            })}

                            {/* Blue timeslots */}
                            {timeSlots &&
                                timeSlots[dayTimestamp] &&
                                Object.entries(timeSlots[dayTimestamp]).map(([start, slotInfo]) => {
                                    const startNum = Number(start);
                                    const endNum = slotInfo.endTime;
                                    return (
                                        <div
                                            key={start}
                                            style={{
                                                position: "absolute",
                                                // Concerned with the positions of timeslotss
                                                top: `${((startNum - 9 * 60) / 15) * 30.4 + 1}px`, // 15px per 15 minutes interval
                                                height: `${((endNum - startNum) / 15) * 30}px`, // Adjusted for 15 minutes interval
                                                left: 0,
                                                right: 0,
                                                background: "#3F96FE",
                                                border: "1px solid #007bff",
                                                display: "flex",
                                                flexDirection: "column",
                                                justifyContent: "space-between",
                                                cursor: "move",
                                            }}
                                            onMouseDown={(e) => handleDragMouseDown(e, dayTimestamp, startNum, endNum, slotInfo.course_id, slotInfo.course_name)}
                                        >
                                            <div
                                                style={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    gap: "5px",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    height: "100%",
                                                    fontSize: "15px",
                                                    color: "white",
                                                    textAlign: "center",
                                                }}
                                            >
                                                <div>
                                                    {convertMinutesToTime(startNum)}-{convertMinutesToTime(endNum)}
                                                </div>
                                                <div>{slotInfo.course_name ? slotInfo.course_name : "(No class)"}</div>
                                            </div>
                                            <div
                                                style={{
                                                    height: "10px",
                                                    width: "100%",
                                                    backgroundColor: "#3F96FE",
                                                    cursor: "ns-resize",
                                                }}
                                                onMouseDown={(e) => handleResizeMouseDown(e, dayTimestamp, startNum)}
                                            ></div>
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Calendar;
