import { useAppDispatch } from '@/redux/hooks';
import studentSlice from '@/redux/slices/studentSlice';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const CausewaybayIndex = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(studentSlice.actions.setClassroom('CAUSEWAY_BAY'));
    }, [dispatch]);

    return <Outlet />;
};

export default CausewaybayIndex;
