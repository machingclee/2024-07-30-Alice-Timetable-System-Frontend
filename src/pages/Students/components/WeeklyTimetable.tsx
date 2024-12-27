import { Box } from '@mui/material';
import { startOfWeek, endOfWeek, eachDayOfInterval } from 'date-fns';
import dayjs, { Dayjs } from 'dayjs';
import { useState, useCallback, useEffect, useRef } from 'react';
import SectionTitle from '../../../components/SectionTitle';
import Spacer from '../../../components/Spacer';
import lodash from 'lodash';
import ClassEventForWeeklyTimetable from './ClassEventForWeeklyTimetable';
import { useAppSelector } from '../../../redux/hooks';
import { PiArrowRightBold } from 'react-icons/pi';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Button } from 'antd';
import CustomScrollbarContainer from '../../../components/CustomScrollbarContainer';
import colors from '../../../constant/colors';

export type WeeklyCoordinate = {
    [dateUnixTimestamp: string]: {
        [halfHourUnixTimestamp: string]: null;
    };
};

export default function WeeklyTimeTable() {
    const [timetableAvailableWidth, setTimetableAvailableWidth] = useState(0);
    const selectedPackageId = useAppSelector(s => s.student.studentDetailTimetablePage.selectedPackageId);
    const courseStartDate = useAppSelector(s => s.student.studentDetailTimetablePage.weeklyClassEvent.selectedDate);
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
    const [timeGrid, setTimegrid] = useState<WeeklyCoordinate>({});

    useEffect(() => {
        const timetable_: WeeklyCoordinate = {};
        const daysOfWeek = eachDayOfInterval({ start: weekStart, end: weekEnd });
        daysOfWeek.forEach(dateObj => {
            const timeOfTheDay = dateObj.getTime();
            const hoursOfTheDay = getHalfHourTimeIntervalsForDay(dateObj).map(dayJS => dayJS.valueOf());
            hoursOfTheDay.forEach(hr => {
                lodash.setWith(timetable_, `["${timeOfTheDay}"]["${hr}"]`, { data: null }, Object);
            });
        });
        setTimegrid(timetable_);
        // eslint-disable-next-line
    }, [offset, courseStartDate, selectedPackageId, getHalfHourTimeIntervalsForDay]);

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
                                            <div>
                                                {Object.keys(timeGrid[dayUnixTimestamp])
                                                    .sort()
                                                    .map((hourUnixTimestamp, index) => {
                                                        return (
                                                            <ClassEventForWeeklyTimetable
                                                                key={hourUnixTimestamp}
                                                                colIndex={index}
                                                                dayUnixTimestamp={parseInt(dayUnixTimestamp)}
                                                                hourUnixTimestamp={parseInt(hourUnixTimestamp)}
                                                            />
                                                        );
                                                    })}
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                    <Spacer />
                </div>
                <Spacer />
            </CustomScrollbarContainer>
        </Box>
    );
}
