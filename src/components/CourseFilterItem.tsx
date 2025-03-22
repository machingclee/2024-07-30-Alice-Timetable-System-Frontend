import Checkbox from '@mui/material/Checkbox';
import Label from './Label';
import { useAppSelector } from '../redux/hooks';
import { useState } from 'react';
import { cloneDeep } from 'lodash';

export default function CourseFilterItem({
    id,
    setSelectedCourseIds,
}: {
    id: number;
    setSelectedCourseIds: React.Dispatch<React.SetStateAction<number[]>>;
}) {
    const [checked, setChecked] = useState(true);
    const course = useAppSelector(s => s.class.courses.idToCourse?.[id]);

    const handleCourseFilterItemOnChange = (checked: boolean) => {
        if (checked) {
            setSelectedCourseIds(ids => [...(ids || []), id]);
            setChecked(true);
        } else {
            setSelectedCourseIds(ids => {
                const newIds = cloneDeep(ids);
                const filteredIds = newIds?.filter(id_ => id_ !== id);
                return filteredIds;
            });
            setChecked(false);
        }
    };

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
            }}
        >
            <Checkbox
                onChange={event => {
                    handleCourseFilterItemOnChange(event.target.checked);
                }}
                checked={checked}
                {...Label}
            />
            {course?.courseName}
        </div>
    );
}
