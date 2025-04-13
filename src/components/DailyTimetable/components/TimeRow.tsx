import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import Spacer from '../../Spacer';
import StudentsClassForDailyTimetableByHour from '../../StudentsClassForDailyTimetableByHour';
import React from 'react';
import studentSlice from '../../../redux/slices/studentSlice';
import { Unstable_Popup as BasePopup } from '@mui/base/Unstable_Popup';
import boxShadow from '../../../constant/boxShadow';
const gridHeight = 30;

export default function TimeRow({ rowIndex, hourUnixTimestamp }: { rowIndex: number; hourUnixTimestamp: string }) {
    const timeColumnRef = useRef<HTMLDivElement>(null);
    const numberOfClassesInHighlight = useAppSelector(
        s => s.student.massTimetablePage.totalClassesInHighlight.numberOfClassesInHighlight
    );
    const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null);
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    const dispatch = useAppDispatch();

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        setAnchorEl(event.currentTarget);
        dispatch(studentSlice.actions.setHrUnixTimestampOnClick(parseInt(hourUnixTimestamp)));
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

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
            document.addEventListener('click', handleDocumentClick);

            return () => {
                document.removeEventListener('click', handleDocumentClick);
            };
        }
    }, [anchorEl, dispatch]);

    return (
        <div
            ref={timeColumnRef}
            key={hourUnixTimestamp}
            style={{ flex: 1, cursor: 'pointer' }}
            className="time-column"
            onClick={handleClick}
        >
            <Spacer height={5} />
            <div
                className="droppable"
                style={{
                    position: 'relative',
                    height: gridHeight,
                }}
            >
                <BasePopup id={id} open={open} anchor={anchorEl} placement="left" style={{ zIndex: 10 ** 7 }}>
                    <div
                        className="bg-white rounded-lg px-4 py-2"
                        style={{
                            boxShadow: boxShadow.SHADOW_62,
                            transform: 'translateX(-5px)',
                        }}
                    >
                        {numberOfClassesInHighlight} {numberOfClassesInHighlight > 1 ? 'classes' : 'class'}
                    </div>
                </BasePopup>
                <StudentsClassForDailyTimetableByHour
                    key={hourUnixTimestamp}
                    rowIndex={rowIndex}
                    currHourUnixTimestamp={parseInt(hourUnixTimestamp)}
                />
            </div>
        </div>
    );
}
