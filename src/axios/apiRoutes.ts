import { Classroom } from "../prismaTypes/types";

export default {
    POST_REFRESH_TOKEN: "/auth/refresh-token",
    POST_LOGIN: "/auth/login",
    POST_CREATE_USER: "/user/create-user",
    POST_CREATE_STUDNET: "/students",
    POST_CREATE_COURSE: "/course/create-course",
    POST_CREATE_STUDENT_CLASS: "/students/create-student-class",
    POST_DUPLICATE_CLASSES: "/students/duplicate-classes",
    POST_CREATE_STUDENT_PACKAGE: "/students/create-student-package",
    POST_GET_STUDENT_CLASSES_FOR_DAILY_TIMETABLE: "/students/get-filtered-student-classes-for-daily-timteable",

    GET_PACKAGE_CLASS_STATUS: (pkgUUID: string) => `/public/student-class-status/${pkgUUID}`,
    GET_USERS: "/user/users",
    GET_STUDENTS: `/students`,
    GET_COURSES: "/course/courses",
    GET_STUDENT_DETAIL: (studentId: string) => `/students/student-detail/${studentId}`,
    GET_STUDENT_CLASSES_FOR_WEEKLY_TIMETABLE: (studentId: string) => `/students/student-classes-for-weekly-timteable/${studentId}`,
    GET_STUDENT_CLASSES_FOR_DAILY_TIMETABLE: (dateUnixTimestamp: string, classRoom: Classroom) =>
        `/students/student-classes-for-daily-timteable/${dateUnixTimestamp}/${classRoom}`,
    GET_STUDENT_PACKAGES: (studentId: string) => `/students/student-packages/${studentId}`,
    GET_LOGGING: (props: { page: number, limit: number }) => `/logging/get-logs?page=${props.page}&limit=${props.limit}`,

    PUT_UPDATE_USER: "/user/update-user",
    PUT_UPDATE_STUDENT: "/students/update-student",
    PUT_UPDATE_COURSE: "/course/update-course",
    PUT_MOVE_STUDNET_CLASS: "/students/move-class",
    PUT_DETACH_CLASS_FROM_GROUP: "/students/detach-from-group",
    PUT_UPDATE_CLASS: "/students/update-class",
    PUT_MARK_PACAKGE_AS_PAID: "/students/mark-package-as-paid",
    PUT_MARK_PACAKGE_AS_UNPAID: "/students/mark-package-as-unpaid",
    PUT_UPDATE_PACKAGE: "/students/update-package",

    DELETE_PACKAGE: (studentId: string, packageId: number) => `/students/delete-package?studentId=${studentId}&packageId=${packageId}`,
    DELETE_CLASS: (classId: number) => `/students/delete-class/${classId}`,
    DELETE_STUDENT: (studentId: number) => `/students/delete-student/${studentId}`,
};
