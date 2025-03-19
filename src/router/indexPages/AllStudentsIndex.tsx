import { useEffect } from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { CourseThunkAction } from '../../redux/slices/courseSlice';
import studentSlice, { StudentThunkAction } from '../../redux/slices/studentSlice';
import { Outlet } from 'react-router-dom';

const AllStudentsIndex = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(CourseThunkAction.getCourses());
        dispatch(StudentThunkAction.getStudents());
        return () => {
            dispatch(studentSlice.actions.reset());
        };
    }, [dispatch]);

    return (
        <>
            <Outlet />
        </>
    );
};

export default AllStudentsIndex;
