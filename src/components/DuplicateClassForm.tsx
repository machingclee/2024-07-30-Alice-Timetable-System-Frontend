import { Box } from '@mui/material';
import Label from './Label';
import Spacer from './Spacer';
import { useState } from 'react';
import { Button, Select } from 'antd';
import { useAppDispatch } from '../redux/hooks';
import { StudentThunkAction } from '../redux/slices/studentSlice';
import DuplicateClassDialog from './DuplicateClassDialog';
import { Class } from '../prismaTypes/types';

export default function DuplicateClassForm(props: { classEvent: Class }) {
    const { classEvent } = props;
    const dispatch = useAppDispatch();
    const { id } = classEvent;
    const [week, setWeek] = useState(2);

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
            <Label label="UpdateClassForm.tsx" offsetTop={0} offsetLeft={180} />
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <div>Duplicate To</div>
                <Spacer height={5} />
                <Select
                    dropdownStyle={{ zIndex: 10 ** 4 }}
                    style={{ width: 80 }}
                    onChange={value => {
                        setWeek(value);
                    }}
                    value={week}
                    options={Array(10)
                        .fill(null)
                        .map((_, index) => ({
                            value: index + 2,
                            label: `${index + 2}`,
                        }))}
                />
                <Spacer height={5} />
                <div>Weeks</div>
            </div>
            <Spacer />
            <Spacer />
            <Button
                type="primary"
                block
                onClick={async () => {
                    await dispatch(
                        StudentThunkAction.duplicateClases({
                            classId: id,
                            numberOfWeeks: week,
                        })
                    ).unwrap();
                    DuplicateClassDialog.setOpen(false);
                }}
            >
                Submit
            </Button>
        </Box>
    );
}
