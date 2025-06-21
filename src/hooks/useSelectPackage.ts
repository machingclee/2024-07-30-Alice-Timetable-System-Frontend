import { useAppDispatch } from '@/redux/hooks';
import studentSlice from '@/redux/slices/studentSlice';
import useAnchorTimestamp from './useStudentDetailPathParam';
import RouteEnum from '@/enum/RouteEnum';
import { useNavigate } from 'react-router-dom';

export default () => {
    const { anchorTimestamp, setPathParam } = useAnchorTimestamp();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const selectPackage = (packageId: string) => {
        dispatch(
            studentSlice.actions.setSelectedPackageAndActiveAnchorTimestamp({
                packageId: packageId || '',
                desiredAnchorTimestamp: anchorTimestamp,
                setURLAnchorTimestamp: timestamp =>
                    setPathParam({ anchorTimestamp: timestamp, packageId: packageId || '' }),
            })
        );
    };
    const navigateToPackage = (props: { studentId: string; anchorTimestamp: string }) => {
        const { anchorTimestamp, studentId } = props;
        const url = `${RouteEnum.DASHBOARD_STUDENTS}/${studentId}/?anchorTimestamp=${anchorTimestamp}`;
        navigate(url, { replace: true });
    };

    return { selectPackage, setPathParam, anchorTimestamp, navigateToPackage };
};
