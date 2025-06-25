import { useAppDispatch } from '@/redux/hooks';
import studentSlice from '@/redux/slices/studentSlice';
import { WeeklyClassEvent } from '@/!rtk-query/api/studentApi';
import useStudentDetailPathParam from './useStudentDetailPathParam';
import RouteEnum from '@/enum/RouteEnum';
import { useNavigate } from 'react-router-dom';

export default () => {
    const { anchorTimestamp, setPathParam } = useStudentDetailPathParam();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const selectPackageAtCurrentAchoorTimestamp = (packageId: string) => {
        dispatch(
            studentSlice.actions.setSelectedPackageAndActiveAnchorTimestamp({
                type: 'go-to-target-lesson',
                packageId: packageId || '',
                desiredAnchorTimestamp: anchorTimestamp,
                setURLAnchorTimestamp: timestamp =>
                    setPathParam({ anchorTimestamp: timestamp, packageId: packageId || '' }),
            })
        );
    };

    const selectPackageAtFirstLessonTimestamp = (props: { packageId: string; weeklyClassEvent: WeeklyClassEvent }) => {
        const { packageId, weeklyClassEvent } = props;
        dispatch(
            studentSlice.actions.setSelectedPackageAndActiveAnchorTimestamp({
                type: 'go-to-first-lesson',
                packageId: packageId || '',
                weeklyClassEvent,
                setURLAnchorTimestamp: timestamp =>
                    setPathParam({ anchorTimestamp: timestamp, packageId: packageId || '' }),
            })
        );
    };
    const navigateToPackage = (props: { studentId: string; anchorTimestamp: number; packageId: string }) => {
        const { anchorTimestamp, studentId, packageId } = props;
        const url = `${RouteEnum.DASHBOARD_STUDENTS}/${studentId}/?anchorTimestamp=${anchorTimestamp}&&packageId=${packageId}`;
        navigate(url, { replace: false });
    };

    return {
        selectPackageAtCurrentAchoorTimestamp,
        selectPackageAtFirstLessonTimestamp,
        setPathParam,
        anchorTimestamp,
        navigateToPackage,
    };
};
