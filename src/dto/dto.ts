import statues from '../constant/statues';
import { Classroom, Student_package } from '../prismaTypes/types';
import { Class_status } from './kotlinDto';

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
    preferred_name: string;
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
    wechat_id?: string | null;
    shouldAutoRenewPackage: boolean;
};

export type UpdateStudentRequest = {
    id: string;
    studentCode: string;
    firstName: string;
    lastName: string;
    chineseFirstName: string;
    chineseLastName: string;
    gender: Gender;
    birthdate: number;
    parentEmail: string;
    schoolName: string;
    grade: string;
    phoneNumber: string;
    wechatId?: string;
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

//   public val id: UUID?,
//   public val firstName: String,
//   public val lastName: String,
//   public val chineseFirstName: String?,
//   public val chineseLastName: String?,
//   public val isBlocked: Boolean,
//   public val companyEmail: String,
//   public val passwordHash: String,
//   public val avatarFileUrl: String,
//   public val createdAt: Double?,
//   public val mobileNumber: String,
//   public val roleInSystem: Role,
//   public val roleInCompany: String,
//   public val createdAtHk: String?,

export type UserDTO = {
    id?: string;
    firstName: string;
    lastName: string;
    chineseFirstName?: string;
    chineseLastName?: string;
    isBlocked: boolean;
    companyEmail: string;
    passwordHash: string;
    avatarFileUrl: string;
    createdAt?: number;
    mobileNumber: string;
    roleInSystem: RoleInSystem;
    roleInCompany: string;
    createdAtHk: string;
};

export type CreateCourseRequest = {
    courseName: string;
};

export type CourseDTO = {
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
    isTimeslotInThePast: boolean;
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

export type StatuesFilter = {
    [key in keyof typeof statues]: boolean;
};

export type DeleteClassRequest = {
    classId: number;
};

export type UpdateStudentRenewalStatusRequest = {
    autoRewPackage: boolean;
};

export type DuplicateClassRequest = {
    classId: number;
    numberOfWeeks: number;
    isTimeslotInThePast: boolean;
};

export type DetachClassRequest = {
    classId: number;
    studentId: string;
};

export type UpdateClassRequest = {
    classId: number;
    min: number;
    class_status: Class_status;
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
    packageId: number;
    num_of_classes: number;
    expiry_date: number;
    course_id: number;
    default_classroom: Classroom;
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
    payload: { ctx: { userEmail: string }; data: any };
    event_type: string;
    created_at: number;
    created_at_hk: string;
}[];

export type PreDailyTimetableRequest = {
    anchorTimestamp: number;
    numOfDays: number;
    classRoom: Classroom;
    filter: FilterToGetClassesForDailyTimetable;
};

export type DailyTimetableRequest = {
    dateUnixTimestamps: number[];
    classRoom: Classroom;
    filter: FilterToGetClassesForDailyTimetable;
};

export type CreateTicketRequest = {
    content: string;
    title: string;
    solvedBy: string;
};

export type UpdateTicketRequest = {
    ticketId: number;
    content: string;
    title: string;
    isSolved: boolean;
    solvedBy: string;
};

export type CustomHolidayDTO = {
    id: number;
    name: string;
    desc: string;
    startOfTheDate: number;
    createdAt: number;
    createdAtHk: string;
};

export type UpdateHolidayDTO = {
    holidayId: number;
    name: string;
    desc: string;
    date: number;
};

export type CreateExtendedClassesForHolidayRequest = {
    dayTimestamp: number;
    classRoom: Classroom;
};
