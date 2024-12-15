import { Popper } from '@mui/material';
import { useRef, useState, useEffect } from 'react';
import AddClassEventPopover from './AddClassEventPopover';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import appSlice from '../../../redux/slices/appSlice';

export default function GridItem({
    time,
    dayTimestamp,
    handleMouseDown,
    handleMouseUp,
}: {
    time: number;
    dayTimestamp: number;
    handleMouseDown: (e: React.MouseEvent<HTMLDivElement>, day: number, time: number) => void;
    handleMouseUp: (day: number, timeThatGetsMovedUp: number) => void;
}) {
    const dispatch = useAppDispatch();
    const timetableAction = useAppSelector(s => s.app.timetableAction);
    const newTimeSlotRef = useRef<HTMLDivElement>(null);
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [visible, setVisible] = useState<boolean>(false);
    const createClassPopperFromHourTimestampOnShow = useAppSelector(
        s => s.app.createClassPopperFromHourTimestampOnShow
    );

    const handleClickOutside = () => {
        setVisible(false);
        setTimeout(() => {
            setOpenDialog(false), 300;
        });
    };

    useEffect(() => {
        if (openDialog) {
            document.addEventListener('mousedown', handleClickOutside);
            console.log('openDialog=true, mousedown!');
        }
        console.log('Hi');
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [openDialog]);

    const handleInnerOnMouseUp = () => {
        handleMouseUp(dayTimestamp, time);
        dispatch(appSlice.actions.setCreateClassPopperFromTimestampOnShow((dayTimestamp * time * 1000).toString()));

        setOpenDialog(true);
        setTimeout(() => {
            setVisible(true);
        }, 0);
    };

    useEffect(() => {
        console.log('timetableAction:', timetableAction);
    }, [timetableAction]);

    useEffect(() => {
        console.log(' dayTimestamp * time * 1000:', dayTimestamp * time * 1000);
        console.log('createClassPopperFromHourTimestampOnShow:', createClassPopperFromHourTimestampOnShow);
        if (Number(createClassPopperFromHourTimestampOnShow) !== dayTimestamp * time * 1000) {
            setOpenDialog(false);
        }
    }, [createClassPopperFromHourTimestampOnShow, dayTimestamp, time]);

    return (
        <div>
            <div
                key={time}
                style={{
                    height: '29px',
                    borderTop: time % 30 === 0 ? '1px solid #eee' : 'none',
                    paddingTop: '0.9px',
                    position: 'relative',
                    cursor: 'pointer',
                }}
                onMouseDown={e => handleMouseDown(e, dayTimestamp, time)}
                onMouseUp={handleInnerOnMouseUp}
                ref={newTimeSlotRef}
            >
                {/* I am a grid item {dayTimestamp + time * 10000} */}
            </div>
            {/* Popup content */}
            {openDialog && timetableAction === 'Create Class' && (
                <Popper
                    onClick={event => {
                        event.stopPropagation();
                    }}
                    sx={{
                        zIndex: 3,
                        cursor: 'default',
                        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)', // Add shadow here
                        border: '1px solid #ddd', // Optional: add border
                        backgroundColor: 'white', // Optional: ensure background color is set
                        transition: `opacity 300ms ease-in-out`,
                        opacity: visible ? 1 : 0,
                    }}
                    open={true}
                    anchorEl={newTimeSlotRef.current}
                    placement="right-start" // Adjust according to your needs
                    disablePortal={true}
                    modifiers={[
                        {
                            name: 'flip',
                            enabled: true,
                            options: {
                                altBoundary: true,
                                rootBoundary: 'viewport',
                                padding: 8,
                            },
                        },
                        {
                            name: 'preventOverflow',
                            enabled: true,
                            options: {
                                altAxis: true,
                                altBoundary: true,
                                tether: true,
                                rootBoundary: 'viewport',
                                padding: 8,
                            },
                        },
                    ]}
                >
                    <AddClassEventPopover
                        openDialog={openDialog}
                        setOpenDialog={setOpenDialog}
                        setVisible={setVisible}
                        dayUnixTimestamp={0}
                        hourUnixTimestamp={0}
                        studentId={''}
                    />
                </Popper>
            )}
        </div>
    );
}
