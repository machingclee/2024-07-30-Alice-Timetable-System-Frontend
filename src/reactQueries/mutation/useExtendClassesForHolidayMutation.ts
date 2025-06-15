import apiClient from '@/axios/apiClient';
import apiRoutes from '@/axios/apiRoutes';
import { ClassRoom } from '@/dto/kotlinDto';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useMassTimetablePage from '@/hooks/useMassTimetablePage';
import queryKeys from '../query/queryKeys';
import { useAppDispatch } from '@/redux/hooks';
import appSlice from '@/redux/slices/appSlice';

export default (props: { classRoom: ClassRoom; dayTimestamp: number }) => {
    const { classRoom, dayTimestamp } = props;
    const queryClient = useQueryClient();
    const { getDailyTimetableClasses } = useMassTimetablePage(classRoom);
    const dispatch = useAppDispatch();

    return useMutation({
        mutationKey: ['create-extended-classes-for-holiday'],
        mutationFn: async () => {
            await apiClient.post(apiRoutes.POST_CREATE_EXTENDED_CLASSES_FOR_HOLIDAY(classRoom, dayTimestamp));
        },
        onMutate: () => {
            dispatch(appSlice.actions.setLoading(true));
        },
        onSettled: () => {
            dispatch(appSlice.actions.setLoading(false));
        },
        onSuccess: () => {
            getDailyTimetableClasses();
            queryClient.invalidateQueries({ queryKey: queryKeys.TIMETTAMP_TO_NUM_OF_CLASSES(classRoom) });
        },
    });
};
