import classnames from 'classnames';
import { ContextMenu, ContextMenuTrigger, MenuItem } from 'react-contextmenu';
import boxShadow from '../constant/boxShadow';
import { Box } from '@mui/material';
import { useAppSelector } from '../redux/hooks';
import DeleteClassForm from './DeleteClassForm';
import DeleteClassDialog from './DeleteClassDialog';
import ViewClassForm from './ViewClassForm';
import ViewClassDialog from './ViewClassDialog';
import StudentClassCard from './StudentClassCard';
import dayjs from 'dayjs';
import useQueryThunk from '../queries/useQueryThunk';
import { StudentThunkAction } from '../redux/slices/studentSlice';

export default function StudentsClassForDailyTimetableByHour(props: {
    dayUnixTimestamp: number;
    currHourUnixTimestamp: number;
}) {
    const { currHourUnixTimestamp, dayUnixTimestamp } = props;
    const classesThisHour =
        useAppSelector(s => s.student.massTimetablePage?.hrUnixTimestampToTimetableClasses?.[currHourUnixTimestamp]) ||
        [];
    const classroom = useAppSelector(s => s.student.massTimetablePage.classRoom);
    const time = dayjs(currHourUnixTimestamp);
    const isFullHour = time.minute() === 0;
    const timeSlotStyle: React.CSSProperties = {
        height: isFullHour ? '2px' : '0',
        opacity: 0.2,
        top: -1,
        width: isFullHour ? '100%' : '0',
        backgroundColor: 'black',
        position: 'absolute',
    };
    const filter = useAppSelector(s => s.student.massTimetablePage.filter);
    const selectedDate = useAppSelector(s => s.student.massTimetablePage.selectedDate);

    const { query } = useQueryThunk({
        thunk: StudentThunkAction.getFilteredStudentClassesForDailyTimetable,
        staleTime: 5000,
        enabled: false,
    })({
        dateUnixTimestamp: dayjs(selectedDate).startOf('day').toDate().getTime(),
        classRoom: classroom || 'CAUSEWAY_BAY',
        filter: filter,
    });

    return (
        <div
            className="daily-class-container"
            style={{
                position: 'relative',
                display: 'flex',
                width: '100%',
                zIndex: 1,
            }}
        >
            <div style={timeSlotStyle} />
            {classesThisHour.map(classEvent => {
                const contextMenuId = `${classEvent?.student.id || ''}-${classEvent?.class.hourUnixTimestamp || ''}`;
                return (
                    <div
                        key={contextMenuId}
                        style={{
                            display: 'flex',
                            justifyContent: 'flex-start',
                            alignItems: 'flex-start',
                            height: '100%',
                            position: 'relative',
                        }}
                    >
                        <div>
                            {/* @ts-expect-error - ignore for context menu incorrect typing*/}
                            <ContextMenuTrigger id={contextMenuId}>
                                <StudentClassCard
                                    dayUnixTimestamp={dayUnixTimestamp}
                                    currHourUnixTimestamp={currHourUnixTimestamp}
                                    classEvent={classEvent}
                                    classminToHeight={min => {
                                        const numOfChunks = min / 15;
                                        return numOfChunks * 35 - 15;
                                    }}
                                />
                            </ContextMenuTrigger>
                            {/* @ts-expect-error - ignore for context menu incorrect typing*/}
                            <ContextMenu id={contextMenuId} style={{ zIndex: 10 ** 7 }}>
                                <Box
                                    sx={{
                                        backgroundColor: 'white',
                                        borderRadius: '8px',
                                        boxShadow: boxShadow.SHADOW_62,
                                        '& .menu-item': {
                                            padding: '10px',
                                            cursor: 'pointer',
                                            '&:hover': {
                                                color: 'rgb(64, 150, 255)',
                                            },
                                            '&.disabled': {
                                                opacity: 0.3,
                                                pointerEvents: 'none',
                                            },
                                        },
                                    }}
                                >
                                    {/* @ts-expect-error - ignore for context menu incorrect typing*/}
                                    <MenuItem
                                        className="menu-item"
                                        onClick={() => {
                                            ViewClassDialog.setContent(() => () => (
                                                <ViewClassForm
                                                    cls={classEvent.class}
                                                    course={classEvent.course}
                                                    student={classEvent.student}
                                                    dateUnixTimestamp={dayUnixTimestamp}
                                                />
                                            ));
                                            ViewClassDialog.setOpen(true);
                                        }}
                                    >
                                        View Class
                                    </MenuItem>
                                    {/* @ts-expect-error - ignore for context menu incorrect typing*/}
                                    <MenuItem
                                        className={classnames('menu-item')}
                                        onClick={() => {
                                            DeleteClassDialog.setWidth('sm');
                                            DeleteClassDialog.setContent(() => () => (
                                                <DeleteClassForm
                                                    classGroup={classEvent.classGroup}
                                                    cls={classEvent.class}
                                                    course={classEvent.course}
                                                    onDeletion={async () => {
                                                        query.refetch();
                                                    }}
                                                />
                                            ));
                                            DeleteClassDialog.setOpen(true);
                                        }}
                                    >
                                        <span style={{ color: 'red' }}>Delete Class</span>
                                    </MenuItem>
                                </Box>
                            </ContextMenu>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
