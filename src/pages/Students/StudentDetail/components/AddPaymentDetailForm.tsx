import { Box } from '@mui/material';
import SectionTitle from '../../../../components/SectionTitle';
import Spacer from '../../../../components/Spacer';
import { Button, DatePicker } from 'antd';
import dayjs from 'dayjs';
import { useRef } from 'react';

import AddPaymentDetailDialog from './AddPaymentDetailDialog';
import { studentApi } from '@/!!rtk-query/api/studentApi';

export default function AddPaymentDetailForm(props: { packageId: number }) {
    const { packageId } = props;
    const currTimestamp = new Date().getTime();
    const currTimeString = dayjs(currTimestamp).format('YYYY-MM-DD');
    const paymentDate = useRef(currTimestamp);
    // mark package as paid mutation
    const [markPackageAsPaid] = studentApi.endpoints.markPackageAsPaid.useMutation();
    const submit = async () => {
        AddPaymentDetailDialog.setOpen(false);
        await markPackageAsPaid({
            packageId,
            paidAt: paymentDate.current,
        }).unwrap();
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
