import { Classroom } from '../prismaTypes/types';

export default {
    POST_REFRESH_TOKEN: '/auth/refresh-token',
    POST_LOGIN: '/auth/login',
    POST_CREATE_USER: '/user/create-user',
    POST_CREATE_STUDNET: '/students',
    POST_CREATE_COURSE: '/courses/create-course',
    POST_CREATE_STUDENT_CLASS: (studentId: string) => `/students/${studentId}/classes/create`,
    POST_DUPLICATE_CLASSES: '/students/classes/duplicate',
    POST_CREATE_STUDENT_PACKAGE: (studentId: string) => `/students/${studentId}/student-packages/create`,
    POST_GET_STUDENT_CLASSES_FOR_DAILY_TIMETABLE: '/students/get-filtered-student-classes-for-daily-timetable',
    GET_PACKAGE_CLASS_STATUS: (pkgUUID: string) => `/public/student-class-status/${pkgUUID}`,
    GET_USERS: '/users',
    GET_STUDENTS: `/students`,
    GET_COURSES: '/courses',
    GET_STUDENT_DETAIL: (studentId: string) => `/students/${studentId}/student-detail`,
    GET_STUDENT_CLASSES_FOR_WEEKLY_TIMETABLE: (studentId: string) =>
        `/students/${studentId}/student-classes-for-weekly-timetable`,
    GET_STUDENT_CLASSES_FOR_DAILY_TIMETABLE: (dateUnixTimestamp: string, classRoom: Classroom) =>
        `/students/student-classes-for-daily-timteable/${dateUnixTimestamp}/${classRoom}`,
    GET_STUDENT_PACKAGES: (studentId: string) => `/students/${studentId}/student-packages`,
    GET_LOGGING: (props: { page: number; limit: number }) =>
        `/logging/get-logs?page=${props.page}&limit=${props.limit}`,

    PUT_UPDATE_USER: '/user/update-user',
    PUT_UPDATE_STUDENT: '/students/update-student',
    PUT_MOVE_STUDNET_CLASS: '/students/classes/move',
    PUT_DETACH_CLASS_FROM_GROUP: '/students/detach-from-group',
    PUT_MARK_PACAKGE_AS_PAID: '/students/mark-package-as-paid',
    PUT_MARK_PACAKGE_AS_UNPAID: '/students/mark-package-as-unpaid',
    PUT_UPDATE_PACKAGE: '/students/update-package',

    PATCH_UPDATE_COURSE: '/courses/update',
    PATCH_UPDATE_CLASS: '/students/classes/update',

    DELETE_PACKAGE: (studentId: string, packageId: number) =>
        `/students/delete-package?studentId=${studentId}&packageId=${packageId}`,
    DELETE_CLASS: (classId: number) => `/students/delete-class/${classId}`,
    DELETE_STUDENT: (studentId: number) => `/students/delete-student/${studentId}`,
};
