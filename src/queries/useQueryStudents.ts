// import { useQuery, useQueryClient } from "@tanstack/react-query";
// import apiClient from "../axios/apiClient";
// import { CustomResponse } from "../axios/responseTypes";
// import { StudentResponse } from "../dto/dto";
// import apiRoutes from "../axios/apiRoutes";
// import { useEffect } from "react";
// import queryKeys from "./queryKeys";
// export default (props: { page?: number, query?: object }) => {
//     const queryClient = useQueryClient();
//     const { page = 0 } = props;

//     const fetchStudents = async (page: number) => {
//         const result = await apiClient.get<CustomResponse<{
//             students: StudentResponse[],
//             total: number
//         }>>(apiRoutes.GET_STUDENTS(page || 0));
//         if (result.data.success) {
//             return result.data.result
//         } else {
//             throw new Error("Fetech students failed");
//         }
//     }

//     useEffect(() => {
//         const nextPage = page + 1;
//         queryClient.prefetchQuery({
//             queryKey: queryKeys.STUDENTS(nextPage),
//             queryFn: async () => await fetchStudents(nextPage),
//             staleTime: 5000
//         })
//     }, [page])

//     return useQuery({
//         queryKey: queryKeys.STUDENTS(page),
//         queryFn: async () => await fetchStudents(page),
//         staleTime: 5000
//     })
// }