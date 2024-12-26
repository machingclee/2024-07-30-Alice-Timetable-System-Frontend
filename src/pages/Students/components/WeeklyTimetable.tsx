import { Box } from '@mui/material';
import { startOfWeek, endOfWeek, eachDayOfInterval } from 'date-fns';
import dayjs, { Dayjs } from 'dayjs';
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import SectionTitle from '../../../components/SectionTitle';
import Spacer from '../../../components/Spacer';
import lodash from 'lodash';
import StudentClass from './StudentClassForWeeklyTimetable';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import studentSlice, { StudentThunkAction } from '../../../redux/slices/studentSlice';
import { PiArrowRightBold } from 'react-icons/pi';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Button } from 'antd';
import { store } from '../../../redux/store';
import MoveConfirmationDialog from './MoveConfirmationDialog';
import MoveConfirmationForm from './MoveConfirmationForm';
import CustomScrollbarContainer from '../../../components/CustomScrollbarContainer';
import colors from '../../../constant/colors';

export type WeeklyCoordinate = {
    [dateUnixTimestamp: string]: {
        [halfHourUnixTimestamp: string]: null;
    };
};

export default function WeeklyTimeTable() {
    const dispatch = useAppDispatch();
    const studentId = useAppSelector(s => s.student.studentDetailTimetablePage.detail?.id) || '';
    const [timetableAvailableWidth, setTimetableAvailableWidth] = useState(0);
    const selectedPackageId = useAppSelector(s => s.student.studentDetailTimetablePage.selectedPackageId);
    const courseStartDate = useAppSelector(s => s.student.studentDetailTimetablePage.weeklyTimetable.selectedDate);
    const currDraggingId = useRef('');
    const [activeDraggableId, setActiveDraggableId] = useState('');
    const [offset, setOffset] = useState(0);

    const getHalfHourTimeIntervalsForDay = useCallback((date: Date) => {
        const dayJS = dayjs(date);
        const start = dayJS.startOf('day').add(9, 'hour');
        const intervals: Dayjs[] = [];
        for (let offset = 0; offset < 44; offset++) {
            const time = start.add(offset * 0.25, 'hour');
            intervals.push(time);
        }
        return intervals;
    }, []);

    const weekStart = dayjs(startOfWeek(courseStartDate, { weekStartsOn: 1 }))
        .add(offset, 'day')
        .toDate();
    const weekEnd = dayjs(endOfWeek(courseStartDate, { weekStartsOn: 1 }))
        .add(offset, 'day')
        .toDate();
    const daysOfWeek = eachDayOfInterval({ start: weekStart, end: weekEnd });
    const [timeGrid, setTimegrid] = useState<WeeklyCoordinate>({});

    useEffect(() => {
        const timetable_: WeeklyCoordinate = {};
        daysOfWeek.forEach(dateObj => {
            const timeOfTheDay = dateObj.getTime();
            const hoursOfTheDay = getHalfHourTimeIntervalsForDay(dateObj).map(dayJS => dayJS.valueOf());
            hoursOfTheDay.forEach(hr => {
                lodash.setWith(timetable_, `["${timeOfTheDay}"]["${hr}"]`, { data: null }, Object);
            });
        });
        setTimegrid(timetable_);
    }, [offset, courseStartDate, selectedPackageId, daysOfWeek, getHalfHourTimeIntervalsForDay]);

    useEffect(() => {
        setOffset(0);
    }, [selectedPackageId]);

    const timetableContainerRef = useRef<HTMLDivElement | null>(null);

    const gridHeight = 18;
    const gridTimeColTop = 18;

    const adjustWidth = useCallback(() => {
        const width = window.innerWidth;
        const columnWidth = Math.min((width - 660) / 7, 200);
        setTimetableAvailableWidth(columnWidth);
    }, []);

    const adjustWidthDefined = useRef(false);

    useEffect(() => {
        adjustWidth();
        if (!adjustWidthDefined.current) {
            window.addEventListener('resize', adjustWidth);
            adjustWidthDefined.current = true;
        }
        return () => {
            window.removeEventListener('resize', adjustWidth);
            adjustWidthDefined.current = false;
        };
    }, [adjustWidth]);

    return (
        <Box
            ref={timetableContainerRef}
            style={{ width: '100%' }}
            sx={{
                overflowY: 'hidden',
                height: '1000px',
                '& .draggable-container': {
                    borderTop: '1px solid rgba(0,0,0,0.1)',
                    borderLeft: '2px solid rgba(0, 0, 0, 0.1)',
                },
                '& .draggable-container:nth-child(n+1)': {
                    borderTop: '2px dashed rgba(0,0,0,0.15)',
                },
                '& .day-column': {
                    flex: 1,
                },
                '& .day-column:last-child': {
                    '& .draggable-container': {
                        borderRight: '2px solid rgba(0, 0, 0, 0.1)',
                    },
                },
                '& .draggable-container:last-child': {
                    borderBottom: '1px solid rgba(0,0,0,0.1)',
                },
                '& .freeze': {
                    transform: 'translate(0px,0px) !important',
                },
                '& .grid-time: nth-child(n+2)': {
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    paddingRight: '14px',
                    height: `${gridHeight + 0.8}px`,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    whiteSpace: 'nowrap',
                },
                '& .grid-hour: nth-child(n+1)': {
                    width: `${timetableAvailableWidth}px`,
                    height: `${gridHeight - 1}px`,
                },
                '& .grid-hour.header': {
                    top: 0,
                    position: 'sticky',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    padding: 0,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: 0,
                    backgroundColor: colors.BACKGORUND_GREY,
                    zIndex: 10 ** 7,
                },
                '& .droppable': {
                    '& .grid-hour': {
                        '&.disbaletransform': { transform: 'none !important' },
                        '&:hover': {
                            cursor: 'pointer',
                            // backgroundColor: "rgba(22,119,255,0.2)",
                        },
                    },
                },
            }}
        >
            <SectionTitle>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: 10,
                    }}
                >
                    <Button
                        onClick={() => {
                            setOffset(v => v - 7);
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                fontSize: 14,
                            }}
                        >
                            <FaChevronLeft /> <Spacer width={5} />
                            Previous Week{' '}
                        </div>
                    </Button>
                    <Spacer width={20} />
                    <div>{dayjs(weekStart).format('YYYY-MM-DD (ddd)')}</div>
                    <Spacer width={10} />
                    <PiArrowRightBold />
                    <Spacer width={10} />
                    <div>{dayjs(weekEnd).format('YYYY-MM-DD (ddd)')}</div>
                    <Spacer width={20} />
                    <Button
                        onClick={() => {
                            setOffset(v => v + 7);
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                fontSize: 14,
                            }}
                        >
                            Next Week <Spacer width={5} />
                            <FaChevronRight />
                        </div>
                    </Button>
                </div>
            </SectionTitle>

            <CustomScrollbarContainer style={{ height: 'calc(100vh - 120px)', width: '100%' }}>
                <Spacer />
                <DragDropContext
                    onBeforeCapture={e => {
                        const { draggableId } = e;
                        setActiveDraggableId(draggableId);
                        currDraggingId.current = draggableId;
                    }}
                    onDragEnd={async result => {
                        const { destination } = result;
                        const { droppableId: toDayUnixTimestamp, index: toIndex } = destination!;
                        const toHourUnixTimestamp = Object.keys(timeGrid?.[toDayUnixTimestamp]).sort()[toIndex];
                        const fromClz =
                            store.getState().student.studentDetailTimetablePage.weeklyTimetable
                                .hrUnixTimestampToClassEvent?.[currDraggingId.current];
                        if (!fromClz) {
                            return;
                        }
                        const move = async () => {
                            await dispatch(
                                StudentThunkAction.moveStudentEvent({
                                    fromHourTimestamp: currDraggingId.current,
                                    toDayTimestamp: toDayUnixTimestamp,
                                    toHourTimestamp: toHourUnixTimestamp,
                                })
                            ).unwrap();
                            dispatch(
                                studentSlice.actions.unHideClass({
                                    hrTimestamp: currDraggingId.current,
                                })
                            );
                            if (fromClz.classGroup) {
                                setTimeout(() => {
                                    dispatch(StudentThunkAction.getStudentClassesForWeeklyTimetable({ studentId }));
                                }, 1000);
                            }
                        };
                        if (fromClz.classGroup) {
                            dispatch(
                                studentSlice.actions.hideClass({
                                    hrTimestamp: currDraggingId.current,
                                })
                            );
                            MoveConfirmationDialog.setContent(() => () => (
                                <MoveConfirmationForm moveClassesAction={move} />
                            ));
                            MoveConfirmationDialog.setOpen(true);
                        } else {
                            await move();
                        }
                        setActiveDraggableId('');
                    }}
                >
                    <div style={{ display: 'flex' }}>
                        <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex' }}>
                                <div>
                                    <Spacer
                                        height={gridTimeColTop}
                                        style={{
                                            position: 'sticky',
                                            top: 0,
                                            background: colors.BACKGORUND_GREY,
                                            width: '100%',
                                        }}
                                    />
                                    {getHalfHourTimeIntervalsForDay(weekStart).map((dayJS, index) => {
                                        return (
                                            <div
                                                style={{
                                                    fontSize: 13,
                                                    opacity: index % 2 === 0 ? 1 : 0,
                                                }}
                                                className="grid-time"
                                                key={dayJS.valueOf().toString()}
                                            >
                                                {dayJS.format('HH:mm')}
                                            </div>
                                        );
                                    })}
                                </div>
                                {Object.keys(timeGrid)
                                    .sort()
                                    .map(dayUnixTimestamp => {
                                        const dayDayJS = dayjs(parseInt(dayUnixTimestamp));
                                        return (
                                            <div key={dayUnixTimestamp} className="day-column">
                                                <div
                                                    className="grid-hour header"
                                                    style={{
                                                        width: '100%',
                                                        fontWeight: 400,
                                                        textAlign: 'center',
                                                    }}
                                                >
                                                    {timetableAvailableWidth >= 85 && dayDayJS.format('ddd, MMM D')}
                                                    {timetableAvailableWidth < 85 && dayDayJS.format('ddd')}
                                                </div>
                                                <Spacer height={5} />
                                                <Droppable droppableId={dayUnixTimestamp} mode="virtual">
                                                    {provided => {
                                                        return (
                                                            <div
                                                                ref={provided.innerRef}
                                                                {...provided.droppableProps}
                                                                className="droppable"
                                                            >
                                                                {Object.keys(timeGrid[dayUnixTimestamp])
                                                                    .sort()
                                                                    .map((hourUnixTimestamp, index) => {
                                                                        // const time = dayjs(parseInt(hourUnixTimestamp));
                                                                        // const isFullHour = time.minute() === 0; // Check if it's a full hour (minute is 0)
                                                                        // console.log("time:", time);
                                                                        // console.log("isFullHour:", isFullHour);
                                                                        // // Apply thicker border for full hours
                                                                        // const timeSlotStyle: React.CSSProperties = {
                                                                        //     height: isFullHour ? "2px" : "0",
                                                                        //     width: "100%",
                                                                        //     backgroundColor: "black",
                                                                        //     position: "absolute",
                                                                        // };
                                                                        return (
                                                                            <React.Fragment key={hourUnixTimestamp}>
                                                                                <StudentClass
                                                                                    colIndex={index}
                                                                                    dayUnixTimestamp={parseInt(
                                                                                        dayUnixTimestamp
                                                                                    )}
                                                                                    hourUnixTimestamp={parseInt(
                                                                                        hourUnixTimestamp
                                                                                    )}
                                                                                    activeDraggableId={
                                                                                        activeDraggableId
                                                                                    }
                                                                                />
                                                                                {activeDraggableId ===
                                                                                    hourUnixTimestamp &&
                                                                                    provided.placeholder}
                                                                                {/* </div> */}
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
}
