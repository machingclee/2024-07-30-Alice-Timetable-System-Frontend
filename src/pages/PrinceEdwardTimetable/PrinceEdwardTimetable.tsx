import { IoMdArrowBack } from 'react-icons/io';
import SectionTitle from '../../components/SectionTitle';
import DailyTimetable from '../../components/DailyTimetable/DailyTimetable';
import Label from '../../components/Label';
import { Button } from 'antd';
import Spacer from '../../components/Spacer';
import { useNavigate } from 'react-router-dom';
import DuplicateClassDialog from '../../components/DuplicateClassDialog';
import ViewClassDialog from '../../components/ViewClassDialog';
import DeleteClassDialog from '../../components/DeleteClassDialog';
import AddClassEventDialog from '../../components/AddClassEventDialog';
import PrintButton, { PrintHandler } from '../../components/PrintButton';
import RightColumn from '../../components/RightColumn';
import { useRef } from 'react';

export default function PrinceEdwardTimetable() {
    const navigate = useNavigate();
    const printButtonRef = useRef<PrintHandler>(null);

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
                            <Label label="PrinceEdwardTimetable.tsx" offsetTop={-20} />
                            <Button
                                shape="circle"
                                onClick={() => {
                                    navigate(-1);
                                }}
                            >
                                <IoMdArrowBack />
                            </Button>
                            <Spacer height={1} />
                            Prince Edward Daily Timetable
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
