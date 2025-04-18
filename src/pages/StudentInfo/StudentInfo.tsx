import { Container } from '@mui/material';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import useQueryThunk from '../../reactQueries/useQueryThunk';
import { StudentThunkAction } from '../../redux/slices/studentSlice';
import getColorForClassStatus from '@/utils/getColorForClassStatus';
import { Separator } from '@/components/ui/separator';
import { FaLocationDot, FaRegClock } from 'react-icons/fa6';
import { PiStudentFill } from 'react-icons/pi';
import { FaCalendarTimes, FaSadTear } from 'react-icons/fa';
import CustomScrollbarContainer from '@/components/CustomScrollbarContainer';
import Spacer from '@/components/Spacer';
import { Button } from 'antd';
import { GrFormNextLink } from 'react-icons/gr';
import { LucideCalendarDays } from 'lucide-react';
import useSelectPackage from '@/hooks/useSelectPackage';
import { useAppDispatch } from '@/redux/hooks';
import appSlice from '@/redux/slices/appSlice';

export default function StudentInfo() {
    const { studentId = '' } = useParams<{ studentId: string }>();
    const { navigateToPackage, selectPackage } = useSelectPackage();
    const { query } = useQueryThunk({ thunk: StudentThunkAction.getStudentDetail, staleTime: 2000 })({ studentId });
    const { data, isLoading } = query;
    const dispatch = useAppDispatch();
    const { student, studentPackages = [] } = data || {};
    const { chineseFirstName = '', chineseLastName = '', firstName = '', lastName = '' } = student || {};
    const engName = `${firstName} ${lastName}`;
    const chiName = chineseFirstName && chineseLastName ? `${chineseLastName} ${chineseFirstName}` : '';

    if (!data) {
        return null;
    }

    return (
        <CustomScrollbarContainer>
            <Container style={{ padding: 10 }} className="h-[100vh]">
                {isLoading && 'loading...'}
                {!isLoading && (
                    <>
                        <Spacer height={40} />
                        <div className="space-y-3 bg-[rgb(255,255,255,0.6)] p-4 rounded-xl border-1">
                            <div className="flex gap-2">
                                <div className="flex text-2xl pl-4 items-center gap-2">
                                    <div className="w-10">
                                        <FaCalendarTimes />
                                    </div>
                                    Package Information
                                </div>
                            </div>
                            <div className="px-4 py-2 rounded-md flex gap-2 items-center">
                                <div className="w-10">
                                    <PiStudentFill size={30} />
                                </div>

                                <div className="text-lg">{chiName}</div>
                                <div className="text-lg">{engName}</div>
                            </div>
                            <Separator />
                            {studentPackages.length === 0 && (
                                <div className="flex justify-center items-center text-2xl gap-3 my-10">
                                    <FaSadTear size={30} /> No Data
                                </div>
                            )}
                            {studentPackages.length > 0 && (
                                <div className="space-y-6">
                                    {studentPackages
                                        .sort((pkg1, pkg2) => pkg1.package.startDate - pkg2.package.startDate)
                                        .map(pkgInfo => {
                                            const { classes, course, package: pkg } = pkgInfo;
                                            return (
                                                <div className="bg-white px-4 py-2 rounded-sm border-1 shadow-md border-[rgb(87,141,103)]">
                                                    <div className="flex gap-4 mb-3 mt-1">
                                                        <div className="text-xl">{course.courseName}</div>
                                                    </div>
                                                    <Separator className="mb-4 " />
                                                    <div className={`flex`}>
                                                        <div className="w-50 space-y-2">
                                                            <div>
                                                                <Button
                                                                    className="flex items-center"
                                                                    onClick={() => {
                                                                        navigateToPackage({
                                                                            anchorTimestamp: pkg.startDate + '',
                                                                            studentId,
                                                                        });
                                                                        setTimeout(() => {
                                                                            dispatch(appSlice.actions.setLoading(true));
                                                                        }, 1000);
                                                                        setTimeout(() => {
                                                                            selectPackage(pkg.id + '');
                                                                            dispatch(
                                                                                appSlice.actions.setLoading(false)
                                                                            );
                                                                        }, 2000);
                                                                    }}
                                                                >
                                                                    <GrFormNextLink size={22} />
                                                                    Go to package
                                                                </Button>
                                                            </div>
                                                        </div>
                                                        <div
                                                            style={{ borderLeft: '2px solid rgb(87,141,103,0.2)' }}
                                                            className="pl-4 flex-1"
                                                        >
                                                            {classes
                                                                .sort(
                                                                    (a, b) => a.hourUnixTimestamp - b.hourUnixTimestamp
                                                                )
                                                                .map(cls => {
                                                                    const {
                                                                        actualClassroom,
                                                                        classStatus,
                                                                        hourUnixTimestamp,
                                                                    } = cls;
                                                                    const statusColor =
                                                                        getColorForClassStatus(classStatus);

                                                                    const shouldGreyout =
                                                                        new Date().getTime() > hourUnixTimestamp;
                                                                    return (
                                                                        <>
                                                                            <div className="!w-full ">
                                                                                <div
                                                                                    style={{
                                                                                        opacity: shouldGreyout
                                                                                            ? 0.4
                                                                                            : 1,
                                                                                    }}
                                                                                    className="flex px-2 py-0 rounded-md mb-1.5"
                                                                                >
                                                                                    <div className="w-48">
                                                                                        <div
                                                                                            className={`
                                                                                flex inline-block bg-[#a0bea4] 
                                                                                px-2 rounded-sm  !text-[rgba(255,255,255,0.8)]
                                                                                items-center`}
                                                                                        >
                                                                                            <div className="flex items-center gap-2">
                                                                                                <FaLocationDot />{' '}
                                                                                                {actualClassroom}
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="w-30 items-center flex gap-1 mr-4">
                                                                                        <LucideCalendarDays size={16} />
                                                                                        {dayjs(
                                                                                            hourUnixTimestamp
                                                                                        ).format('YYYY-MM-DD')}
                                                                                    </div>
                                                                                    <div className="w-30 items-center flex gap-2">
                                                                                        <FaRegClock />
                                                                                        {dayjs(
                                                                                            hourUnixTimestamp
                                                                                        ).format('HH:mm:ss')}
                                                                                    </div>
                                                                                    <div className={`w-40`}>
                                                                                        <div
                                                                                            style={{
                                                                                                color: 'white',
                                                                                                backgroundColor:
                                                                                                    statusColor,
                                                                                                border: `1px solid ${statusColor}`,
                                                                                            }}
                                                                                            className={`font-mono text-sm 
                                                                                                px-2 rounded-sm bg-white inline-block
                                                                                                `}
                                                                                        >
                                                                                            {classStatus}
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <Separator className="mb-[0.4rem] " />
                                                                        </>
                                                                    );
                                                                })}
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                </div>
                            )}
                        </div>
                        <Spacer height={40} />
                    </>
                )}
            </Container>
        </CustomScrollbarContainer>
    );
}
