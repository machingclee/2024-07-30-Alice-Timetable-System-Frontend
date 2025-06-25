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
import studentSlice from '../../../redux/slices/studentSlice';
import { studentApi } from '../../../!rtk-query/api/studentApi';
import colors from '../../../constant/colors';
import Label from '../../../components/Label';
import ViewClassDialog from '../../../components/ViewClassDialog';
import ViewClassForm from '../../../components/ViewClassForm';
import { Classroom } from '../../../prismaTypes/types';
import { Droppable } from '../../../components/DragAndDrop/Droppable';
import { Draggable } from '../../../components/DragAndDrop/Draggable';
import { Class_status, TimetableLesson as TimetableLesson } from '../../../dto/kotlinDto';
import MoveConfirmationForm from './MoveConfirmationForm';
import MoveConfirmationDialog from './MoveConfirmationDialog';
import useGetStudentIdFromParam from '../../../hooks/useGetStudentIdFromParam';
import classNames from 'classnames';
import useAnchorTimestamp from '../../../hooks/useStudentDetailPathParam';
import { AliceMenu } from '@/components/AliceMenu';
import getColorForClassStatus from '@/utils/getColorForClassStatus';
import getDisplayNameFromClassStatus from '@/utils/getDisplayNameFromClassStatus';

export default function StudentClassForWeeklyTimetableCell(props: {
    dayUnixTimestamp: number;
    hourUnixTimestamp: number;
    colIndex: number;
    rowIndex: number;
}) {
    const { studentId } = useGetStudentIdFromParam();
    const selectedPackageId = useAppSelector(s => s.student.studentDetailTimetablePage.selectedPackageId);

    const dispatch = useAppDispatch();

    const { isShowingExtendedClasses } = studentApi.endpoints.getStudentPackages.useQueryState(
        { studentId: studentId || '' },
        {
            selectFromResult: result => {
                const isShowingExtendedClasses =
                    result.data?.idToStudentPackage?.[selectedPackageId || '']?.display === 'EXTENDED_CLASSES';
                return { isShowingExtendedClasses };
            },
        }
    );

    const { setURLAnchorTimestamp } = useAnchorTimestamp();

    const {
        hourUnixTimestamp: currGridHourUnixTimestamp,
        dayUnixTimestamp: currGridDayUnixTimestamp,
        colIndex,
        rowIndex,
    } = props;

    const { lesson } = studentApi.endpoints.getStudentClassesForWeeklyTimetable.useQuery(
        { studentId },
        {
            skip: !studentId,
            selectFromResult: ({ data }) => {
                return {
                    lesson: data?.hrUnixTimestampToLesson?.[String(currGridHourUnixTimestamp)],
                };
            },
        }
    );

    const isNormalClass = lesson?.classExtensionRecord === null;
    const hideNormalClass = isNormalClass && isShowingExtendedClasses;

    const showLabel = lesson != null;
    const showAll = useAppSelector(s => s.student.studentDetailTimetablePage.showAllClassesForOneStudent);

    const [classNumber, setClassNumber] = useState<number>(0);
    const [classEventHeight, setClassEventHeight] = useState<number | null>(null);

    const { dayUnixTimestamp: day_unix_timestamp = 0, hourUnixTimestamp: classUnixTimestamp = 0 } = lesson?.class || {};
    const { id: class_group_id } = lesson?.classGroup || {};
    const hasDuplicationGroup = class_group_id != null;
    const createEvent = (isTimeslotInThePast: boolean) => {
        AddClassEventDialog.setWidth('sm');
        AddClassEventDialog.setContent(() => () => (
            <AddClassEventForm
                isTimeslotInThePast={isTimeslotInThePast}
                dayUnixTimestamp={currGridDayUnixTimestamp}
                hourUnixTimestamp={currGridHourUnixTimestamp}
                resetDefaultNumOfClasses={true}
                studentId={studentId || ''}
            />
        ));
        AddClassEventDialog.setOpen(true);
    };

    const invalidData = day_unix_timestamp >= classUnixTimestamp;
    const hasClassEvent = !!lesson;
    const dayAndTime = dayjs(currGridHourUnixTimestamp).format('ddd, HH:mm');
    const disableDuplicate = lesson?.classGroup != null;
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

    const ClassEventWrapper = useCallback(
        !hasClassEvent
            ? ({ children }: PropsWithChildren) => {
                  const isTimeslotInThePast = new Date().getTime() > currGridHourUnixTimestamp;
                  const addClassMenuTitle = isTimeslotInThePast
                      ? `Insert old record at ${dayAndTime}`
                      : `Add class(es) at ${dayAndTime}`;

                  return (
                      <AliceMenu
                          items={[
                              {
                                  disabled: !selectedPackageId,
                                  item: !selectedPackageId ? 'Please First Select a Package' : addClassMenuTitle,
                                  onClick: () => createEvent(isTimeslotInThePast),
                              },
                          ]}
                      >
                          {children}
                      </AliceMenu>
                  );
              }
            : ({ children }: PropsWithChildren) => children,
        [lesson, selectedPackageId]
    );

    // update class mutation
    const [updateClass] = studentApi.endpoints.updateClass.useMutation();

    const updateClassStatus = (status: Class_status) => {
        const cls = lesson?.class;
        if (cls?.classNumber && cls?.min && cls?.actualClassroom) {
            updateClass({
                class_status: status,
                classId: cls?.id,
                min: cls?.min,
                reason_for_absence: '',
                remark: cls?.remark ? cls?.remark : '',
                actual_classroom: cls?.actualClassroom as Classroom,
            }).unwrap();
        }
    };
    // To account for the numbering of classes
    // get hrUnixTimestampToLesson
    const { hrUnixTimestampToLesson = {} } = studentApi.endpoints.getStudentClassesForWeeklyTimetable.useQuery(
        { studentId },
        {
            skip: !studentId,
            selectFromResult: ({ data }) => {
                return {
                    hrUnixTimestampToLesson: data?.hrUnixTimestampToLesson,
                };
            },
        }
    );

    // detach api
    const [detachFromGroupMutation] = studentApi.endpoints.detachFromGroup.useMutation();

    useEffect(() => {
        if (lesson && hrUnixTimestampToLesson) {
            let currentClassNumber = 0;

            const sortedClasses = Object.values(hrUnixTimestampToLesson).sort((a, b) => {
                return a.class.hourUnixTimestamp - b.class.hourUnixTimestamp;
            });

            sortedClasses.forEach(item => {
                const classStatus = item.class.classStatus;
                if (
                    item.course.courseName === lesson.course.courseName &&
                    (classStatus === 'PRESENT' || classStatus === 'MAKEUP' || classStatus === 'ILLEGIT_ABSENCE')
                ) {
                    currentClassNumber++;
                    if (item.class.hourUnixTimestamp === lesson.class.hourUnixTimestamp) {
                        setClassNumber(currentClassNumber);
                    }
                }
            });
        }
    }, [lesson, hrUnixTimestampToLesson]);

    const [moveStudentEvent] = studentApi.endpoints.moveStudentEvent.useMutation();
    const onValidDrop = async (fromClassEvent: TimetableLesson) => {
        const move = async () => {
            try {
                await moveStudentEvent({
                    fromClassEvent,
                    toDayTimestamp: String(currGridDayUnixTimestamp),
                    toHourTimestamp: String(currGridHourUnixTimestamp),
                }).unwrap();
            } finally {
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

    const isInTheFuture = () => (lesson?.class?.hourUnixTimestamp || 0) >= new Date().getTime();
    const getHeight = () => {
        return classEventHeight || 1.35 * (lesson?.class.min || 0) - 10;
    };

    return (
        <Droppable
            className={classNames('draggable-container')}
            style={{
                position: 'relative',
            }}
            isValidMove={(_data: TimetableLesson) => {
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
                        {(showAll || (!showAll && Number(selectedPackageId) === lesson?.studentPackage.id)) &&
                            !hideNormalClass &&
                            lesson && (
                                <>
                                    <Draggable
                                        data={lesson}
                                        key={lesson?.class.id}
                                        canDrag={!!lesson && isInTheFuture()}
                                    >
                                        <AliceMenu
                                            items={[
                                                {
                                                    item: 'View class detail',
                                                    onClick: () => {
                                                        ViewClassDialog.setContent(() => () => (
                                                            <ViewClassForm
                                                                classExtensionRecord={lesson.classExtensionRecord}
                                                                dateUnixTimestamp={lesson.class.dayUnixTimestamp}
                                                                cls={lesson.class}
                                                                course={lesson.course}
                                                                student={lesson.student}
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
                                                                classExtensionRecord={lesson.classExtensionRecord}
                                                                isEditing={true}
                                                                dateUnixTimestamp={lesson.class.dayUnixTimestamp}
                                                                cls={lesson.class}
                                                                course={lesson.course}
                                                                student={lesson.student}
                                                            />
                                                        ));
                                                        ViewClassDialog.setOpen(true);
                                                    },
                                                },
                                                {
                                                    item: 'Duplicate class',
                                                    disabled: disableDuplicate || !lesson,
                                                    onClick: () => {
                                                        if (!lesson?.class) {
                                                            return;
                                                        }
                                                        DuplicateClassDialog.setWidth('xs');
                                                        DuplicateClassDialog.setContent(() => () => (
                                                            <DuplicateClassForm
                                                                class={lesson?.class}
                                                                isTimeslotInThePast={isInTheFuture()}
                                                            />
                                                        ));
                                                        DuplicateClassDialog.setOpen(true);
                                                    },
                                                },
                                                {
                                                    item: 'Detach from group',
                                                    disabled: !disableDuplicate,
                                                    onClick: async () => {
                                                        await detachFromGroupMutation({
                                                            classId: lesson.class.id,
                                                            studentId: studentId,
                                                        }).unwrap();
                                                    },
                                                },
                                                {
                                                    item: 'Delete a class',
                                                    onClick: () => {
                                                        DeleteClassDialog.setWidth('xs');
                                                        DeleteClassDialog.setContent(() => () => (
                                                            <DeleteClassForm
                                                                deleteSingleClass={true}
                                                                classGroup={lesson.classGroup}
                                                                cls={lesson.class}
                                                                course={lesson.course}
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
                                                                classGroup={lesson.classGroup}
                                                                cls={lesson.class}
                                                                course={lesson.course}
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
                                                                            lesson.class.classStatus
                                                                        ),
                                                                    }}
                                                                >
                                                                    {
                                                                        getDisplayNameFromClassStatus[
                                                                            lesson.class.classStatus
                                                                        ]
                                                                    }
                                                                </span>
                                                                <div
                                                                    style={{
                                                                        background: getColorForClassStatus(
                                                                            lesson.class.classStatus
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
                                                            disabled: lesson.class.classStatus === status,
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
                                                        studentSlice.actions.setSelectedPackageAndActiveAnchorTimestamp(
                                                            {
                                                                type: 'go-to-target-lesson',
                                                                packageId: lesson.studentPackage.id + '',
                                                                setURLAnchorTimestamp: setURLAnchorTimestamp,
                                                                desiredAnchorTimestamp: lesson.class.hourUnixTimestamp,
                                                            }
                                                        )
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
                                                    border: lesson
                                                        ? selectedPackageId === lesson.studentPackage.id + ''
                                                            ? `1px solid ${colors.ORANGE}`
                                                            : '1px solid rgba(0,0,0,0.2)'
                                                        : '',
                                                    position: 'absolute',
                                                    boxShadow: lesson
                                                        ? selectedPackageId === lesson.studentPackage.id + ''
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
                                                    filter: isInTheFuture()
                                                        ? ''
                                                        : selectedPackageId === lesson.studentPackage.id + ''
                                                          ? 'grayscale(90%) brightness(120%) drop-shadow(0px 0px 1px yellow)'
                                                          : 'grayscale(90%) brightness(120%)',
                                                    backgroundColor: (() => {
                                                        if (!lesson) {
                                                            return '';
                                                        }
                                                        if (invalidData) {
                                                            return 'red';
                                                        } else {
                                                            switch (lesson?.class.classStatus) {
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
                                                        {lesson?.course.courseName}
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
