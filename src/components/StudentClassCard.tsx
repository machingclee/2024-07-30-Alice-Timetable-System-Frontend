import { Box } from '@mui/material';
import colors from '../constant/colors';
import boxShadow from '../constant/boxShadow';
import { TimetableClassEvent } from '../dto/kotlinDto';
import Sep from './Sep';
import Spacer from './Spacer';

export default function StudentClassCard(props: {
    classEvent: TimetableClassEvent;
    dayUnixTimestamp: number;
    currHourUnixTimestamp: number;
    classminToHeight?: (min: number) => number;
}) {
    const { classEvent, currHourUnixTimestamp, dayUnixTimestamp, classminToHeight: minToHeight } = props;
    const invalidData = dayUnixTimestamp >= currHourUnixTimestamp;
    const { student } = classEvent;

    const engName = `${student.lastName} ${student.firstName}`;
    const chiName =
        student.chineseFirstName && student.chineseLastName ? `${student.firstName}${student.lastName}` : '';
    const nameComponent = () => {
        return (
            <>
                {chiName ? (
                    <div className="text-[16px] px-1">{chiName}</div>
                ) : (
                    <div className="text-[16px] px-1">{engName}</div>
                )}
            </>
        );
    };

    return (
        <Box
            className="rounded-md"
            style={{
                border: '1px solid rgba(0,0,0,0.2)',
                cursor: 'pointer',
                margin: '5px',
                boxShadow: boxShadow.SHADOW_62,
                minHeight: '50px',
                transition: 'height 0.18s ease-in-out',
                overflow: 'hidden',
                maxWidth: 150,
                width: 150,
                height: minToHeight
                    ? minToHeight(classEvent.studentPackage.min)
                    : 1.2 * (classEvent.studentPackage.min || 0) - 10,
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
                fontSize: 14,
                color: 'white',
                // textAlign: 'center',
            }}
        >
            {/* <div style={{ padding: 4 }}>{classEvent.course_name}</div> */}
            <div style={{ padding: 4, backgroundColor: 'rgba(0,0,0,0.4)', fontSize: 12 }}>{nameComponent()}</div>
            <div className="flex justify-center my-1 text-[15px] px-2">{classEvent.course.courseName}</div>
            <Sep />

            <Spacer height={5} />
            <div style={{ fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div
                    style={{
                        backgroundColor: 'rgba(255,255,255,0.2)',
                        padding: '0px 5px',
                        borderRadius: 4,
                        marginLeft: 5,
                        fontSize: 14,
                    }}
                >
                    {classEvent.student.studentCode}
                </div>
            </div>
        </Box>
    );
}
