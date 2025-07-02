import { useState } from 'react';
import { Button } from 'antd';
import AddStudentModal from './components/AddStudentModal';
import Spacer from '../../components/Spacer';
import SectionTitle from '../../components/SectionTitle';
import StudentRow from './components/StudentRow';

import EditStudentDialog from './components/EditStudentDialog';
import escapeStringRegexp from 'escape-string-regexp';
import AliceModalTrigger from '../../components/AliceModalTrigger';
import { Input } from '@/components/ui/input';
import { IoMdSearch } from 'react-icons/io';
import { MdOutlinePersonAddAlt } from 'react-icons/md';
import CustomScrollbarContainer from '@/components/CustomScrollbarContainer';
import ContentContainer from '@/components/ContentContainer';
import { studentApi } from '@/!rtk-query/api/studentApi';
import LoadingContainer from '@/components/LoadingContainer';

export default function Students() {
    const [filter, setFilter] = useState('');
    const { data: studentsData, isLoading: isLoadingStudents } = studentApi.endpoints.getStudents.useQuery();
    const { studentIdToStudent, studentIds = [] } = studentsData || {};

    const filterRegex = new RegExp(escapeStringRegexp(filter), 'i');
    const filteredIds = studentIds.filter(id => {
        const student = studentIdToStudent?.[id];
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

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                height: 'calc(100vh - 20px)',
            }}
        >
            <SectionTitle style={{ marginBottom: 20 }}>Students</SectionTitle>
            <ContentContainer>
                <div className="space-y-2">
                    {/* Autocomplete for searching students */}
                    <div>
                        <label className="flex items-center gap-2 text-base">
                            <IoMdSearch size={24} />
                            Search for Students
                        </label>
                    </div>
                    <div className="flex items-center gap-4">
                        <Input
                            placeholder="Chinese Name, English Name, School Name, Parent Email, etc."
                            className="bg-white border-1 border-emerald-500 shadow-md"
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
            </ContentContainer>

            <Spacer />

            <CustomScrollbarContainer
                style={{
                    flex: 1,
                    height: 20,
                }}
            >
                <LoadingContainer isLoading={isLoadingStudents}>
                    <div className="space-y-2">
                        {filteredIds?.map(studentId => <StudentRow studentId={studentId} />)}
                    </div>
                </LoadingContainer>
                <Spacer height={100} />
            </CustomScrollbarContainer>

            <EditStudentDialog.render />
        </div>
    );
}
