import { IoMdArrowBack } from 'react-icons/io';
import SectionTitle from '../../components/SectionTitle';
import DailyTimetable from '../../components/DailyTimetable/DailyTimetable';
import { Button } from 'antd';
import Spacer from '../../components/Spacer';
import RightColumn from '../../components/RightColumn';
import { useNavigate } from 'react-router-dom';
import DuplicateClassDialog from '../../components/DuplicateClassDialog';
import ViewClassDialog from '../../components/ViewClassDialog';
import DeleteClassDialog from '../../components/DeleteClassDialog';
import AddClassEventDialog from '../../components/AddClassEventDialog';
import { useEffect, useRef } from 'react';
import studentSlice from '../../redux/slices/studentSlice';
import { useAppDispatch } from '../../redux/hooks';
import { CourseThunkAction } from '../../redux/slices/courseSlice';
import PrintButton, { PrintHandler } from '../../components/PrintButton';

export default function CausewayBayTimetable() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const printButtonRef = useRef<PrintHandler>(null);

    useEffect(() => {
        dispatch(studentSlice.actions.setClassroom('CAUSEWAY_BAY'));
        dispatch(CourseThunkAction.getCourses());
    }, [dispatch]);

    useEffect(() => {
        return () => {
            dispatch(studentSlice.actions.reset());
        };
    }, [dispatch]);

    return (
        <div
            style={{
                marginLeft: '10px',
                marginRight: '50px',
                height: '100%',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <div style={{ width: '100%', display: 'flex' }}>
                <div style={{ width: '100%' }}>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <SectionTitle>
                            <Button
                                shape="circle"
                                onClick={() => {
                                    navigate(-1);
                                }}
                            >
                                <IoMdArrowBack />
                            </Button>
                            <Spacer height={1} />
                            Causeway Bay Daily Timetable
                        </SectionTitle>
                        <PrintButton ref={printButtonRef} />
                    </div>
                    <div
                        style={{
                            height: 'calc(100vh - 70px)',
                            overflow: 'hidden',
                        }}
                    >
                        <DailyTimetable printButtonRef={printButtonRef} />
                    </div>
                </div>
                <Spacer />
                <RightColumn />
            </div>
            {/* <MoveConfirmationDialog.render /> */}
            <DuplicateClassDialog.render />
            <ViewClassDialog.render />
            <DeleteClassDialog.render />
            <AddClassEventDialog.render />
        </div>
    );
}
