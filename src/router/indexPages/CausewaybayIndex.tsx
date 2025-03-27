import { Outlet } from 'react-router-dom';
import { CourseThunkAction } from '../../redux/slices/courseSlice';
import useMassTimetablePage from '../../hooks/useMassTimetablePage';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import studentSlice, { StudentThunkAction } from '../../redux/slices/studentSlice';
import dayjs from 'dayjs';

const CausewaybayIndex = () => {
    const dispatch = useAppDispatch();
    const filter = useAppSelector(s => s.student.massTimetablePage.filter);
    useMassTimetablePage('CAUSEWAY_BAY');

    useEffect(() => {
        return () => {
            dispatch(studentSlice.actions.resetMassTimetablerFilter());
        };
    }, [dispatch]);

    useEffect(() => {
        dispatch(CourseThunkAction.getCourses())
            .unwrap()
            .then(result => {
                const courseIds = result.map(r => r.id);
                dispatch(
                    StudentThunkAction.getFilteredStudentClassesForDailyTimetable({
                        classRoom: 'CAUSEWAY_BAY',
                        anchorTimestamp: dayjs(new Date()).startOf('day').toDate().getTime(),
                        numOfDays: 1,
                        filter: { ...filter, courseIds },
                    })
                ).unwrap();
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return <Outlet />;
};

export default CausewaybayIndex;
