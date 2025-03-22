import { useState } from 'react';
import { Box } from '@mui/material';
import colors from '../constant/colors';
import boxShadow from '../constant/boxShadow';
import getEnv from '../utils/getEnv';
import { TimetableClassEvent } from '../dto/kotlinDto';

const FRONTEND_URL = getEnv().VITE_FRONTEND_URL;

export default function StudentClassCard(props: {
    classEvent: TimetableClassEvent;
    dayUnixTimestamp: number;
    currHourUnixTimestamp: number;
    classminToHeight?: (min: number) => number;
}) {
    const { classEvent, currHourUnixTimestamp, dayUnixTimestamp, classminToHeight: minToHeight } = props;
    const [displayOnlyclassEventHeight, setDisplayOnlyClassEventHeight] = useState<number | null>(null);
    const invalidData = dayUnixTimestamp >= currHourUnixTimestamp;
    const { student } = classEvent;

    const engName = `${student.lastName} ${student.firstName}`;
    const chiName =
        student.chineseFirstName && student.chineseLastName ? `${student.firstName}${student.lastName}` : '';

    return (
        <Box
            onMouseEnter={() => {
                setDisplayOnlyClassEventHeight(120);
            }}
            onMouseLeave={() => {
                setDisplayOnlyClassEventHeight(null);
            }}
            onClick={() => {
                console.log('FRONTEND_URL:', FRONTEND_URL);
                console.log('studentId:', classEvent.student.id);
                window.open(
                    FRONTEND_URL + `/dashboard/students/${classEvent.student.id}/${currHourUnixTimestamp}`,
                    '_blank'
                );
            }}
            style={{
                border: '1px solid rgba(0,0,0,0.2)',
                cursor: 'pointer',
                margin: '5px',
                boxShadow: boxShadow.SHADOW_62,
                minHeight: '50px',
                transition: 'height 0.18s ease-in-out',
                zIndex: displayOnlyclassEventHeight ? 10 ** 7 : 10 ** 5,
                overflow: 'hidden',
                maxWidth: 150,
                width: 150,
                height:
                    displayOnlyclassEventHeight ||
                    (minToHeight
                        ? minToHeight(classEvent.studentPackage.min)
                        : 1.2 * (classEvent.studentPackage.min || 0) - 10),
                backgroundColor: (() => {
                    if (invalidData) {
                        return 'red';
                    } else {
                        switch (classEvent.class.classStatus) {
                            case 'PRESENT':
                                return colors.GREEN_BLUE;
                            case 'TRIAL':
                                return colors.PINK;
                            case 'SUSPICIOUS_ABSENCE':
                                return colors.ORANGE;
                            case 'ILLEGIT_ABSENCE':
                                return colors.RED;
                            case 'LEGIT_ABSENCE':
                                return colors.GREY;
                            case 'MAKEUP':
                                return colors.BLUE;
                            case 'RESERVED':
                                return colors.CYAN;
                            case 'CHANGE_OF_CLASSROOM':
                                return colors.PURPLE;
                        }
                    }
                })(),
                borderRadius: 4,
                fontSize: 14,
                color: 'white',
                textAlign: 'center',
            }}
        >
            {/* <div style={{ padding: 4 }}>{classEvent.course_name}</div> */}
            {chiName ? (
                <div style={{ padding: 4, fontSize: 20 }}>{chiName}</div>
            ) : (
                <div style={{ padding: 4, fontSize: 20 }}>{engName}</div>
            )}
            <div style={{ padding: 4 }}>{classEvent.student.studentCode}</div>
        </Box>
    );
}
