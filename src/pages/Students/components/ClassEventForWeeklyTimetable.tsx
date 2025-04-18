import classnames from 'classnames';
import dayjs from 'dayjs';
import boxShadow from '../../../constant/boxShadow';
import { Box } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import AddClassEventDialog from '../../../components/AddClassEventDialog';
import AddClassEventForm from '../../../components/AddClassEventForm';
import { PropsWithChildren, useCallback, useEffect, useState } from 'react';
import DeleteClassForm from '../../../components/DeleteClassForm';
import DeleteClassDialog from '../../../components/DeleteClassDialog';
import DuplicateClassDialog from '../../../components/DuplicateClassDialog';
import DuplicateClassForm from '../../../components/DuplicateClassForm';
import studentSlice, { StudentThunkAction } from '../../../redux/slices/studentSlice';
import colors from '../../../constant/colors';
import Label from '../../../components/Label';
import ViewClassDialog from '../../../components/ViewClassDialog';
import ViewClassForm from '../../../components/ViewClassForm';
import { Classroom } from '../../../prismaTypes/types';
import { Droppable } from '../../../components/DragAndDrop/Droppable';
import { Draggable } from '../../../components/DragAndDrop/Draggable';
import { Class_status, TimetableClassEvent as TimetableClassEvent } from '../../../dto/kotlinDto';
import MoveConfirmationForm from './MoveConfirmationForm';
import MoveConfirmationDialog from './MoveConfirmationDialog';
import useGetStudentIdFromParam from '../../../hooks/useGetStudentIdFromParam';
import classNames from 'classnames';
import useAnchorTimestamp from '../../../hooks/useAnchorTimestamp';
import { AliceMenu } from '@/components/AliceMenu';
import getColorForClassStatus from '@/utils/getColorForClassStatus';
import getDisplayNameFromClassStatus from '@/utils/getDisplayNameFromClassStatus';

