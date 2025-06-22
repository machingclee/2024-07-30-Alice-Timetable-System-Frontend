import { ClassRoom } from '@/dto/kotlinDto';
import { PreDailyTimetableRequest } from '../../dto/dto';
import hashUtil from '../../utils/hashUtil';

export default {
    STUDENTS: (pageNumer: number) => ['students', pageNumer],
    TICKETS: ['tickets'],
    STUDENT_DETAIL: (studentId: string) => ['student_detail', studentId],
    DAILY_TIMETABLE_FILTER: (dailyTimetableReq: PreDailyTimetableRequest) => {
        const hash = hashUtil.hash(dailyTimetableReq);
        return ['filtered-daily-timetable', hash];
    },
    NOTIFICATIONS: ['NOTIFICATIONS'],
    CUSTOM_HOLIDAYS: ['CUSTOM_HOLIDAYS'],
    TIMETTAMP_TO_NUM_OF_CLASSES: (classRoom: ClassRoom | '') => ['TIMETTAMP_TO_NUM_OF_CLASSES', classRoom],
};
