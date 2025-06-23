import { Button, Input } from 'antd';
import { useCallback, useEffect, useRef, useState } from 'react';
import { CourseDTO } from '../../../dto/dto';
import { courseApi } from '@/!rtk-query/api/courseApi';
import { debounce } from 'lodash';
import lodash from 'lodash';
import { MdEdit } from 'react-icons/md';
import { CgPushUp } from 'react-icons/cg';
import { IoBookOutline, IoReturnDownBackOutline } from 'react-icons/io5';

export default function CourseRow(props: { courseId: number }) {
    const { courseId: id } = props;
    const { course } = courseApi.endpoints.getCourses.useQuery(undefined, {
        selectFromResult: result => {
            const course = result?.data?.idToCourse?.[id];
            return { course };
        },
    });
    const [updateCourse] = courseApi.endpoints.updateCourse.useMutation();

    const [hasDistinction, setHasDistinction] = useState(false);

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
    const updateField = (update: Partial<CourseDTO>) => {
        if (!formData.current) {
            return;
        }
        formData.current = { ...formData.current, ...update };
        checkDataDistinction();
    };
    const { courseName } = course || {};
    const submitUpdate = async () => {
        const updatedCourse = { ...course, ...formData.current } as CourseDTO;
        await updateCourse({ course: updatedCourse });
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
        <div className="items-center bg-white mb-0 px-4 py-1 rounded-md shadow-sm border-1 border-emerald-400">
            <div className="my-2">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <IoBookOutline size={20} className="translate-y-[1px]" />
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
                            className="!px-5 !py-0"
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
                                    className="!px-5 !py-0 flex items-center gap-2"
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
        </div>
    );
}
