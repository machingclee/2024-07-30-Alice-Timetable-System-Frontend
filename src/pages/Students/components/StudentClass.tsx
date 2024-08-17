import { Draggable } from "react-beautiful-dnd";
import classnames from "classnames";
import dayjs from "dayjs";
import { ContextMenu, ContextMenuTrigger, MenuItem } from "react-contextmenu";
import boxShadow from "../../../constant/boxShadow";
import { Box } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { useParams } from "react-router-dom";
import AddClassEventDialog from "./AddClassEventDialog";
import AddClassEventForm from "./AddClassEventForm";
import { PropsWithChildren, useCallback } from "react";
import UpdateClassDialog from "./UpdateClassDialog";
import UpdateClassForm from "./UpdateClassForm";
import DeleteClassForm from "./DeleteClassForm";
import DeleteClassDialog from "./DeleteClassDialog";
import DuplicateClassDialog from "./DuplicateClassDialog";
import DuplicateClassForm from "./DuplicateClassForm";
import { StudentThunkAction } from "../../../redux/slices/studentSlice";
import FadeIn from "../../../components/FadeIn";
import colors from "../../../constant/colors";

export default (props: { dayUnixTimestamp: number; hourUnixTimestamp: number; activeDraggableId: string; colIndex: number }) => {
    const dispatch = useAppDispatch();
    const selectedPackageId = useAppSelector((s) => s.student.studentDetail.selectedPackageId);
    const { activeDraggableId, hourUnixTimestamp, colIndex, dayUnixTimestamp } = props;
    const { studentId } = useParams<{ studentId: string }>();
    const studentClass = useAppSelector((s) => s.student.studentDetail.timetable?.hrUnixTimestampToObject?.[hourUnixTimestamp]);

    const { day_unix_timestamp = 0, hour_unix_timestamp = 0 } = studentClass || {};
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
                    const nonNull = event != null;
                    const shouldFreeze = parseInt(activeDraggableId) !== hourUnixTimestamp;

                    return (
                        <div className="draggable-container" style={{ opacity: studentClass?.hide ? 0 : 1 }}>
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
                                        {course_name && selectedByPackageId && (
                                            <FadeIn>
                                                {/* @ts-ignore */}
                                                <ContextMenuTrigger id={contextMenuId}>
                                                    <div
                                                        style={{
                                                            position: "absolute",
                                                            border: "1px solid #357fd9",
                                                            boxShadow: boxShadow.SHADOW_62,
                                                            zIndex: 10 ** 5,
                                                            top: 5,
                                                            left: 5,
                                                            width: "calc(100% - 20px)",
                                                            height: 1.2 * (studentClass.min || 0) - 10,
                                                            backgroundColor: (() => {
                                                                if (invalidData) {
                                                                    return "red";
                                                                } else {
                                                                    return nonNull && studentClass.class_status === "PRESENT"
                                                                        ? colors.blue
                                                                        : nonNull && studentClass.class_status === "SUSPICIOUS_ABSENCE"
                                                                        ? colors.amber
                                                                        : nonNull && studentClass.class_status === "ILLEGIT_ABSENCE"
                                                                        ? colors.red
                                                                        : nonNull && studentClass.class_status === "LEGIT_ABSENCE"
                                                                        ? colors.grey
                                                                        : "";
                                                                }
                                                            })(),
                                                            padding: 4,
                                                            borderRadius: 4,
                                                            fontSize: 14,
                                                            color: "white",
                                                            textAlign: "center",
                                                        }}
                                                        key={hourUnixTimestamp}
                                                    >
                                                        {studentClass.course_name}
                                                    </div>
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
                                                                UpdateClassDialog.setContent(() => () => <UpdateClassForm classEvent={studentClass} />);
                                                                UpdateClassDialog.setOpen(true);
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
                                                            <MenuItem
                                                                className={classnames("menu-item")}
                                                                onClick={async () => {
                                                                    await dispatch(StudentThunkAction.detachFromGroup({ classId: studentClass.id })).unwrap();
                                                                }}
                                                            >
                                                                Detach from Group
                                                            </MenuItem>
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
