import { Button } from 'antd';
import Title from '../../../../components/Title';
import AddPackageForm from '../../components/AddPackageForm';
import AddPackageDialog from '../../components/AddPackageDialog';
import { useParams } from 'react-router-dom';
import { LuPlusCircle } from 'react-icons/lu';
import Spacer from '../../../../components/Spacer';
import Sep from '../../../../components/Sep';
import { Switch } from '@mui/material';
import CustomScrollbarContainer from '../../../../components/CustomScrollbarContainer';
import { useAppSelector } from '../../../../redux/hooks';
import StudentPackage from './StudentPackage';
import Label from '../../../../components/Label';
import { useDispatch } from 'react-redux';
import studentSlice from '../../../../redux/slices/studentSlice';
import { MdOutlineEventNote } from 'react-icons/md';
import { Augmented_Student_package } from '../../../../dto/dto';

export default function StudentPackageColumn(props: { packagesOffsetY: number; collapseTimtable: boolean }) {
    const { packagesOffsetY, collapseTimtable } = props;
    const packages = useAppSelector(s => s.student.studentDetailTimetablePage.packages);
    const dispatch = useDispatch();
    const { studentId } = useParams<{ studentId: string }>();
    const studentDetail = useAppSelector(s => s.student.studentDetailTimetablePage.detail);
    const { firstName, lastName } = studentDetail || {};
    const label = { inputProps: { 'aria-label': 'Switch demo' } };
    const handleShowAllClassesOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(studentSlice.actions.setShowAllClassesForOneStudent(event.target.checked));
    };
    const flattedPackages = packages?.ids?.map(id => packages?.idToPackage?.[id || '']) as Augmented_Student_package[];
    const courseNames = Array.from(new Set(flattedPackages?.map(pkg => pkg.course_name)));

    return (
        <div
            style={{
                flex: 1,
                paddingRight: 100,
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                transition: 'width 0.3s ease-in-out',
            }}
        >
            <div
                style={{
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
                    <Label label="StudentPackageColumn.tsx" offsetTop={-15} offsetLeft={20} />
                    <Title>Student Packages</Title>
                    <Button
                        style={{ width: 40, height: 40 }}
                        onClick={() => {
                            AddPackageDialog.setContent(() => () => (
                                <AddPackageForm studentId={studentId || ''} studentName={`${firstName} ${lastName}`} />
                            ));
                            AddPackageDialog.setOpen(true);
                        }}
                        shape="circle"
                    >
                        <LuPlusCircle size={30} />
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
                        height: `calc(100vh - ${packagesOffsetY}px)`,
                        width: '100%',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            width: '100%',
                        }}
                    >
                        <div style={{ width: '100%' }}>
                            {courseNames.map(courseName => {
                                const packages = flattedPackages.filter(pkg => pkg.course_name === courseName);
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
                                            {packages?.map(pkg => {
                                                return <StudentPackage packageId={String(pkg.id)} key={pkg.id} />;
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
