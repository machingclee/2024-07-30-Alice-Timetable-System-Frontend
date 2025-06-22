import apiClient from '@/axios/apiClient';
import useBaseQuery from './useBaseQuery';
import apiRoutes from '@/axios/apiRoutes';
import { ClassRoom } from '@/dto/kotlinDto';
import { CustomResponse } from '@/axios/responseTypes';
import queryKeys from './queryKeys';

export type DayTimestampToNumOfClassesQueryResult = {
    [timestamp: string]: number;
};

function useDayTimestampToNumOfClassesQuery(classRoom: ClassRoom | null) {
    return useBaseQuery({
        enabled: true,
        queryKey: queryKeys.TIMETTAMP_TO_NUM_OF_CLASSES(classRoom || ''),
        queryFn: async (): Promise<DayTimestampToNumOfClassesQueryResult> => {
            if (classRoom) {
                const res = await apiClient.get<CustomResponse<DayTimestampToNumOfClassesQueryResult>>(
                    apiRoutes.GET_CLASS_TIMESTAMPS(classRoom)
                );
                return (res.data.success ? res.data.result : {}) as DayTimestampToNumOfClassesQueryResult;
            } else {
                return {} as DayTimestampToNumOfClassesQueryResult;
            }
        },
    });
}

export default useDayTimestampToNumOfClassesQuery;
