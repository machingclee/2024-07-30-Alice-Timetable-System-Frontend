import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import boxShadow from '../../../../constant/boxShadow';
import { Box } from '@mui/material';
import studentSlice, { StudentDetailPage, StudentThunkAction } from '../../../../redux/slices/studentSlice';
import Sep from '../../../../components/Sep';
import Spacer from '../../../../components/Spacer';
import { ContextMenu, ContextMenuTrigger, MenuItem } from 'react-contextmenu';
import colors from '../../../../constant/colors';
import { useParams } from 'react-router-dom';
import { FaRegCheckCircle } from 'react-icons/fa';
import { MdOutlinePending } from 'react-icons/md';
import AddPaymentDetailDialog from './AddPaymentDetailDialog';
import AddPaymentDetailForm from './AddPaymentDetailForm';
import EditPackageDialog from './EditPackageDialog';
import EditPackageForm from './EditPackageForm';
import classnames from 'classnames';
import { useState } from 'react';
import { Modal } from 'antd';

export default function StudentPackage(props: { packageId: string }) {
    const { packageId } = props;
    const dispatch = useAppDispatch();
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const selectedPackageId = useAppSelector(s => s.student.studentDetailTimetablePage.selectedPackageId);
    const { studentId } = useParams<{ studentId: string }>();
    const pkgResonse = useAppSelector(
        s => s.student.studentDetailTimetablePage.studentPackages.idToPackageResponse?.[packageId]
    );
    const { consumedMinutes, scheduledMinutes: schedumeMinutes, studentPackage: studentPkg } = pkgResonse || {};
    const courseId = studentPkg?.courseId;
    const course = useAppSelector(s => s.class.courses?.idToCourse?.[courseId || -1]);
    const assignedClasses = Math.floor(((schedumeMinutes || 0) / (studentPkg?.min || 1)) * 10) / 10;
    console.log('consumed_minutes:', consumedMinutes);
    const finishedClasses = Math.floor(((consumedMinutes || 0) / (studentPkg?.min || 1)) * 10) / 10;

    if (!courseId) {
        return null;
    }

    const isSelected = selectedPackageId === packageId;
    const selectPackage = () => {
        dispatch(studentSlice.actions.setSelectedPackageId(packageId || ''));
    };
    const addPaymentDetail = async () => {
        AddPaymentDetailDialog.setContent(() => () => <AddPaymentDetailForm packageId={Number(packageId)} />);
        AddPaymentDetailDialog.setOpen(true);
        // await dispatch(StudentThunkAction.markPackageAsPaid({ packageId: Number(packageId) })).unwrap()
        // if (studentId) {
        //     dispatch(StudentThunkAction.getStudentPackages({ studentId }))
        // }
    };

    const markAsUnPaid = async () => {
        await dispatch(
            StudentThunkAction.markPackageAsUnPaid({
                packageId: Number(packageId),
            })
        ).unwrap();
        if (studentId) {
            dispatch(StudentThunkAction.getStudentPackages({ studentId }));
        }
    };

    const deletePackage = async () => {
        if (!studentId) {
            return;
        }
        await dispatch(
            StudentThunkAction.deletePackage({
                studentId,
                packageId: Number(packageId),
            })
        ).unwrap();
        if (studentId) {
            dispatch(studentSlice.actions.setStudentDetailPage(StudentDetailPage.STUDENT_TIME_TABLE));
            dispatch(StudentThunkAction.getStudentPackages({ studentId }));
            dispatch(
                StudentThunkAction.getStudentClassesForWeeklyTimetable({
                    studentId,
                })
            );
        }
    };

    const showAttendence = async () => {
        dispatch(studentSlice.actions.setSelectedPackageId(packageId || ''));
        dispatch(studentSlice.actions.setStudentDetailPage(StudentDetailPage.STUDENT_PACKAGE_CLASS_STATUES));
    };

    const editPackage = async () => {
        EditPackageDialog.setWidth('xs');
        EditPackageDialog.setContent(() => () => <EditPackageForm packageId={packageId} />);
        EditPackageDialog.setOpen(true);
    };

    const paidIcon = () => {
        return (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <FaRegCheckCircle style={{ color: colors.GREEN }} />
                <Spacer height={1} width={5} />
                <div>
                    <div>
                        <span style={{ color: colors.GREEN, fontWeight: 500 }}>Paid At</span>
                    </div>
                    <div style={{ fontSize: 12, color: colors.GREEN }}>
                        {dayjs(studentPkg.paidAt).format('YYYY-MM-DD')}
                    </div>
                </div>
            </div>
        );
    };

    const unpaidIcon = () => {
        return (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <MdOutlinePending style={{ color: colors.RED, fontSize: 18 }} />
                <Spacer height={1} width={5} />
                <span style={{ color: colors.RED, fontWeight: 600 }}>Unpaid</span>
            </div>
        );
    };

    const isPaid = studentPkg.paidAt != null;

    return (
        <div
            style={{
                boxShadow: boxShadow.SHADOW_60,
                maxWidth: 300,
            }}
            className={classnames(
                'cursor-pointer',
                'bg-white',
                isSelected ? `outline outline-2 outline-blue-600` : '',
                '[&_table]:w-full [&_table]:border-separate [&_table]:border-spacing-1',
                '[&_td]:whitespace-nowrap',
                '[&_td:first-child]:w-[0.1%]',
                '[&_td:nth-child(2)]:p-[4px_6px] [&_td:nth-child(2)]:rounded-[4px] [&_td:nth-child(2)]:bg-gray-200',
                'p-[10px] rounded-none m-1'
            )}
        >
            {/* @ts-expect-error - context menu trigger has problem in typing */}
            <ContextMenuTrigger id={packageId}>
                <div onClick={selectPackage}>
                    <div className="p-[10px] flex justify-center font-[600]">{course?.courseName}</div>
                    <Sep />
                    <Spacer height={5} />
                    <table className="[&_td]:pr-[10px]">
                        <tbody>
                            <tr>
                                <td>Classroom</td>
                                <td>{studentPkg.defaultClassroom}</td>
                            </tr>
                            <tr>
                                <td>Duration</td>
                                <td>{studentPkg.min}</td>
                            </tr>
                            <tr>
                                <td>Start</td>
                                <td>{dayjs(studentPkg.startDate).format('YYYY-MM-DD')}</td>
                            </tr>
                            <tr>
                                <td>End Date</td>
                                <td>
                                    {studentPkg.officialEndDate === 0
                                        ? '???'
                                        : dayjs(studentPkg.officialEndDate).format('YYYY-MM-DD')}
                                </td>
                            </tr>
                            <tr>
                                <td>Expiry Date</td>
                                <td>{dayjs(studentPkg.expiryDate).format('YYYY-MM-DD')}</td>
                            </tr>
                            <tr>
                                <td>Scheduled Classes</td>
                                <td>{`${assignedClasses}/${studentPkg.numOfClasses}`}</td>
                            </tr>
                            <tr>
                                <td>Finished Classes</td>
                                <td>{`${finishedClasses}/${studentPkg.numOfClasses}`}</td>
                            </tr>
                            <tr>
                                <td>Payment Status</td>
                                <td>
                                    {isPaid && paidIcon()}
                                    {!isPaid && unpaidIcon()}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </ContextMenuTrigger>
            {/* @ts-expect-error - context menu trigger has problem in typing */}
            <ContextMenu
                id={packageId}
                style={{
                    zIndex: 10 ** 7,
                    borderRadius: 8,
                    backgroundColor: 'white',
                    // boxShadow: boxShadow.SHADOW_62,
                    border: '1px solid rgba(0,0,0,0.2)',
                }}
            >
                <Box
                    sx={{
                        '& .menu-item': {
                            zIndex: 10 ** 7,
                            border: 'none',
                            padding: '10px',
                            cursor: 'pointer',
                            '&:hover': {
                                '&:hover': {
                                    color: 'rgb(64, 150, 255)',
                                },
                            },
                        },
                    }}
                >
                    {/* @ts-expect-error - context menu trigger has problem in typing */}
                    <MenuItem className="menu-item" onClick={editPackage}>
                        Edit package
                    </MenuItem>
                    <>
                        {/* @ts-expect-error - context menu trigger has problem in typing */}
                        <MenuItem
                            className="menu-item"
                            onClick={() => {
                                setShowDeleteConfirmation(true);
                            }}
                        >
                            Delete package
                        </MenuItem>
                        <Modal
                            closable={false}
                            okText={'I do'}
                            onOk={deletePackage}
                            onCancel={() => setShowDeleteConfirmation(false)}
                            onClose={() => setShowDeleteConfirmation(false)}
                            centered
                            open={showDeleteConfirmation}
                        >
                            <div>Are you sure to delete? Data will be lost and cannot be rolled back</div>
                        </Modal>
                    </>
                    <>
                        {/* @ts-expect-error - context menu trigger has problem in typing */}
                        <MenuItem className="menu-item" onClick={showAttendence}>
                            Show attendence
                        </MenuItem>
                    </>
                    {!isPaid && (
                        <>
                            {/* @ts-expect-error - context menu trigger has problem in typing */}
                            <MenuItem className="menu-item" onClick={addPaymentDetail}>
                                Add payment detail
                            </MenuItem>
                        </>
                    )}
                    {isPaid && (
                        <>
                            {/* @ts-expect-error - context menu trigger has problem in typing */}
                            <MenuItem className="menu-item" onClick={markAsUnPaid}>
                                Mark as unpaid
                            </MenuItem>
                        </>
                    )}
                </Box>
            </ContextMenu>
        </div>
    );
}
