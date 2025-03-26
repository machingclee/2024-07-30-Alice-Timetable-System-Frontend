import { Outlet } from 'react-router-dom';
import useQueryThunk from '../../queries/useQueryThunk';
import { CourseThunkAction } from '../../redux/slices/courseSlice';
import useMassTimetablePage from '../../hooks/useMassTimetablePage';
import { useEffect } from 'react';
import { useAppDispatch } from '../../redux/hooks';
import studentSlice from '../../redux/slices/studentSlice';

const CausewaybayIndex = () => {
    const dispatch = useAppDispatch();
    useQueryThunk({ thunk: CourseThunkAction.getCourses })();
    useMassTimetablePage('CAUSEWAY_BAY');
    useEffect(() => {
        return () => {
            dispatch(studentSlice.actions.resetMassTimetablerFilter());
        };
    }, [dispatch]);
    return <Outlet />;
};

export default CausewaybayIndex;
