import { Box } from '@mui/material';
import Spacer from './Spacer';
import { useState } from 'react';
import { Button, Select } from 'antd';
import DuplicateClassDialog from './DuplicateClassDialog';
import { ClassDTO } from '../dto/kotlinDto';
import { studentApi } from '@/!rtk-query/api/studentApi';

export default function DuplicateClassForm(props: { class: ClassDTO; isTimeslotInThePast: boolean }) {
    const { class: classEvent, isTimeslotInThePast } = props;
    const { id } = classEvent;
    const [week, setWeek] = useState(2);
    const [duplicateClassMutation] = studentApi.endpoints.duplicateClass.useMutation();
    return (
        <Box
            style={{
                padding: '40px',
                overflowY: 'auto',
                paddingBottom: 60,
            }}
        >
            <div style={{ alignItems: 'center', display: 'flex' }}>
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
                    await duplicateClassMutation({
                        classId: id,
                        numberOfWeeks: week,
                        isTimeslotInThePast,
                    }).unwrap();
                    DuplicateClassDialog.close();
                }}
            >
                Submit
            </Button>
        </Box>
    );
}
