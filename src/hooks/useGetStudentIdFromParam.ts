import { useParams, useSearchParams } from 'react-router-dom';

export default () => {
    const { studentId: studentId_ } = useParams<{ studentId: string }>();
    const studentId = studentId_ || '';
    return { studentId };
};
