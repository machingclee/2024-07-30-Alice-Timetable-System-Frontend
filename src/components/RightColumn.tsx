import { BsCalendar2MonthFill } from 'react-icons/bs';
import Spacer from '../components/Spacer';
import { useAppSelector } from '../redux/hooks';
import { useDispatch } from 'react-redux';
import Sep from '../components/Sep';
import { Calendar } from 'antd';
import type { CalendarProps } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import studentSlice from '../redux/slices/studentSlice';
import { studentApi } from '../!!rtk-query/api/studentApi';
import { AppDispatch } from '../redux/store';
import { StatuesFilter } from '../dto/dto';
import { FaFilter } from 'react-icons/fa';
import Checkbox from '@mui/material/Checkbox';
import React, { useState } from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import ClassFilterItem from './CourseFilterItem';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import { Box, CircularProgress } from '@mui/material';
import statues from '../constant/statues';
import ContentContainer from './ContentContainer';
import clsx from 'clsx';
import { Class_status } from '@/dto/kotlinDto';
import { coursesApi } from '@/redux/slices/courseSlice';
import { cloneDeep } from 'lodash';
import { massDailyTimetableApi } from '@/!!rtk-query/api/massDailyTimetableApi';
import { customHolidayApi } from '@/!!rtk-query/api/customHolidayApi';

