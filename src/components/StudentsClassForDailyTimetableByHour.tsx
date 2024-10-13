import classnames from "classnames";
import dayjs from "dayjs";
import { ContextMenu, ContextMenuTrigger, MenuItem } from "react-contextmenu";
import boxShadow from "../constant/boxShadow";
import { Box } from "@mui/material";
import { useAppSelector } from "../redux/hooks";
import { useEffect, useState } from "react";
import FadeIn from "./FadeIn";
import colors from "../constant/colors";
import Label from "./Label";
import DeleteClassForm from "./DeleteClassForm";
import DeleteClassDialog from "./DeleteClassDialog";
import ViewClassForm from "./ViewClassForm";
import ViewClassDialog from "./ViewClassDialog";

export default (props: { dayUnixTimestamp: number; currHourUnixTimestamp: number }) => {
    const { currHourUnixTimestamp, dayUnixTimestamp } = props;
    const classesThisHour = useAppSelector((s) => s.student.allStudents?.hrUnixTimestampToClasses?.[currHourUnixTimestamp]) || [];
    const timetable = useAppSelector((s) => s.student.allStudents);
    const [classEventHeight, setClassEventHeight] = useState<number | null>(null);
    const invalidData = dayUnixTimestamp >= currHourUnixTimestamp;
    const dayAndTime = dayjs(currHourUnixTimestamp).format("ddd, HH:mm");
    const showLabel = classesThisHour.length > 0;
    // To account for the numbering of classes
    useEffect(() => {
        if (classesThisHour && timetable.hrUnixTimestampToClasses) {
            let currentClassNumber = 0;

            const sortedClasses = timetable.hrUnixTimestampToClasses?.[currHourUnixTimestamp]?.sort(
                (student1, student2) => {
                    return student2.first_name.localeCompare(student1.first_name)
                }) || [];

            sortedClasses.forEach((item) => {
                if (
                    item.course_name === classesThisHour?.[0].course_name &&
                    (item.class_status === "PRESENT" || item.class_status === "MAKEUP" || item.class_status === "ILLEGIT_ABSENCE")
                ) {
                    currentClassNumber++;
                }
            });
        }
    }, [classesThisHour]);


    return (
        <div className="draggable-container" style={{ position: "relative" }}>
            {/* @ts-ignore */}
            {classesThisHour.map((classEvent, index) => {
                const contextMenuId = `${classEvent?.student_id || ""}-${classEvent?.hour_unix_timestamp || ""}`;
                return (
                    <div
                        key={contextMenuId}
                        style={{
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            height: "100%",
                            position: "relative",
                        }}
                    >
                        <FadeIn>
                            {/* {showLabel && index === 0 && <Label label="StudentsClassForDailyTimetableByHour.tsx" />} */}
                            {/* @ts-ignore */}
                            <ContextMenuTrigger id={contextMenuId}>
                                <Box
                                    onMouseEnter={() => {
                                        setClassEventHeight(120);
                                    }}
                                    onMouseLeave={() => {
                                        setClassEventHeight(null);
                                    }}
                                    style={{
                                        position: "absolute",
                                        border: "1px solid #357fd9",
                                        boxShadow: boxShadow.SHADOW_62,
                                        transition: "height 0.18s ease-in-out",
                                        zIndex: classEventHeight ? 10 ** 7 : 10 ** 5,
                                        overflow: "hidden",
                                        top: 5,
                                        left: 5,
                                        width: "calc(100% - 20px)",
                                        height: classEventHeight || 1.2 * (classEvent.min || 0) - 10,
                                        backgroundColor: (() => {
                                            if (invalidData) {
                                                return "red";
                                            } else {
                                                switch (classEvent.class_status) {
                                                    case "PRESENT":
                                                        return colors.blue;
                                                    case "SUSPICIOUS_ABSENCE":
                                                        return colors.amber;
                                                    case "ILLEGIT_ABSENCE":
                                                        return colors.red;
                                                    case "LEGIT_ABSENCE":
                                                        return colors.grey;
                                                    case "MAKEUP":
                                                        return colors.green;
                                                    case "CHANGE_OF_CLASSROOM":
                                                        return colors.purple;
                                                }
                                            }
                                        })(),

                                        borderRadius: 4,
                                        fontSize: 14,
                                        color: "white",
                                        textAlign: "center",
                                    }}
                                    key={currHourUnixTimestamp}
                                >
                                    <div style={{ padding: 4 }}>{classEvent.course_name}</div>
                                </Box>
                            </ContextMenuTrigger>
                            {/* @ts-ignore */}
                            <ContextMenu id={contextMenuId} style={{ zIndex: 10 ** 7 }}>
                                <Box
                                    sx={{
                                        backgroundColor: "white",
                                        borderRadius: "8px",
                                        boxShadow: boxShadow.SHADOW_62,
                                        "& .menu-item": {
                                            padding: "10px",
                                            cursor: "pointer",
                                            "&:hover": {
                                                color: "rgb(64, 150, 255)",
                                            },
                                            "&.disabled": {
                                                opacity: 0.3,
                                                pointerEvents: "none",
                                            },
                                        },
                                    }}
                                >
                                    {/* @ts-ignore */}
                                    <MenuItem
                                        className="menu-item"
                                        onClick={() => {
                                            ViewClassDialog.setContent(() => () => (
                                                <ViewClassForm
                                                    classEvent={classEvent}
                                                />
                                            ));
                                            ViewClassDialog.setOpen(true);
                                        }}
                                    >
                                        View Class
                                    </MenuItem>
                                    {/* @ts-ignore */}
                                    <MenuItem
                                        className={classnames("menu-item")}
                                        onClick={() => {
                                            DeleteClassDialog.setContent(() => () => <DeleteClassForm classEvent={classEvent} />);
                                            DeleteClassDialog.setOpen(true);
                                        }}
                                    >
                                        <span style={{ color: "red" }}>Delete Class</span>
                                    </MenuItem>
                                </Box>
                            </ContextMenu>
                        </FadeIn>
                    </div>
                )
            })}
        </div>);
}
