import { Class_status } from '../prismaTypes/types';

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
};

export type StudentPackageRepsonse = {
    packageId: number;
    studentPackage: StudentPackageDTO;
    schedumeMinutes: number;
    consumedMinutes: number;
    student: StudentDTO;
    course: CourseDTO;
};

export type ClassGroupDTO = {
    id: number;
};

export type TimetableClassEvent = {
    hourUnixTimestamp: number;
    classGroup: ClassGroupDTO | null;
    student: StudentDTO;
    course: CourseDTO;
    class: ClassDTO;
    package: StudentPackageDTO;
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
