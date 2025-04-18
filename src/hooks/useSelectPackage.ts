import { useAppDispatch } from '@/redux/hooks';
import studentSlice from '@/redux/slices/studentSlice';
import useAnchorTimestamp from './useAnchorTimestamp';
import RouteEnum from '@/enum/RouteEnum';
import { useNavigate } from 'react-router-dom';

export default () => {
    const { anchorTimestamp, setURLAnchorTimestamp } = useAnchorTimestamp();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const selectPackage = (packageId: string) => {
        dispatch(
            studentSlice.actions.setSelectedPackageId({
                packageId: packageId || '',
                setURLAnchorTimestamp: setURLAnchorTimestamp,
            })
        );
    };
    const navigateToPackage = (props: { studentId: string; anchorTimestamp: string }) => {
        const { anchorTimestamp, studentId } = props;
        const url = `${RouteEnum.DASHBOARD_STUDENTS}/${studentId}/?anchorTimestamp=${anchorTimestamp}`;
        navigate(url, { replace: true });
    };

    return { selectPackage, setURLAnchorTimestamp, anchorTimestamp, navigateToPackage };
};
