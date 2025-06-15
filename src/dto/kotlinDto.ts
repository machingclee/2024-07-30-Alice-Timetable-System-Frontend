export type Class_status =
    | 'PRESENT'
    | 'ILLEGIT_ABSENCE'
    | 'SUSPICIOUS_ABSENCE'
    | 'LEGIT_ABSENCE'
    | 'MAKEUP'
    | 'CHANGE_OF_CLASSROOM'
    | 'TRIAL'
    | 'RESERVED'
    | 'BAD_WHETHER';

export type ClassRoom = 'PRINCE_EDWARD' | 'CAUSEWAY_BAY';

export type StudentPackageDTO = {
    startDate: number;
    paidAt: number;
    officialEndDate: number;
    expiryDate: number;
    min: number;
    courseId: number;
    createdAt: number;
    createdAtHk: string;
    numOfClasses: number;
    defaultClassroom: ClassRoom;
    uuid: string;
    id: number;
};

export type GENDER = 'MALE' | 'FEMALE';

export type CourseDTO = {
    id: number;
    createdAt: number;
    createdAtHk: string;
    courseName: string;
};

export type StudentDTO = {
    id: string;
    firstName: string;
    lastName: string;
    chineseFirstName: string;
    chineseLastName: string;
    schoolName: string;
    studentCode: string;
    grade: string;
    phoneNumber: string;
    wechatId: string;
    birthdate: number;
    parentEmail: string;
    createdAt: number;
    createdAtHk: string;
    parentId: string;
    gender: GENDER;
    shouldAutoRenewPackage: boolean;
};

export type StudentPackageRepsonse = {
    packageId: number;
    studentPackage: StudentPackageDTO;
    scheduledMinutes: number;
    consumedMinutes: number;
    consumedextendedClassMins: number;
    numOfNormalClasses: number;
    numOfExtendedClass: number;
    student: StudentDTO;
    course: CourseDTO;
};

export type ClassGroupDTO = {
    id: number;
};

export type TimetableLesson = {
    hourUnixTimestamp: number;
    classGroup: ClassGroupDTO | null;
    student: StudentDTO;
    course: CourseDTO;
    class: ClassDTO;
    studentPackage: StudentPackageDTO;
};

export type GetPackageClassStatusResponse = {
    dateUnixTimestamp: number;
    classGroup: ClassGroupDTO;
    cls: ClassDTO;
    course: CourseDTO;
    student: StudentDTO;
};

export type ClassDTO = {
    id: number;
    dayUnixTimestamp: number;
    hourUnixTimestamp: number;
    min: number;
    createdAt: number;
    createdAtHk: string;
    reasonForAbsence: string;
    classStatus: Class_status;
    remark: string;
    classNumber: number;
    actualClassroom: string;
};

export type UIStudentPackage = {
    package: StudentPackageDTO;
    course: CourseDTO;
    classes: ClassDTO[];
};

export type UIStudentDetail = {
    student: StudentDTO;
    studentPackages: UIStudentPackage[];
};

export type TicketDTO = {
    id: number;
    isSolved: boolean;
    content: string;
    title: string;
    solvedBy: string;
};

export type NotificationDTO = {
    id?: number;
    message: string;
    studentPackageId: number;
    type: 'PACKAGE_DEADLINE_COMING' | 'ATTENDENCE_WARNING';
    isRead: boolean;
    createdAt?: number;
    createdAtHk?: string;
};

export type NotificationResponse = {
    student: StudentDTO;
    studentPackage: StudentPackageDTO;
    notification: NotificationDTO;
};