export default function StudentClassForWeeklyTimetable(props: {
    dayUnixTimestamp: number;
    hourUnixTimestamp: number;
    colIndex: number;
    rowIndex: number;
}) {
    const dispatch = useAppDispatch();
    const { setURLAnchorTimestamp } = useAnchorTimestamp();
    const { studentId } = useGetStudentIdFromParam();
    const selectedPackageId = useAppSelector(s => s.student.studentDetailTimetablePage.selectedPackageId);
    const {
        hourUnixTimestamp: currGridHourUnixTimestamp,
        dayUnixTimestamp: currGridDayUnixTimestamp,
        colIndex,
        rowIndex,
    } = props;
    const classEvent = useAppSelector(
        s =>
            s.student.studentDetailTimetablePage.weeklyClassEvent?.hrUnixTimestampToClassEvent?.[
                String(currGridHourUnixTimestamp)
            ]
    );
    const showLabel = classEvent != null;
    if (classEvent) {
        console.log('studentClassstudentClass', classEvent);
    }
    const showAll = useAppSelector(s => s.student.studentDetailTimetablePage.showAllClassesForOneStudent);
    const timetable = useAppSelector(s => s.student.studentDetailTimetablePage.weeklyClassEvent);
    const [classNumber, setClassNumber] = useState<number>(0);
    const [classEventHeight, setClassEventHeight] = useState<number | null>(null);

    const { dayUnixTimestamp: day_unix_timestamp = 0, hourUnixTimestamp: classUnixTimestamp = 0 } =
        classEvent?.class || {};
    const { id: class_group_id } = classEvent?.classGroup || {};
    const hasDuplicationGroup = class_group_id != null;
    const createEvent = () => {
        AddClassEventDialog.setWidth('sm');
        AddClassEventDialog.setContent(() => () => (
            <AddClassEventForm
                dayUnixTimestamp={currGridDayUnixTimestamp}
                hourUnixTimestamp={currGridHourUnixTimestamp}
                studentId={studentId || ''}
            />
        ));
        AddClassEventDialog.setOpen(true);
    };

    const invalidData = day_unix_timestamp >= classUnixTimestamp;
    const hasClassEvent = !!classEvent;
    const dayAndTime = dayjs(currGridHourUnixTimestamp).format('ddd, HH:mm');
    const disableDuplicate = classEvent?.classGroup != null;
    // To adjust place a thick line to indicate the hour unit
    const groupedLabel = () => {
        if (!hasDuplicationGroup) {
            return null;
        }
        return (
            <div
                style={{
                    padding: '2px 5px',
                    fontSize: 12,
                    color: 'white',
                    backgroundColor: 'rgba(0,0,0,0.35)',
                    backdropFilter: 'brightness(90%) saturate(200%) hue-rotate(-20deg)',
                }}
            >
                Grouped
            </div>
        );
    };
    // eslint-disable-next-line
    const ClassEventWrapper = useCallback(
        !hasClassEvent
            ? ({ children }: PropsWithChildren) => (
                  <AliceMenu
                      items={[
                          {
                              item: !selectedPackageId
                                  ? 'Please First Select a Package'
                                  : `Add class(es) at ${dayAndTime}`,
                              onClick: () => createEvent(),
                          },
                      ]}
                  >
                      {children}
                  </AliceMenu>
              )
            : ({ children }: PropsWithChildren) => children,
        [classEvent, selectedPackageId]
    );

    const updateClassStatus = (status: Class_status) => {
        const cls = classEvent?.class;
        if (cls?.classNumber && cls?.min && cls?.actualClassroom) {
            dispatch(
                StudentThunkAction.updateClass({
                    class_status: status,
                    classId: cls?.id,
                    min: cls?.min,
                    reason_for_absence: '',
                    remark: cls?.remark ? cls?.remark : '',
                    actual_classroom: cls?.actualClassroom as Classroom,
                })
            )
                .unwrap()
                .then(() => {
                    if (!classEvent) {
                        return;
                    }
                    dispatch(
                        StudentThunkAction.getStudentClassesForWeeklyTimetable({
                            studentId: classEvent.student.id,
                        })
                    );
                    dispatch(
                        StudentThunkAction.getStudentPackages({
                            studentId: classEvent.student.id,
                        })
                    );
                });
        }
    };
    // To account for the numbering of classes
    useEffect(() => {
        if (classEvent && timetable.hrUnixTimestampToClassEvent) {
            let currentClassNumber = 0;

            const sortedClasses = Object.values(timetable.hrUnixTimestampToClassEvent).sort((a, b) => {
                return a.class.hourUnixTimestamp - b.class.hourUnixTimestamp;
            });

            sortedClasses.forEach(item => {
                const classStatus = item.class.classStatus;
                if (
                    item.course.courseName === classEvent.course.courseName &&
                    (classStatus === 'PRESENT' || classStatus === 'MAKEUP' || classStatus === 'ILLEGIT_ABSENCE')
                ) {
                    currentClassNumber++;
                    if (item.class.hourUnixTimestamp === classEvent.class.hourUnixTimestamp) {
                        setClassNumber(currentClassNumber);
                    }
                }
            });
        }
    }, [classEvent, timetable.hrUnixTimestampToClassEvent]);

    const onValidDrop = async (fromClassEvent: TimetableClassEvent) => {
        const move = async () => {
            try {
                await dispatch(
                    StudentThunkAction.moveStudentEvent({
                        fromClassEvent,
                        toDayTimestamp: String(currGridDayUnixTimestamp),
                        toHourTimestamp: String(currGridHourUnixTimestamp),
                    })
                ).unwrap();
            } finally {
                dispatch(StudentThunkAction.getStudentClassesForWeeklyTimetable({ studentId }));
                dispatch(StudentThunkAction.getStudentPackages({ studentId }));
                MoveConfirmationDialog.setOpen(false);
            }
        };
        if (fromClassEvent.classGroup) {
            MoveConfirmationDialog.setWidth('sm');
            MoveConfirmationDialog.setContent(() => () => <MoveConfirmationForm moveClassesAction={move} />);
            MoveConfirmationDialog.setOpen(true);
        } else {
            await move();
        }
    };

    const isInTheFuture = () => (classEvent?.class?.hourUnixTimestamp || 0) >= new Date().getTime();
    const getHeight = () => {
        return classEventHeight || 1.35 * (classEvent?.class.min || 0) - 10;
    };

    return (
        <Droppable
            className={classNames('draggable-container')}
            style={{
                position: 'relative',
            }}
            isValidMove={(_data: TimetableClassEvent) => {
                return true;
            }}
            onValidDrop={onValidDrop}
        >
            {showLabel && <Label label="StudentClassForWeeklyTimetable.tsx" />}
            {/* we translate the current cell and print the time in HH:mm format to avoid unnecessarily difficult calculation of height */}
            {colIndex === 0 && rowIndex % 2 === 0 && (
                <div
                    style={{
                        transform: 'translateY(50%)',
                        position: 'absolute',
                        top: 'calc(-100% - 3px)',
                        left: -60,
                        fontSize: 14,
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <div
                        style={{
                            backgroundColor: 'white',
                            boxShadow: boxShadow.SHADOW_62,
                            padding: '0px 8px',
                            borderRadius: 8,
                        }}
                    >
                        {rowIndex === 0 && <Label label="time!" offsetLeft={10} offsetTop={-5} />}
                        {dayjs(currGridHourUnixTimestamp).format('HH:mm')}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', color: 'rgb(150,150,150)' }}>--</div>
                </div>
            )}
            {/* wrapper: simply return null when no classEvent is found: */}
            <ClassEventWrapper>
                {/* Place a thick line to indicate the hour unit */}
                <div className={classnames('grid-hour')}>
                    <div
                        style={{
                            borderTop:
                                rowIndex > 0 && (rowIndex + 0) % 4 === 0 ? '1px solid rgba(0,0,0,0.4)' : 'inherit',
                            display: 'flex',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            height: '100%',
                            position: 'relative',
                        }}
                    >
                        {/* Control what to show on the entire timetable */}
                        {(showAll || (!showAll && Number(selectedPackageId) === classEvent?.studentPackage.id)) &&
                            classEvent && (
                                <>
                                    <Draggable
                                        // eslint-disable-next-line
                                        data={classEvent!!}
                                        key={classEvent?.class.id}
                                        canDrag={!!classEvent && isInTheFuture()}
                                    >
                                        <AliceMenu
                                            items={[
                                                {
                                                    item: 'View class detail',
                                                    onClick: () => {
                                                        ViewClassDialog.setContent(() => () => (
                                                            <ViewClassForm
                                                                dateUnixTimestamp={classEvent.class.dayUnixTimestamp}
                                                                cls={classEvent.class}
                                                                course={classEvent.course}
                                                                student={classEvent.student}
                                                            />
                                                        ));
                                                        ViewClassDialog.setOpen(true);
                                                    },
                                                },
                                                {
                                                    item: 'Edit class',
                                                    onClick: () => {
                                                        ViewClassDialog.setWidth('xs');
                                                        ViewClassDialog.setContent(() => () => (
                                                            <ViewClassForm
                                                                isEditing={true}
                                                                dateUnixTimestamp={classEvent.class.dayUnixTimestamp}
                                                                cls={classEvent.class}
                                                                course={classEvent.course}
                                                                student={classEvent.student}
                                                            />
                                                        ));
                                                        ViewClassDialog.setOpen(true);
                                                    },
                                                },
                                                {
                                                    item: 'Duplicate class',
                                                    disabled: disableDuplicate || !classEvent,
                                                    onClick: () => {
                                                        if (!classEvent?.class) {
                                                            return;
                                                        }
                                                        DuplicateClassDialog.setWidth('xs');
                                                        DuplicateClassDialog.setContent(() => () => (
                                                            <DuplicateClassForm class={classEvent?.class} />
                                                        ));
                                                        DuplicateClassDialog.setOpen(true);
                                                    },
                                                },
                                                {
                                                    item: 'Detach from group',
                                                    disabled: !disableDuplicate,
                                                    onClick: async () => {
                                                        await dispatch(
                                                            StudentThunkAction.detachFromGroup({
                                                                classId: classEvent.class.id,
                                                            })
                                                        ).unwrap();
                                                    },
                                                },
                                                {
                                                    item: 'Delete a class',
                                                    onClick: () => {
                                                        DeleteClassDialog.setWidth('xs');
                                                        DeleteClassDialog.setContent(() => () => (
                                                            <DeleteClassForm
                                                                deleteSingleClass={true}
                                                                classGroup={classEvent.classGroup}
                                                                cls={classEvent.class}
                                                                course={classEvent.course}
                                                                onDeletion={async () => {
                                                                    const studentId = classEvent.student.id;
                                                                    dispatch(
                                                                        StudentThunkAction.getStudentClassesForWeeklyTimetable(
                                                                            {
                                                                                studentId: studentId,
                                                                            }
                                                                        )
                                                                    );
                                                                    dispatch(
                                                                        StudentThunkAction.getStudentPackages({
                                                                            studentId: studentId,
                                                                        })
                                                                    );
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
                                                                    const studentId = classEvent.student.id;
                                                                    dispatch(
                                                                        StudentThunkAction.getStudentClassesForWeeklyTimetable(
                                                                            {
                                                                                studentId: studentId,
                                                                            }
                                                                        )
                                                                    );
                                                                    dispatch(
                                                                        StudentThunkAction.getStudentPackages({
                                                                            studentId: studentId,
                                                                        })
                                                                    );
                                                                }}
                                                            />
                                                        ));
                                                        DeleteClassDialog.setOpen(true);
                                                    },
                                                },
                                                {
                                                    item: (
                                                        <div>
                                                            <div>Change Status</div>
                                                            <div className="flex items-center gap-2">
                                                                <span
                                                                    style={{
                                                                        color: getColorForClassStatus(
                                                                            classEvent.class.classStatus
                                                                        ),
                                                                    }}
                                                                >
                                                                    {
                                                                        getDisplayNameFromClassStatus[
                                                                            classEvent.class.classStatus
                                                                        ]
                                                                    }
                                                                </span>
                                                                <div
                                                                    style={{
                                                                        background: getColorForClassStatus(
                                                                            classEvent.class.classStatus
                                                                        ),
                                                                        width: '15px',
                                                                        height: '15px',
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                    ),
                                                    subItems: Object.keys(getDisplayNameFromClassStatus).map(
                                                        status => ({
                                                            disabled: classEvent.class.classStatus === status,
                                                            item: <StatusLabel status={status as Class_status} />,
                                                            onClick: () => updateClassStatus(status as Class_status),
                                                        })
                                                    ),
                                                },
                                            ]}
                                        >
                                            <Box
                                                onDoubleClick={() => {
                                                    dispatch(
                                                        studentSlice.actions.setSelectedPackageId({
                                                            packageId: classEvent.studentPackage.id + '',
                                                            setURLAnchorTimestamp: setURLAnchorTimestamp,
                                                            desiredAnchorTimestamp: classEvent.class.hourUnixTimestamp,
                                                        })
                                                    );
                                                }}
                                                sx={{
                                                    '&:hover': { cursor: 'pointer' },
                                                }}
                                                onMouseEnter={() => {
                                                    setClassEventHeight(120);
                                                }}
                                                onMouseLeave={() => {
                                                    setClassEventHeight(null);
                                                }}
                                                style={{
                                                    border: classEvent
                                                        ? selectedPackageId === classEvent.studentPackage.id + ''
                                                            ? `1px solid ${colors.ORANGE}`
                                                            : '1px solid rgba(0,0,0,0.2)'
                                                        : '',
                                                    position: 'absolute',
                                                    boxShadow: classEvent
                                                        ? selectedPackageId === classEvent.studentPackage.id + ''
                                                            ? boxShadow.SHADOW_25
                                                            : boxShadow.SHADOW_62
                                                        : '',
                                                    transition: 'height 0.18s ease-in-out',
                                                    zIndex: classEventHeight ? 10 ** 7 : 10 ** 5,
                                                    overflow: 'hidden',
                                                    top: 5,
                                                    left: 5,
                                                    width: 'calc(100% - 20px)',
                                                    height: getHeight(),
                                                    filter: isInTheFuture() ? '' : 'grayscale(90%) brightness(120%)',
                                                    backgroundColor: (() => {
                                                        if (!classEvent) {
                                                            return '';
                                                        }
                                                        if (invalidData) {
                                                            return 'red';
                                                        } else {
                                                            switch (classEvent?.class.classStatus) {
                                                                case 'PRESENT':
                                                                    return colors.GREEN_BLUE;
                                                                case 'TRIAL':
                                                                    return colors.PINK;
                                                                case 'RESERVED':
                                                                    return colors.CYAN;
                                                                case 'SUSPICIOUS_ABSENCE':
                                                                    return colors.ORANGE;
                                                                case 'ILLEGIT_ABSENCE':
                                                                    return colors.RED;
                                                                case 'LEGIT_ABSENCE':
                                                                    return colors.GREY;
                                                                case 'MAKEUP':
                                                                    return colors.BLUE;
                                                                case 'CHANGE_OF_CLASSROOM':
                                                                    return colors.PURPLE;
                                                                case 'BAD_WHETHER':
                                                                    return colors.BLACK;
                                                            }
                                                        }
                                                    })(),
                                                    borderRadius: 4,
                                                    fontSize: 14,
                                                    color: 'white',
                                                    textAlign: 'center',
                                                }}
                                                key={currGridHourUnixTimestamp}
                                            >
                                                <div
                                                    style={{
                                                        position: 'relative',
                                                    }}
                                                >
                                                    {/* <div
                                                        style={{
                                                            position: 'absolute',
                                                            top: 0,
                                                            left: 0,
                                                            height: getHeight(),
                                                            transition: 'height 0.18s ease-in-out',
                                                            width: '100%',
                                                      
                                                        }}
                                                    ></div> */}
                                                    {showLabel && groupedLabel()}
                                                    <div
                                                        style={{
                                                            padding: 4,
                                                        }}
                                                    >
                                                        {classEvent?.course.courseName}
                                                    </div>
                                                    {classNumber !== 0 && (
                                                        <div
                                                            style={{
                                                                marginTop: 5,
                                                                paddingTop: 5,
                                                                paddingBottom: 5,
                                                                marginLeft: 10,
                                                                width: '80%',
                                                                backgroundColor: 'white',
                                                                color: 'black',
                                                                borderRadius: '5px',
                                                                display: 'flex',
                                                                justifyContent: 'center',
                                                                alignItems: 'center',
                                                            }}
                                                        >
                                                            Class: {classNumber}
                                                        </div>
                                                    )}
                                                </div>
                                            </Box>
                                        </AliceMenu>
                                    </Draggable>
                                </>
                            )}
                    </div>
                </div>
            </ClassEventWrapper>
        </Droppable>
    );
}

function StatusLabel(props: { status: Class_status }) {
    const status = props.status;
    return (
        <div
            className="gap-4 flex justify-between items-center"
            style={{
                width: '100%',
            }}
        >
            <span>{getDisplayNameFromClassStatus[status]}</span>
            <div
                style={{
                    background: getColorForClassStatus(status),
                    width: '15px',
                    height: '15px',
                }}
            />
        </div>
    );
}
