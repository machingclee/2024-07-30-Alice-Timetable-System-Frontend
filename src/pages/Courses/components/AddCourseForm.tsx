import SectionTitle from '../../../components/SectionTitle';
import Spacer from '../../../components/Spacer';
import FormInputField from '../../../components/FormInputField';
import { CreateCourseRequest } from '../../../dto/dto';
import { useRef, useState } from 'react';
import { Box } from '@mui/material';
import { CustomResponse } from '../../../axios/responseTypes';
import apiRoutes from '../../../axios/apiRoutes';
import apiClient from '../../../axios/apiClient';
import toastUtil from '../../../utils/toastUtil';
import AddClassDialog from './AddCourseDialog';
import { useAppDispatch } from '../../../redux/hooks';
import { CourseThunkAction } from '../../../redux/slices/courseSlice';
import { Button } from 'antd';

export default function AddCourseForm() {
    const dispatch = useAppDispatch();
    const formData = useRef<Partial<CreateCourseRequest>>({
        courseName: '',
    });
    const [error, setError] = useState<Partial<CreateCourseRequest>>({});
    const update = (update_: Partial<CreateCourseRequest>) => {
        formData.current = { ...formData.current, ...update_ };
    };
    const submit = async () => {
        const res = await apiClient.post<CustomResponse<undefined>>(apiRoutes.POST_CREATE_COURSE, formData.current);
        if (!res.data.success) {
            const errorMessage = res.data?.errorMessage;
            const errorObject = res.data?.errorObject;
            if (errorMessage) {
                toastUtil.error(errorMessage);
            }
            if (errorObject) {
                setError(errorObject);
            }
        } else {
            toastUtil.success('Course Created');
            AddClassDialog.setOpen(false);
            dispatch(CourseThunkAction.getCourses());
        }
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
