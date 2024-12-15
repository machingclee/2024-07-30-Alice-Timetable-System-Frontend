import { useQuery } from '@tanstack/react-query';
import apiClient from '../axios/apiClient';
import apiRoutes from '../axios/apiRoutes';
import { CustomResponse } from '../axios/responseTypes';
import { StudentResponse } from '../dto/dto';
import queryKeys from './queryKeys';

export default (props: { studentId: string }) => {
    const { studentId } = props;
    return useQuery({
        queryKey: queryKeys.STUDENT_DETAIL(studentId),
        queryFn: async () => {
            const res = await apiClient.get<CustomResponse<StudentResponse>>(apiRoutes.GET_STUDENT_DETAIL(studentId));
            if (res.data.success) {
                return res.data.result;
            } else {
                throw new Error(res.data.errorMessage);
            }
        },
    });
};
