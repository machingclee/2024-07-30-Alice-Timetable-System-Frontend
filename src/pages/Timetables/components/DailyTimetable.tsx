import { Button } from "antd";
import CustomScrollbarContainer from "../../../components/CustomScrollbarContainer";
import { Box } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import React, { useState, useCallback, useEffect, useRef, useMemo } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import SectionTitle from "../../../components/SectionTitle";
import Spacer from "../../../components/Spacer";
import lodash from "lodash";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import studentSlice, { StudentThunkAction } from "../../../redux/slices/studentSlice";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import timeUtil from "../../../utils/timeUtil";
import StudentClassForDailyTimetable from "./StudentClassForDailyTimetable";

export type DailyCoordinate = {
    [studentId: string]: {
        [halfHourUnixTimestamp: string]: null;
    };
};

export default (props: { date?: Date }) => {
    const dispatch = useAppDispatch();
    const idToStduent = useAppSelector((s) => s.student.students.idToStuduent);
    const hrUnixTimestamps = useAppSelector((s) => s.student.studentDetail.dailyTimetable.hrUnixTimestamps) || [];
    const hrUnixTimestampToClass = useAppSelector((s) => s.student.studentDetail.dailyTimetable.hrUnixTimestampToClass) || {};
    const currDraggingId = useRef("");
    const [activeDraggableId, setActiveDraggableId] = useState("");
    const selectedDate = useAppSelector((s) => s.student.studentDetail.dailyTimetable.selectedDate);
    const [timetableAvailableWidth, setTimetableAvailableWidth] = useState(0);
    const [timeGrid, setTimegrid] = useState<DailyCoordinate>({});

    // Memoize the half-hour intervals to prevent recalculation on every render
    const halfHourIntervals = useMemo(() => {
        const dayJS = dayjs(selectedDate).startOf("day").add(9, "hour"); // Start from 9 AM
        const intervals: Dayjs[] = [];
        for (let offset = 0; offset < 21; offset++) {
            intervals.push(dayJS.add(offset * 0.5, "hour"));
        }
        return intervals;
    }, [selectedDate]);

    // Initialize the time grid based on `hrUnixTimestamps`
    useEffect(() => {
        const timetable_: DailyCoordinate = {};
        const hoursOfTheDay = halfHourIntervals.map((dayJS) => dayJS.valueOf());
        hrUnixTimestamps.forEach((hrUnixTimestamp) => {
            const existingClass = hrUnixTimestampToClass[hrUnixTimestamp];
            hoursOfTheDay.forEach((hr) => {
                lodash.setWith(timetable_, `["${existingClass.student_id}"]["${hr}"]`, { data: null }, Object);
            });
        });

        setTimegrid(timetable_);
        // Add another thing to listen to: change of the date (like next day and previous day)
    }, [hrUnixTimestamps, halfHourIntervals, selectedDate]);

    const timetableContainerRef = useRef<HTMLDivElement | null>(null);
    const gridHeight = 40;

    const adjustWidth = useCallback(() => {
        const width = window.innerWidth;
        const columnWidth = Math.min((width - 660) / hrUnixTimestamps.length, 200); // Adjust based on the number of hrUnixTimestamps
        setTimetableAvailableWidth(columnWidth);
    }, [hrUnixTimestamps]);

    useEffect(() => {
        adjustWidth();
        window.addEventListener("resize", adjustWidth);
        return () => {
            window.removeEventListener("resize", adjustWidth);
        };
    }, [adjustWidth]);

    useEffect(() => {
        dispatch(StudentThunkAction.getStudentClassesForDailyTimetable({ dateUnixTimestamp: timeUtil.getDayUnixTimestamp(selectedDate.getTime()).toString() }));
        dispatch(StudentThunkAction.getStudents());
    }, []);

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
            <SectionTitle style={{ justifyContent: "center" }}>
                <div style={{ display: "flex", alignItems: "center", padding: 10 }}>
                    <Button
                        onClick={() => {
                            dispatch(studentSlice.actions.setDailyTimetableSelectedDate({ date: dayjs(selectedDate).subtract(1, "day").toDate() }));
                            dispatch(
                                StudentThunkAction.getStudentClassesForDailyTimetable({
                                    dateUnixTimestamp: timeUtil.getDayUnixTimestamp(dayjs(selectedDate).subtract(1, "day").toDate().getTime()).toString(),
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
                            dispatch(studentSlice.actions.setDailyTimetableSelectedDate({ date: dayjs(selectedDate).add(1, "day").toDate() }));
                            dispatch(
                                StudentThunkAction.getStudentClassesForDailyTimetable({
                                    dateUnixTimestamp: timeUtil.getDayUnixTimestamp(dayjs(selectedDate).add(1, "day").toDate().getTime()).toString(),
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
                <DragDropContext
                    onBeforeCapture={(e) => {
                        const { draggableId } = e;
                        setActiveDraggableId(draggableId);
                        currDraggingId.current = draggableId;
                    }}
                    onDragEnd={async (result) => {
                        const { destination } = result;
                        const { droppableId: toHrUnixTimestamp, index: toIndex } = destination!;
                        const toHourUnixTimestamp = Object.keys(timeGrid?.[toHrUnixTimestamp]).sort()[toIndex];
                        const fromClz = hrUnixTimestampToClass[currDraggingId.current];
                        if (!fromClz) {
                            return;
                        }
                        const move = async () => {
                            await dispatch(
                                StudentThunkAction.moveStudentEvent({
                                    fromHourTimestamp: currDraggingId.current,
                                    toDayTimestamp: toHrUnixTimestamp,
                                    toHourTimestamp: toHourUnixTimestamp,
                                })
                            ).unwrap();
                            dispatch(studentSlice.actions.unHideClass({ hrTimestamp: currDraggingId.current }));
                        };
                        await move();
                        setActiveDraggableId("");
                    }}
                >
                    <div style={{ display: "flex" }}>
                        <div style={{ flex: 1 }}>
                            <div style={{ display: "flex" }}>
                                <div>
                                    <Spacer height={30} style={{ position: "sticky", top: 0, background: "white", width: "100%" }} />
                                    {halfHourIntervals.map((dayJS) => {
                                        return (
                                            <div style={{ fontSize: 13 }} className="grid-time" key={dayJS.valueOf().toString()}>
                                                {dayJS.format("HH:mm")}
                                            </div>
                                        );
                                    })}
                                </div>
                                {Object.keys(timeGrid)
                                    .sort()
                                    .map((studentId) => {
                                        return (
                                            <div key={studentId} style={{ flex: 1 }} className="time-column">
                                                <div
                                                    className="grid-hour"
                                                    style={{
                                                        fontWeight: 400,
                                                        marginBottom: "20px",
                                                        height: 0,
                                                        width: "100%",
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    {idToStduent?.[studentId].first_name + " " + idToStduent?.[studentId].last_name}
                                                </div>
                                                <Spacer height={5} />
                                                <Droppable droppableId={studentId} mode="virtual">
                                                    {(provided) => {
                                                        return (
                                                            <div ref={provided.innerRef} {...provided.droppableProps} className="droppable">
                                                                {Object.keys(timeGrid[studentId])
                                                                    .sort()
                                                                    .map((hourUnixTimestamp, index) => {
                                                                        return (
                                                                            <React.Fragment key={hourUnixTimestamp}>
                                                                                <StudentClassForDailyTimetable
                                                                                    studentId={studentId}
                                                                                    colIndex={index}
                                                                                    dayUnixTimestamp={timeUtil.getDayUnixTimestamp(selectedDate.getTime())}
                                                                                    hourUnixTimestamp={parseInt(hourUnixTimestamp)}
                                                                                    activeDraggableId={activeDraggableId}
                                                                                />
                                                                                {activeDraggableId === hourUnixTimestamp && provided.placeholder}
                                                                            </React.Fragment>
                                                                        );
                                                                    })}
                                                                {provided.placeholder}
                                                            </div>
                                                        );
                                                    }}
                                                </Droppable>
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>
                        <Spacer />
                    </div>
                </DragDropContext>
                <Spacer />
            </CustomScrollbarContainer>
        </Box>
    );
};
