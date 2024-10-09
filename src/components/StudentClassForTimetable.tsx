import { Draggable } from "react-beautiful-dnd";
import classnames from "classnames";
import dayjs from "dayjs";
import { ContextMenu, ContextMenuTrigger, MenuItem } from "react-contextmenu";
import boxShadow from "../constant/boxShadow";
import { Box } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useParams } from "react-router-dom";
import AddClassEventDialog from "./AddClassEventDialog";
import AddClassEventForm from "./AddClassEventForm";
import { PropsWithChildren, useCallback, useEffect, useState } from "react";
import DeleteClassForm from "./DeleteClassForm";
import DeleteClassDialog from "./DeleteClassDialog";
import DuplicateClassDialog from "./DuplicateClassDialog";
import DuplicateClassForm from "./DuplicateClassForm";
import { StudentThunkAction } from "../redux/slices/studentSlice";
import FadeIn from "../components/FadeIn";
import colors from "../constant/colors";
import Label from "../components/Label";
import ViewClassDialog from "../../src/components/ViewClassDialog";
import ViewClassForm from "../../src/components/ViewClassForm";

export default (props: { dayUnixTimestamp: number; hourUnixTimestamp: number; activeDraggableId: string; colIndex: number }) => {
    const dispatch = useAppDispatch();
    const selectedPackageId = useAppSelector((s) => s.student.studentDetail.selectedPackageId);
    const { activeDraggableId, hourUnixTimestamp, colIndex, dayUnixTimestamp } = props;
    const { studentId } = useParams<{ studentId: string }>();
    const studentClass = useAppSelector((s) => s.student.studentDetail.weeklyTimetable?.hrUnixTimestampToClass?.[hourUnixTimestamp]);
    const timetable = useAppSelector((s) => s.student.studentDetail.weeklyTimetable);
    const [classNumber, setClassNumber] = useState<number>(0);
    const [classEventHeight, setClassEventHeight] = useState<number | null>(null);
    const showAllClassesForOneStudent = useAppSelector((s) => s.student.showAllClassesForOneStudent);
    const studentPackage = useAppSelector((s) => s.student.studentDetail.packages.idToPackage?.[studentClass?.student_package_id || ""]);

    const { day_unix_timestamp = 0, hour_unix_timestamp = 0, class_group_id } = studentClass || {};
    const hasDuplicationGroup = class_group_id != null;
    const disableDraggable = !(studentClass != null);
    const createEvent = () => {
        AddClassEventDialog.setContent(() => () => <AddClassEventForm dayUnixTimestamp={dayUnixTimestamp} hourUnixTimestamp={hourUnixTimestamp} studentId={studentId || ""} />);
        AddClassEventDialog.setOpen(true);
    };

    const invalidData = day_unix_timestamp >= hour_unix_timestamp;
    const contextMenuId = `${studentPackage?.student_id || ""}-${studentClass?.hour_unix_timestamp || ""}`;
    const rightClickable = !(studentClass != null);
    const dayAndTime = dayjs(hourUnixTimestamp).format("ddd, HH:mm");
    const disableDuplicate = studentClass?.class_group_id != null;
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
                    backgroundColor: colors.purple,
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

    const selectedByPackageId = selectedPackageId === String(studentClass?.student_package_id || "0");
    const showLabel = studentClass?.hide != null;

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
                    console.log("studentClass:", studentClass);
                    console.log("course_name:", course_name);
                    const shouldFreeze = parseInt(activeDraggableId) !== hourUnixTimestamp;

                    return (
                        <div className="draggable-container" style={{ opacity: studentClass?.hide ? 0 : 1, position: "relative" }}>
                            {showLabel && <Label label="StudentClassForWeeklyTimetable.tsx" />}
                            {/* @ts-ignore */}
                            <TimeslotWrapper>
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
                                        {course_name && (showAllClassesForOneStudent || selectedByPackageId) && (
                                            <FadeIn>
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
                                                            height: classEventHeight || 1.2 * (studentClass.min || 0) - 10,
                                                            backgroundColor: (() => {
                                                                if (invalidData) {
                                                                    return "red";
                                                                } else {
                                                                    switch (studentClass.class_status) {
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
                                                                ViewClassDialog.setContent(() => () => (
                                                                    <ViewClassForm
                                                                        classEvent={studentClass}
                                                                        classNumber={classNumber}
                                                                        course_id={studentPackage?.course_id || 0}
                                                                        student_id={studentPackage?.student_id || ""}
                                                                    />
                                                                ));
                                                                ViewClassDialog.setOpen(true);
                                                            }}
                                                        >
                                                            View Class
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
                                                    </Box>
                                                </ContextMenu>
                                            </FadeIn>
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
