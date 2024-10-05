import { Class, Student_package } from "../prismaTypes/types";

export type Gender = "MALE" | "FEMALE";
export type RoleInSystem = "SUPER_ADMIN" | "ADMIN" | "STAFF" | "STUDENT";
export type classStatus = "PRESENT" | "ILLEGIT_ABSENCE" | "SUSPICIOUS_ABSENCE" | "LEGIT_ABSENCE" | "MAKEUP";

export type TokenPayload = {
    first_name: string;
    last_name: string;
    is_blocked: boolean;
    company_email: string;
    avatar_file_url: string;
    created_at: number;
    mobile_number: string;
    role_in_system: RoleInSystem;
    role_in_company: string;
};

export type CreateStudentRequest = {
    id: string;
    first_name: string;
    last_name: string;
    gender: Gender;
    birthdate: number;
    parent_email: string;
    school_name: string;
    grade: string;
    phone_number: string;
    wechat_id?: string;
};

export type CreateUserRequest = {
    first_name: string;
    last_name: string;
    company_email: string;
    password: string;
    mobile_number: string;
    role_in_system: RoleInSystem;
    role_in_company: string;
};

export type User = {
    first_name: string;
    last_name: string;
    company_email: string;
    mobile_number: string;
    role_in_system: RoleInSystem;
    role_in_company: string;
    id: string;
};

export type Student = {
    id: string;
    first_name: string;
    last_name: string;
    gender: Gender;
    birthdate: number;
    parent_email: string;
    school_name: string;
    grade: string;
    phone_number?: string;
    wechat_id?: string;
};

export type StudentDetail = {
    first_name: string;
    last_name: string;
    id: string;
    gender: Gender;
    birthdate: number;
    school_name: string;
    grade: string;
    phone_number: string;
    wechat_id: string;
    parent_email: string;
};

export type CreateCourseRequest = {
    course_name: string;
};

export type Course = {
    course_name: string;
    id: number;
};

export type UpdateCourseRequest = {
    id: number;
    course_name: string;
};

export type MoveClassRequest = {
    class_id: number;
    toDayTimestamp: number;
    toHourTimestamp: number;
};

export type CreateClassRequest = {
    num_of_classes: number;
    student_id: string;
    course_id: number;
    day_unix_timestamp: number;
    hour_unix_timestamp: number;
    min: number;
    student_package_id: number;
};

export type DeleteClassRequest = {
    classId: number;
};

export type DuplicateClassRequest = {
    classId: number;
    numberOfWeeks: number;
};

export type DetachClassRequest = {
    classId: number;
};

export type UpdateClassRequest = {
    classId: number;
    min: number;
    class_status: string;
    reason_for_absence: string;
    remark: string;
};

export type CreateStudentPackageRequest = {
    num_of_classes: number;
    start_date: number;
    start_time: number;
    expiry_date: number;
    min: number;
    course_id: number;
    student_id: string;
};

export type UpdateStudentPackageRequest = {
    id: number;
    num_of_classes: number;
    start_date: number;
    expiry_date: number;
    min: number;
    course_id: number;
    student_id: string;
};

export type Augmented_Student_package = Student_package & { consumed_minutes: { count: number } };
export type Augmented_Class = Class & { course_name: string, student_id: string };
