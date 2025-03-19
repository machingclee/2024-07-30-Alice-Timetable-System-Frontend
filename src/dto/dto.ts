import { Classroom, Student_package } from '../prismaTypes/types';

export type Gender = 'MALE' | 'FEMALE';
export type RoleInSystem = 'SUPER_ADMIN' | 'ADMIN' | 'STAFF' | 'STUDENT';

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
    student_code: string;
    first_name: string;
    last_name: string;
    chinese_first_name: string;
    chinese_last_name: string;
    gender: Gender;
    birthdate: number;
    parent_email: string;
    school_name: string;
    grade: string;
    phone_number: string;
    wechat_id?: string;
};

export type UpdateStudentRequest = {
    id: string;
    student_code: string;
    first_name: string;
    last_name: string;
    chinese_first_name: string;
    chinese_last_name: string;
    gender: Gender;
    birthdate: number;
    parent_email: string;
    school_name: string;
    grade: string;
    phone_number: string;
    wechat_id?: string;
};

export type CreateUserRequest = {
    chinese_first_name: string;
    chinese_last_name: string;
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
    chinese_first_name: string;
    chinese_last_name: string;
    company_email: string;
    mobile_number: string;
    role_in_system: RoleInSystem;
    role_in_company: string;
    id: string;
};

export type CreateCourseRequest = {
    courseName: string;
};

export type CourseResponse = {
    courseName: string;
    createdAt: number;
    createdAtHk: string;
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
    numOfClasses: number;
    dayUnixTimestamp: number;
    hourUnixTimestamp: number;
    min: number;
    studentPackageId: number;
    actualClassroom: Classroom;
};

export type FilterToGetClassesForDailyTimetable = {
    present: boolean;
    reserved: boolean;
    suspicious_absence: boolean;
    illegit_absence: boolean;
    legit_absence: boolean;
    makeup: boolean;
    changeOfClassroom: boolean;
    trial: boolean;
    courseIds: number[];
};

export type FilterToGetClassesForDailyTimetableWithoutCourseIds = {
    present: boolean;
    reserved: boolean;
    suspicious_absence: boolean;
    illegit_absence: boolean;
    legit_absence: boolean;
    makeup: boolean;
    changeOfClassroom: boolean;
    trial: boolean;
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
    actual_classroom: Classroom;
};

export type CreateStudentPackageRequest = {
    num_of_classes: number;
    start_date: number;
    start_time: number;
    min: number;
    course_id: number;
    default_classroom: Classroom;
};

export type UpdateStudentPackageRequest = {
    id: number;
    num_of_classes: number;
    default_classroom: Classroom;
    start_date: number;
    expiry_date: number;
    min: number;
    course_id: number;
    student_id: string;
};

export type Competition = {
    name: string;
    intro: string;
    questionIds: string[];
    IdToQuestion: { [id: string]: Question };
};

// 多選/單選/短答
export type Question = MultipleChoiceQuestion | SingleChoiceQuestion | ShortQuestion;
export type QuestionType = Question['type'];

export type MultipleChoiceQuestion = {
    questionId: string;
    type: 'MultipleChoiceQuestion';
    question: string;
    optionIds: string[];
    optionIdToOption: { [id: string]: MultipleChoiceOption };
    compulsory: boolean;
};

export type MultipleChoiceOption = {
    id: string;
    option: string;
    chosen: boolean;
};

export type SingleChoiceQuestion = {
    questionId: string;
    type: 'SingleChoiceQuestion';
    question: string;
    optionIds: string[];
    optionIdToOption: { [id: string]: SingleChoiceOption };
    compulsory: boolean;
};

export type SingleChoiceOption = {
    id: string;
    option: string;
    chosen: boolean;
};

export type ShortQuestion = {
    questionId: string;
    type: 'ShortQuestion';
    question: string;
    response: string;
    compulsory: boolean;
};

export type Augmented_Student_package = Student_package & {
    scheduled_minutes: { count: number };
    consumed_minutes: { count: number };
    course_name: string;
};

export type SummaryOfClassStatues = {
    present: number;
    illegitAbsence: number;
    legitAbsence: number;
    makeup: number;
    changeOfClassroom: number;
};

export type Loggings = {
    id: number;
    // eslint-disable-next-line
    payload: { ctx: { userEmail: string }; data: any };
    event_type: string;
    created_at: number;
    created_at_hk: string;
}[];
