import { useRef } from 'react';
import PrintButton, { PrintHandler } from '../PrintButton';
import RefreshDailyTimetableButton from '../RefreshDailyTimetableButton';
import DailyTimetable from './DailyTimetable';
import DuplicateClassDialog from '../DuplicateClassDialog';
import ViewClassDialog from '../ViewClassDialog';
import DeleteClassDialog from '../DeleteClassDialog';
import AddClassEventDialog from '../AddClassEventDialog';
import MoveConfirmationDialog from '../../pages/Students/components/MoveConfirmationDialog';
import Spacer from '../Spacer';

const PrintableDailyTable = (props: { date: Date; dayOffset: number }) => {
    const { date, dayOffset } = props;
    const printButtonRef = useRef<PrintHandler>(null);
    return (
        <>
            <Spacer />
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
                <DailyTimetable printButtonRef={printButtonRef} date={date} dayOffset={dayOffset} />
            </div>
            <DuplicateClassDialog.render />
            <ViewClassDialog.render />
            <DeleteClassDialog.render />
            <AddClassEventDialog.render />
            <MoveConfirmationDialog.render />
        </>
    );
};

export default PrintableDailyTable;
