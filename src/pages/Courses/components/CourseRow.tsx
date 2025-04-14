import { Button, Input } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { useCallback, useEffect, useRef, useState } from 'react';
import { CourseResponse } from '../../../dto/dto';
import { CourseThunkAction } from '../../../redux/slices/courseSlice';
import { debounce } from 'lodash';
import lodash from 'lodash';
import { Separator } from '@/components/ui/separator';
import { MdEdit } from 'react-icons/md';
import { CgPushUp } from 'react-icons/cg';
import { IoReturnDownBackOutline } from 'react-icons/io5';

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
        <div className="items-center bg-white mb-2 max-w-180 px-4 py-1 rounded-md shadow-md">
            <div>
                <label className="text-sm">Course</label>
            </div>
            <Separator className="mb-2" />
            <div className="flex items-center justify-between pb-2">
                <div>
                    {!editing && <div>{courseName}</div>}
                    {editing && (
                        <Input
                            className="!w-80"
                            defaultValue={courseName}
                            onChange={e => {
                                updateField({
                                    courseName: e.target.value,
                                });
                            }}
                        />
                    )}
                </div>
                <div className="flex items-center gap-4">
                    <Button
                        className="!px-5 !py-0 !rounded-2xl"
                        onClick={() => {
                            setEditing(editing => {
                                if (editing) {
                                    formData.current = course;
                                }
                                return !editing;
                            });
                        }}
                    >
                        {editing ? (
                            <div className="flex items-center gap-2 ">
                                <IoReturnDownBackOutline />
                                Cancel
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <MdEdit /> Edit
                            </div>
                        )}
                    </Button>

                    {editing && (
                        <>
                            <Button
                                className="!px-5 !py-0 !rounded-2xl flex items-center gap-2"
                                onClick={submitUpdate}
                                disabled={!hasDistinction}
                            >
                                <CgPushUp /> Update
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
