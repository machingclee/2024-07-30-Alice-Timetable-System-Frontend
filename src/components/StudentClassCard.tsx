import { StudentSliceState } from '@/redux/slices/studentSlice';
import getColorForClassStatus from '@/utils/getColorForClassStatus';
import { useState } from 'react';

export default function StudentClassCard(props: {
    classEvent: StudentSliceState['massTimetablePage']['hrUnixTimestampToTimetableClasses'][string][number];
    dayUnixTimestamp: number;
    currHourUnixTimestamp: number;
    classminToHeight?: (min: number) => number;
}) {
    const { classEvent, currHourUnixTimestamp, dayUnixTimestamp, classminToHeight: minToHeight } = props;
    const [height, setHeight] = useState<number | null>(null);
    const invalidData = dayUnixTimestamp >= currHourUnixTimestamp;
    const { student } = classEvent;

    const engName = `${student.lastName} ${student.firstName}`;
    const chiName = student.chineseLastName + student.chineseFirstName;
    const nameComponent = () => {
        if (classEvent.isPlaceHolderForPaddingDisplay) {
            return `placeholder from ${engName}`;
        }
        return (
            <>
                {chiName ? (
                    <div className="text-[16px] px-1">
                        {chiName} {engName}
                    </div>
                ) : (
                    <div className="text-[16px] px-1">{engName}</div>
                )}
            </>
        );
    };

    if (classEvent.isPlaceHolderForPaddingDisplay) {
        return <div className="w-[150px]"></div>;
    }

    return (
        <div
            onMouseEnter={() => setHeight(150)}
            onMouseLeave={() => setHeight(null)}
            className="rounded-[4px]"
            style={{
                border: '1px solid rgba(0,0,0,0.2)',
                cursor: 'pointer',
                margin: '5px',
                minHeight: '50px',
                transition: 'height 0.18s ease-in-out',
                overflow: 'hidden',
                maxWidth: 150,
                width: 150,
                height: (() => {
                    if (height != null) {
                        return height;
                    } else {
                        return minToHeight ? minToHeight(classEvent.class.min) : 1.2 * (classEvent.class.min || 0) - 10;
                    }
                })(),
                backgroundColor: (() => {
                    if (invalidData) {
                        return 'red';
                    } else {
                        return getColorForClassStatus(classEvent.class.classStatus);
                    }
                })(),
                fontSize: 14,
                color: 'white',
                // textAlign: 'center',
            }}
        >
            <div style={{ padding: 4, backgroundColor: 'rgba(0,0,0,0.4)', fontSize: 12 }}>{nameComponent()}</div>
            <div
                className="mt-1"
                style={{ fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
                <div className="bg-[rgba(255,255,255,0.2)] mt-1 py-0 px-2 text-sm rounded-sm">
                    {classEvent.student.studentCode}
                </div>
            </div>
            <div className="flex justify-center my-1 text-[15px] px-2">{`${classEvent.course.courseName}`}</div>
            <div className="flex justify-center mb-1">{`(${classEvent.class.min} min)`}</div>
        </div>
    );
}
