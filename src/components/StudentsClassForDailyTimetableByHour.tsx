import classnames from 'classnames';
import { ContextMenu, ContextMenuTrigger, MenuItem } from 'react-contextmenu';
import boxShadow from '../constant/boxShadow';
import { Box } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import DeleteClassForm from './DeleteClassForm';
import DeleteClassDialog from './DeleteClassDialog';
import ViewClassForm from './ViewClassForm';
import ViewClassDialog from './ViewClassDialog';
import StudentClassCard from './StudentClassCard';
import dayjs from 'dayjs';
import useQueryThunk from '../queries/useQueryThunk';
import studentSlice, { StudentThunkAction } from '../redux/slices/studentSlice';
import { useNavigate } from 'react-router-dom';
import RouteEnum from '../enum/RouteEnum';
import appSlice from '../redux/slices/appSlice';
import { Modal } from 'antd';
import { useState } from 'react';
import useAnchorTimestamp from '../hooks/useAnchorTimestamp';
import documentId from '../constant/documentId';
import { Draggable } from './DragAndDrop/Draggable';
import { Droppable } from './DragAndDrop/Droppable';
import { TimetableClassEvent } from '../dto/kotlinDto';
import useRefetchMassTimetables from '../hooks/useRefetchMassTimetables';
import MoveClassWarning from '../pages/Students/components/MoveClassWarning';

