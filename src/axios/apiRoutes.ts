export default {
    POST_REFRESH_TOKEN: "/auth/refresh-token",
    POST_LOGIN: "/auth/login",
    POST_CREATE_USER: "/user/create-user",
    POST_CREATE_STUDNET: "/student/create-student",
    POST_CREATE_COURSE: "/course/create-course",
    POST_CREATE_STUDENT_CLASS: "/student/create-student-class",
    POST_DUPLICATE_CLASSES: "/student/duplicate-classes",

    GET_USERS: "/user/users",
    GET_STUDENTS: "/student/students",
    GET_COURSES: "/course/courses",
    GET_STUDENT_DETAIL: (studentId: string) => `/student/student-detail/${studentId}`,
    GET_STUDENT_CLASSES: (studentId: string) => `/student/student-classes/${studentId}`,

    PUT_UPDATE_USER: "/user/update-user",
    PUT_UPDATE_STUDENT: "/student/update-student",
    PUT_UPDATE_COURSE: "/course/update-course",
    PUT_MOVE_STUDNET_EVENT: "/student/move-event",
    PUT_DETACH_CLASS_FROM_GROUP: "/student/detach-from-group",
    PUT_UPDATE_CLASS: "/student/update-class"
}