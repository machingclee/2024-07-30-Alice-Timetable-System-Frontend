import { HrUnixTimestampToLessons } from '@/redux/slices/studentSlice';
import getColorForClassStatus from '@/utils/getColorForClassStatus';
import { useState } from 'react';

export default function StudentClassCard(props: {
    lesson: HrUnixTimestampToLessons[string][number];
    dayUnixTimestamp: number;
    currHourUnixTimestamp: number;
    classminToHeight?: (min: number) => number;
}) {
    const { lesson: lesson, currHourUnixTimestamp, dayUnixTimestamp, classminToHeight: minToHeight } = props;
    const [height, setHeight] = useState<number | null>(null);
    const invalidData = dayUnixTimestamp >= currHourUnixTimestamp;
    const { student } = lesson;

    const engName = `${student.lastName} ${student.firstName}`;
    const chiName = student.chineseLastName + student.chineseFirstName;
    const nameComponent = () => {
        if (lesson.isPlaceHolderForPaddingDisplay) {
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

    if (lesson.isPlaceHolderForPaddingDisplay) {
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
                        return minToHeight ? minToHeight(lesson.class.min) : 1.2 * (lesson.class.min || 0) - 10;
                    }
                })(),
                backgroundColor: (() => {
                    if (invalidData) {
                        return 'red';
                    } else {
                        return getColorForClassStatus(lesson.class.classStatus);
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
                    {lesson.student.studentCode}
                </div>
            </div>
            <div className="flex justify-center my-1 text-[15px] px-2">{`${lesson.course.courseName}`}</div>
            <div className="flex justify-center mb-1">{`(${lesson.class.min} min)`}</div>
        </div>
    );
}
