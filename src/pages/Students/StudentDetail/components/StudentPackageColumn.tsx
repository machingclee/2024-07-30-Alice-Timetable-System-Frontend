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
import { studentApi } from '@/!rtk-query/api/studentApi';
import LoadingOverlay from '@/components/LoadingOverlay';
import { courseApi } from '@/!rtk-query/api/courseApi';

export default function StudentPackageColumn(props: { packagesOffsetY: number; collapseTimtable: boolean }) {
    const { packagesOffsetY, collapseTimtable } = props;
    // get packages

    const { studentId } = useParams<{ studentId: string }>();
    const { data: packagesRes, isFetching } = studentApi.endpoints.getStudentPackages.useQuery({
        studentId: studentId || '',
    });
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
    const { data: courses } = courseApi.endpoints.getCourses.useQuery();
    const courseIds = Array.from(new Set(flattedPackages?.map(pkg => pkg.course.id)));
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
                className="!scrollbar-hide"
                style={{
                    minWidth: 300,
                    height: 'calc(100vh - 40px)',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'opacity 0.5s eas-in-out',
                }}
            >
                <div className="scrollbar-hide flex items-center justify-between mb-2">
                    <Title className="!mb-0">Student Packages</Title>
                    <Button
                        onClick={() => {
                            AddPackageDialog.setWidth('sm');
                            AddPackageDialog.setContent(() => () => (
                                <AddPackageForm studentId={studentId || ''} studentName={`${firstName} ${lastName}`} />
                            ));
                            AddPackageDialog.setOpen(true);
                        }}
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
                    className="scrollbar-hide"
                    style={{
                        width: '100%',
                        height: `calc(100vh-${packagesOffsetY}px)`,
                        overflowY: 'scroll',
                    }}
                >
                    <div className="flex justify-center w-full h-full">
                        <div style={{ width: '100%' }}>
                            <LoadingOverlay isLoading={isFetching} listLength={flattedPackages?.length || 0}>
                                {courseIds.map(courseId => {
                                    const packagesRes = flattedPackages.filter(pkgRes => pkgRes.course.id === courseId);
                                    const courseName = courses?.idToCourse?.[courseId]?.courseName || '';
                                    return (
                                        <div
                                            className="border-1 border-emerald-400 mt-2 p-2 rounded-xl space-y-2 bg-teal-100"
                                            key={courseName}
                                        >
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
                            </LoadingOverlay>
                        </div>
                    </div>
                </CustomScrollbarContainer>
            </div>
        </div>
    );
}
