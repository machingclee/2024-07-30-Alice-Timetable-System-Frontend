import { Box } from '@mui/material';
import { startOfWeek, endOfWeek, eachDayOfInterval } from 'date-fns';
import dayjs, { Dayjs } from 'dayjs';
import { useState, useCallback, useEffect, useRef } from 'react';
import SectionTitle from '../../../components/SectionTitle';
import Spacer from '../../../components/Spacer';
import lodash from 'lodash';
import StudentClassForWeeklyTimetableCell from './StudentClassForWeeklyTimetableCell';
import { useAppSelector } from '../../../redux/hooks';
import { PiArrowRightBold } from 'react-icons/pi';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Button } from 'antd';
import CustomScrollbarContainer from '../../../components/CustomScrollbarContainer';
import FadeIn from '../../../components/FadeIn';
import useAnchorTimestamp from '../../../hooks/useStudentDetailPathParam';
import ContentContainer from '@/components/ContentContainer';

export type WeeklyCoordinate = {
    [dateUnixTimestamp: string]: {
        [halfHourUnixTimestamp: string]: null;
    };
};

const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;

export default function WeeklyTimeTable() {
    const packageId = useAppSelector(s => s.student.studentDetailTimetablePage.selectedPackageId);
    const { anchorTimestamp, setPathParam } = useAnchorTimestamp();
    const [timetableAvailableWidth, setTimetableAvailableWidth] = useState(0);
    const selectedPackageId = useAppSelector(s => s.student.studentDetailTimetablePage.selectedPackageId);
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

    const weekStart = dayjs(startOfWeek(anchorTimestamp, { weekStartsOn: 1 })).toDate();
    const weekEnd = dayjs(endOfWeek(anchorTimestamp, { weekStartsOn: 1 })).toDate();
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
    }, [anchorTimestamp, selectedPackageId, getHalfHourTimeIntervalsForDay, weekStart, weekEnd]);

    const goNextWeek = () => {
        const nextAnchorTimestamp = anchorTimestamp + ONE_DAY_IN_MS * 7;
        setPathParam({ anchorTimestamp: nextAnchorTimestamp, packageId: packageId || '' });
    };
    const goPrevWeek = () => {
        const nextAnchorTimestamp = anchorTimestamp - ONE_DAY_IN_MS * 7;
        setPathParam({ anchorTimestamp: nextAnchorTimestamp, packageId: packageId || '' });
    };

    useEffect(() => {}, [selectedPackageId, anchorTimestamp]);

    const timetableContainerRef = useRef<HTMLDivElement | null>(null);

    const gridHeight = 20;
    const gridTimeColTop = 18;

    const adjustWidth = useCallback(() => {
        const width = window.innerWidth;
        const columnWidth = Math.min((width - 720) / 7, 200);
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

    const weekNavigator = () => {
        return (
            <SectionTitle>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: 10,
                    }}
                >
                    <Button onClick={goPrevWeek}>
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
                    <Button onClick={goNextWeek}>
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
        );
    };

    return (
        <Box
            ref={timetableContainerRef}
            style={{ width: '100%' }}
            sx={{
                overflowY: 'hidden',
                '& .draggable-container': {
                    position: 'relative',
                    borderTop: '1px solid rgba(0,0,0,0.1)',
                    borderLeft: '2px solid rgba(0, 0, 0, 0.1)',
                },
                '& .draggable-container:nth-of-type(n+1)': {
                    borderTop: '0.12rem solid rgba(0,0,0,0.15)',
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
                '& .grid-time:nth-of-type(n+2)': {
                    zIndex: '5 !important',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    paddingRight: '14px',
                    height: `${gridHeight + 0.8}px`,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    whiteSpace: 'nowrap',
                },
                '& .grid-hour': {
                    '&:nth-of-type(n+1)': {
                        width: '100%',
                        height: `${gridHeight - 1}px`,
                    },

                    '&:hover': {
                        cursor: 'pointer',
                        // backgroundColor: 'rgba(22,119,255,0.2)',
                    },
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
                    zIndex: 10 ** 7,
                },
            }}
        >
            <FadeIn className="flex flex-col flex-1 h-[calc(100vh-160px)] overflow-hidden overflow-y-scroll mr-4">
                <ContentContainer>
                    <div className="flex justify-center">{weekNavigator()}</div>
                    <CustomScrollbarContainer className="flex-1 overflow-scroll">
                        <Spacer />
                        <div className="flex">
                            <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex' }}>
                                    <div>
                                        <Spacer
                                            height={gridTimeColTop}
                                            style={{
                                                position: 'sticky',
                                                top: 0,
                                                width: '100%',
                                            }}
                                        />
                                        <div className="grid-time" style={{ width: 60 }}></div>
                                    </div>
                                    {Object.keys(timeGrid)
                                        .sort()
                                        .map((dayUnixTimestamp, colIndex) => {
                                            const dayDayJS = dayjs(parseInt(dayUnixTimestamp));
                                            return (
                                                <div key={dayUnixTimestamp} className="day-column">
                                                    <div
                                                        className="grid-hour header bg-teal-100"
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
                                                            .map((hourUnixTimestamp, rowIndex) => {
                                                                return (
                                                                    <StudentClassForWeeklyTimetableCell
                                                                        key={hourUnixTimestamp}
                                                                        colIndex={colIndex}
                                                                        rowIndex={rowIndex}
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
                </ContentContainer>
            </FadeIn>
        </Box>
    );
}
