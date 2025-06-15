import queryKeys from '@/reactQueries/query/queryKeys';
import useBaseQuery from '@/reactQueries/query/useBaseQuery';
import { useAppDispatch } from '@/redux/hooks';
import { NotificationThunkAction } from '@/redux/slices/notificationSlice';

export default () => {
    const dispatch = useAppDispatch();
    return useBaseQuery({
        queryFn: async () => {
            dispatch(NotificationThunkAction.getNotifications());
            return null;
        },
        enabled: true,
        queryKey: queryKeys.NOTIFICATIONS,
        gcTime: 0,
        staleTime: 0,
    });
};
