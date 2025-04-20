import { useAppDispatch, useAppSelector } from '../redux/hooks';
import DeleteClassForm from './DeleteClassForm';
import DeleteClassDialog from './DeleteClassDialog';
import ViewClassForm from './ViewClassForm';
import ViewClassDialog from './ViewClassDialog';
import StudentClassCard from './StudentClassCard';
import dayjs from 'dayjs';
import useQueryThunk from '../reactQueries/useQueryThunk';
import studentSlice, { StudentThunkAction } from '../redux/slices/studentSlice';
import { useNavigate } from 'react-router-dom';
import RouteEnum from '../enum/RouteEnum';
import appSlice from '../redux/slices/appSlice';
import { Modal } from 'antd';
import { useState } from 'react';
import useAnchorTimestamp from '../hooks/useAnchorTimestamp';
import { Draggable } from './DragAndDrop/Draggable';
import { Droppable } from './DragAndDrop/Droppable';
import { TimetableClassEvent } from '../dto/kotlinDto';
import useRefetchMassTimetables from '../hooks/useRefetchMassTimetables';
import MoveClassWarning from '../pages/Students/components/MoveClassWarning';
import { AliceMenu } from './AliceMenu';

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
        <div style={{ position: 'relative', background: 'white', width: '100%', height: '100%' }}>
            <div style={{ ...timeSlotStyle }} />
            <Droppable
                isValidMove={(_: TimetableClassEvent) => true}
                onValidDrop={onValidDrop}
                className="daily-class-container"
                style={{
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
                                width: 160,
                                // background: 'red',
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
                                    <AliceMenu
                                        items={[
                                            {
                                                item: 'View class detail',
                                                onClick: () => {
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
                                                },
                                            },
                                            {
                                                item: 'View from student package',
                                                onClick: () => setShowSwitchStudentDetailPageConfirmation(true),
                                            },
                                            {
                                                item: 'Delete a class',
                                                onClick: () => {
                                                    DeleteClassDialog.setWidth('xs');
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
                                                },
                                            },
                                            {
                                                item: 'Delete a group of classes',
                                                onClick: () => {
                                                    DeleteClassDialog.setWidth('xs');
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
                                                },
                                            },
                                        ]}
                                    >
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
                                                            desiredAnchorTimestamp: classEvent.class.dayUnixTimestamp,
                                                            setURLAnchorTimestamp: setAnchorTimestamp,
                                                        })
                                                    );
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
                                        <StudentClassCard
                                            dayUnixTimestamp={dayUnixTimestamp}
                                            currHourUnixTimestamp={currHourUnixTimestamp}
                                            classEvent={classEvent}
                                            classminToHeight={min => {
                                                const numOfChunks = min / 15;
                                                return numOfChunks * 35 - 13;
                                            }}
                                        />
                                    </AliceMenu>
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
