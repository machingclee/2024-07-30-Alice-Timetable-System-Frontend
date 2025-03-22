import { Box } from '@mui/material';
import Spacer from './Spacer';
import { PropsWithChildren, useRef, useState } from 'react';
import { Button, Select, Input } from 'antd';
import durations from '../constant/durations';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { StudentThunkAction } from '../redux/slices/studentSlice';
import { $Enums, Classroom } from '../prismaTypes/types';
import { MdEdit } from 'react-icons/md';
import classStatuses from '../constant/classStatuses';
import ViewClassDialog from './ViewClassDialog';
import getColorForClassStatus from '../utils/getColorForClassStatus';
import getNumberSuffix from '../utils/getNumberSuffix';
import { TimetableClassEvent } from '../dto/kotlinDto';
import boxShadow from '../constant/boxShadow';

export default function ViewClassForm(props: {
    classEvent: TimetableClassEvent;
    dateUnixTimestamp?: number;
    isEditing?: boolean;
}) {
    const classRoom = useAppSelector(s => s.student.massTimetablePage.classRoom);
    const filter = useAppSelector(s => s.student.massTimetablePage.filter);
    const [editing, setEditing] = useState(props.isEditing || false);
    const { classEvent, dateUnixTimestamp } = props;
    const { class: cls, course } = classEvent;
    const formData = useRef({
        min: cls.min,
        class_status: cls.classStatus,
        remark: cls.remark,
        actual_classroom: cls.actualClassroom,
        reason_for_absence: cls.reasonForAbsence,
    });
    const dispatch = useAppDispatch();

    const classroomOptions: Classroom[] = ['PRINCE_EDWARD', 'CAUSEWAY_BAY'];

    return (
        <Box
            style={{
                width: '100%',
                padding: '40px 40px',
                paddingBottom: 60,
            }}
        >
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ fontWeight: 'bold', fontSize: '23px' }}>{course?.courseName}</div>
                    <Spacer />
                </div>
                <div
                    style={{
                        display: 'inline-block',
                        cursor: 'pointer',
                        padding: '5px',
                        width: 35,
                        height: 'auto',
                        transition: 'background-color 0.3s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#f0f0f0')}
                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                    onClick={() => {
                        setEditing(!editing);
                    }}
                >
                    <MdEdit style={{ width: '100%', height: '100%', opacity: editing ? 1 : 0.5 }} />
                </div>
            </div>
            <Spacer height={10} />
            <div style={{ display: 'flex' }}>
                <div style={{ boxShadow: boxShadow.SHADOW_60, padding: '0px 10px', borderRadius: 4, marginBottom: 10 }}>
                    {cls.classNumber !== 0 && (
                        <span style={{ fontWeight: 'lighter', fontSize: 18 }}>{getNumberSuffix(cls.classNumber)}</span>
                    )}
                </div>
            </div>
            <Spacer />
            <div>
                <div
                    style={{
                        marginBottom: '10px',
                        marginTop: '5px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                    }}
                >
                    Duration:
                </div>
                {!editing && <DisplayResult>{cls.min}</DisplayResult>}
                {editing && (
                    <Select
                        disabled={!editing}
                        dropdownStyle={{ zIndex: 10 ** 4 }}
                        style={{ width: '100%' }}
                        defaultValue={cls.min}
                        onChange={value => {
                            formData.current = {
                                ...formData.current,
                                min: value,
                            };
                        }}
                        options={durations}
                    />
                )}
            </div>
            <Spacer height={5} />
            <div>
                <div
                    style={{
                        marginBottom: '10px',
                        marginTop: '5px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                    }}
                >
                    Classroom:
                </div>
                {!editing && <DisplayResult>{cls.actualClassroom}</DisplayResult>}
                {editing && (
                    <Select
                        disabled={!editing}
                        dropdownStyle={{ zIndex: 10 ** 4 }}
                        style={{ width: '100%' }}
                        defaultValue={cls.actualClassroom}
                        onChange={value => {
                            console.log('value:', value);
                            formData.current = {
                                ...formData.current,
                                actual_classroom: value,
                            };
                        }}
                        options={classroomOptions.map(classroom => {
                            return { value: classroom, label: classroom };
                        })}
                    />
                )}
            </div>
            <Spacer height={5} />
            <div>
                <div
                    style={{
                        marginBottom: '10px',
                        marginTop: '5px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                    }}
                >
                    Class Status:
                </div>
                {!editing && (
                    <div
                        style={{
                            borderRadius: 6,
                            flex: 1,
                            height: '32px',
                            fontWeight: 'lighter',
                            display: 'flex',
                            alignItems: 'center',
                            border: '1px solid rgba(0,0,0,0.1)',
                            paddingLeft: 10,
                        }}
                    >
                        {cls.classStatus}
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                marginLeft: '10px',
                            }}
                        >
                            <div
                                style={{
                                    background: getColorForClassStatus(cls.classStatus),
                                    width: '15px',
                                    height: '15px',
                                }}
                            />
                        </div>
                    </div>
                )}
                {editing && (
                    <Select
                        disabled={!editing}
                        dropdownStyle={{ zIndex: 10 ** 4 }}
                        style={{ width: '100%' }}
                        defaultValue={cls.classStatus}
                        onChange={value => {
                            formData.current = {
                                ...formData.current,
                                class_status: value,
                            };
                        }}
                        options={classStatuses}
                    />
                )}
            </div>
            <Spacer height={5} />
            <div>
                <div
                    style={{
                        marginBottom: '10px',
                        marginTop: '5px',
                        fontWeight: 'bold',
                        fontSize: '16px',
                    }}
                >
                    Remark:
                </div>
                {!editing && <DisplayResult>{cls.remark || ''}</DisplayResult>}
                {editing && (
                    <Input
                        disabled={!editing}
                        defaultValue={cls.remark || ''}
                        onChange={value => {
                            formData.current = {
                                ...formData.current,
                                remark: value.target.value,
                            };
                        }}
                    />
                )}
            </div>
            {editing && (
                <div>
                    <Spacer />
                    <Spacer />
                    <Button
                        type="primary"
                        block
                        onClick={async () => {
                            await dispatch(
                                StudentThunkAction.updateClass({
                                    classId: cls.id,
                                    min: formData.current.min,
                                    class_status: formData.current.class_status,
                                    reason_for_absence: '',
                                    remark: formData.current.remark || '',
                                    actual_classroom: formData.current.actual_classroom as $Enums.Classroom,
                                })
                            )
                                .unwrap()
                                .finally(() => {
                                    if (classRoom && dateUnixTimestamp) {
                                        dispatch(
                                            StudentThunkAction.getFilteredStudentClassesForDailyTimetable({
                                                classRoom: classRoom,
                                                dateUnixTimestamp: dateUnixTimestamp.toString(),
                                                filter: filter,
                                            })
                                        );
                                    } else {
                                        dispatch(
                                            StudentThunkAction.getStudentClassesForWeeklyTimetable({
                                                studentId: classEvent.student.id,
                                            })
                                        );
                                    }
                                });
                            dispatch(
                                StudentThunkAction.getStudentPackages({
                                    studentId: classEvent.student.id,
                                })
                            );
                            ViewClassDialog.setOpen(false);
                        }}
                    >
                        Submit
                    </Button>
                </div>
            )}
        </Box>
    );
}

export const DisplayResult = (props: PropsWithChildren) => {
    return (
        <div
            style={{
                borderRadius: 6,
                flex: 1,
                height: '32px',
                fontWeight: 'lighter',
                display: 'flex',
                alignItems: 'center',
                border: '1px solid rgba(0,0,0,0.1)',
                paddingLeft: 10,
            }}
        >
            {props.children}
        </div>
    );
};
