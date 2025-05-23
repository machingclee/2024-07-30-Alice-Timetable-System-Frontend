import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { Button } from 'antd';
import AddStudentModal from './components/AddStudentModal';
import Spacer from '../../components/Spacer';
import { Box } from '@mui/material';
import SectionTitle from '../../components/SectionTitle';
import StudentRow from './components/StudentRow';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import EditStudentDialog from './components/EditStudentDialog';
import escapeStringRegexp from 'escape-string-regexp';
import { StudentThunkAction } from '../../redux/slices/studentSlice';
import AliceModalTrigger from '../../components/AliceModalTrigger';

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
            <Spacer />
            {/* Autocomplete for searching students */}
            <Autocomplete
                freeSolo // Allows arbitrary input not limited to the options
                options={filteredIds.map(id => {
                    const student = idToStudent?.[id];
                    const searchDisplay = (() => {
                        let result = '';
                        if (student?.firstName) {
                            result += student.firstName;
                        }
                        if (student?.lastName) {
                            result += ' ' + student.lastName;
                        }
                        return result;
                    })();
                    return searchDisplay;
                })}
                onInputChange={(_, newValue) => {
                    setFilter(newValue || '');
                }}
                renderInput={params => (
                    <TextField
                        {...params}
                        label="Find the student"
                        size="small"
                        style={{ backgroundColor: 'white' }}
                        placeholder="Chinese Name, English Name, School Name, Parent Email, etc."
                        variant="outlined"
                    />
                )}
            />

            <div
                style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    marginTop: 20,
                }}
            >
                <AliceModalTrigger modalContent={AddStudentModal}>
                    <Button type="primary">Add Student</Button>
                </AliceModalTrigger>
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
