import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { Button } from 'antd';
import AddStudentModal from './components/AddStudentModal';
import Spacer from '../../components/Spacer';
import { Box } from '@mui/material';
import SectionTitle from '../../components/SectionTitle';
import StudentRow from './components/StudentRow';

import EditStudentDialog from './components/EditStudentDialog';
import escapeStringRegexp from 'escape-string-regexp';
import { StudentThunkAction } from '../../redux/slices/studentSlice';
import AliceModalTrigger from '../../components/AliceModalTrigger';
import { Input } from '@/components/ui/input';
import { IoMdSearch } from 'react-icons/io';
import { MdOutlinePersonAddAlt } from 'react-icons/md';

export default function Students() {
    const dispatch = useAppDispatch();
    const ids = useAppSelector(s => s.student.students.ids) || [];
    const [filter, setFilter] = useState('');
    const idToStudent = useAppSelector(s => s.student.students.idToStudent);

    const filterRegex = new RegExp(escapeStringRegexp(filter), 'i');
    const filteredIds = ids.filter(id => {
        const student = idToStudent?.[id];
        const {
            studentCode = '',
            chineseFirstName = '',
            chineseLastName = '',
            firstName = '',
            lastName = '',
            parentEmail = '',
            schoolName = '',
            phoneNumber = '',
        } = student || {};

        const sum = [
            studentCode,
            chineseFirstName,
            chineseLastName,
            `${chineseLastName} ${chineseFirstName}`,
            `${firstName} ${lastName}`,
            firstName,
            lastName,
            parentEmail,
            phoneNumber,
            schoolName,
        ].reduce((acc, curr) => {
            const sum = acc + Number(filterRegex.test(curr));
            return sum;
        }, 0);

        return sum >= 1;
    });

    console.log('filteredIds', filteredIds);

    useEffect(() => {
        dispatch(StudentThunkAction.getStudents());
    }, [dispatch]);

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                height: 'calc(100vh - 20px)',
            }}
        >
            <SectionTitle style={{ marginBottom: 20 }}>Students</SectionTitle>
            <div className="space-y-1">
                {/* Autocomplete for searching students */}
                <div>
                    <label className="flex items-center gap-2">
                        <IoMdSearch size={20} />
                        Search for Students
                    </label>
                </div>
                <div className="flex items-center gap-4">
                    <Input
                        placeholder="Chinese Name, English Name, School Name, Parent Email, etc."
                        className="bg-white"
                        value={filter}
                        onChange={e => {
                            const value = e.target.value;
                            setFilter(value);
                        }}
                    />
                    <AliceModalTrigger modalContent={AddStudentModal}>
                        <Button type="primary">
                            <MdOutlinePersonAddAlt size={20} />
                            Add Student
                        </Button>
                    </AliceModalTrigger>
                </div>
            </div>

            <Spacer />

            <Box
                style={{
                    flex: 1,
                    height: 20,
                    overflow: 'scroll',
                }}
            >
                {filteredIds?.map(studentId => <StudentRow studentId={studentId} />)}
            </Box>
            <EditStudentDialog.render />
        </div>
    );
}
