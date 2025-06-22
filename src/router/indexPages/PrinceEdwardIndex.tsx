import { useAppDispatch } from '@/redux/hooks';
import studentSlice from '@/redux/slices/studentSlice';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const PrinceEdwardIndex = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(studentSlice.actions.setClassroom('PRINCE_EDWARD'));
    }, [dispatch]);

    return <Outlet />;
};

export default PrinceEdwardIndex;
