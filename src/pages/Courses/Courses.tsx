import SectionTitle from '../../components/SectionTitle';
import { courseApi } from '@/!rtk-query/api/courseApi';
import Spacer from '../../components/Spacer';
import ClassRow from './components/CourseRow';
import { Button } from 'antd';
import AddClassDialog from './components/AddCourseDialog';
import AddClassForm from './components/AddCourseForm';
import ContentContainer from '@/components/ContentContainer';

export default function Courses() {
    const { courseIds } = courseApi.endpoints.getCourses.useQuery(undefined, {
        selectFromResult: result => {
            const courseIds = result?.data?.ids || [];
            return { courseIds };
        },
    });

    const openAddClassDialog = () => {
        AddClassDialog.setContent(() => () => <AddClassForm />);
        AddClassDialog.setOpen(true);
    };

    return (
        <div>
            <SectionTitle>Courses</SectionTitle>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button type="primary" onClick={openAddClassDialog}>
                    Add Course
                </Button>
            </div>
            <Spacer />
            <ContentContainer className="h-[calc(100vh-120px)] grid grid-cols-1 gap-2 min-[1550px]:grid-cols-2 overflow-y-scroll">
                {courseIds.map(id => {
                    return <ClassRow courseId={id} key={id} />;
                })}
            </ContentContainer>
            <AddClassDialog.render />
        </div>
    );
}