export default function StudentsClassForDailyTimetableByHour(props: {
    currHourUnixTimestamp: number;
    rowIndex: number;
}) {
    const [moveClassConfirmationOpen, setMoveClassConfirmationOpen] = useState(false);
    const [classToMove, setClassToMove] = useState<TimetableClassEvent | null>(null);
    const { setURLAnchorTimestamp: setAnchorTimestamp } = useAnchorTimestamp();
    const { currHourUnixTimestamp, rowIndex } = props;
    const dayUnixTimestamp = dayjs(currHourUnixTimestamp).startOf('day').valueOf();
    const [showSwitchStudentDetailPageConfirmation, setShowSwitchStudentDetailPageConfirmation] = useState(false);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const classesThisHour =
        useAppSelector(s => s.student.massTimetablePage?.hrUnixTimestampToTimetableClasses?.[currHourUnixTimestamp]) ||
        [];
    const classroom = useAppSelector(s => s.student.massTimetablePage.classRoom);
    const selectedAnchorDate = useAppSelector(s => s.student.massTimetablePage.selectedDate);
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

    const { invalidation: invalidateFilteredClasses } = useQueryThunk({
        thunk: StudentThunkAction.getFilteredStudentClassesForDailyTimetable,
        staleTime: 5000,
        enabled: false,
    })({
        anchorTimestamp: dayjs(selectedDate).startOf('day').toDate().getTime(),
        classRoom: classroom || 'CAUSEWAY_BAY',
        filter: filter,
    });

    const { refetchMassTimetableAnchoredAt } = useRefetchMassTimetables();

    const moveClass = async (fromClass: TimetableClassEvent) => {
        try {
            await dispatch(
                StudentThunkAction.moveStudentEvent({
                    fromClassEvent: fromClass,
                    toDayTimestamp: String(dayjs(currHourUnixTimestamp).startOf('day').valueOf()),
                    toHourTimestamp: String(currHourUnixTimestamp),
                })
            ).unwrap();
        } finally {
            refetchMassTimetableAnchoredAt(selectedAnchorDate.getTime());
        }
    };

    const onValidDrop = async (fromClass: TimetableClassEvent) => {
        if (fromClass.classGroup) {
            setClassToMove(fromClass);
            setMoveClassConfirmationOpen(true);
        } else {
            await moveClass(fromClass);
        }
    };

    const moveConfirmationModel = () => {
        return (
            <Modal
                centered
                closable={false}
                onCancel={() => setMoveClassConfirmationOpen(false)}
                open={moveClassConfirmationOpen}
                onOk={() => {
                    if (!classToMove) {
                        return;
                    }
                    try {
                        moveClass(classToMove);
                    } finally {
                        setMoveClassConfirmationOpen(false);
                    }
                }}
            >
                <MoveClassWarning classToMove={classToMove} />
            </Modal>
        );
    };

    return (
        <div style={{ position: 'relative' }}>
            <div style={{ ...timeSlotStyle }} />
            <Droppable
                isValidMove={(_: TimetableClassEvent) => true}
                onValidDrop={onValidDrop}
                className="daily-class-container"
                style={{
                    background: 'red',
                    position: 'relative',
                    display: 'flex',
                    width: '100%',
                    height: '100%',
                }}
            >
                {classesThisHour.map((classEvent, index) => {
                    const contextMenuId = `${classEvent?.student.id || ''}-${classEvent?.class.hourUnixTimestamp || ''}`;
                    return (
                        <Draggable
                            style={{
                                left: index * 100 + (rowIndex % 2) * 20,
                                // zIndex: currHourUnixTimestamp,
                            }}
                            canDrag={new Date().getTime() < currHourUnixTimestamp}
                            data={classEvent}
                            key={classEvent.class.id}
                        >
                            <div
                                key={contextMenuId}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                    alignItems: 'flex-start',
                                    height: '100%',
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
                                                    ViewClassDialog.setWidth('xs');
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
                                                View class detail
                                            </MenuItem>
                                            {/* @ts-expect-error - ignore for context menu incorrect typing*/}
                                            <MenuItem
                                                className="menu-item"
                                                onClick={() => setShowSwitchStudentDetailPageConfirmation(true)}
                                            >
                                                View from student package
                                            </MenuItem>
                                            <Modal
                                                closable={false}
                                                okText={'I do'}
                                                onOk={() => {
                                                    const { student, studentPackage } = classEvent;

                                                    navigate(`${RouteEnum.DASHBOARD_STUDENTS}/${student.id}`);
                                                    setTimeout(() => {
                                                        dispatch(appSlice.actions.setLoading(true));
                                                    }, 1000);
                                                    setTimeout(() => {
                                                        dispatch(
                                                            studentSlice.actions.setSelectedPackageId({
                                                                packageId: studentPackage.id + '',
                                                                desiredAnchorTimestamp:
                                                                    classEvent.class.dayUnixTimestamp,
                                                                setURLAnchorTimestamp: setAnchorTimestamp,
                                                            })
                                                        );
                                                        document
                                                            .querySelector(
                                                                `#${documentId.STUDENT_PACKAGE_ID(classEvent.studentPackage.id + '')}`
                                                            )
                                                            ?.scrollIntoView({ block: 'start' });
                                                        dispatch(appSlice.actions.setLoading(false));
                                                    }, 1500);
                                                }}
                                                onCancel={() => setShowSwitchStudentDetailPageConfirmation(false)}
                                                onClose={() => setShowSwitchStudentDetailPageConfirmation(false)}
                                                centered
                                                open={showSwitchStudentDetailPageConfirmation}
                                            >
                                                <div>Do you want to switch to student detail page?</div>
                                            </Modal>
                                            {/* @ts-expect-error - ignore for context menu incorrect typing*/}
                                            <MenuItem
                                                className={classnames('menu-item')}
                                                onClick={() => {
                                                    DeleteClassDialog.setWidth('sm');
                                                    DeleteClassDialog.setContent(() => () => (
                                                        <DeleteClassForm
                                                            deleteSingleClass={false}
                                                            classGroup={classEvent.classGroup}
                                                            cls={classEvent.class}
                                                            course={classEvent.course}
                                                            onDeletion={async () => {
                                                                invalidateFilteredClasses();
                                                            }}
                                                        />
                                                    ));
                                                    DeleteClassDialog.setOpen(true);
                                                }}
                                            >
                                                <span style={{ color: 'red' }}>Delete a class</span>
                                            </MenuItem>
                                            {/* @ts-expect-error - ignore for context menu incorrect typing*/}
                                            <MenuItem
                                                className={classnames('menu-item')}
                                                onClick={() => {
                                                    DeleteClassDialog.setWidth('sm');
                                                    DeleteClassDialog.setContent(() => () => (
                                                        <DeleteClassForm
                                                            deleteSingleClass={false}
                                                            classGroup={classEvent.classGroup}
                                                            cls={classEvent.class}
                                                            course={classEvent.course}
                                                            onDeletion={async () => {
                                                                invalidateFilteredClasses();
                                                            }}
                                                        />
                                                    ));
                                                    DeleteClassDialog.setOpen(true);
                                                }}
                                            >
                                                <span style={{ color: 'red' }}>Delete a group of classes</span>
                                            </MenuItem>
                                        </Box>
                                    </ContextMenu>
                                </div>
                            </div>
                        </Draggable>
                    );
                })}
                {moveConfirmationModel()}
            </Droppable>
        </div>
    );
}
