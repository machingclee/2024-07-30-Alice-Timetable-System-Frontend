import SectionTitle from '../../../components/SectionTitle';
import Spacer from '../../../components/Spacer';
import FormInputField from '../../../components/FormInputField';
import { CreateCourseRequest } from '../../../dto/dto';
import { useRef, useState } from 'react';
import { Box } from '@mui/material';
import toastUtil from '../../../utils/toastUtil';
import AddClassDialog from './AddCourseDialog';
import { Button } from 'antd';
import { courseApi } from '@/!rtk-query/api/courseApi';

export default function AddCourseForm() {
    const formData = useRef<Partial<CreateCourseRequest>>({
        courseName: '',
    });
    const [error, _setError] = useState<Partial<CreateCourseRequest>>({});
    const update = (update_: Partial<CreateCourseRequest>) => {
        formData.current = { ...formData.current, ...update_ };
    };

    // create course mutation
    const [createCourse] = courseApi.endpoints.createCourse.useMutation();

    const submit = async () => {
        await createCourse({ course: formData.current as CreateCourseRequest });
        toastUtil.success('Course Created');
        AddClassDialog.setOpen(false);
    };
    return (
        <Box
            style={{
                maxWidth: 400,
                width: 600,
                padding: '40px 80px',
                overflowY: 'auto',
                paddingBottom: 60,
            }}
        >
            <SectionTitle>Add a Course</SectionTitle>
            <Spacer />
            <FormInputField
                title="Course Name"
                onChange={t => update({ courseName: t })}
                error={error?.['courseName']}
            />
            <Spacer />
            <Spacer />
            <Button type="primary" block onClick={submit}>
                Submit
            </Button>
        </Box>
    );
}
