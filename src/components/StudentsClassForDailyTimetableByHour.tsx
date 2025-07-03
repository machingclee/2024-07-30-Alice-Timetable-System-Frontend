import { useAppSelector } from '../redux/hooks';
import DeleteClassForm from './DeleteClassForm';
import DeleteClassDialog from './DeleteClassDialog';
import ViewClassForm from './ViewClassForm';
import ViewClassDialog from './ViewClassDialog';
import StudentClassCard from './StudentClassCard';
import dayjs from 'dayjs';
import { studentApi } from '../!rtk-query/api/studentApi';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import RouteEnum from '../enum/RouteEnum';
import { Modal } from 'antd';
import { useState } from 'react';
import { Draggable } from './DragAndDrop/Draggable';
import { Droppable } from './DragAndDrop/Droppable';
import { ClassRoom, TimetableLesson } from '../dto/kotlinDto';
import MoveClassWarning from '../pages/Students/components/MoveClassWarning';
import { AliceMenu } from './AliceMenu';
import { useChangeStatusMenuItem } from '@/pages/Students/components/StudentClassForWeeklyTimetableCell';

export default function StudentsClassForDailyTimetableByHour(props: {
    currHourUnixTimestamp: number;
    rowIndex: number;
}) {
    const [moveClassConfirmationOpen, setMoveClassConfirmationOpen] = useState(false);
    const numOfDays = useAppSelector(s => s.student.massTimetablePage.numOfDaysToDisplay);
    const [classToMove, setClassToMove] = useState<TimetableLesson | null>(null);
    const selectedDate = useAppSelector(s => s.student.massTimetablePage.selectedDate);
    const filter = useAppSelector(s => s.student.massTimetablePage.filter);
    const classroom = useAppSelector(s => s.student.massTimetablePage.classRoom);
    const { currHourUnixTimestamp, rowIndex } = props;
    const dayUnixTimestamp = dayjs(currHourUnixTimestamp).startOf('day').valueOf();
    const [showSwitchStudentDetailPageConfirmation, setShowSwitchStudentDetailPageConfirmation] = useState(false);
    const navigate = useNavigate();
    const [detachFromGroup] = studentApi.endpoints.detachFromGroup.useMutation();

    const { classesThisHour } = studentApi.endpoints.getFilteredStudentClassesForDailyTimetable.useQuery(
        {
            anchorTimestamp: dayjs(selectedDate).startOf('day').valueOf(),
            numOfDays,
            classRoom: classroom as ClassRoom,
            filter: JSON.parse(JSON.stringify(filter)),
        },
        {
            selectFromResult: result => {
                const classesThisHour = result.data?.hrUnixTimestampToTimetableClasses[currHourUnixTimestamp];
                return { classesThisHour };
            },
        }
    );

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

    const { refetch: refetchMassTimetableAnchoredAt } =
        studentApi.endpoints.getFilteredStudentClassesForDailyTimetable.useQuery(
            {
                anchorTimestamp: dayjs(selectedDate).startOf('day').valueOf(),
                classRoom: classroom as ClassRoom,
                filter: JSON.parse(JSON.stringify(filter)),
                numOfDays: 1,
            },
            { skip: !classroom }
        );

    // use moveStudentEvent API
    const [moveStudentEvent] = studentApi.endpoints.moveStudentEvent.useMutation();

    const moveClass = async (fromClass: TimetableLesson) => {
        await moveStudentEvent({
            fromClassEvent: fromClass,
            toDayTimestamp: String(dayjs(currHourUnixTimestamp).startOf('day').valueOf()),
            toHourTimestamp: String(currHourUnixTimestamp),
        }).unwrap();
    };

    const onValidDrop = async (fromClass: TimetableLesson) => {
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
                isValidMove={(_: TimetableLesson) => true}
                onValidDrop={onValidDrop}
                className="daily-class-container"
                style={{
                    position: 'relative',
                    display: 'flex',
                    width: '100%',
                    height: '100%',
                }}
            >
                {classesThisHour?.map((classEvent, index) => {
                    const contextMenuId = `${classEvent?.student.id || ''}-${classEvent?.class.hourUnixTimestamp || ''}`;
                    return (
                        <DraggableCell
                            index={index}
                            rowIndex={rowIndex}
                            currHourUnixTimestamp={currHourUnixTimestamp}
                            classEvent={classEvent}
                            contextMenuId={contextMenuId}
                            dayUnixTimestamp={dayUnixTimestamp}
                            detachFromGroup={detachFromGroup as unknown as DetachFromGroupFn}
                            setShowSwitchStudentDetailPageConfirmation={setShowSwitchStudentDetailPageConfirmation}
                            refetchMassTimetableAnchoredAt={refetchMassTimetableAnchoredAt}
                            navigate={navigate}
                            showSwitchStudentDetailPageConfirmation={showSwitchStudentDetailPageConfirmation}
                        />
                    );
                })}
                {moveConfirmationModel()}
            </Droppable>
        </div>
    );
}

type DetachFromGroupFn = (props: { classId: number; studentId: string }) => { unwrap: () => Promise<void> };

function DraggableCell(props: {
    index: number;
    rowIndex: number;
    currHourUnixTimestamp: number;
    classEvent: TimetableLesson;
    contextMenuId: string;
    dayUnixTimestamp: number;
    detachFromGroup: DetachFromGroupFn;
    setShowSwitchStudentDetailPageConfirmation: React.Dispatch<React.SetStateAction<boolean>>;
    refetchMassTimetableAnchoredAt: () => void;
    navigate: NavigateFunction;
    showSwitchStudentDetailPageConfirmation: boolean;
}) {
    const {
        index,
        rowIndex,
        currHourUnixTimestamp,
        classEvent,
        contextMenuId,
        dayUnixTimestamp,
        detachFromGroup,
        setShowSwitchStudentDetailPageConfirmation,
        refetchMassTimetableAnchoredAt,
        navigate,
        showSwitchStudentDetailPageConfirmation,
    } = props;
    const item = useChangeStatusMenuItem({ lesson: classEvent });
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
                                item: 'Detach from group',
                                disabled: classEvent.classGroup === null,
                                onClick: async () => {
                                    await detachFromGroup({
                                        classId: classEvent.class.id,
                                        studentId: classEvent.student.id,
                                    }).unwrap();
                                },
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
                                                refetchMassTimetableAnchoredAt();
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
                                                refetchMassTimetableAnchoredAt();
                                            }}
                                        />
                                    ));
                                    DeleteClassDialog.setOpen(true);
                                },
                            },
                            item,
                        ]}
                    >
                        <Modal
                            closable={false}
                            okText={'I do'}
                            onOk={() => {
                                const { student, studentPackage } = classEvent;
                                navigate(
                                    `${RouteEnum.DASHBOARD_STUDENTS}/${student.id}?packageId=${studentPackage.id}&anchorTimestamp=${classEvent.class.dayUnixTimestamp}`
                                );
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
                            lesson={classEvent}
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
}
