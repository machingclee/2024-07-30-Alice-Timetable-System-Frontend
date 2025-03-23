import Title from '../components/Title';
import Spacer from '../components/Spacer';
import { useAppSelector } from '../redux/hooks';
import { useDispatch } from 'react-redux';
import Sep from '../components/Sep';
import { Button, Calendar } from 'antd';
import type { CalendarProps } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import studentSlice, { StudentThunkAction } from '../redux/slices/studentSlice';
import { AppDispatch } from '../redux/store';
import { StatuesFilter } from '../dto/dto';
import { FaFilter } from 'react-icons/fa';
import Checkbox from '@mui/material/Checkbox';
import React, { useEffect, useState } from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import ClassFilterItem from './CourseFilterItem';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import { Box } from '@mui/material';
import statues from '../constant/statues';

export default function RightColumn() {
    const classRoom = useAppSelector(s => s.student.massTimetablePage.classRoom);
    const summaryOfClassStatues = useAppSelector(s => s.student.massTimetablePage.summaryOfClassStatuses);
    const courseIds = useAppSelector(s => s.class.courses.ids);
    const selectedDate = useAppSelector(s => s.student.massTimetablePage.selectedDate);
    const dispatch = useDispatch<AppDispatch>();
    const [filterByClassStatusOnPress, setFilterByClassStatusOnPress] = useState<boolean>(false);
    const [filterByCourseOnPress, setFilterByCourseOnPress] = useState<boolean>(false);

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
    const [selectedCourseIds, setSelectedCourseIds] = useState<number[]>([]);

    const submit = () => {
        if (!classRoom) return;
        const newFilter = {
            ...statuesFilter,
            courseIds: selectedCourseIds,
        };
        dispatch(studentSlice.actions.setMassTimetableFilter(newFilter));
        const currentTimestamp = dayjs(selectedDate.getTime()).startOf('day').valueOf();
        dispatch(
            StudentThunkAction.getFilteredStudentClassesForDailyTimetable({
                dateUnixTimestamp: currentTimestamp,
                classRoom: classRoom,
                filter: newFilter,
            })
        );
    };

    const onPanelChange = (value: Dayjs, _mode: CalendarProps<Dayjs>['mode']) => {
        onDateChanged(value.startOf('day').toDate());
    };

    useEffect(() => {
        if (courseIds) {
            dispatch(studentSlice.actions.setCourseIds(courseIds));
            setSelectedCourseIds(courseIds);
        }
    }, [courseIds, dispatch]);

    const statusRow = (props: { updateKey: keyof typeof statuesFilter }) => {
        const { updateKey } = props;
        return (
            <tr>
                <td>
                    <Checkbox
                        onChange={event => {
                            setStatuesFilter(prev => ({
                                ...prev,
                                [updateKey]: event.target.checked,
                            }));
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
                <td>({summaryOfClassStatues[updateKey]})</td>
            </tr>
        );
    };

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
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Title>Calendar</Title>
                    </div>
                    <Calendar
                        fullscreen={false}
                        onPanelChange={onPanelChange}
                        value={dayjs(selectedDate)}
                        onSelect={(date, _) => {
                            if (!classRoom) {
                                return;
                            }
                            const date_ = date.startOf('day').toDate();
                            onDateChanged(date_);
                        }}
                        style={{ width: 290 }}
                    />
                    <Spacer height={20} />
                    <Sep />
                    <Spacer height={20} />
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            marginBottom: '30px',
                            marginLeft: '10px',
                            fontSize: 19,
                            fontWeight: 'bold',
                        }}
                    >
                        <FaFilter />
                        <Spacer width={5} /> Filter By
                    </div>
                    {/* Filter by Class Status */}
                    <div style={{ marginBottom: '20px' }}>
                        <div
                            onClick={() => {
                                setFilterByClassStatusOnPress(!filterByClassStatusOnPress);
                            }}
                            style={{
                                marginLeft: '10px',
                                display: 'flex',
                                gap: '15px',
                                fontSize: 18,
                                fontWeight: 500,
                                cursor: 'pointer',
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <IoIosArrowForward
                                    style={{
                                        transform: filterByClassStatusOnPress ? 'rotate(90deg)' : 'rotate(0deg)',
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
                    </div>
                    {/* Filter by Course */}
                    <div style={{ width: '100%' }}>
                        <div
                            onClick={() => {
                                setFilterByCourseOnPress(!filterByCourseOnPress);
                            }}
                            style={{
                                marginLeft: '10px',
                                display: 'flex',
                                gap: '15px',
                                fontSize: 18,
                                fontWeight: 500,
                                cursor: 'pointer',
                            }}
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
                                marginTop: '10px',
                                transition: 'opacity 0.4s ease-in-out',
                                opacity: filterByCourseOnPress ? 1 : 0,
                            }}
                        >
                            {filterByCourseOnPress &&
                                courseIds?.map(id => {
                                    return (
                                        <ClassFilterItem key={id} id={id} setSelectedCourseIds={setSelectedCourseIds} />
                                    );
                                })}
                        </div>
                        <Spacer />
                        <Button type="primary" block onClick={submit} style={{ marginTop: '10px' }}>
                            Confirm
                        </Button>
                        <Spacer height={40} />
                    </div>
                </div>
            </OverlayScrollbarsComponent>
        </div>
    );

    function onDateChanged(date_: Date) {
        dispatch(studentSlice.actions.setDailyTimetableSelectedDate({ date: date_ }));
        dispatch(studentSlice.actions.updateFilterDate(date_));
    }
}
