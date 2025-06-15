import { CustomResponse } from '@/axios/responseTypes';
import useBaseQuery from './useBaseQuery';
import { CustomHolidayDTO } from '@/dto/dto';
import apiClient from '@/axios/apiClient';
import apiRoutes from '@/axios/apiRoutes';

export default () => {
    const { query } = useBaseQuery({
        queryFn: async () => {
            const res = await apiClient.get<CustomResponse<CustomHolidayDTO[]>>(apiRoutes.GET_CUSTOM_HOLIDAYS);
            if (res.data.success) {
                return res.data.result;
            } else {
                return [];
            }
        },
        queryKey: ['CUSTOM_HOLIDAYS'],
        enabled: true,
    });
    return query;
};
