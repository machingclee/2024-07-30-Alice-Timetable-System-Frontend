import classnames from "classnames";
import { ContextMenu, ContextMenuTrigger, MenuItem } from "react-contextmenu";
import boxShadow from "../constant/boxShadow";
import { Box } from "@mui/material";
import { useAppSelector } from "../redux/hooks";
import FadeIn from "./FadeIn";
import DeleteClassForm from "./DeleteClassForm";
import DeleteClassDialog from "./DeleteClassDialog";
import ViewClassForm from "./ViewClassForm";
import ViewClassDialog from "./ViewClassDialog";
import StudentClassCard from "./StudentClassCard";

export default (props: {
    dayUnixTimestamp: number,
    currHourUnixTimestamp: number,
}) => {
    const { currHourUnixTimestamp, dayUnixTimestamp } = props;
    const classesThisHour = useAppSelector((s) => s.student.allStudents?.hrUnixTimestampToClasses?.[currHourUnixTimestamp]) || [];


    return (
        <div className="daily-class-container" style={{
            position: "relative", display: "flex", width: "100%", zIndex: 1
        }}>
            {/* @ts-ignore */}
            {classesThisHour.map((classEvent, index) => {
                const contextMenuId = `${classEvent?.student_id || ""}-${classEvent?.hour_unix_timestamp || ""}`;
                return (
                    <div
                        key={contextMenuId}
                        style={{
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "flex-start",
                            height: "100%",
                            position: "relative",
                        }}
                    >
                        <div>
                            {/* {showLabel && index === 0 && <Label label="StudentsClassForDailyTimetableByHour.tsx" />} */}
                            {/* @ts-ignore */}
                            <ContextMenuTrigger id={contextMenuId}>
                                <StudentClassCard
                                    dayUnixTimestamp={dayUnixTimestamp}
                                    currHourUnixTimestamp={currHourUnixTimestamp}
                                    classEvent={classEvent}
                                />
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
                        </div>
                    </div>
                )
            })}
        </div>);
}
