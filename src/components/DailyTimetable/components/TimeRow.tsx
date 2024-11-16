import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import timeUtil from "../../../utils/timeUtil";
import Spacer from "../../Spacer";
import StudentsClassForDailyTimetableByHour from "../../StudentsClassForDailyTimetableByHour";
import React from "react";
import studentSlice from "../../../redux/slices/studentSlice";
import { Unstable_Popup as BasePopup } from '@mui/base/Unstable_Popup';
import boxShadow from "../../../constant/boxShadow";
import Label from "../../Label";
const gridHeight = 30;

export default ({ index, hourUnixTimestamp, hoursColumnGrid }: { index: number; hourUnixTimestamp: string; hoursColumnGrid: string[] }) => {
    const selectedDate = useAppSelector((s) => s.student.allStudents.selectedDate);
    const timeColumnRef = useRef<HTMLDivElement>(null);
    const numberOfClassesInHighlight = useAppSelector((s) => s.student.allStudents.totalClassesInHighlight.numberOfClassesInHighlight);
    const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null);
    const [isHovered, setIsHovered] = useState(false);
    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;
    const dispatch = useAppDispatch();

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        setAnchorEl(event.currentTarget);
        dispatch(studentSlice.actions.setHrUnixTimestampOnClick(parseInt(hourUnixTimestamp)));
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        const handleMouseEnter = () => {
            setIsHovered(true);
        };

        const handleMouseLeave = () => {
            setIsHovered(false);
        };
        const node = timeColumnRef.current;
        if (node) {
            node.addEventListener("mouseenter", handleMouseEnter);
            node.addEventListener("mouseleave", handleMouseLeave);
        }

        return () => {
            if (node) {
                node.removeEventListener("mouseenter", handleMouseEnter);
                node.removeEventListener("mouseleave", handleMouseLeave);
            }
        };
    }, [anchorEl]);

    useEffect(() => {
        if (anchorEl) {
            const handleDocumentClick = (event: MouseEvent) => {
                // Check if the click is outside the popover and the anchor element
                if (anchorEl && !anchorEl.contains(event.target as Node)) {
                    handleClose();
                    dispatch(studentSlice.actions.setHrUnixTimestampOnClick(null));
                }
            };

            // Use `click` event instead of `mousedown` to avoid conflict between fast clicks and mousedown
            document.addEventListener("click", handleDocumentClick);

            return () => {
                document.removeEventListener("click", handleDocumentClick);
            };
        }
    }, [anchorEl]);

    return (
        <div ref={timeColumnRef} key={hourUnixTimestamp} style={{ flex: 1, cursor: "pointer" }} className="time-column"
            onClick={handleClick}
        >
            <Spacer height={5} />
            <div className="droppable" style={{ position: "relative", zIndex: hoursColumnGrid.length - index + 1, height: gridHeight }}>
                <div style={{ position: "absolute", width: "100%", height: 32, backgroundColor: isHovered ? "#9e9e9e" : "transparent" }} />
                <BasePopup id={id} open={open} anchor={anchorEl} placement="left">
                    <Label label="count number of classes" />
                    <div style={{ backgroundColor: "white", padding: 10, borderRadius: 4, boxShadow: boxShadow.SHADOW_62, transform: "translateX(-5px)" }}>{numberOfClassesInHighlight} class(es)</div>
                </BasePopup>

                <StudentsClassForDailyTimetableByHour
                    key={hourUnixTimestamp}
                    dayUnixTimestamp={timeUtil.getDayUnixTimestamp(selectedDate.getTime())}
                    currHourUnixTimestamp={parseInt(hourUnixTimestamp)}
                />
            </div>
        </div>
    );
};
