import { Class_status } from '@/dto/kotlinDto';

const getDisplayNameFromClassStatus: Record<Class_status, string> = {
    PRESENT: 'Present',
    CHANGE_OF_CLASSROOM: 'Change of Classroom',
    ILLEGIT_ABSENCE: 'Illegit Absence',
    LEGIT_ABSENCE: 'Legit Absence',
    MAKEUP: 'Make Up',
    RESERVED: 'Reserved',
    SUSPICIOUS_ABSENCE: 'Suspcious Absense',
    TRIAL: 'Trial',
    BAD_WHETHER: 'Bad Whether',
};

export default getDisplayNameFromClassStatus;
