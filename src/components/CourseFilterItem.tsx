import Checkbox from '@mui/material/Checkbox';
import Label from './Label';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { cloneDeep } from 'lodash';
import studentSlice from '../redux/slices/studentSlice';
import { coursesApi } from '@/redux/slices/courseSlice';

export default function CourseFilterItem({ id: courseId }: { id: number }) {
    // const course = useAppSelector(s => s.class.courses.idToCourse?.[courseId]);
    // get course from rtk query
    const { course } = coursesApi.endpoints.getCourses.useQuery(undefined, {
        selectFromResult: result => {
            const courses = result?.data;
            const course = courses?.idToCourse?.[courseId];
            return { course };
        },
    });
    const dispatch = useAppDispatch();
    const selectedCourseIds = useAppSelector(s => s.student.massTimetablePage.filter.courseIds);
    const checked = selectedCourseIds.includes(courseId);

    const handleCourseFilterItemOnChange = () => {
        const newCourseIds = cloneDeep(selectedCourseIds);
        if (checked) {
            const index = newCourseIds.indexOf(courseId);
            newCourseIds.splice(index, 1);
        } else {
            newCourseIds.push(courseId);
        }
        dispatch(studentSlice.actions.updateFilter({ courseIds: newCourseIds }));
    };

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
            }}
        >
            <Checkbox onChange={handleCourseFilterItemOnChange} checked={checked} {...Label} />
            {course?.courseName}
        </div>
    );
}
