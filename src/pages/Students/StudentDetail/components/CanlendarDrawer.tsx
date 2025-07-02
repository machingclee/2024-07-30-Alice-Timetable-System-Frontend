import { Drawer } from 'antd';
import CalendarView from './CalendarView';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import studentSlice from '@/redux/slices/studentSlice';

const CalendarDrawer = () => {
    const dispatch = useAppDispatch();
    const openCalendar = useAppSelector(s => s.student.studentDetailTimetablePage.openCalendar);
    const setOpenCalendar = (open: boolean) => {
        dispatch(studentSlice.actions.setOpenCalendar(open));
    };
    return (
        <Drawer
            closable
            title={<p>Loading Drawer</p>}
            placement="right"
            open={openCalendar}
            onClose={() => setOpenCalendar(false)}
        >
            <CalendarView />
        </Drawer>
    );
};

export default CalendarDrawer;
