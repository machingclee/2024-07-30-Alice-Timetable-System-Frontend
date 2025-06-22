import { useRef } from 'react';
import PrintButton, { PrintHandler } from '../PrintButton';
import RefreshDailyTimetableButton from '../RefreshDailyTimetableButton';
import DailyTimetable from './DailyTimetable';
import DuplicateClassDialog from '../DuplicateClassDialog';
import ViewClassDialog from '../ViewClassDialog';
import DeleteClassDialog from '../DeleteClassDialog';
import AddClassEventDialog from '../AddClassEventDialog';
import MoveConfirmationDialog from '../../pages/Students/components/MoveConfirmationDialog';
import Spacer from '../Spacer';
import { Button } from 'antd';
import { useAppSelector } from '@/redux/hooks';
import dayjs from 'dayjs';
import { studentApi } from '@/!rtk-query/api/studentApi';
import { customHolidayApi } from '@/!rtk-query/api/customHolidayApi';

const PrintableDailyTable = (props: { date: Date; dayOffset: number }) => {
    const { date, dayOffset } = props;
    const printButtonRef = useRef<PrintHandler>(null);
    const { data: customHolidaysQuery } = customHolidayApi.endpoints.getCustomHolidays.useQuery();
    const timetableDayTimestamp = dayjs(date).add(dayOffset, 'day').startOf('day').toDate().getTime();
    const classroom = useAppSelector(s => s.student.massTimetablePage.classRoom)!;
    const [createExtendedClassesForHoliday] = studentApi.endpoints.createExtendedClassesForHoliday.useMutation();

    const holidayButton = () => {
        const holiday = customHolidaysQuery?.find(holiday => holiday.startOfTheDate === timetableDayTimestamp);
        if (holiday) {
            return (
                <div className="flex items-center gap-2">
                    <Button
                        onClick={() =>
                            createExtendedClassesForHoliday({
                                classroom,
                                dayTimestamp: timetableDayTimestamp,
                            })
                        }
                    >
                        Extend Classes
                    </Button>
                    <span>for holiday: {holiday?.name || ''}</span>
                </div>
            );
        } else {
            return null;
        }
    };

    return (
        <>
            <Spacer />
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
                className="mb-2"
            >
                <div>{holidayButton()}</div>
                <div className="flex items-center gap-2">
                    <RefreshDailyTimetableButton />
                    <PrintButton ref={printButtonRef} />
                </div>
            </div>
            <div
                style={{
                    height: 'calc(100vh - 90px)',
                    overflow: 'hidden',
                }}
            >
                <DailyTimetable printButtonRef={printButtonRef} date={date} dayOffset={dayOffset} />
            </div>
            <DuplicateClassDialog.render />
            <ViewClassDialog.render />
            <DeleteClassDialog.render />
            <AddClassEventDialog.render />
            <MoveConfirmationDialog.render />
        </>
    );
};

export default PrintableDailyTable;
