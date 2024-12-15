import { Button, Select } from 'antd';
import Spacer from '../../../components/Spacer';
import { useRef, useState } from 'react';
import SectionTitle from '../../../components/SectionTitle';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { Box } from '@mui/material';
import FormInputTitle from '../../../components/FormInputTitle';
import Label from '../../../components/Label';
import { StudentThunkAction } from '../../../redux/slices/studentSlice';
import apiClient from '../../../axios/apiClient';
import apiRoutes from '../../../axios/apiRoutes';
import toastUtil from '../../../utils/toastUtil';
import AddClassEventDialog from '../../../components/AddClassEventDialog.tsx';
import { CustomResponse } from '../../../axios/responseTypes';
import { CreateClassRequest } from '../../../dto/dto';
import CloseButton from '../../../components/CloseButton';

export default function AddClassEventPopover({
    dayUnixTimestamp,
    hourUnixTimestamp,
    studentId,
    setOpenDialog,
    setVisible,
}: {
    dayUnixTimestamp: number;
    hourUnixTimestamp: number;
    studentId: string;
    openDialog: boolean;
    setOpenDialog: (openDialog: boolean) => void;
    setVisible: (visible: boolean) => void;
}) {
    const [error, setError] = useState<Partial<CreateClassRequest>>({});
    const dispatch = useAppDispatch();
    const classes = useAppSelector(s => s.class.courses);
    const formData = useRef<Partial<CreateClassRequest>>({
        day_unix_timestamp: dayUnixTimestamp,
        hour_unix_timestamp: hourUnixTimestamp,
        student_id: studentId,
    });
    const updateFormData = (update: Partial<CreateClassRequest>) => {
        formData.current = { ...formData.current, ...update };
    };

    const submit = async () => {
        const res = await apiClient.post<CustomResponse<undefined>>(
            apiRoutes.POST_CREATE_STUDENT_CLASS,
            formData.current
        );
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
            toastUtil.success('Event Created');
            AddClassEventDialog.setOpen(false);
            dispatch(
                StudentThunkAction.getStudentClassesForWeeklyTimetable({
                    studentId,
                })
            );
        }
    };

    const handleOnClose = () => {
        setVisible(false);
        setTimeout(() => {
            setOpenDialog(false);
        }, 300);
    };

    return (
        <Box
            style={{
                backgroundColor: 'white',
                maxWidth: 400,
                width: 600,
                padding: '40px 80px',
                overflowY: 'auto',
                paddingBottom: 60,
            }}
        >
            <CloseButton width="1.5rem" marginTop="0" onClick={handleOnClose} />
            <Label label="AddClassEventForm.tsx" offsetTop={0} offsetLeft={180} />
            <SectionTitle>Add Class Event</SectionTitle>
            <Spacer />
            <div style={{ display: 'flex' }}>
                <FormInputTitle>Select a Class </FormInputTitle>
                <Spacer />
                {error.course_id && <div>{error.course_id}</div>}
            </div>
            <Spacer height={5} />
            <Select
                dropdownStyle={{ zIndex: 10 ** 4 }}
                style={{ width: '100%' }}
                onChange={value => {
                    updateFormData({ course_id: value });
                }}
                options={classes.ids?.map(id_ => {
                    const { course_name, id } = classes.idToCourse?.[id_] || {};
                    return {
                        value: id || 0,
                        label: course_name || '',
                    };
                })}
            />
            <Spacer height={5} />
            <Spacer />
            <Spacer />
            <Button type="primary" block onClick={submit}>
                Submit
            </Button>
        </Box>
    );
}
