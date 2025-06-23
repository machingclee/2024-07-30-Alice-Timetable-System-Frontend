import { courseApi } from '@/!rtk-query/api/courseApi';
import { useAppDispatch } from '@/redux/hooks';
import studentSlice from '@/redux/slices/studentSlice';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const MassStudentsTimetableIndex = () => {
    const dispatch = useAppDispatch();

    const { courseIds } = courseApi.endpoints.getCourses.useQuery(undefined, {
        selectFromResult: result => {
            const courses = result?.data;
            const courseIds = courses?.ids;
            return { courseIds };
        },
    });
    useEffect(() => {
        dispatch(studentSlice.actions.setFilterCourseIds(courseIds || []));
    }, [courseIds, dispatch]);
    return (
        <>
            <Outlet />
        </>
    );
};

export default MassStudentsTimetableIndex;
