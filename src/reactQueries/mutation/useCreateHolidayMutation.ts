import apiClient from '@/axios/apiClient';
import apiRoutes from '@/axios/apiRoutes';
import { CustomResponse } from '@/axios/responseTypes';
import { CustomHolidayDTO } from '@/dto/dto';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import queryKeys from '../query/queryKeys';
import dayjs from 'dayjs';

type CreateCustomHolidayRequest = {
    name: string;
    desc: string;
    date: number;
};

export default ({
    date,
    desc,
    name,
    onSuccess,
}: {
    date: dayjs.Dayjs;
    desc: string;
    name: string;
    onSuccess: () => Promise<void> | void;
}) => {
    const queryClient = useQueryClient();
    const createHoliday = useMutation({
        mutationKey: queryKeys.CUSTOM_HOLIDAYS,
        mutationFn: async () => {
            return await apiClient.post<CustomResponse<CustomHolidayDTO>, CreateCustomHolidayRequest>(
                apiRoutes.POST_ADD_CUSTOM_HOLIDAY,
                {
                    date: date.valueOf(),
                    desc,
                    name,
                }
            );
        },
        onSuccess: async () => {
            await onSuccess();
            queryClient.invalidateQueries({ queryKey: queryKeys.CUSTOM_HOLIDAYS });
        },
    });

    return createHoliday;
};
