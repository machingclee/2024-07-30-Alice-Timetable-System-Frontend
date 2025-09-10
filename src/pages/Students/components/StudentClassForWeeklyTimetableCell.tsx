import classnames from 'classnames';
import dayjs from 'dayjs';
import boxShadow from '../../../constant/boxShadow';
import { Box } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import AddClassEventDialog from '../../../components/AddClassEventDialog';
import AddClassEventForm from '../../../components/AddClassEventForm';
import { PropsWithChildren, useCallback, useState } from 'react';

import studentSlice from '../../../redux/slices/studentSlice';
import { studentApi } from '../../../!rtk-query/api/studentApi';
import colors from '../../../constant/colors';
import Label from '../../../components/Label';
import { Classroom } from '../../../prismaTypes/types';
import { Droppable } from '../../../components/DragAndDrop/Droppable';
import { Draggable } from '../../../components/DragAndDrop/Draggable';
import { Class_status, TimetableLesson as TimetableLesson } from '../../../dto/kotlinDto';
import MoveConfirmationForm from './MoveConfirmationForm';
import MoveConfirmationDialog from './MoveConfirmationDialog';
import useGetStudentIdFromParam from '../../../hooks/useGetStudentIdFromParam';
import classNames from 'classnames';
import { AliceMenu } from '@/components/AliceMenu';
import getColorForClassStatus from '@/utils/getColorForClassStatus';
import getDisplayNameFromClassStatus from '@/utils/getDisplayNameFromClassStatus';
import useStudentDetailPathParam from '../../../hooks/useStudentDetailPathParam';
import { MdOutlineKeyboardDoubleArrowDown } from 'react-icons/md';
import Spacer from '@/components/Spacer';
import useAliceMenu from '../hooks/useAliceMenu';

export default function StudentClassForWeeklyTimetableCell(props: {
    dayUnixTimestamp: number;
    hourUnixTimestamp: number;
    colIndex: number;
    rowIndex: number;
}) {
    const {
        hourUnixTimestamp: currGridHourUnixTimestamp,
        dayUnixTimestamp: currGridDayUnixTimestamp,
        colIndex,
        rowIndex,
    } = props;

    const { equipAliceMenu } = useAliceMenu({ hourUnitTimestamp: currGridHourUnixTimestamp }) || {};
    const { studentId } = useGetStudentIdFromParam();
    const selectedPackageId = useAppSelector(s => s.student.studentDetailTimetablePage.selectedPackageId);
    const { setPathParam } = useStudentDetailPathParam();

    const dispatch = useAppDispatch();

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

    const showLabel = lesson != null;
    const showAll = useAppSelector(s => s.student.studentDetailTimetablePage.showAllClassesForOneStudent);

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

    const classEventCell = (lesson: TimetableLesson) => {
        return (
            <Box
                onDoubleClick={() => {
                    console.log(' lesson.studentPackage.id ', lesson.studentPackage.id + '');
                    dispatch(
                        studentSlice.actions.setSelectedPackageAndActiveAnchorTimestamp({
                            type: 'go-to-target-lesson',
                            packageId: lesson.studentPackage.id + '',
                            setURLAnchorTimestamp: timestamp =>
                                setPathParam({
                                    anchorTimestamp: timestamp,
                                    packageId: lesson.studentPackage.id + '' || '',
                                }),
                            desiredAnchorTimestamp: lesson.class.hourUnixTimestamp,
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
                            return getColorForClassStatus(lesson?.class.classStatus);
                        }
                    })(),
                    borderRadius: 4,
                    fontSize: 14,
                    color: 'white',
                    textAlign: 'center',
                }}
                key={currGridHourUnixTimestamp}
            >
                <div className="relative">
                    {showLabel && groupedLabel()}
                    <div className="p-4">{lesson?.course.courseName}</div>
                    {lesson?.class?.classNumber > -1 && (
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
                            {`Class: ${lesson?.class?.classNumber || 0}`}
                        </div>
                    )}

                    {lesson.classExtendedTo && (
                        <div className="!text-xs">
                            <Spacer height={2} />
                            <div>{`Extended to`}</div>
                            <div className="flex items-center justify-center">
                                <MdOutlineKeyboardDoubleArrowDown size={16} />
                            </div>
                            <div>{dayjs(lesson.classExtendedTo.hourUnixTimestamp).format('YYYY-MM-DD')}</div>
                        </div>
                    )}
                </div>
            </Box>
        );
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
                            lesson && (
                                <>
                                    <Draggable
                                        data={lesson}
                                        key={lesson?.class.id}
                                        canDrag={!!lesson && isInTheFuture()}
                                    >
                                        {equipAliceMenu?.({ children: classEventCell(lesson) }) ||
                                            classEventCell(lesson)}
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

export const useChangeStatusMenuItem = (props: { lesson: TimetableLesson | undefined }) => {
    const { lesson } = props;
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

    if (!lesson) {
        return {
            item: null,
            subItems: [],
        };
    }

    return {
        item: (
            <div>
                <div>Change Status</div>
                <div className="flex items-center gap-2">
                    <span
                        style={{
                            color: getColorForClassStatus(lesson.class.classStatus),
                        }}
                    >
                        {getDisplayNameFromClassStatus[lesson.class.classStatus]}
                    </span>
                    <div
                        style={{
                            background: getColorForClassStatus(lesson.class.classStatus),
                            width: '15px',
                            height: '15px',
                        }}
                    />
                </div>
            </div>
        ),
        subItems: Object.keys(getDisplayNameFromClassStatus).map(status => ({
            disabled: lesson.class.classStatus === status,
            item: <StatusLabel status={status as Class_status} />,
            onClick: () => updateClassStatus(status as Class_status),
        })),
    };
};
