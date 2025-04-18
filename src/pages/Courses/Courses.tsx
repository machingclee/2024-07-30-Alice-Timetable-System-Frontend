import SectionTitle from '../../components/SectionTitle';
import { useAppSelector } from '../../redux/hooks';
import { CourseThunkAction } from '../../redux/slices/courseSlice';
import Spacer from '../../components/Spacer';
import ClassRow from './components/CourseRow';
import { Button } from 'antd';
import AddClassDialog from './components/AddCourseDialog';
import AddClassForm from './components/AddCourseForm';
import useQueryThunk from '../../reactQueries/useQueryThunk';
import ContentContainer from '@/components/ContentContainer';

export default function Courses() {
    const ids = useAppSelector(s => s.class.courses.ids) || [];

    const openAddClassDialog = () => {
        AddClassDialog.setContent(() => () => <AddClassForm />);
        AddClassDialog.setOpen(true);
    };

    useQueryThunk({ thunk: CourseThunkAction.getCourses })();

    return (
        <div>
            <SectionTitle>Courses</SectionTitle>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button type="primary" onClick={openAddClassDialog}>
                    Add Course
                </Button>
            </div>
            <Spacer />
            <ContentContainer className="grid grid-cols-1 gap-2 min-[1550px]:grid-cols-2">
                {ids.map(id => {
                    return <ClassRow id={id} />;
                })}
            </ContentContainer>
            <AddClassDialog.render />
        </div>
    );
}
