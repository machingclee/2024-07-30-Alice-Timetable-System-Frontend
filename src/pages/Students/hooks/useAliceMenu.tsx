import { AliceMenu } from '@/components/AliceMenu';
import ViewClassDialog from '@/components/ViewClassDialog';
import ViewClassForm from '@/components/ViewClassForm';
import dayjs from 'dayjs';
import DuplicateClassDialog from '@/components/DuplicateClassDialog';
import DuplicateClassForm from '@/components/DuplicateClassForm';
import DeleteClassDialog from '@/components/DeleteClassDialog';
import DeleteClassForm from '@/components/DeleteClassForm';
import useSelectPackage from '@/hooks/useSelectPackage';
import { studentApi } from '@/!rtk-query/api/studentApi';
import useGetStudentIdFromParam from '@/hooks/useGetStudentIdFromParam';
import { useChangeStatusMenuItem } from '../components/StudentClassForWeeklyTimetableCell';

export default function useAliceMenu(props: { hourUnitTimestamp: number }) {
    const { hourUnitTimestamp } = props;
    const { studentId } = useGetStudentIdFromParam();
    const { lesson: _lesson } = studentApi.endpoints.getStudentClassesForWeeklyTimetable.useQuery(
        { studentId },
        {
            skip: !studentId,
            selectFromResult: ({ data }) => {
                return {
                    lesson: data?.hrUnixTimestampToLesson?.[String(hourUnitTimestamp)],
                };
            },
        }
    );
    const disableDuplicate = _lesson?.classGroup != null;
    const [detachFromGroupMutation] = studentApi.endpoints.detachFromGroup.useMutation();
    const menuItem = useChangeStatusMenuItem({ lesson: _lesson });
    const { setPathParam } = useSelectPackage(); // Move hook to top level

    const equipAliceMenu = (props: { children: React.ReactNode }) => {
        const isInTheFuture = () => (_lesson?.class?.hourUnixTimestamp || 0) >= new Date().getTime();
        const { children } = props;

        if (!_lesson) {
            return children;
        }
        return (
            <AliceMenu
                items={[
                    {
                        item: 'View class detail',
                        onClick: () => {
                            ViewClassDialog.setContent(() => () => (
                                <ViewClassForm
                                    classExtensionRecord={_lesson.classExtensionRecord}
                                    dateUnixTimestamp={_lesson.class.dayUnixTimestamp}
                                    cls={_lesson.class}
                                    course={_lesson.course}
                                    student={_lesson.student}
                                />
                            ));
                            ViewClassDialog.setOpen(true);
                        },
                    },
                    ...(_lesson?.classExtendedTo
                        ? [
                              {
                                  item: `View class extended to ${dayjs(_lesson.classExtendedTo.hourUnixTimestamp).format('YYYY-MM-DD')}`,
                                  onClick: () => {
                                      setPathParam({
                                          anchorTimestamp: _lesson?.classExtendedTo?.hourUnixTimestamp || 0,
                                          packageId: _lesson.studentPackage.id + '',
                                      });
                                  },
                              },
                          ]
                        : []),
                    ...(_lesson?.classExtendedFrom
                        ? [
                              {
                                  item: `View class extended from ${dayjs(_lesson.classExtendedFrom.hourUnixTimestamp).format('YYYY-MM-DD')}`,
                                  onClick: () => {
                                      setPathParam({
                                          anchorTimestamp: _lesson?.classExtendedFrom?.hourUnixTimestamp || 0,
                                          packageId: _lesson.studentPackage.id + '',
                                      });
                                  },
                              },
                          ]
                        : []),
                    {
                        item: 'Edit class',
                        onClick: () => {
                            ViewClassDialog.setWidth('xs');
                            ViewClassDialog.setContent(() => () => (
                                <ViewClassForm
                                    classExtensionRecord={_lesson.classExtensionRecord}
                                    isEditing={true}
                                    dateUnixTimestamp={_lesson.class.dayUnixTimestamp}
                                    cls={_lesson.class}
                                    course={_lesson.course}
                                    student={_lesson.student}
                                />
                            ));
                            ViewClassDialog.setOpen(true);
                        },
                    },
                    {
                        item: 'Duplicate class',
                        disabled: disableDuplicate || !_lesson,
                        onClick: () => {
                            if (!_lesson?.class) {
                                return;
                            }
                            DuplicateClassDialog.setWidth('xs');
                            DuplicateClassDialog.setContent(() => () => (
                                <DuplicateClassForm
                                    student={_lesson.student}
                                    studentPackage={_lesson.studentPackage}
                                    class={_lesson.class}
                                    isTimeslotInThePast={isInTheFuture()}
                                />
                            ));
                            DuplicateClassDialog.setOpen(true);
                        },
                    },
                    {
                        item: 'Detach from group',
                        disabled: !disableDuplicate,
                        onClick: async () => {
                            await detachFromGroupMutation({
                                classId: _lesson.class.id,
                                studentId: studentId,
                            }).unwrap();
                        },
                    },
                    {
                        item: 'Delete a class',
                        onClick: () => {
                            DeleteClassDialog.setWidth('xs');
                            DeleteClassDialog.setContent(() => () => (
                                <DeleteClassForm
                                    deleteSingleClass={true}
                                    classGroup={_lesson.classGroup}
                                    cls={_lesson.class}
                                    course={_lesson.course}
                                />
                            ));
                            DeleteClassDialog.setOpen(true);
                        },
                    },
                    {
                        item: 'Delete a group of classes',
                        onClick: () => {
                            DeleteClassDialog.setWidth('xs');
                            DeleteClassDialog.setContent(() => () => (
                                <DeleteClassForm
                                    deleteSingleClass={false}
                                    classGroup={_lesson.classGroup}
                                    cls={_lesson.class}
                                    course={_lesson.course}
                                />
                            ));
                            DeleteClassDialog.setOpen(true);
                        },
                    },
                    menuItem,
                ]}
            >
                {children}
            </AliceMenu>
        );
    };

    return { equipAliceMenu };
}
