import { Classroom } from "../prismaTypes/types";

export default {
    POST_REFRESH_TOKEN: "/auth/refresh-token",
    POST_LOGIN: "/auth/login",
    POST_CREATE_USER: "/user/create-user",
    POST_CREATE_STUDNET: "/students",
    POST_CREATE_COURSE: "/course/create-course",
    POST_CREATE_STUDENT_CLASS: "/student/create-student-class",
    POST_DUPLICATE_CLASSES: "/student/duplicate-classes",
    POST_CREATE_STUDENT_PACKAGE: "/student/create-student-package",
    POST_GET_STUDENT_CLASSES_FOR_DAILY_TIMETABLE: "/student/get-filtered-student-classes-for-daily-timteable",

    GET_PACKAGE_CLASS_STATUS: (pkgUUID: string) => `/public/student-class-status/${pkgUUID}`,
    GET_USERS: "/user/users",
    GET_STUDENTS: "/student/students",
    GET_COURSES: "/course/courses",
    GET_STUDENT_DETAIL: (studentId: string) => `/student/student-detail/${studentId}`,
    GET_STUDENT_CLASSES_FOR_WEEKLY_TIMETABLE: (studentId: string) => `/student/student-classes-for-weekly-timteable/${studentId}`,
    GET_STUDENT_CLASSES_FOR_DAILY_TIMETABLE: (dateUnixTimestamp: string, classRoom: Classroom) =>
        `/student/student-classes-for-daily-timteable/${dateUnixTimestamp}/${classRoom}`,
    GET_STUDENT_PACKAGES: (studentId: string) => `/student/student-packages/${studentId}`,
    GET_LOGGING: (props: { page: number, limit: number }) => `/logging/get-logs?page=${props.page}&limit=${props.limit}`,

    PUT_UPDATE_USER: "/user/update-user",
    PUT_UPDATE_STUDENT: "/student/update-student",
    PUT_UPDATE_COURSE: "/course/update-course",
    PUT_MOVE_STUDNET_CLASS: "/student/move-class",
    PUT_DETACH_CLASS_FROM_GROUP: "/student/detach-from-group",
    PUT_UPDATE_CLASS: "/student/update-class",
    PUT_MARK_PACAKGE_AS_PAID: "/student/mark-package-as-paid",
    PUT_MARK_PACAKGE_AS_UNPAID: "/student/mark-package-as-unpaid",
    PUT_UPDATE_PACKAGE: "/student/update-package",

    DELETE_PACKAGE: (studentId: string, packageId: number) => `/student/delete-package?studentId=${studentId}&packageId=${packageId}`,
    DELETE_CLASS: (classId: number) => `/student/delete-class/${classId}`,
    DELETE_STUDENT: (studentId: number) => `/student/delete-student/${studentId}`,
};
