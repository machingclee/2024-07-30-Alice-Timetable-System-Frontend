import { Button } from 'antd';
import Title from '../../../../components/Title';
import AddPackageForm from '../../components/AddPackageForm';
import AddPackageDialog from '../../components/AddPackageDialog';
import { useParams } from 'react-router-dom';
import Spacer from '../../../../components/Spacer';
import Sep from '../../../../components/Sep';
import { Switch } from '@mui/material';
import CustomScrollbarContainer from '../../../../components/CustomScrollbarContainer';
import { useAppSelector } from '../../../../redux/hooks';
import StudentPackage from './StudentPackage';
import { useDispatch } from 'react-redux';
import studentSlice from '../../../../redux/slices/studentSlice';
import { MdOutlineEventNote } from 'react-icons/md';
import { StudentPackageRepsonse } from '../../../../dto/kotlinDto';

export default function StudentPackageColumn(props: { packagesOffsetY: number; collapseTimtable: boolean }) {
    const { packagesOffsetY, collapseTimtable } = props;
    const packagesRes = useAppSelector(s => s.student.studentDetailTimetablePage.studentPackages);
    const dispatch = useDispatch();
    const { studentId } = useParams<{ studentId: string }>();
    const studentDetail = useAppSelector(s => s.student.studentDetailTimetablePage.detail);
    const { firstName, lastName } = studentDetail || {};
    const label = { inputProps: { 'aria-label': 'Switch demo' } };
    const handleShowAllClassesOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(studentSlice.actions.setShowAllClassesForOneStudent(event.target.checked));
    };
    const flattedPackages = packagesRes?.ids?.map(
        id => packagesRes?.idToPackageResponse?.[id || '']
    ) as StudentPackageRepsonse[];
    const courseNames = Array.from(new Set(flattedPackages?.map(pkg => pkg.course.courseName)));

    return (
        <div
            style={{
                flex: collapseTimtable ? 1 : 0,
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                transition: 'width 0.3s ease-in-out',
            }}
        >
            <div
                style={{
                    minWidth: 300,
                    height: 'calc(100vh - 40px)',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'opacity 0.5s eas-in-out',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Title>Student Packages</Title>
                    <Button
                        style={{ minWidth: 40, minHeight: 40 }}
                        onClick={() => {
                            AddPackageDialog.setWidth('sm');
                            AddPackageDialog.setContent(() => () => (
                                <AddPackageForm studentId={studentId || ''} studentName={`${firstName} ${lastName}`} />
                            ));
                            AddPackageDialog.setOpen(true);
                        }}
                        shape="circle"
                    >
                        Add
                    </Button>
                </div>
                <Spacer height={5} />
                <Sep />
                <Spacer />
                <div>
                    <div style={{ marginLeft: '10px' }}>Show All Classes</div>
                    <Switch
                        onChange={event => {
                            handleShowAllClassesOnChange(event);
                        }}
                        {...label}
                        defaultChecked
                    />
                </div>
                <CustomScrollbarContainer
                    style={{
                        width: '100%',
                        height: `calc(100vh-${packagesOffsetY}px)`,
                    }}
                >
                    <div className="flex justify-center w-full">
                        <div style={{ width: '100%' }}>
                            {courseNames.map(courseName => {
                                const packagesRes = flattedPackages.filter(
                                    pkgRes => pkgRes.course.courseName === courseName
                                );
                                return (
                                    <div>
                                        <div
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <MdOutlineEventNote
                                                size={24}
                                                style={{
                                                    marginRight: 5,
                                                    marginLeft: 5,
                                                }}
                                            />
                                            {courseName}
                                        </div>
                                        <div
                                            style={{
                                                display: collapseTimtable ? 'flex' : 'unset',
                                            }}
                                        >
                                            {packagesRes?.map(pkgRes => {
                                                return (
                                                    <StudentPackage
                                                        packageId={String(pkgRes.studentPackage.id)}
                                                        key={pkgRes.studentPackage.id}
                                                    />
                                                );
                                            })}
                                        </div>
                                        <Spacer />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </CustomScrollbarContainer>
            </div>
        </div>
    );
}
