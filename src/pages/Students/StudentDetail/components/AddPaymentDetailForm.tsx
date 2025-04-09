import { Box } from '@mui/material';
import SectionTitle from '../../../../components/SectionTitle';
import Spacer from '../../../../components/Spacer';
import { Button, DatePicker } from 'antd';
import dayjs from 'dayjs';
import { useRef } from 'react';
import { useAppDispatch } from '../../../../redux/hooks';
import { StudentThunkAction } from '../../../../redux/slices/studentSlice';
import AddPaymentDetailDialog from './AddPaymentDetailDialog';
import { useParams } from 'react-router-dom';

export default function AddPaymentDetailForm(props: { packageId: number }) {
    const { packageId } = props;
    const currTimestamp = new Date().getTime();
    const { studentId } = useParams<{ studentId: string }>();
    const currTimeString = dayjs(currTimestamp).format('YYYY-MM-DD');
    const paymentDate = useRef(currTimestamp);
    const dispatch = useAppDispatch();
    const submit = async () => {
        AddPaymentDetailDialog.setOpen(false);
        await dispatch(
            StudentThunkAction.markPackageAsPaid({
                packageId,
                paidAt: paymentDate.current,
            })
        ).unwrap();
        dispatch(
            StudentThunkAction.getStudentPackages({
                studentId: studentId || '',
            })
        );
    };

    return (
        <Box
            style={{
                overflowY: 'auto',
            }}
        >
            <SectionTitle>Add Payment Detail </SectionTitle>
            <Spacer />
            Date of Payment Confirmation
            <Spacer height={5} />
            <DatePicker
                popupStyle={{ zIndex: 10 ** 7 }}
                onChange={val => {
                    paymentDate.current = val.valueOf();
                }}
                defaultValue={dayjs(currTimeString, 'YYYY-MM-DD')}
            />
            <Spacer />
            <Button block type="primary" onClick={submit}>
                Confirm
            </Button>
        </Box>
    );
}
