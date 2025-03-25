import { IoMdArrowBack } from 'react-icons/io';
import SectionTitle from '../../components/SectionTitle';
import DailyTimetable from '../../components/DailyTimetable/DailyTimetable';
import { Button, Select } from 'antd';
import Spacer from '../../components/Spacer';
import RightColumn from '../../components/RightColumn';
import { useNavigate } from 'react-router-dom';
import DuplicateClassDialog from '../../components/DuplicateClassDialog';
import ViewClassDialog from '../../components/ViewClassDialog';
import DeleteClassDialog from '../../components/DeleteClassDialog';
import AddClassEventDialog from '../../components/AddClassEventDialog';
import { useEffect, useRef, useState } from 'react';
import studentSlice from '../../redux/slices/studentSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import PrintButton, { PrintHandler } from '../../components/PrintButton';
import RefreshDailyTimetableButton from '../../components/RefreshDailyTimetableButton';
import dayjs from 'dayjs';

export default function CausewayBayTimetable() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [numOfDayToDisplay, setNumOfDayToDisplay] = useState(1);
    const selectedDate = useAppSelector(s => s.student.massTimetablePage.selectedDate);
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
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Button
                    shape="circle"
                    onClick={() => {
                        navigate(-1);
                    }}
                >
                    <IoMdArrowBack />
                </Button>
                <Spacer height={1} />
                <SectionTitle>Causeway Bay Daily Timetable</SectionTitle>
                <Spacer />
                <Select
                    title="Number of Day to Display"
                    dropdownStyle={{ zIndex: 10 ** 4 }}
                    style={{ width: 80 }}
                    defaultValue={1}
                    onChange={value => setNumOfDayToDisplay(value)}
                    options={[1, 2].map(num => ({ label: num, value: num }))}
                />
                <Spacer width={7} />
                {`day${numOfDayToDisplay > 1 ? 's' : ''}`}
            </div>
            <div style={{ width: '100%', display: 'flex' }}>
                <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap' }}>
                    {Array(numOfDayToDisplay)
                        .fill(null)
                        .map((_, dayOffset) => {
                            return (
                                <div style={{ flex: 1 }}>
                                    <PrintableDailyTable date={dayjs(selectedDate).add(dayOffset, 'day').toDate()} />
                                </div>
                            );
                        })}
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

const PrintableDailyTable = (props: { date: Date }) => {
    const { date } = props;
    const printButtonRef = useRef<PrintHandler>(null);
    return (
        <>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                <div></div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <RefreshDailyTimetableButton />
                    <PrintButton ref={printButtonRef} />
                </div>
            </div>
            <div
                style={{
                    height: 'calc(100vh - 90px)',
                    overflow: 'hidden',
                }}
            >
                <DailyTimetable printButtonRef={printButtonRef} date={date} />
            </div>
        </>
    );
};
