import { PropsWithChildren, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import Spacer from '../../../components/Spacer';
import SectionTitle from '../../../components/SectionTitle';
import dayjs from 'dayjs';
import { Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import Label from '../../../components/Label';
import { TimetableClass } from '../../../dto/dto';
import { PublicThunkAction } from '../../../redux/slices/publicSlice';

export const Container = (props: PropsWithChildren) => {
    return (
        <Box
            sx={{
                '& th, & td': {
                    textAlign: 'left',
                    paddingRight: '20px',
                    paddingBottom: '10px',
                },
            }}
            style={{ padding: 30 }}
        >
            <Label label="PackageClassesStatus.tsx" />
            {props.children}
        </Box>
    );
};

export default function PackageClassesStatus() {
    const { packageUUID } = useParams<{ packageUUID: string }>();
    const dispatch = useAppDispatch();
    const classes = useAppSelector(s => s.public.classes);

    useEffect(() => {
        console.log('packageIdpackageId', packageUUID);
        if (packageUUID) {
            dispatch(PublicThunkAction.getClassesStatus({ pkgUUID: packageUUID }));
        }
    }, [packageUUID, dispatch]);

    if (classes?.length === 0) {
        return <Container>No class yet.</Container>;
    }

    const { course_name, first_name, last_name, chinese_first_name, chinese_last_name } = classes?.[0] || {};

    return (
        <Container>
            <SectionTitle>{`${first_name} ${last_name} (${chinese_last_name}${chinese_first_name})`}</SectionTitle>
            <Spacer height={5} />
            <SectionTitle>{course_name}</SectionTitle>
            <Spacer />
            <table>
                <thead>
                    <th>Day</th>
                    <th>Time</th>
                    <th>Status</th>
                </thead>
                <tbody>{classes?.map(cls => <ClassRow cls={cls} />) || []}</tbody>
            </table>
        </Container>
    );
}

export const ClassRow = (props: { cls: TimetableClass }) => {
    const { cls } = props;
    const { class_status, hour_unix_timestamp } = cls;
    const formattedDay = dayjs(hour_unix_timestamp).format('YYYY-MM-DD');
    const formattedTime = dayjs(hour_unix_timestamp).format('HH:mm');
    return (
        <tr>
            <td>{formattedDay}</td>
            <td>{formattedTime}</td>
            <td>{class_status}</td>
        </tr>
    );
};
