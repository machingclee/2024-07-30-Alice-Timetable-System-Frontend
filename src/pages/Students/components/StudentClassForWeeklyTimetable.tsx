import { Draggable } from 'react-beautiful-dnd';
import classnames from 'classnames';
import dayjs from 'dayjs';
import { ContextMenu, ContextMenuTrigger, MenuItem } from 'react-contextmenu';
import boxShadow from '../../../constant/boxShadow';
import { Box } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { useParams } from 'react-router-dom';
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

export default function StudentClassForWeeklyTimetable(props: {
    dayUnixTimestamp: number;
    hourUnixTimestamp: number;
    activeDraggableId: string;
    colIndex: number;
}) {
    const dispatch = useAppDispatch();
    const selectedPackageId = useAppSelector(s => s.student.studentDetailTimetablePage.selectedPackageId);
    const { activeDraggableId, hourUnixTimestamp, colIndex, dayUnixTimestamp } = props;
    const { studentId } = useParams<{ studentId: string }>();
    const hours = useAppSelector(s => s.student.studentDetailTimetablePage.weeklyTimetable?.hrUnixTimestamps);
    const [classStatusMenuOptionsExpand, setClassStatusMenuOptionsExpand] = useState<boolean>(false);
    const targetHit = hours?.includes(String(hourUnixTimestamp));
    if (targetHit) {
        console.log('targetHit', hourUnixTimestamp, hours);
    }
    const classEvent = useAppSelector(
        s =>
            s.student.studentDetailTimetablePage.weeklyTimetable?.hrUnixTimestampToClassEvent?.[
                String(hourUnixTimestamp)
            ]
    );
    if (classEvent) {
        console.log('studentClassstudentClass', classEvent);
    }
    const showAll = useAppSelector(s => s.student.studentDetailTimetablePage.showAllClassesForOneStudent);
    const timetable = useAppSelector(s => s.student.studentDetailTimetablePage.weeklyTimetable);
    const [classNumber, setClassNumber] = useState<number>(0);
    const [classEventHeight, setClassEventHeight] = useState<number | null>(null);

    const { dayUnixTimestamp: day_unix_timestamp = 0, hourUnixTimestamp: classUnixTimestamp = 0 } =
        classEvent?.class || {};
    const { id: class_group_id } = classEvent?.classGroup || {};
    const hasDuplicationGroup = class_group_id != null;
    const disableDraggable = !(classEvent != null);
    const createEvent = () => {
        AddClassEventDialog.setContent(() => () => (
            <AddClassEventForm
                dayUnixTimestamp={dayUnixTimestamp}
                hourUnixTimestamp={hourUnixTimestamp}
                studentId={studentId || ''}
            />
        ));
        AddClassEventDialog.setOpen(true);
    };

    const invalidData = day_unix_timestamp >= classUnixTimestamp;
    const contextMenuId = `${classEvent?.student.id || ''}-${classEvent?.class.hourUnixTimestamp || ''}`;
    const rightClickable = !(classEvent != null);
    const dayAndTime = dayjs(hourUnixTimestamp).format('ddd, HH:mm');
    const disableDuplicate = classEvent?.classGroup != null;
    // To adjust place a thick line to indicate the hour unit
    const time = dayjs(hourUnixTimestamp);
    const isFullHour = time.minute() === 0;
    const timeSlotStyle: React.CSSProperties = {
        height: isFullHour ? '2px' : '0',
        opacity: 0.2,
        top: -2,
        width: '100%',
        backgroundColor: 'black',
        position: 'absolute',
    };

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
    const TimeslotWrapper = useCallback(
        rightClickable
            ? ({ children }: PropsWithChildren) => {
                  return (
                      <>
                          {/*@ts-expect-error - context menu has problem in typing */}
                          <ContextMenuTrigger id={hourUnixTimestamp.toString()}>{children}</ContextMenuTrigger>
                          {/*@ts-expect-error - context menu has problem in typing */}
                          <ContextMenu
                              id={hourUnixTimestamp.toString()}
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

    const showLabel = classEvent?.hide != null;

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

    return (
        <>
            <Draggable
                disableInteractiveElementBlocking={true}
                draggableId={hourUnixTimestamp.toString()}
                index={colIndex}
                key={hourUnixTimestamp}
                isDragDisabled={disableDraggable}
            >
                {provided_ => {
                    const { dragHandleProps, draggableProps, innerRef } = provided_;
                    const { style, ..._draggableProps } = draggableProps;
                    const courseName = classEvent?.course.courseName;
                    const shouldFreeze = parseInt(activeDraggableId) !== hourUnixTimestamp;

                    return (
                        <div
                            className="draggable-container"
                            style={{
                                opacity: classEvent?.hide ? 0 : 1,
                                position: 'relative',
                            }}
                        >
                            {showLabel && <Label label="StudentClassForWeeklyTimetable.tsx" />}
                            <TimeslotWrapper>
                                {/* Place a thick line to indicate the hour unit */}
                                <div style={timeSlotStyle} />
                                <div
                                    ref={innerRef}
                                    className={classnames('grid-hour', shouldFreeze ? 'disbaletransform' : '')}
                                    style={{ fontSize: 13, ...style }}
                                    {..._draggableProps}
                                    {...dragHandleProps}
                                >
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                            height: '100%',
                                            position: 'relative',
                                        }}
                                    >
                                        {/* Control what to show on the entire timetable */}
                                        {courseName &&
                                            (showAll ||
                                                (!showAll && Number(selectedPackageId) === classEvent?.package.id)) && (
                                                <div>
                                                    {/*@ts-expect-error - context menu has problem in typing */}
                                                    <ContextMenuTrigger id={contextMenuId}>
                                                        <Box
                                                            onMouseEnter={() => {
                                                                setClassEventHeight(120);
                                                            }}
                                                            onMouseLeave={() => {
                                                                setClassEventHeight(null);
                                                            }}
                                                            style={{
                                                                border: '1px solid rgba(0,0,0,0.2)',
                                                                position: 'absolute',
                                                                boxShadow: boxShadow.SHADOW_62,
                                                                transition: 'height 0.18s ease-in-out',
                                                                zIndex: classEventHeight ? 10 ** 7 : 10 ** 5,
                                                                overflow: 'hidden',
                                                                top: 5,
                                                                left: 5,
                                                                width: 'calc(100% - 20px)',
                                                                height:
                                                                    classEventHeight ||
                                                                    1.2 * (classEvent.class.min || 0) - 10,
                                                                backgroundColor: (() => {
                                                                    if (invalidData) {
                                                                        return 'red';
                                                                    } else {
                                                                        switch (classEvent.class.classStatus) {
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
                                                            key={hourUnixTimestamp}
                                                        >
                                                            {showLabel && groupedLabel()}
                                                            <div
                                                                style={{
                                                                    padding: 4,
                                                                }}
                                                            >
                                                                {classEvent.course.courseName}
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
                                                        </Box>
                                                    </ContextMenuTrigger>
                                                    {/*@ts-expect-error - context menu has problem in typing */}
                                                    <ContextMenu
                                                        id={contextMenuId}
                                                        style={{
                                                            zIndex: 10 ** 7,
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
                                                                    ViewClassDialog.setContent(() => () => (
                                                                        <ViewClassForm
                                                                            isEditing={true}
                                                                            classEvent={classEvent}
                                                                        />
                                                                    ));
                                                                    ViewClassDialog.setOpen(true);
                                                                }}
                                                            >
                                                                Edit Class
                                                            </MenuItem>
                                                            {/*@ts-expect-error - context menu has problem in typing */}
                                                            <MenuItem
                                                                disabled={disableDuplicate}
                                                                className={classnames(
                                                                    'menu-item',
                                                                    disableDuplicate ? 'disabled' : ''
                                                                )}
                                                                onClick={() => {
                                                                    DuplicateClassDialog.setContent(() => () => (
                                                                        <DuplicateClassForm class={classEvent.class} />
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
                                                                    setClassStatusMenuOptionsExpand(
                                                                        !classStatusMenuOptionsExpand
                                                                    );
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
                                                                        'width 0.7s ease-in-out, ' +
                                                                        'max-height 0.5s ease-in-out',
                                                                    overflow: 'hidden',
                                                                    maxHeight: classStatusMenuOptionsExpand
                                                                        ? '500px'
                                                                        : '0px',
                                                                    width: classStatusMenuOptionsExpand
                                                                        ? '150px'
                                                                        : '0px',
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
                                                                                updateClassStatusHandle(
                                                                                    'SUSPICIOUS_ABSENCE'
                                                                                );
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
                                                                                updateClassStatusHandle(
                                                                                    'ILLEGIT_ABSENCE'
                                                                                );
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
                                                                                updateClassStatusHandle(
                                                                                    'LEGIT_ABSENCE'
                                                                                );
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
                                                </div>
                                            )}
                                    </div>
                                </div>
                            </TimeslotWrapper>
                        </div>
                    );
                }}
            </Draggable>
        </>
    );
}
