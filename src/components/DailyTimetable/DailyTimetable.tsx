import { Button } from 'antd';
import CustomScrollbarContainer from '../CustomScrollbarContainer';
import { Box } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { useState, useEffect, useMemo } from 'react';
import SectionTitle from '../SectionTitle';
import Spacer from '../Spacer';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import studentSlice, { StudentThunkAction } from '../../redux/slices/studentSlice';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import timeUtil from '../../utils/timeUtil';
import ViewClassDialog from '../ViewClassDialog';
import TimeRow from './components/TimeRow';
import { PrintHandler } from '../PrintButton';
import Interval from '../../utils/Interval';
const gridHeight = 30;

export default function DailyTimetable({
    printButtonRef: printButtonRef,
}: {
    printButtonRef?: React.RefObject<PrintHandler>;
}) {
    const dispatch = useAppDispatch();
    const classRoom = useAppSelector(s => s.student.massTimetablePage.classRoom);
    const selectedDate = useAppSelector(s => s.student.massTimetablePage.selectedDate);
    const [hoursColumnGrid, setHoursColumn] = useState<string[]>([]);
    const selectedDay = useAppSelector(s => s.student.massTimetablePage.selectedDate);
    const filter = useAppSelector(s => s.student.massTimetablePage.filter);
    const hrUnixTimestampOnClick = useAppSelector(
        s => s.student.massTimetablePage.totalClassesInHighlight.hrUnixTimestampOnClick
    );
    const hrUnixTimestampToClasses = useAppSelector(s => s.student.massTimetablePage.hrUnixTimestampToTimetableClasses);

    // Memoize the half-hour intervals to prevent recalculation on every render
    const oneForthHourIntervals = useMemo(() => {
        const startOfTodayDayjs = dayjs(selectedDate).startOf('day').add(9, 'hour'); // Start from 9 AM
        const intervals: Dayjs[] = [];
        for (let offset = 0; offset < 44; offset++) {
            intervals.push(startOfTodayDayjs.add(offset * 0.25, 'hour'));
        }
        return intervals;
    }, [selectedDate]);

    // Initialize the time grid based on `hrUnixTimestamps`
    useEffect(() => {
        const hoursOfTheDay = oneForthHourIntervals.map(dayJS => String(dayJS.valueOf()));
        setHoursColumn(hoursOfTheDay);
        // Add another thing to listen to: change of the date (like next day and previous day)
    }, [selectedDay, oneForthHourIntervals]);

    // Move to the parent component to do one operation of counting the number of classes starting on, progressing through or ending on a particular unix timestamp
    useEffect(() => {
        if (hrUnixTimestampOnClick) {
            let numOfClasses = 0;
            const t_min = hrUnixTimestampOnClick;
            const t_max = dayjs(hrUnixTimestampOnClick).add(15, 'minute').valueOf();
            const intervalOnClick = new Interval(t_min, t_max - 1);

            Object.values(hrUnixTimestampToClasses).forEach(timetableClass => {
                timetableClass.forEach(timetableClass => {
                    const hourUnixTimestamp = timetableClass.class.hourUnixTimestamp;
                    const package_ = timetableClass.studentPackage;
                    const min = package_.min;
                    const classInterval = new Interval(
                        hourUnixTimestamp,
                        dayjs(hourUnixTimestamp).add(min, 'minute').valueOf() - 1
                    );
                    const intersection = classInterval.intersect(intervalOnClick);
                    if (intersection) {
                        numOfClasses++;
                    }
                    // if (isClassOngoing(hrUnixTimestampOnClick, timetableClass.hour_unix_timestamp, timetableClass.min)) {
                    //     numOfClasses++;
                    // }
                });
            });
            dispatch(studentSlice.actions.setNumberOfClassesInHighlight(numOfClasses));
        }
    }, [hrUnixTimestampOnClick, dispatch, hrUnixTimestampToClasses]);

    return (
        <Box
            sx={{
                height: '1000px',
                '& .daily-class-container': {
                    width: '100%',
                    height: gridHeight,
                    borderTop: '1px solid rgba(0,0,0,0.1)',
                    borderLeft: '1px solid rgba(0, 0, 0, 0.1)',
                    '& .daily-class': {
                        maxWidth: '100px',
                    },
                },
                '& .droppable:last-child': {
                    '& .daily-class-container': {
                        borderRight: '1px solid rgba(0,0,0,0.1)',
                    },
                },
                '& .daily-class-container:last-child': {
                    borderBottom: '1px solid rgba(0,0,0,0.1)',
                },
                '& .freeze': {
                    transform: 'translate(0px,0px) !important',
                },
                '& .grid-hour: nth-child(n+1)': {
                    width: '120px',
                    height: `${gridHeight - 1}px`,
                },
                '& .droppable': {
                    '& .grid-hour': {
                        '&.disbaletransform': { transform: 'none !important' },
                        '&:hover': {
                            cursor: 'pointer',
                            backgroundColor: 'rgba(22,119,255,0.2)',
                        },
                    },
                },
            }}
        >
            <SectionTitle style={{ justifyContent: 'center' }}>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: 10,
                    }}
                    ref={ref => {
                        console.log('setting print target ref', ref);
                    }}
                >
                    <Button
                        onClick={() => {
                            if (!classRoom) {
                                return;
                            }
                            const prevDayjs = dayjs(selectedDate).subtract(1, 'day');
                            dispatch(studentSlice.actions.setDailyTimetableSelectedDate({ date: prevDayjs.toDate() }));
                            dispatch(
                                StudentThunkAction.getFilteredStudentClassesForDailyTimetable({
                                    dateUnixTimestamp: timeUtil
                                        .getDayUnixTimestamp(dayjs(selectedDate).subtract(1, 'day').toDate().getTime())
                                        .toString(),
                                    classRoom: classRoom,
                                    filter: filter,
                                })
                            );
                            dispatch(
                                StudentThunkAction.getFilteredStudentClassesForDailyTimetable({
                                    filter,
                                    dateUnixTimestamp: prevDayjs.startOf('day').valueOf().toString(),
                                    classRoom: classRoom,
                                })
                            );
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                fontSize: 14,
                            }}
                        >
                            <FaChevronLeft /> <Spacer width={5} /> Previous Day
                        </div>
                    </Button>
                    <Spacer width={20} />
                    <div>{dayjs(selectedDate).format('YYYY-MM-DD (ddd)')}</div>
                    <Spacer width={20} />
                    <Button
                        onClick={() => {
                            if (!classRoom) {
                                return;
                            }
                            const nextDayjs = dayjs(selectedDate).add(1, 'day');
                            dispatch(studentSlice.actions.setDailyTimetableSelectedDate({ date: nextDayjs.toDate() }));
                            dispatch(
                                StudentThunkAction.getFilteredStudentClassesForDailyTimetable({
                                    dateUnixTimestamp: timeUtil
                                        .getDayUnixTimestamp(dayjs(selectedDate).add(1, 'day').toDate().getTime())
                                        .toString(),
                                    classRoom: classRoom,
                                    filter: filter,
                                })
                            );
                            // dispatch(
                            //     StudentThunkAction.getStudentClassesForDailyTimetable({
                            //         dateUnixTimestamp: nextDayjs.valueOf().toString(),
                            //         classRoom: classRoom,
                            //     })
                            // );
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                fontSize: 14,
                            }}
                        >
                            Next Day <Spacer width={5} /> <FaChevronRight />
                        </div>
                    </Button>
                </div>
            </SectionTitle>

            <CustomScrollbarContainer
                style={{ height: 'calc(100vh - 120px)' }}
                setPrintContent={(content: HTMLDivElement | null) => {
                    printButtonRef?.current?.setPrintTarget(content);
                }}
            >
                <Box
                    sx={{
                        '@media print': {
                            padding: '20px', // Print-specific padding
                            pageBreakInside: 'avoid',
                        },
                        '& .grid-time: nth-child(n+1)': {
                            paddingRight: '14px',
                            height: `${gridHeight + 5}px`,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                        },
                    }}
                >
                    <Spacer />
                    <div style={{ display: 'flex' }}>
                        <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex' }}>
                                <div>
                                    {oneForthHourIntervals.map(dayJS => {
                                        return (
                                            <div
                                                style={{ fontSize: 13 }}
                                                className="grid-time"
                                                key={dayJS.valueOf().toString()}
                                            >
                                                {dayJS.format('HH:mm')}
                                            </div>
                                        );
                                    })}
                                </div>
                                <div style={{ flex: 1 }}>
                                    {hoursColumnGrid.sort().map((hourUnixTimestamp, index) => {
                                        return (
                                            <TimeRow
                                                key={`${hourUnixTimestamp}-${selectedDate.getTime()}`}
                                                index={index}
                                                hourUnixTimestamp={hourUnixTimestamp}
                                                hoursColumnGrid={hoursColumnGrid}
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                        <Spacer />
                    </div>
                </Box>
                <Spacer />
                <ViewClassDialog.render />
            </CustomScrollbarContainer>
        </Box>
    );
}
