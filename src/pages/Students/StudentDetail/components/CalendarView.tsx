import clsx from 'clsx';
import dayjs from 'dayjs';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useAppSelector } from '@/redux/hooks';
import { studentApi } from '@/!rtk-query/api/studentApi';
import { Box } from '@mui/material';
import { Calendar } from 'antd';
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

const CalendarCell = (props: { className: string; today: dayjs.Dayjs; isSelected: boolean }) => {
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
        <div className="w-full h-full flex items-center justify-center" style={{ position: 'relative', zIndex: 1 }}>
            <div className={className}>{today.date()}</div>
            {hasLesson && <div className="absolute bottom-0 left-0 w-full h-1 bg-emerald-400" />}
        </div>
    );
};

const CalendarView = () => {
    const { studentId } = useParams<{ studentId: string }>();
    const [seletectedDate, setSeletectedDate] = useState<dayjs.Dayjs>(dayjs());
    const selectedPackage = useAppSelector(s => s.student.studentDetailTimetablePage.selectedPackageId);
    const { setPathParam } = useStudentDetailPathParam();
    const { isFetching } = studentApi.endpoints.getStudentClassesForWeeklyTimetable.useQuery({
        studentId: studentId || '',
    });

    return (
        <LoadingOverlay isLoading={isFetching}>
            <Box
                className="-mt-12 -mb-6 -mr-10 -ml-6"
                sx={{
                    transform: 'scale(0.7)',
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
                <Calendar
                    className="border-1 !border-teal-300 !rounded-sm !text-sm"
                    fullscreen={false}
                    value={seletectedDate}
                    onSelect={(date, _) => {
                        setSeletectedDate(date);
                        setPathParam({ anchorTimestamp: date.valueOf(), packageId: selectedPackage || '' });
                    }}
                    cellRender={(date: dayjs.Dayjs) => {
                        const className = determineStyle(seletectedDate.isSame(date));
                        return (
                            <CalendarCell className={className} today={date} isSelected={seletectedDate.isSame(date)} />
                        );
                    }}
                />
            </Box>
        </LoadingOverlay>
    );
};

export default CalendarView;
