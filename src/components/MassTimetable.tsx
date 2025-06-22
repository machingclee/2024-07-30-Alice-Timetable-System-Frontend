import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import studentSlice from '../redux/slices/studentSlice';
import { Button, Select } from 'antd';
import { IoMdArrowBack } from 'react-icons/io';
import SectionTitle from './SectionTitle';
import PrintableDailyTable from './DailyTimetable/PrintableDailyTable';
import Spacer from './Spacer';
import RightColumn from './RightColumn';
import dayjs from 'dayjs';

export default function MassTimetable(props: { timetableName: string }) {
    const { timetableName } = props;
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const classRoom = useAppSelector(s => s.student.massTimetablePage.classRoom);
    const numOfDaysToDisplay = useAppSelector(s => s.student.massTimetablePage.numOfDaysToDisplay);
    const setNumOfDayToDisplay = (numOfDays: number) => {
        dispatch(studentSlice.actions.seMassTimetableNumOfDaysToDisplay(numOfDays));
    };
    const selectedDate = useAppSelector(s => s.student.massTimetablePage.selectedDate);

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
            className="space-y-2"
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <Button
                        shape="circle"
                        onClick={() => {
                            navigate(-1);
                        }}
                    >
                        <IoMdArrowBack />
                    </Button>
                    <Spacer height={1} />
                    <SectionTitle>{timetableName}</SectionTitle>
                    <Spacer />
                    <Select
                        title="Number of Day to Display"
                        dropdownStyle={{ zIndex: 10 ** 4 }}
                        style={{ width: 80 }}
                        defaultValue={1}
                        onChange={value => {
                            setNumOfDayToDisplay(value);
                            if (!classRoom) {
                                return;
                            }
                        }}
                        options={[1, 2, 3].map(num => ({ label: num, value: num }))}
                    />
                    <Spacer width={7} />
                    {`day${numOfDaysToDisplay > 1 ? 's' : ''}`}
                </div>
            </div>
            <div style={{ width: '100%', display: 'flex' }}>
                <div className="w-full flex gap-2 grid-cols-3">
                    {Array(numOfDaysToDisplay)
                        .fill(null)
                        .map((_, dayOffset) => {
                            return (
                                <div style={{ flex: 1 }} key={dayOffset}>
                                    <PrintableDailyTable
                                        date={dayjs(selectedDate).add(dayOffset, 'day').toDate()}
                                        dayOffset={dayOffset}
                                    />
                                </div>
                            );
                        })}
                </div>
                <Spacer />
                <RightColumn />
            </div>
        </div>
    );
}
