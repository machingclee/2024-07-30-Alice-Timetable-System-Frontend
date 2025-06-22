import { Container } from '@mui/material';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
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
import { useAppSelector } from '@/redux/hooks';
import React, { useEffect } from 'react';
import ContentContainer from '@/components/ContentContainer';
import { studentApi } from '@/!!rtk-query/api/studentApi';
import { cloneDeep } from 'lodash';

export default function StudentInfo() {
    const { studentId = '' } = useParams<{ studentId: string }>();
    const { navigateToPackage } = useSelectPackage();
    const accessToken = useAppSelector(s => s.auth.accessToken);
    const { data, isLoading } = studentApi.endpoints.getStudentInfo.useQuery({ studentId }, { skip: !studentId });
    const { student, studentPackages = [] } = data || {};
    const { chineseFirstName = '', chineseLastName = '', firstName = '', lastName = '' } = student || {};
    const engName = `${firstName} ${lastName}`;
    const chiName = chineseFirstName && chineseLastName ? `${chineseLastName} ${chineseFirstName}` : '';
    const numOfPackages = data?.studentPackages?.length || 0;

    useEffect(() => {
        if (numOfPackages > 0 && location.hash) {
            const elementId = location.hash.substring(1);
            const element = document.getElementById(elementId);

            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth' });
                }, 0);
            }
        }
    }, [numOfPackages]); // Re-run when location changes

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
                                    {cloneDeep(studentPackages)
                                        .sort((pkg1, pkg2) => pkg1.package.startDate - pkg2.package.startDate)
                                        .map(pkgInfo => {
                                            const { classes = [], course, package: pkg } = pkgInfo;
                                            console.log('pkgInfopkgInfopkgInfo', pkgInfo);
                                            return (
                                                <React.Fragment key={pkg.id + ''}>
                                                    <a id={pkg.id + ''} />
                                                    <div className="bg-white px-4 py-2 rounded-sm border-1 shadow-md border-[rgb(87,141,103)]">
                                                        <div className="flex gap-4 mb-3 mt-1">
                                                            <ContentContainer className="">
                                                                <div className="text-xl">{course.courseName}</div>
                                                            </ContentContainer>
                                                        </div>
                                                        <Separator className="mb-4 " />
                                                        <div className={`flex`}>
                                                            <div className="w-50 space-y-2">
                                                                {accessToken && (
                                                                    <div>
                                                                        <Button
                                                                            className="flex items-center"
                                                                            onClick={() => {
                                                                                navigateToPackage({
                                                                                    anchorTimestamp: pkg.startDate + '',
                                                                                    studentId,
                                                                                    packageId: pkg.id + '',
                                                                                });
                                                                            }}
                                                                        >
                                                                            <GrFormNextLink size={22} />
                                                                            Go to package
                                                                        </Button>
                                                                    </div>
                                                                )}
                                                            </div>

                                                            <div
                                                                style={{
                                                                    borderLeft: '2px solid rgb(87,141,103,0.2)',
                                                                }}
                                                                className="pl-4 flex-1"
                                                            >
                                                                {classes.length === 0 && <div>No Classes Yet</div>}
                                                                {classes.length > 0 &&
                                                                    classes
                                                                        .sort(
                                                                            (a, b) =>
                                                                                a.hourUnixTimestamp -
                                                                                b.hourUnixTimestamp
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
                                                                                new Date().getTime() >
                                                                                hourUnixTimestamp;
                                                                            return (
                                                                                <React.Fragment key={cls.id + ''}>
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
                                                                                                    style={{
                                                                                                        display:
                                                                                                            'inline-block',
                                                                                                    }}
                                                                                                    className={`flex bg-[#a0bea4] px-2 rounded-sm  !text-[rgba(255,255,255,0.8)] items-center`}
                                                                                                >
                                                                                                    <div className="flex items-center gap-2">
                                                                                                        <FaLocationDot />{' '}
                                                                                                        {
                                                                                                            actualClassroom
                                                                                                        }
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="w-30 items-center flex gap-1 mr-4">
                                                                                                <LucideCalendarDays
                                                                                                    size={16}
                                                                                                />
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
                                                                                </React.Fragment>
                                                                            );
                                                                        })}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </React.Fragment>
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
