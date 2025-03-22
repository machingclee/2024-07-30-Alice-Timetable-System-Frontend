import apiClient from '../axios/apiClient';
import apiRoutes from '../axios/apiRoutes';
import { CustomResponse } from '../axios/responseTypes';
import {} from '../dto/dto';
import { UIStudentDetail } from '../dto/kotlinDto';
import queryKeys from './queryKeys';
import useBaseQuery from './useBaseQuery';

export default (props: { studentId: string }) => {
    const { studentId } = props;
    return useBaseQuery({
        queryKey: queryKeys.STUDENT_DETAIL(studentId),
        queryFn: async () => {
            const res = await apiClient.get<CustomResponse<UIStudentDetail>>(apiRoutes.GET_STUDENT_DETAIL(studentId));
            if (res.data.success) {
                return res.data.result;
            } else {
                throw new Error(res.data.errorMessage);
            }
        },
    });
};
