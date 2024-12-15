import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import AddStudentDialog from './components/AddStudentDialog';
import { Button } from 'antd';
import AddStudentForm from './components/AddStudentForm';
import Spacer from '../../components/Spacer';
import { Box } from '@mui/material';
import SectionTitle from '../../components/SectionTitle';
import StudentRow from './components/StudentRow';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import EditStudentDialog from './components/EditStudentDialog';
import escapeStringRegexp from 'escape-string-regexp';
import { StudentThunkAction } from '../../redux/slices/studentSlice';

export default function Students() {
    const dispatch = useAppDispatch();
    const ids = useAppSelector(s => s.student.students.ids) || [];
    const [filter, setFilter] = useState('');
    const idToStudent = useAppSelector(s => s.student.students.idToStudent);
    const openAddUserDialog = () => {
        AddStudentDialog.setContent(() => () => <AddStudentForm />);
        AddStudentDialog.setOpen(true);
    };

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
        <div>
            <SectionTitle style={{ marginBottom: 20 }}>Students</SectionTitle>

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
                <Button type="primary" onClick={openAddUserDialog}>
                    Add Student
                </Button>
            </div>

            <Spacer />

            <Box>{filteredIds?.map(studentId => <StudentRow studentId={studentId} />)}</Box>

            <AddStudentDialog.render />
            <EditStudentDialog.render />
        </div>
    );
}
