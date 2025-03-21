import classnames from 'classnames';
import dayjs from 'dayjs';
import { ContextMenu, ContextMenuTrigger, MenuItem } from 'react-contextmenu';
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
import { StudentThunkAction } from '../../../redux/slices/studentSlice';
import colors from '../../../constant/colors';
import Label from '../../../components/Label';
import ViewClassDialog from '../../../components/ViewClassDialog';
import ViewClassForm from '../../../components/ViewClassForm';
import { Class_status, Classroom } from '../../../prismaTypes/types';
import { Droppable } from '../../../components/DragAndDrop/Droppable';
import { Draggable } from '../../../components/DragAndDrop/Draggable';
import { TimetableClassEvent as TimetableClassEvent } from '../../../dto/kotlinDto';
import { store } from '../../../redux/store';
import MoveConfirmationForm from './MoveConfirmationForm';
import MoveConfirmationDialog from './MoveConfirmationDialog';
import useGetStudentIdFromParam from '../../../hooks/useGetStudentIdFromParam';
import classNames from 'classnames';

export default function StudentClassForWeeklyTimetable(props: {
    dayUnixTimestamp: number;
    hourUnixTimestamp: number;
    colIndex: number;
    rowIndex: number;
}) {
    const dispatch = useAppDispatch();
    const { studentId } = useGetStudentIdFromParam();
    const selectedPackageId = useAppSelector(s => s.student.studentDetailTimetablePage.selectedPackageId);
    const {
        hourUnixTimestamp: currGridHourUnixTimestamp,
        dayUnixTimestamp: currGridDayUnixTimestamp,
        colIndex,
        rowIndex,
    } = props;
    const [classStatusMenuOptionsExpand, setClassStatusMenuOptionsExpand] = useState<boolean>(false);
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
    const contextMenuId = `${classEvent?.student.id || ''}-${classEvent?.class.hourUnixTimestamp || ''}`;
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
            ? ({ children }: PropsWithChildren) => {
                  return (
                      <>
                          {/*@ts-expect-error - context menu has problem in typing */}
                          <ContextMenuTrigger id={currGridHourUnixTimestamp.toString()}>{children}</ContextMenuTrigger>
                          {/*@ts-expect-error - context menu has problem in typing */}
                          <ContextMenu
                              id={currGridHourUnixTimestamp.toString()}
                              style={{
                                  zIndex: 10 ** 7,
                                  borderRadius: 8,
                                  backgroundColor: 'white',
                                  boxShadow: boxShadow.SHADOW_62,
                              }}
                          >
                              <Box
                                  sx={{
                                      '& .menu-item': {
                                          padding: '10px',
                                          cursor: 'pointer',
                                          color: !selectedPackageId ? 'rgb(200,200,200) !important' : 'inherit',
                                          '&:hover': {
                                              '&:hover': {
                                                  color: 'rgb(64, 150, 255)',
                                              },
                                          },
                                      },
                                  }}
                              >
                                  {/*@ts-expect-error - context menu has problem in typing */}
                                  <MenuItem
                                      className="menu-item"
                                      disabled={!selectedPackageId}
                                      onClick={() => {
                                          createEvent();
                                      }}
                                  >
                                      {!selectedPackageId
                                          ? 'Please First Select a Package'
                                          : `Add Class(es) at ${dayAndTime}`}
                                  </MenuItem>
                              </Box>
                          </ContextMenu>
                      </>
                  );
              }
            : ({ children }: PropsWithChildren) => children,
        [classEvent, selectedPackageId]
    );

    const updateClassStatusHandle = (status: Class_status) => {
        const cls = classEvent?.class;
        console.log('studentClass?.class_number:', cls?.classNumber);
        console.log('studentClass?.min:', cls?.min);
        console.log('studentClass?.remark:', cls?.remark);
        console.log('studentClass?.actual_classroom:', cls?.actualClassroom);
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
        const fromClassEventHrUnixTimestamp = fromClassEvent.hourUnixTimestamp;
        const fromClz =
            store.getState().student.studentDetailTimetablePage.weeklyClassEvent.hrUnixTimestampToClassEvent?.[
                fromClassEventHrUnixTimestamp
            ];
        if (!fromClz) {
            return;
        }
        const move = async () => {
            try {
                await dispatch(
                    StudentThunkAction.moveStudentEvent({
                        fromHourTimestamp: String(fromClassEventHrUnixTimestamp),
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
        if (fromClz?.classGroup) {
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
                        top: 'calc(-100% - 2px)',
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
                        {(showAll || (!showAll && Number(selectedPackageId) === classEvent?.package.id)) &&
                            classEvent && (
                                <>
                                    {/*@ts-expect-error - context menu has problem in typing */}
                                    <ContextMenuTrigger id={contextMenuId}>
                                        <Draggable
                                            // eslint-disable-next-line
                                            data={classEvent!!}
                                            key={classEvent?.class.id}
                                            canDrag={!!classEvent && isInTheFuture()}
                                        >
                                            <Box
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
                                                    border: classEvent ? '1px solid rgba(0,0,0,0.2)' : '',
                                                    position: 'absolute',
                                                    boxShadow: classEvent ? boxShadow.SHADOW_62 : '',
                                                    transition: 'height 0.18s ease-in-out',
                                                    zIndex: classEventHeight ? 10 ** 7 : 10 ** 5,
                                                    overflow: 'hidden',
                                                    top: 5,
                                                    left: 5,
                                                    width: 'calc(100% - 20px)',
                                                    height: getHeight(),
                                                    filter: isInTheFuture() ? '' : 'grayscale(80%) brightness(120%)',
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
                                                <div style={{ position: 'relative' }}>
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
                                        </Draggable>
                                    </ContextMenuTrigger>
                                    {/*@ts-expect-error - context menu has problem in typing */}
                                    <ContextMenu
                                        id={contextMenuId}
                                        style={{
                                            zIndex: 10 ** 7 + 1,
                                        }}
                                    >
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
                                            {/*@ts-expect-error - context menu has problem in typing */}
                                            <MenuItem
                                                className="menu-item"
                                                onClick={() => {
                                                    ViewClassDialog.setContent(() => () => (
                                                        <ViewClassForm classEvent={classEvent} />
                                                    ));
                                                    ViewClassDialog.setOpen(true);
                                                }}
                                            >
                                                View Class
                                            </MenuItem>
                                            {/*@ts-expect-error - context menu has problem in typing */}
                                            <MenuItem
                                                className="menu-item"
                                                onClick={() => {
                                                    ViewClassDialog.setWidth('xs');
                                                    ViewClassDialog.setContent(() => () => (
                                                        <ViewClassForm isEditing={true} classEvent={classEvent} />
                                                    ));
                                                    ViewClassDialog.setOpen(true);
                                                }}
                                            >
                                                Edit Class
                                            </MenuItem>
                                            {/*@ts-expect-error - context menu has problem in typing */}
                                            <MenuItem
                                                disabled={disableDuplicate || !classEvent}
                                                className={classnames('menu-item', disableDuplicate ? 'disabled' : '')}
                                                onClick={() => {
                                                    if (!classEvent?.class) {
                                                        return;
                                                    }
                                                    DuplicateClassDialog.setWidth('xs');
                                                    DuplicateClassDialog.setContent(() => () => (
                                                        <DuplicateClassForm class={classEvent?.class} />
                                                    ));
                                                    DuplicateClassDialog.setOpen(true);
                                                }}
                                            >
                                                Duplicate Class
                                            </MenuItem>
                                            {disableDuplicate && (
                                                <>
                                                    {/*@ts-expect-error - context menu has problem in typing */}
                                                    <MenuItem
                                                        className={classnames('menu-item')}
                                                        onClick={async () => {
                                                            await dispatch(
                                                                StudentThunkAction.detachFromGroup({
                                                                    classId: classEvent.class.id,
                                                                })
                                                            ).unwrap();
                                                        }}
                                                    >
                                                        Detach from Group
                                                    </MenuItem>
                                                </>
                                            )}
                                            {/*@ts-expect-error - context menu has problem in typing */}
                                            <MenuItem
                                                className={classnames('menu-item')}
                                                onClick={() => {
                                                    DeleteClassDialog.setContent(() => () => (
                                                        <DeleteClassForm classEvent={classEvent} />
                                                    ));
                                                    DeleteClassDialog.setOpen(true);
                                                }}
                                            >
                                                <span
                                                    style={{
                                                        color: 'red',
                                                    }}
                                                >
                                                    Delete Class
                                                </span>
                                            </MenuItem>
                                            <div
                                                className={classnames('menu-item')}
                                                onClick={() => {
                                                    setClassStatusMenuOptionsExpand(!classStatusMenuOptionsExpand);
                                                }}
                                            >
                                                <span
                                                    style={{
                                                        color: 'yellowgreen',
                                                    }}
                                                >
                                                    Change Status
                                                </span>
                                            </div>
                                            <div
                                                style={{
                                                    height: '1px',
                                                    opacity: 0.1,
                                                    backgroundColor: 'black',
                                                }}
                                            />
                                            <div
                                                style={{
                                                    transition:
                                                        'width 0.7s ease-in-out, ' + 'max-height 0.5s ease-in-out',
                                                    overflow: 'hidden',
                                                    maxHeight: classStatusMenuOptionsExpand ? '500px' : '0px',
                                                    width: classStatusMenuOptionsExpand ? '150px' : '0px',
                                                }}
                                            >
                                                {classStatusMenuOptionsExpand && (
                                                    <>
                                                        {/*@ts-expect-error - context menu has problem in typing */}
                                                        <MenuItem
                                                            className={classnames('menu-item')}
                                                            onClick={() => {
                                                                updateClassStatusHandle('PRESENT');
                                                            }}
                                                        >
                                                            <div
                                                                style={{
                                                                    display: 'flex',
                                                                    justifyContent: 'space-between',
                                                                }}
                                                            >
                                                                <span>Present</span>
                                                                <div
                                                                    style={{
                                                                        background: colors.GREEN_BLUE,
                                                                        width: '15px',
                                                                        height: '15px',
                                                                    }}
                                                                />
                                                            </div>
                                                        </MenuItem>
                                                        {/*@ts-expect-error - context menu has problem in typing */}
                                                        <MenuItem
                                                            className={classnames('menu-item')}
                                                            onClick={() => {
                                                                updateClassStatusHandle('SUSPICIOUS_ABSENCE');
                                                            }}
                                                        >
                                                            <div
                                                                style={{
                                                                    display: 'flex',
                                                                    justifyContent: 'space-between',
                                                                    alignItems: 'center',
                                                                }}
                                                            >
                                                                <span>Suspicious Absence</span>
                                                                <div
                                                                    style={{
                                                                        background: colors.ORANGE,
                                                                        width: '15px',
                                                                        height: '15px',
                                                                    }}
                                                                />
                                                            </div>
                                                        </MenuItem>
                                                        {/*@ts-expect-error - context menu has problem in typing */}
                                                        <MenuItem
                                                            className={classnames('menu-item')}
                                                            onClick={() => {
                                                                updateClassStatusHandle('ILLEGIT_ABSENCE');
                                                            }}
                                                        >
                                                            <div
                                                                style={{
                                                                    display: 'flex',
                                                                    justifyContent: 'space-between',
                                                                }}
                                                            >
                                                                <span>Illegit Absence</span>
                                                                <div
                                                                    style={{
                                                                        background: colors.RED,
                                                                        width: '15px',
                                                                        height: '15px',
                                                                    }}
                                                                />
                                                            </div>
                                                        </MenuItem>
                                                        {/*@ts-expect-error - context menu has problem in typing */}
                                                        <MenuItem
                                                            className={classnames('menu-item')}
                                                            onClick={() => {
                                                                updateClassStatusHandle('LEGIT_ABSENCE');
                                                            }}
                                                        >
                                                            <div
                                                                style={{
                                                                    display: 'flex',
                                                                    justifyContent: 'space-between',
                                                                }}
                                                            >
                                                                <span>Legit Absence</span>
                                                                <div
                                                                    style={{
                                                                        background: colors.GREY,
                                                                        width: '15px',
                                                                        height: '15px',
                                                                    }}
                                                                />
                                                            </div>
                                                        </MenuItem>
                                                        {/*@ts-expect-error - context menu has problem in typing */}
                                                        <MenuItem
                                                            className={classnames('menu-item')}
                                                            onClick={() => {
                                                                updateClassStatusHandle('MAKEUP');
                                                            }}
                                                        >
                                                            <div
                                                                style={{
                                                                    display: 'flex',
                                                                    justifyContent: 'space-between',
                                                                }}
                                                            >
                                                                <span>Makeup</span>
                                                                <div
                                                                    style={{
                                                                        background: colors.BLUE,
                                                                        width: '15px',
                                                                        height: '15px',
                                                                    }}
                                                                />
                                                            </div>
                                                        </MenuItem>
                                                    </>
                                                )}
                                            </div>
                                        </Box>
                                    </ContextMenu>
                                </>
                            )}
                    </div>
                </div>
            </ClassEventWrapper>
        </Droppable>
    );
}
