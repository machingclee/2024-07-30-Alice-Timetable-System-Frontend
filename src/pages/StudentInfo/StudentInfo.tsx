import { Box, Container } from '@mui/material';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import useQueryThunk from '../../reactQueries/useQueryThunk';
import { StudentThunkAction } from '../../redux/slices/studentSlice';

export default function StudentInfo() {
    const { studentId = '' } = useParams<{ studentId: string }>();
    const { query } = useQueryThunk({ thunk: StudentThunkAction.getStudentDetail, staleTime: 2000 })({ studentId });
    const { data, isLoading } = query;

    if (!data) {
        return null;
    }

    const { student, studentPackages } = data;
    const { chineseFirstName, chineseLastName, firstName, lastName } = student;
    const engName = `${firstName} ${lastName}`;
    const chiName = chineseFirstName && chineseLastName ? `${chineseLastName} ${chineseFirstName}` : '';
    return (
        <Container style={{ padding: 10 }}>
            {isLoading && 'loading...'}
            <div>{chiName}</div>
            <div>{engName}</div>

            <div>
                {studentPackages.map(pkgInfo => {
                    const { classes, course } = pkgInfo;

                    return (
                        <Box
                            sx={{
                                '& td': {
                                    paddingLeft: '10px',
                                },
                            }}
                        >
                            <div>{course.courseName}</div>
                            <table>
                                <tbody>
                                    {classes
                                        .sort((a, b) => a.hourUnixTimestamp - b.hourUnixTimestamp)
                                        .map(cls => {
                                            const { actualClassroom, classStatus, hourUnixTimestamp } = cls;
                                            const shouldGreyout = new Date().getTime() > hourUnixTimestamp;
                                            return (
                                                <tr style={{ opacity: shouldGreyout ? 0.2 : 1 }}>
                                                    <td>{actualClassroom}</td>
                                                    <td>{dayjs(hourUnixTimestamp).format('YYYY-MM-DD H:mm:ss')}</td>
                                                    <td>{classStatus}</td>
                                                </tr>
                                            );
                                        })}
                                </tbody>
                            </table>
                        </Box>
                    );
                })}
            </div>
        </Container>
    );
}
