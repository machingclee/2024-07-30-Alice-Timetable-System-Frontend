import clsx from 'clsx';
import dayjs from 'dayjs';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useAppSelector } from '@/redux/hooks';
import { studentApi } from '@/!rtk-query/api/studentApi';
import { Box } from '@mui/material';
import { Button, Calendar } from 'antd';
import useStudentDetailPathParam from '@/hooks/useStudentDetailPathParam';
import LoadingOverlay from '@/components/LoadingOverlay';

const HIGHLIGHT_CALEDAR_DATE_STYLE = clsx(
    'w-7 h-7 bg-emerald-200 rounded-md flex items-center justify-center font-semibold text-emerald-700'
);
const CALENDAR_IS_TODAY_COLOR = '#3bc289';

function determineStyle(isSelected: boolean) {
    const className = clsx({
        [clsx(HIGHLIGHT_CALEDAR_DATE_STYLE, `!bg-[${CALENDAR_IS_TODAY_COLOR}] text-white`)]: isSelected,
    });
    return className;
}

const CalendarCell = (props: { className: string; today: dayjs.Dayjs }) => {
    const { studentId } = useParams<{ studentId: string }>();
    const { className, today } = props;
    const { lessons } = studentApi.endpoints.getStudentClassesForWeeklyTimetable.useQuery(
        {
            studentId: studentId || '',
        },
        {
            selectFromResult: result => {
                const { hrUnixTimestampToLesson, hrUnixTimestamps } = result.data || {};
                const lessonsOfToday =
                    hrUnixTimestamps?.filter(timestamp => {
                        const date = dayjs(timestamp);
                        return date.isSame(today, 'day');
                    }) || [];
                const lessons = lessonsOfToday.map(timestamp => hrUnixTimestampToLesson?.[timestamp]);
                return { lessons };
            },
        }
    );
    const hasLesson = lessons?.length > 0;
    return (
        <div className={`w-full h-full flex items-center justify-center`} style={{ position: 'relative', zIndex: 1 }}>
            <div className={className}>{today.date()}</div>
            {hasLesson && <div className="absolute bottom-0 left-0 w-full h-1 bg-emerald-400" />}
        </div>
    );
};

const CalendarView = () => {
    const { studentId } = useParams<{ studentId: string }>();
    const [seletectedDate, setSeletectedDate] = useState<dayjs.Dayjs>(dayjs());
    const [startingMonth, setStartingMonth] = useState<dayjs.Dayjs>(dayjs().startOf('month'));
    const fourMonthsInARow = [0, 1, 2, 3].map(i => startingMonth.add(i, 'month'));
    const selectedPackage = useAppSelector(s => s.student.studentDetailTimetablePage.selectedPackageId);
    const { setPathParam } = useStudentDetailPathParam();
    const { isFetching } = studentApi.endpoints.getStudentClassesForWeeklyTimetable.useQuery({
        studentId: studentId || '',
    });

    return (
        <LoadingOverlay isLoading={isFetching}>
            <Box
                sx={{
                    '& .ant-picker-calendar-date': {
                        color: 'inherit',
                    },
                    '& .ant-picker-calendar-date-value': {
                        display: 'none',
                    },
                    '& .ant-picker-cell-inner::before': {
                        border: 'none !important',
                    },
                    '& .ant-picker-cell-inner': {
                        backgroundColor: 'transparent !important',
                    },
                    '& .ant-radio-group-outline': {
                        '& label': { display: 'none' },
                    },
                }}
            >
                <div className="flex justify-between mb-2">
                    <Button onClick={() => setStartingMonth(startingMonth.subtract(4, 'month'))}>Prev 4</Button>
                    <Button onClick={() => setStartingMonth(startingMonth.add(4, 'month'))}>Next 4</Button>
                </div>
                {fourMonthsInARow.map(startOfMonth => {
                    const isSelectedDateWithinThisMonth = seletectedDate.isSame(startOfMonth, 'month');
                    const isSelected = (date: dayjs.Dayjs) =>
                        isSelectedDateWithinThisMonth ? seletectedDate.isSame(date) : false;
                    return (
                        <div className="mb-2">
                            <Calendar
                                className="border-1 !border-teal-300 !rounded-sm !text-sm"
                                fullscreen={false}
                                value={isSelectedDateWithinThisMonth ? seletectedDate : startOfMonth}
                                onSelect={(date, _) => {
                                    setSeletectedDate(date);
                                    setPathParam({ anchorTimestamp: date.valueOf(), packageId: selectedPackage || '' });
                                }}
                                cellRender={(date: dayjs.Dayjs) => {
                                    const className = determineStyle(isSelected(date));
                                    return <CalendarCell className={className} today={date} />;
                                }}
                            />
                        </div>
                    );
                })}
            </Box>
        </LoadingOverlay>
    );
};

export default CalendarView;
