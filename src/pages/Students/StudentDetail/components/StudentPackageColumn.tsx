import { Button } from 'antd';
import Title from '../../../../components/Title';
import AddPackageForm from '../../components/AddPackageForm';
import AddPackageDialog from '../../components/AddPackageDialog';
import { useParams } from 'react-router-dom';
import Spacer from '../../../../components/Spacer';
import { Switch } from '@mui/material';
import CustomScrollbarContainer from '../../../../components/CustomScrollbarContainer';
import StudentPackage from './StudentPackage';
import { useDispatch } from 'react-redux';
import studentSlice from '../../../../redux/slices/studentSlice';
import { MdOutlineEventNote } from 'react-icons/md';
import { StudentPackageRepsonse } from '../../../../dto/kotlinDto';
import { Separator } from '@/components/ui/separator';
import { studentApi } from '@/!!rtk-query/api/studentApi';

export default function StudentPackageColumn(props: { packagesOffsetY: number; collapseTimtable: boolean }) {
    const { packagesOffsetY, collapseTimtable } = props;
    // get packages
    const { studentId } = useParams<{ studentId: string }>();
    const { data: packagesRes } = studentApi.endpoints.getStudentPackages.useQuery({ studentId: studentId || '' });
    const dispatch = useDispatch();
    // get student detail
    const { data: studentDetail } = studentApi.endpoints.getStudentDetail.useQuery({ studentId: studentId || '' });
    const { firstName, lastName } = studentDetail?.student || {};
    const label = { inputProps: { 'aria-label': 'Switch demo' } };
    const handleShowAllClassesOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(studentSlice.actions.setShowAllClassesForOneStudent(event.target.checked));
    };
    const flattedPackages = packagesRes?.packageIds.map(
        id => packagesRes?.idToStudentPackage?.[id || '']
    ) as StudentPackageRepsonse[];
    console.log('packagesRes', packagesRes);
    console.log('flattedPackages', flattedPackages);
    const courseNames = Array.from(new Set(flattedPackages?.map(pkg => pkg.course.courseName)));
    console.log('courseNames', courseNames);
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
                    overflowY: 'scroll',
                    minWidth: 300,
                    height: 'calc(100vh - 40px)',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'opacity 0.5s eas-in-out',
                }}
            >
                <div className="flex items-center justify-between mb-2">
                    <Title className="!mb-0">Student Packages</Title>
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
                <Separator />
                <Spacer />
                <div>
                    <div className="mt-2">Show All Classes</div>
                    <Switch
                        className="ml-[-10px]"
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
                                    <div className="border-1 border-emerald-400 mt-2 p-2 rounded-xl space-y-2 bg-teal-100">
                                        <div className="flex items-center gap-1.5 pl-0.5">
                                            <MdOutlineEventNote size={19} />
                                            {courseName}
                                        </div>
                                        <div
                                            style={{
                                                display: collapseTimtable ? 'flex' : 'unset',
                                            }}
                                            className="!space-y-4"
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
