import { Button, Input } from 'antd';
import boxShadow from '../../../constant/boxShadow';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { useCallback, useEffect, useRef, useState } from 'react';
import Spacer from '../../../components/Spacer';
import { CourseResponse } from '../../../dto/dto';
import Label from '../../../components/Label';
import { CourseThunkAction } from '../../../redux/slices/courseSlice';
import { debounce } from 'lodash';
import lodash from 'lodash';

export default function CourseRow(props: { id: number }) {
    const { id } = props;
    const dispatch = useAppDispatch();
    const course = useAppSelector(s => s.class.courses.idToCourse?.[id])!;

    const [hasDistinction, setHasDistinction] = useState(false);

    // eslint-disable-next-line
    const checkDataDistinction = useCallback(
        debounce(() => {
            const oldData = course;
            const newData = formData.current;
            const hasDistinction_ = !lodash.isEqual(oldData, newData);
            console.log('oldData', oldData);
            console.log('newData', newData);
            setHasDistinction(hasDistinction_);
        }, 300),
        [course]
    );

    const [editing, setEditing] = useState(false);
    const formData = useRef(course);
    const updateField = (update: Partial<CourseResponse>) => {
        formData.current = { ...formData.current, ...update };
        checkDataDistinction();
    };
    const { courseName } = course || {};
    const submitUpdate = async () => {
        const updatedClass = { ...course, ...formData.current };
        await dispatch(CourseThunkAction.updateCourse(updatedClass));
        setEditing(false);
    };

    useEffect(() => {
        if (editing) {
            formData.current = course;
        }
    }, [editing, course]);

    useEffect(() => {
        checkDataDistinction();
    }, [editing, checkDataDistinction]);

    if (!course) {
        return null;
    }

    return (
        <div
            style={{
                background: 'white',
                boxShadow: boxShadow.SHADOW_62,
                padding: '20px 30px',
                borderRadius: '8px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '15px',
            }}
        >
            <div style={{ flex: 1 }}>
                <table>
                    <Label label="CourseRow.tsx" offsetTop={-20} />
                    <tbody>
                        <tr>
                            <td>Course Name:</td>
                            {!editing && <td>{courseName}</td>}
                            {editing && (
                                <td style={{}}>
                                    <Input
                                        style={{ flex: 1 }}
                                        defaultValue={courseName}
                                        onChange={e => {
                                            updateField({
                                                courseName: e.target.value,
                                            });
                                        }}
                                    />
                                </td>
                            )}
                        </tr>
                    </tbody>
                </table>
            </div>
            <div style={{ display: 'flex' }}>
                {editing && (
                    <>
                        <Button onClick={submitUpdate} disabled={!hasDistinction}>
                            Update
                        </Button>
                        <Spacer />
                    </>
                )}
                <Button
                    onClick={() => {
                        setEditing(editing => {
                            if (editing) {
                                formData.current = course;
                            }
                            return !editing;
                        });
                    }}
                >
                    {editing ? 'Cancel' : 'Edit'}
                </Button>
            </div>
        </div>
    );
}
