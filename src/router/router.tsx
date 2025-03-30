import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import Root from '../pages/Root/Root';
import Students from '../pages/Students/Students.tsx';
import Users from '../pages/Users/Users';
import PrinceEdwardTimetable from '../pages/PrinceEdwardTimetable/PrinceEdwardTimetable.tsx';
import Login from '../pages/Login/Login';
import StudentDetail from '../pages/Students/StudentDetail/StudentDetail.tsx';
import RouteIndex from '../components/RouteIndex.tsx';
import Classes from '../pages/Courses/Courses.tsx';
import CausewayBayTimetable from '../pages/CausewayBayTimetable/CausewayBayTimetable.tsx';
import PackageClassesStatus from '../pages/Students/components/PackageClassesStatus.tsx';
import Competitions from '../pages/Competitions/Competitions.tsx';
import CompetitionDetail from '../pages/Competitions/competitionDetail/CompetitionDetail.tsx';
import Logging from '../pages/Logging/Logging.tsx';
import type { Store } from '@reduxjs/toolkit';
import Dashboard from './indexPages/Dashboard.tsx';
import AllStudentsIndex from './indexPages/AllStudentsIndex.tsx';
import CausewaybayIndex from './indexPages/CausewaybayIndex.tsx';
import LogginIndex from './indexPages/LogginIndex.tsx';
import ClassStatusIndex from './indexPages/ClassStatusIndex.tsx';
import PrinceEdwardIndex from './indexPages/PrinceEdwardIndex.tsx';
import StudentInfo from '../pages/StudentInfo/StudentInfo.tsx';
import Tickets from '../pages/Tickets/Tickets.tsx';

function getRouter(_store: Store) {
    return createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<Root />}>
                <Route path="/student-info">
                    <Route path=":studentId" element={<StudentInfo />} />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />}>
                    <Route path="tickets" element={<Tickets />} />
                    <Route path={'students'} element={<RouteIndex />}>
                        <Route index element={<Students />} />
                        <Route path=":studentId" element={<StudentDetail />} />
                    </Route>
                    <Route path="courses" element={<Classes />} />
                    <Route path={'competitions'} element={<RouteIndex />}>
                        <Route index element={<Competitions />} />
                        <Route path=":competitionId" element={<CompetitionDetail />} />
                    </Route>
                    <Route path="users" element={<Users />} />
                    <Route path="all-students" element={<AllStudentsIndex />}>
                        <Route path="prince-edward" element={<PrinceEdwardIndex />}>
                            <Route index element={<PrinceEdwardTimetable />} />
                        </Route>
                        <Route path="causeway-bay" element={<CausewaybayIndex />}>
                            <Route index element={<CausewayBayTimetable />} />
                        </Route>
                    </Route>
                    <Route path="logging" element={<LogginIndex />}>
                        <Route element={<Logging />} index />
                    </Route>
                </Route>
                <Route path="/class-status" element={<ClassStatusIndex />}>
                    <Route path=":packageUUID" element={<PackageClassesStatus />} />
                </Route>
            </Route>
        )
    );
}

export default getRouter;
