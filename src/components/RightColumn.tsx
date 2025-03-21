import Title from '../components/Title';
import Spacer from '../components/Spacer';
import { useAppSelector } from '../redux/hooks';
import { useDispatch } from 'react-redux';
import Sep from '../components/Sep';
import Label from '../components/Label';
import { Button, Calendar } from 'antd';
import type { CalendarProps } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import studentSlice, { StudentThunkAction } from '../redux/slices/studentSlice';
import timeUtil from '../utils/timeUtil';
import { AppDispatch } from '../redux/store';
import { FilterToGetClassesForDailyTimetableWithoutCourseIds } from '../dto/dto';
import { FaFilter } from 'react-icons/fa';
import Checkbox from '@mui/material/Checkbox';
import colors from '../constant/colors';
import React, { useEffect, useState } from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import ClassFilterItem from './CourseFilterItem';

export default function RightColumn() {
    const classRoom = useAppSelector(s => s.student.massTimetablePage.classRoom);
    const summaryOfClassStatues = useAppSelector(s => s.student.massTimetablePage.summaryOfClassStatuses);
    const courseIds = useAppSelector(s => s.class.courses.ids);
    const filterCourseIds = useAppSelector(s => s.student.massTimetablePage.filter.courseIds);
    const selectedDate = useAppSelector(s => s.student.massTimetablePage.selectedDate);
    const filter = useAppSelector(s => s.student.massTimetablePage.filter);
    const dispatch = useDispatch<AppDispatch>();
    const [filterByClassStatusOnPress, setFilterByClassStatusOnPress] = useState<boolean>(false);
    const [filterByCourseOnPress, setFilterByCourseOnPress] = useState<boolean>(false);

    const [formData, setFormData] = React.useState<FilterToGetClassesForDailyTimetableWithoutCourseIds>({
        present: filter.present,
        suspicious_absence: filter.suspicious_absence,
        illegit_absence: filter.illegit_absence,
        legit_absence: filter.legit_absence,
        makeup: filter.makeup,
        changeOfClassroom: filter.changeOfClassroom,
        trial: filter.trial,
        reserved: filter.reserved,
    });

    const submit = () => {
        if (!classRoom) return;
        dispatch(
            studentSlice.actions.setFilter({
                ...formData,
                courseIds: filterCourseIds,
            })
        );
        const currentTimestamp = dayjs(selectedDate.getTime()).startOf('day').valueOf().toString();
        dispatch(
            StudentThunkAction.getFilteredStudentClassesForDailyTimetable({
                dateUnixTimestamp: currentTimestamp,
                classRoom: classRoom,
                filter: filter,
            })
        );
    };

    const onPanelChange = (value: Dayjs, _mode: CalendarProps<Dayjs>['mode']) => {
        dispatch(
            studentSlice.actions.setDailyTimetableSelectedDate({
                date: value.toDate(),
            })
        );
    };

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    useEffect(() => {
        if (courseIds) {
            dispatch(studentSlice.actions.setCourseFilterItem(courseIds));
        }
    }, [courseIds, dispatch]);

    return (
        <div
            style={{
                marginRight: '50px',
                transition: 'width 0.3s ease-in-out',
            }}
        >
            <div
                style={{
                    height: '100%',
                    paddingBottom: '10px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'opacity 0.3s ease-in-out',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Label label="RightColumn.tsx" offsetTop={0} offsetLeft={-70} />
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
                        dispatch(
                            studentSlice.actions.setDailyTimetableSelectedDate({
                                date: date.toDate(),
                            })
                        );
                        dispatch(
                            StudentThunkAction.getFilteredStudentClassesForDailyTimetable({
                                dateUnixTimestamp: timeUtil.getDayUnixTimestamp(date.toDate().getTime()).toString(),
                                classRoom,
                                filter: {
                                    ...formData,
                                    courseIds: filterCourseIds,
                                },
                            })
                        );
                    }}
                    style={{ width: 290 }}
                />
                <Spacer height={5} />
                <Sep />
                <Spacer height={60} />
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        marginBottom: '30px',
                        marginLeft: '10px',
                        marginTop: '20px',
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
                        <IoIosArrowForward
                            style={{
                                transform: filterByClassStatusOnPress ? 'rotate(90deg)' : 'rotate(0deg)',
                                transition: 'transform 0.3s ease-in-out',
                            }}
                        />
                        <div>Class Status</div>
                    </div>
                    <div
                        style={{
                            transition: 'opacity 0.4s ease-in-out',
                            opacity: filterByClassStatusOnPress ? 1 : 0,
                        }}
                    >
                        {filterByClassStatusOnPress && (
                            <div style={{ height: '100%', width: '100%' }}>
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'flex-start',
                                        alignContent: 'center',
                                        gap: '15px',
                                    }}
                                >
                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'flex-start',
                                        }}
                                    >
                                        <div
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <Checkbox
                                                onChange={event => {
                                                    setFormData(prev => ({
                                                        ...prev,
                                                        present: event.target.checked,
                                                    }));
                                                }}
                                                checked={formData.present}
                                                {...label}
                                            />
                                            Present
                                        </div>
                                        <div
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <Checkbox
                                                onChange={event => {
                                                    setFormData(prev => ({
                                                        ...prev,
                                                        reserved: event.target.checked,
                                                    }));
                                                }}
                                                checked={formData.reserved}
                                                {...label}
                                            />
                                            Reserved
                                        </div>
                                        <div
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <Checkbox
                                                onChange={event => {
                                                    setFormData(prev => ({
                                                        ...prev,
                                                        suspicious_absence: event.target.checked,
                                                    }));
                                                }}
                                                checked={formData.suspicious_absence}
                                                {...label}
                                            />
                                            Suspicious Absence
                                        </div>
                                        <div
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <Checkbox
                                                onChange={event => {
                                                    setFormData(prev => ({
                                                        ...prev,
                                                        illegit_absence: event.target.checked,
                                                    }));
                                                }}
                                                checked={formData.illegit_absence}
                                                {...label}
                                            />
                                            Illegit Absence
                                        </div>
                                        <div
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <Checkbox
                                                onChange={event => {
                                                    setFormData(prev => ({
                                                        ...prev,
                                                        legit_absence: event.target.checked,
                                                    }));
                                                }}
                                                checked={formData.legit_absence}
                                                {...label}
                                            />
                                            Legit Absence
                                        </div>
                                        <div
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <Checkbox
                                                onChange={event => {
                                                    setFormData(prev => ({
                                                        ...prev,
                                                        makeup: event.target.checked,
                                                    }));
                                                }}
                                                checked={formData.makeup}
                                                {...label}
                                            />
                                            Makeup
                                        </div>
                                        <div
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <Checkbox
                                                onChange={event => {
                                                    setFormData(prev => ({
                                                        ...prev,
                                                        trial: event.target.checked,
                                                    }));
                                                }}
                                                checked={formData.trial}
                                                {...label}
                                            />
                                            Trial
                                        </div>
                                        <div
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <Checkbox
                                                onChange={event => {
                                                    setFormData(prev => ({
                                                        ...prev,
                                                        changeOfClassroom: event.target.checked,
                                                    }));
                                                }}
                                                checked={formData.changeOfClassroom}
                                                {...label}
                                            />
                                            Change of Classroom
                                        </div>
                                    </div>
                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            gap: '9px',
                                            marginTop: '12px',
                                        }}
                                    >
                                        <div
                                            style={{
                                                height: '32px',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                marginLeft: '10px',
                                            }}
                                        >
                                            <div
                                                style={{
                                                    background: colors.GREEN_BLUE,
                                                    width: '15px',
                                                    height: '15px',
                                                }}
                                            />
                                        </div>
                                        <div
                                            style={{
                                                height: '32px',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                marginLeft: '10px',
                                            }}
                                        >
                                            <div
                                                style={{
                                                    background: colors.CYAN,
                                                    width: '15px',
                                                    height: '15px',
                                                }}
                                            />
                                        </div>
                                        <div
                                            style={{
                                                height: '32px',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                marginLeft: '10px',
                                            }}
                                        >
                                            <div
                                                style={{
                                                    background: colors.ORANGE,
                                                    width: '15px',
                                                    height: '15px',
                                                }}
                                            />
                                        </div>

                                        <div
                                            style={{
                                                height: '32px',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                marginLeft: '10px',
                                            }}
                                        >
                                            <div
                                                style={{
                                                    background: colors.RED,
                                                    width: '15px',
                                                    height: '15px',
                                                }}
                                            />
                                        </div>
                                        <div
                                            style={{
                                                height: '32px',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                marginLeft: '10px',
                                            }}
                                        >
                                            <div
                                                style={{
                                                    background: colors.GREY,
                                                    width: '15px',
                                                    height: '15px',
                                                }}
                                            />
                                        </div>
                                        <div
                                            style={{
                                                height: '32px',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                marginLeft: '10px',
                                            }}
                                        >
                                            <div
                                                style={{
                                                    background: colors.BLUE,
                                                    width: '15px',
                                                    height: '15px',
                                                }}
                                            />
                                        </div>
                                        <div
                                            style={{
                                                height: '32px',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                marginLeft: '10px',
                                            }}
                                        >
                                            <div
                                                style={{
                                                    background: colors.PINK,
                                                    width: '15px',
                                                    height: '15px',
                                                }}
                                            />
                                        </div>
                                        <div
                                            style={{
                                                height: '32px',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                marginLeft: '10px',
                                            }}
                                        >
                                            <div
                                                style={{
                                                    background: colors.PURPLE,
                                                    width: '15px',
                                                    height: '15px',
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            gap: '9px',
                                            marginTop: '12px',
                                        }}
                                    >
                                        <div
                                            style={{
                                                height: '32px',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                marginLeft: '10px',
                                            }}
                                        >
                                            ({summaryOfClassStatues.present})
                                        </div>
                                        <div
                                            style={{
                                                height: '32px',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                marginLeft: '10px',
                                            }}
                                        >
                                            ({summaryOfClassStatues.reserved})
                                        </div>
                                        <div
                                            style={{
                                                height: '32px',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                marginLeft: '10px',
                                            }}
                                        >
                                            ({summaryOfClassStatues.suspiciousAbsence})
                                        </div>
                                        <div
                                            style={{
                                                height: '32px',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                marginLeft: '10px',
                                            }}
                                        >
                                            ({summaryOfClassStatues.illegitAbsence})
                                        </div>
                                        <div
                                            style={{
                                                height: '32px',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                marginLeft: '10px',
                                            }}
                                        >
                                            ({summaryOfClassStatues.legitAbsence})
                                        </div>
                                        <div
                                            style={{
                                                height: '32px',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                marginLeft: '10px',
                                            }}
                                        >
                                            ({summaryOfClassStatues.makeup})
                                        </div>
                                        <div
                                            style={{
                                                height: '32px',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                marginLeft: '10px',
                                            }}
                                        >
                                            ({summaryOfClassStatues.trial})
                                        </div>
                                        <div
                                            style={{
                                                height: '32px',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                marginLeft: '10px',
                                            }}
                                        >
                                            ({summaryOfClassStatues.changeOfClassroom})
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                {/* Filter by Course */}
                <div style={{ height: '100%', width: '100%' }}>
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
                        <IoIosArrowForward
                            style={{
                                transform: filterByCourseOnPress ? 'rotate(90deg)' : 'rotate(0deg)',
                                transition: 'transform 0.3s ease-in-out',
                            }}
                        />
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
                                return <ClassFilterItem key={id} id={id} />;
                            })}
                    </div>
                    <Button type="primary" block onClick={submit} style={{ marginTop: '10px' }}>
                        Confirm
                    </Button>
                </div>
            </div>
        </div>
    );
}
