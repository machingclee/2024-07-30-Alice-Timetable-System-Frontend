import { PreDailyTimetableRequest } from '../dto/dto';
import hashUtil from '../utils/hashUtil';

export default {
    STUDENTS: (pageNumer: number) => ['students', pageNumer],
    STUDENT_DETAIL: (studentId: string) => ['student_detail', studentId],
    DAILY_TIMETABLE_FILTER: (dailyTimetableReq: PreDailyTimetableRequest) => {
        const hash = hashUtil.hash(dailyTimetableReq);
        return ['filtered-daily-timetable', hash];
    },
};
