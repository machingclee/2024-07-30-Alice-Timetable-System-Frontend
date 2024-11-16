import { Draggable } from "react-beautiful-dnd";
import classnames from "classnames";
import dayjs from "dayjs";
import { ContextMenu, ContextMenuTrigger, MenuItem } from "react-contextmenu";
import boxShadow from "../../../constant/boxShadow";
import { Box } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { useParams } from "react-router-dom";
import AddClassEventDialog from "../../../components/AddClassEventDialog";
import AddClassEventForm from "../../../components/AddClassEventForm";
import { PropsWithChildren, useCallback, useEffect, useState } from "react";
import DeleteClassForm from "../../../components/DeleteClassForm";
import DeleteClassDialog from "../../../components/DeleteClassDialog";
import DuplicateClassDialog from "../../../components/DuplicateClassDialog";
import DuplicateClassForm from "../../../components/DuplicateClassForm";
import { StudentThunkAction } from "../../../redux/slices/studentSlice";
import colors from "../../../constant/colors";
import Label from "../../../components/Label";
import ViewClassDialog from "../../../components/ViewClassDialog";
import ViewClassForm from "../../../components/ViewClassForm";
import { $Enums, Class_status } from "../../../prismaTypes/types";

export default (props: { dayUnixTimestamp: number; hourUnixTimestamp: number; activeDraggableId: string; colIndex: number }) => {
    const dispatch = useAppDispatch();
    const selectedPackageId = useAppSelector((s) => s.student.studentDetail.selectedPackageId);
    const { activeDraggableId, hourUnixTimestamp, colIndex, dayUnixTimestamp } = props;
    const { studentId } = useParams<{ studentId: string }>();
    const hours = useAppSelector((s) => s.student.studentDetail.weeklyTimetable?.hrUnixTimestamps);
    const [classStatusMenuOptionsExpand, setClassStatusMenuOptionsExpand] = useState<boolean>(false);
    const targetHit = hours?.includes(String(hourUnixTimestamp));
    if (targetHit) {
        console.log("targetHit", hourUnixTimestamp, hours);
    }
    const studentClass = useAppSelector((s) => s.student.studentDetail.weeklyTimetable?.hrUnixTimestampToClass?.[String(hourUnixTimestamp)]);
    if (studentClass) {
        console.log("studentClassstudentClass", studentClass);
    }
    const showAll = useAppSelector((s) => s.student.studentDetail.showAllClassesForOneStudent);
    const timetable = useAppSelector((s) => s.student.studentDetail.weeklyTimetable);
    const [classNumber, setClassNumber] = useState<number>(0);
    const [classEventHeight, setClassEventHeight] = useState<number | null>(null);

    const { day_unix_timestamp = 0, hour_unix_timestamp = 0, class_group_id } = studentClass || {};
    const hasDuplicationGroup = class_group_id != null;
    const disableDraggable = !(studentClass != null);
    const createEvent = () => {
        AddClassEventDialog.setContent(() => () => <AddClassEventForm dayUnixTimestamp={dayUnixTimestamp} hourUnixTimestamp={hourUnixTimestamp} studentId={studentId || ""} />);
        AddClassEventDialog.setOpen(true);
    };

    const invalidData = day_unix_timestamp >= hour_unix_timestamp;
    const contextMenuId = `${studentClass?.student_id || ""}-${studentClass?.hour_unix_timestamp || ""}`;
    const rightClickable = !(studentClass != null);
    const dayAndTime = dayjs(hourUnixTimestamp).format("ddd, HH:mm");
    const disableDuplicate = studentClass?.class_group_id != null;
    // To adjust place a thick line to indicate the hour unit
    const time = dayjs(hourUnixTimestamp);
    const isFullHour = time.minute() === 0;
    const timeSlotStyle: React.CSSProperties = {
        height: isFullHour ? "2px" : "0",
        opacity: 0.2,
        top: -2,
        width: "100%",
        backgroundColor: "black",
        position: "absolute",
    };

    const groupedLabel = () => {
        if (!hasDuplicationGroup) {
            return null;
        }
        return (
            <div
                style={{
                    padding: "2px 5px",
                    fontSize: 12,
                    color: "white",
                    backgroundColor: "rgba(0,0,0,0.35)",
                    backdropFilter: "brightness(90%) saturate(200%) hue-rotate(-20deg)",
                }}
            >
                Grouped
            </div>
        );
    };
    const TimeslotWrapper = useCallback(
        rightClickable
            ? ({ children }: PropsWithChildren) => {
                return (
                    <>
                        {/* @ts-ignore */}
                        <ContextMenuTrigger id={hourUnixTimestamp.toString()}>{children}</ContextMenuTrigger>
                        {/* @ts-ignore */}
                        <ContextMenu
                            id={hourUnixTimestamp.toString()}
                            style={{
                                zIndex: 10 ** 7,
                                borderRadius: 8,
                                backgroundColor: "white",
                                boxShadow: boxShadow.SHADOW_62,
                            }}
                        >
                            <Box
                                sx={{
                                    "& .menu-item": {
                                        padding: "10px",
                                        cursor: "pointer",
                                        color: !selectedPackageId ? "rgb(200,200,200) !important" : "inherit",
                                        "&:hover": {
                                            "&:hover": {
                                                color: "rgb(64, 150, 255)",
                                            },
                                        },
                                    },
                                }}
                            >
                                {/* @ts-ignore */}
                                <MenuItem
                                    className="menu-item"
                                    disabled={!selectedPackageId}
                                    onClick={() => {
                                        createEvent();
                                    }}
                                >
                                    {!selectedPackageId ? "Please First Select a Package" : `Add Class(es) at ${dayAndTime}`}
                                </MenuItem>
                            </Box>
                        </ContextMenu>
                    </>
                );
            }
            : ({ children }: PropsWithChildren) => children,
        [studentClass, selectedPackageId]
    );

    const showLabel = studentClass?.hide != null;

    const updateClassStatusHandle = (status: Class_status) => {
        console.log("studentClass?.class_number:", studentClass?.class_number);
        console.log("studentClass?.min:", studentClass?.min);
        console.log("studentClass?.remark:", studentClass?.remark);
        console.log("studentClass?.actual_classroom:", studentClass?.actual_classroom);
        if (studentClass?.class_number && studentClass?.min && studentClass?.actual_classroom) {
            dispatch(
                StudentThunkAction.updateClass({
                    class_status: status,
                    classId: studentClass?.id,
                    min: studentClass?.min,
                    reason_for_absence: "",
                    remark: studentClass?.remark ? studentClass?.remark : "",
                    actual_classroom: studentClass?.actual_classroom as $Enums.Classroom,
                })
            )
                .unwrap()
                .then(() => {
                    dispatch(StudentThunkAction.getStudentClassesForWeeklyTimetable({ studentId: studentClass.student_id }));
                });
        }
    };

    // To account for the numbering of classes
    useEffect(() => {
        if (studentClass && timetable.hrUnixTimestampToClass) {
            let currentClassNumber = 0;

            const sortedClasses = Object.values(timetable.hrUnixTimestampToClass).sort((a, b) => {
                return a.hour_unix_timestamp - b.hour_unix_timestamp;
            });

            sortedClasses.forEach((item) => {
                if (
                    item.course_name === studentClass.course_name &&
                    (item.class_status === "PRESENT" || item.class_status === "MAKEUP" || item.class_status === "ILLEGIT_ABSENCE")
                ) {
                    currentClassNumber++;
                    if (item.hour_unix_timestamp === studentClass.hour_unix_timestamp) {
                        setClassNumber(currentClassNumber);
                    }
                }
            });
        }
    }, [studentClass]);

    return (
        <>
            <Draggable
                disableInteractiveElementBlocking={true}
                draggableId={hourUnixTimestamp.toString()}
                index={colIndex}
                key={hourUnixTimestamp}
                isDragDisabled={disableDraggable}
            >
                {(provided_) => {
                    const { dragHandleProps, draggableProps, innerRef } = provided_;
                    const { style, ..._draggableProps } = draggableProps;
                    const course_name = studentClass?.course_name;
                    const shouldFreeze = parseInt(activeDraggableId) !== hourUnixTimestamp;

                    return (
                        <div className="draggable-container" style={{ opacity: studentClass?.hide ? 0 : 1, position: "relative" }}>
                            {showLabel && <Label label="StudentClassForWeeklyTimetable.tsx" />}
                            {/* @ts-ignore */}
                            <TimeslotWrapper>
                                {/* Place a thick line to indicate the hour unit */}
                                <div style={timeSlotStyle} />
                                <div
                                    ref={innerRef}
                                    className={classnames("grid-hour", shouldFreeze ? "disbaletransform" : "")}
                                    style={{ fontSize: 13, ...style }}
                                    {..._draggableProps}
                                    {...dragHandleProps}
                                >
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "flex-start",
                                            alignItems: "center",
                                            height: "100%",
                                            position: "relative",
                                        }}
                                    >
                                        {/* Control what to show on the entire timetable */}
                                        {course_name && (showAll || (!showAll && Number(selectedPackageId) === studentClass?.student_package_id)) && (
                                            <div>
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
                                                            border: "1px solid rgba(0,0,0,0.2)",
                                                            position: "absolute",
                                                            boxShadow: boxShadow.SHADOW_62,
                                                            transition: "height 0.18s ease-in-out",
                                                            zIndex: classEventHeight ? 10 ** 7 : 10 ** 5,
                                                            overflow: "hidden",
                                                            top: 5,
                                                            left: 5,
                                                            width: "calc(100% - 20px)",
                                                            height: classEventHeight || 1.2 * (studentClass.min || 0) - 10,
                                                            backgroundColor: (() => {
                                                                if (invalidData) {
                                                                    return "red";
                                                                } else {
                                                                    switch (studentClass.class_status) {
                                                                        case "PRESENT":
                                                                            return colors.greenBlue;
                                                                        case "TRIAL":
                                                                            return colors.pink;
                                                                        case "RESERVED":
                                                                            return colors.cyan;
                                                                        case "SUSPICIOUS_ABSENCE":
                                                                            return colors.orange;
                                                                        case "ILLEGIT_ABSENCE":
                                                                            return colors.red;
                                                                        case "LEGIT_ABSENCE":
                                                                            return colors.grey;
                                                                        case "MAKEUP":
                                                                            return colors.blue;
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
                                                        key={hourUnixTimestamp}
                                                    >
                                                        {showLabel && groupedLabel()}
                                                        <div style={{ padding: 4 }}>{studentClass.course_name}</div>
                                                        {classNumber !== 0 && (
                                                            <div
                                                                style={{
                                                                    marginTop: 5,
                                                                    paddingTop: 5,
                                                                    paddingBottom: 5,
                                                                    marginLeft: 10,
                                                                    width: "80%",
                                                                    backgroundColor: "white",
                                                                    color: "black",
                                                                    borderRadius: "5px",
                                                                    display: "flex",
                                                                    justifyContent: "center",
                                                                    alignItems: "center",
                                                                }}
                                                            >
                                                                Class: {classNumber}
                                                            </div>
                                                        )}
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
                                                                ViewClassDialog.setContent(() => () => <ViewClassForm classEvent={studentClass} />);
                                                                ViewClassDialog.setOpen(true);
                                                            }}
                                                        >
                                                            View Class
                                                        </MenuItem>
                                                        {/* @ts-ignore */}
                                                        <MenuItem
                                                            className="menu-item"
                                                            onClick={() => {
                                                                ViewClassDialog.setContent(() => () => <ViewClassForm isEditing={true} classEvent={studentClass} />);
                                                                ViewClassDialog.setOpen(true);
                                                            }}
                                                        >
                                                            Edit Class
                                                        </MenuItem>
                                                        {/* @ts-ignore */}
                                                        <MenuItem
                                                            disabled={disableDuplicate}
                                                            className={classnames("menu-item", disableDuplicate ? "disabled" : "")}
                                                            onClick={() => {
                                                                DuplicateClassDialog.setContent(() => () => <DuplicateClassForm classEvent={studentClass} />);
                                                                DuplicateClassDialog.setOpen(true);
                                                            }}
                                                        >
                                                            Duplicate Class
                                                        </MenuItem>
                                                        {/* @ts-ignore */}
                                                        {disableDuplicate && (
                                                            <>
                                                                {/* @ts-ignore */}
                                                                <MenuItem
                                                                    className={classnames("menu-item")}
                                                                    onClick={async () => {
                                                                        await dispatch(StudentThunkAction.detachFromGroup({ classId: studentClass.id })).unwrap();
                                                                    }}
                                                                >
                                                                    Detach from Group
                                                                </MenuItem>
                                                            </>
                                                        )}
                                                        {/* @ts-ignore */}
                                                        <MenuItem
                                                            className={classnames("menu-item")}
                                                            onClick={() => {
                                                                DeleteClassDialog.setContent(() => () => <DeleteClassForm classEvent={studentClass} />);
                                                                DeleteClassDialog.setOpen(true);
                                                            }}
                                                        >
                                                            <span style={{ color: "red" }}>Delete Class</span>
                                                        </MenuItem>
                                                        <div
                                                            className={classnames("menu-item")}
                                                            onClick={() => {
                                                                setClassStatusMenuOptionsExpand(!classStatusMenuOptionsExpand);
                                                            }}
                                                        >
                                                            <span style={{ color: "yellowgreen" }}>Change Status</span>
                                                        </div>
                                                        <div style={{ height: "1px", opacity: 0.1, backgroundColor: "black" }} />
                                                        <div
                                                            style={{
                                                                transition: "width 0.7s ease-in-out, max-height 0.5s ease-in-out",
                                                                overflow: "hidden",
                                                                maxHeight: classStatusMenuOptionsExpand ? "500px" : "0px",
                                                                width: classStatusMenuOptionsExpand ? "150px" : "0px",
                                                            }}
                                                        >
                                                            {classStatusMenuOptionsExpand && (
                                                                <>
                                                                    {/* @ts-ignore */}
                                                                    <MenuItem
                                                                        className={classnames("menu-item")}
                                                                        onClick={() => {
                                                                            updateClassStatusHandle("PRESENT");
                                                                        }}
                                                                    >
                                                                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                                            <span>Present</span>
                                                                            <div style={{ background: colors.greenBlue, width: "15px", height: "15px" }} />
                                                                        </div>
                                                                    </MenuItem>
                                                                    {/* @ts-ignore */}
                                                                    <MenuItem
                                                                        className={classnames("menu-item")}
                                                                        onClick={() => {
                                                                            updateClassStatusHandle("SUSPICIOUS_ABSENCE");
                                                                        }}
                                                                    >
                                                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                                                            <span>Suspicious Absence</span>
                                                                            <div style={{ background: colors.orange, width: "15px", height: "15px" }} />
                                                                        </div>
                                                                    </MenuItem>
                                                                    {/* @ts-ignore */}
                                                                    <MenuItem
                                                                        className={classnames("menu-item")}
                                                                        onClick={() => {
                                                                            updateClassStatusHandle("ILLEGIT_ABSENCE");
                                                                        }}
                                                                    >
                                                                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                                            <span>Illegit Absence</span>
                                                                            <div style={{ background: colors.red, width: "15px", height: "15px" }} />
                                                                        </div>
                                                                    </MenuItem>
                                                                    {/* @ts-ignore */}
                                                                    <MenuItem
                                                                        className={classnames("menu-item")}
                                                                        onClick={() => {
                                                                            updateClassStatusHandle("LEGIT_ABSENCE");
                                                                        }}
                                                                    >
                                                                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                                            <span>Legit Absence</span>
                                                                            <div style={{ background: colors.grey, width: "15px", height: "15px" }} />
                                                                        </div>
                                                                    </MenuItem>
                                                                    {/* @ts-ignore */}
                                                                    <MenuItem
                                                                        className={classnames("menu-item")}
                                                                        onClick={() => {
                                                                            updateClassStatusHandle("MAKEUP");
                                                                        }}
                                                                    >
                                                                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                                            <span>Makeup</span>
                                                                            <div style={{ background: colors.blue, width: "15px", height: "15px" }} />
                                                                        </div>
                                                                    </MenuItem>
                                                                </>
                                                            )}
                                                        </div>
                                                    </Box>
                                                </ContextMenu>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </TimeslotWrapper>
                        </div>
                    );
                }}
            </Draggable>
        </>
    );
};