export default function RightColumn() {
    const classroom = useAppSelector(s => s.student.massTimetablePage.classRoom);
    const selectedDate = useAppSelector(s => s.student.massTimetablePage.selectedDate);
    const filter = useAppSelector(s => s.student.massTimetablePage.filter);
    const [getFilteredStudentClassesForDailyTimetable] =
        studentApi.endpoints.getFilteredStudentClassesForDailyTimetable.useLazyQuery();

    const { summaryOfClassStatuses } = studentApi.endpoints.getFilteredStudentClassesForDailyTimetable.useQuery(
        {
            classRoom: classroom || 'CAUSEWAY_BAY',
            anchorTimestamp: dayjs(selectedDate).startOf('day').valueOf(),
            numOfDays: 1,
            filter: cloneDeep(filter),
        },
        {
            skip: !classroom,
            selectFromResult: result => {
                const { data } = result;
                const { hrUnixTimestampToTimetableClasses = {} } = data || {};

                const statusToNumOfClasses: Partial<Record<Class_status, number>> = {};

                Object.entries(hrUnixTimestampToTimetableClasses).forEach(([_hrTimestamp, timetableClasses]) => {
                    for (const timetableClass of timetableClasses) {
                        const status = timetableClass.class.classStatus;
                        statusToNumOfClasses[status] = (statusToNumOfClasses[status] || 0) + 1;
                    }
                });

                const summaryOfClassStatuses = {
                    present: statusToNumOfClasses['PRESENT'] || 0,
                    suspicious_absence: statusToNumOfClasses['SUSPICIOUS_ABSENCE'] || 0,
                    illegit_absence: statusToNumOfClasses['ILLEGIT_ABSENCE'] || 0,
                    legit_absence: statusToNumOfClasses['LEGIT_ABSENCE'] || 0,
                    makeup: statusToNumOfClasses['MAKEUP'] || 0,
                    changeOfClassroom: statusToNumOfClasses['CHANGE_OF_CLASSROOM'] || 0,
                    trial: statusToNumOfClasses['TRIAL'] || 0,
                    reserved: statusToNumOfClasses['RESERVED'] || 0,
                };

                return { summaryOfClassStatuses };
            },
        }
    );
    const { courseIds } = coursesApi.endpoints.getCourses.useQuery(undefined, {
        selectFromResult: result => {
            const { ids = [] } = result?.data || {};
            return { courseIds: ids };
        },
    });
    const selectedFilterCourseIds = useAppSelector(s => s.student.massTimetablePage.filter.courseIds);

    const dispatch = useDispatch<AppDispatch>();
    const [filterByClassStatusOnPress, setFilterByClassStatusOnPress] = useState<boolean>(false);
    const [filterByCourseOnPress, setFilterByCourseOnPress] = useState<boolean>(false);
    const { data: customHolidaysQuery } = customHolidayApi.endpoints.getCustomHolidays.useQuery();

    const [statuesFilter, setStatuesFilter] = React.useState<StatuesFilter>({
        present: true,
        suspicious_absence: true,
        illegit_absence: true,
        legit_absence: true,
        makeup: true,
        changeOfClassroom: true,
        trial: true,
        reserved: true,
    });

    const onPanelChange = (value: Dayjs, _mode: CalendarProps<Dayjs>['mode']) => {
        onDateChanged(value.startOf('day').toDate());
    };

    const { data: dayTimestampToCount, isLoading: isLoadingDayTimestampToCount } =
        massDailyTimetableApi.endpoints.getTimestampToNumOfClassesQuery.useQuery(
            {
                classRoom: classroom || 'CAUSEWAY_BAY',
            },
            {
                skip: !classroom,
            }
        );

    const statusRow = (props: { updateKey: keyof typeof statuesFilter }) => {
        const { updateKey } = props;
        return (
            <tr>
                <td>
                    <Checkbox
                        onChange={event => {
                            setStatuesFilter(prev => {
                                const newFilter = {
                                    ...prev,
                                    [updateKey]: event.target.checked,
                                };
                                dispatch(
                                    studentSlice.actions.setMassTimetableFilter({
                                        ...newFilter,
                                        courseIds: selectedFilterCourseIds,
                                    })
                                );
                                return newFilter;
                            });
                        }}
                        checked={statuesFilter[updateKey]}
                    />
                </td>
                <td>{statues[updateKey].text}</td>
                <td>
                    <div
                        style={{
                            background: statues[updateKey].color,
                            width: '15px',
                            height: '15px',
                        }}
                    />
                </td>
                <td>({summaryOfClassStatuses[updateKey]})</td>
            </tr>
        );
    };
    const badgeClassname = clsx('rounded-[25%] p-0.25 px-1 h-[17px] flex items-center justify-center text-[10px]');
    return (
        <div
            style={{
                height: 'calc(100vh - 30px)',
                // marginRight: '50px',

                transition: 'width 0.3s ease-in-out',
            }}
        >
            <OverlayScrollbarsComponent
                style={{
                    height: '100%',
                    paddingRight: 30,
                    paddingBottom: '10px',
                    overflowY: 'scroll',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'opacity 0.3s ease-in-out',
                }}
            >
                <div style={{ height: '100%' }}>
                    <ContentContainer className="space-y-2">
                        <div className="flex items-center ml-1 gap-2">
                            <BsCalendar2MonthFill />
                            Calendar
                        </div>
                        <Calendar
                            className="border-1 !border-teal-300 !rounded-sm"
                            fullscreen={false}
                            onPanelChange={onPanelChange}
                            value={dayjs(selectedDate)}
                            onSelect={(date, _) => {
                                if (!classroom) {
                                    return;
                                }
                                const date_ = date.startOf('day').toDate();
                                console.log('this is the date_', date_);
                                onDateChanged(date_);
                            }}
                            cellRender={date => {
                                const count = dayTimestampToCount?.[date.startOf('day').valueOf() + ''] || 0;

                                if (isLoadingDayTimestampToCount) {
                                    return (
                                        <div className="absolute -top-2.5 -right-2.5">
                                            <div className={badgeClassname}>
                                                <CircularProgress color="inherit" size={10} />
                                            </div>
                                        </div>
                                    );
                                }

                                if (count === 0) {
                                    return null;
                                }

                                const isHoliday = customHolidaysQuery?.find(
                                    holiday => holiday.startOfTheDate === date.startOf('day').valueOf()
                                );
                                return (
                                    <div className="absolute -top-2.5 -right-2.5 z-10">
                                        <div
                                            className={clsx(
                                                badgeClassname,
                                                'text-white',
                                                isHoliday ? `bg-red-500 tex-gray-800` : 'bg-emerald-500',
                                                ` border border-white`
                                            )}
                                        >
                                            {count}
                                        </div>
                                    </div>
                                );
                            }}
                            style={{ width: 290 }}
                        />
                    </ContentContainer>
                    <Spacer height={20} />
                    <Sep />
                    <Spacer height={20} />
                    <ContentContainer className="space-y-2 !bg-teal-100 cursor-pointer">
                        <div className="flex items-center text-md gap-2 ml-1">
                            <FaFilter />
                            Filter By
                        </div>
                        {/* Filter by Class Status */}
                        <div>
                            <ContentContainer className="bg-white rounded-sm">
                                <div
                                    onClick={() => {
                                        setFilterByClassStatusOnPress(!filterByClassStatusOnPress);
                                    }}
                                    className="flex items-center gap-2 ml-1"
                                >
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <IoIosArrowForward
                                            style={{
                                                transform: filterByClassStatusOnPress
                                                    ? 'rotate(90deg)'
                                                    : 'rotate(0deg)',
                                                transition: 'transform 0.3s ease-in-out',
                                            }}
                                        />
                                    </div>
                                    <div>Class Status</div>
                                </div>
                                <div
                                    style={{
                                        transition: 'opacity 0.4s ease-in-out',
                                        opacity: filterByClassStatusOnPress ? 1 : 0,
                                    }}
                                >
                                    {filterByClassStatusOnPress && (
                                        <div style={{ width: '<100%>' }}>
                                            <Box
                                                sx={{
                                                    '& table': {
                                                        width: '100%',
                                                    },
                                                    '& td': {
                                                        width: '40px',
                                                        verticalAlign: 'middle',
                                                        textAlign: 'left',
                                                    },
                                                    '& td:nth-child(2)': {
                                                        width: 'unset',
                                                    },
                                                }}
                                                style={{ width: '100%' }}
                                            >
                                                <table>
                                                    <tbody>
                                                        {Object.keys(statuesFilter).map(status => {
                                                            return (
                                                                <React.Fragment key={status}>
                                                                    {statusRow({
                                                                        updateKey: status as keyof typeof statuesFilter,
                                                                    })}
                                                                </React.Fragment>
                                                            );
                                                        })}
                                                    </tbody>
                                                </table>
                                            </Box>
                                        </div>
                                    )}
                                </div>
                            </ContentContainer>
                        </div>
                        {/* Filter by Course */}
                        <ContentContainer className="!bg-white rounded-sm">
                            <div style={{ width: '100%' }}>
                                <div
                                    onClick={() => {
                                        setFilterByCourseOnPress(!filterByCourseOnPress);
                                    }}
                                    className="flex items-center gap-2 ml-1 cursor-pointer"
                                >
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <IoIosArrowForward
                                            style={{
                                                transform: filterByCourseOnPress ? 'rotate(90deg)' : 'rotate(0deg)',
                                                transition: 'transform 0.3s ease-in-out',
                                            }}
                                        />
                                    </div>
                                    <div>Course</div>
                                </div>
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        transition: 'opacity 0.4s ease-in-out',
                                        opacity: filterByCourseOnPress ? 1 : 0,
                                    }}
                                >
                                    {filterByCourseOnPress &&
                                        courseIds?.map(id => {
                                            return <ClassFilterItem key={id} id={id} />;
                                        })}
                                </div>
                            </div>
                        </ContentContainer>
                        {/* <Button type="primary" block onClick={submitConfirmation} className="mt-2">
                            Confirm
                        </Button> */}
                    </ContentContainer>
                    <Spacer height={40} />
                </div>
            </OverlayScrollbarsComponent>
        </div>
    );

    function onDateChanged(date_: Date) {
        if (!classroom) {
            return;
        }
        dispatch(studentSlice.actions.setDailyTimetableSelectedDate({ date: date_ }));
        getFilteredStudentClassesForDailyTimetable({
            classRoom: classroom || 'CAUSEWAY_BAY',
            anchorTimestamp: dayjs(date_).startOf('day').valueOf(),
            filter: JSON.parse(JSON.stringify(filter)),
            numOfDays: 1,
        });
    }
}
