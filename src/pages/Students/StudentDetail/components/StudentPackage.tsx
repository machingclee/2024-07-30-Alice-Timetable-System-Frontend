import dayjs from "dayjs";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import boxShadow from "../../../../constant/boxShadow";
import { Box } from "@mui/material";
import studentSlice, { StudentThunkAction } from "../../../../redux/slices/studentSlice";
import Sep from "../../../../components/Sep";
import Spacer from "../../../../components/Spacer";
import Label from "../../../../components/Label";
import { ContextMenu, ContextMenuTrigger, MenuItem } from "react-contextmenu";
import colors from "../../../../constant/colors";
import { useParams } from "react-router-dom";
import { FaRegCheckCircle } from "react-icons/fa";
import { MdOutlinePending } from "react-icons/md";
import AddPaymentDetailDialog from "./AddPaymentDetailDialog";
import AddPaymentDetailForm from "./AddPaymentDetailForm";

export default (props: { packageId: string }) => {
    const { packageId } = props;
    const dispatch = useAppDispatch();
    const selectedPackageId = useAppSelector(s => s.student.studentDetail.selectedPackageId);
    const { studentId } = useParams<{ studentId: string }>();
    const package_ = useAppSelector(s => s.student.studentDetail.packages.idToPackage?.[packageId]);
    const { course_id, min, official_end_date, start_date, num_of_classes, consumed_minutes, paid_at } = package_ || {};
    const assignedClasses = Math.floor((consumed_minutes?.count || 0) / (package_?.min || 1) * 10) / 10
    if (!course_id) {
        return null;
    }
    const course = useAppSelector(s => s.class.courses?.idToCourse?.[course_id])
    const isSelected = selectedPackageId === packageId
    const selectHandler = () => {
        dispatch(studentSlice.actions.setSelectedPackageId(packageId || ""))
    }
    const addPaymentDetail = async () => {
        AddPaymentDetailDialog.setContent(() => () => <AddPaymentDetailForm packageId={Number(packageId)} />);
        AddPaymentDetailDialog.setOpen(true);
        // await dispatch(StudentThunkAction.markPackageAsPaid({ packageId: Number(packageId) })).unwrap()
        // if (studentId) {
        //     dispatch(StudentThunkAction.getStudentPackages({ studentId }))
        // }
    }
    const markAsUnPaid = async () => {
        await dispatch(StudentThunkAction.markPackageAsUnPaid({ packageId: Number(packageId) })).unwrap()
        if (studentId) {
            dispatch(StudentThunkAction.getStudentPackages({ studentId }))
        }
    }
    const deletePackage = async () => {
        await dispatch(StudentThunkAction.deletePackage({ packageId: Number(packageId) })).unwrap()
        if (studentId) {
            dispatch(StudentThunkAction.getStudentPackages({ studentId }))
        }
    }
    const paidIcon = () => {
        return (
            <div style={{ display: "flex", alignItems: "center" }}>
                <FaRegCheckCircle style={{ color: colors.green }} />
                <Spacer height={1} width={5} />
                <div>
                    <div>
                        <span style={{ color: colors.green, fontWeight: 500 }}>Paid At</span>
                    </div>
                    <div style={{ fontSize: 12, color: colors.green }}>
                        {dayjs(paid_at).format("YYYY-MM-DD")}
                    </div>
                </div>
            </div>
        )
    }

    const unpaidIcon = () => {
        return (
            <div style={{ display: "flex", alignItems: "center" }}>
                <MdOutlinePending style={{ color: colors.red, fontSize: 18 }} />
                <Spacer height={1} width={5} />
                <span style={{ color: colors.red, fontWeight: 600 }}>Unpaid</span>
            </div>
        )
    }

    const isPaid = paid_at != null;

    return (
        <Box
            style={{
                boxShadow: boxShadow.SHADOW_60,
                margin: 10,
                borderRadius: 0,
                padding: 6
            }}
            sx={{
                cursor: "pointer",
                outline: isSelected ? `${colors.blue} solid 2px` : "",
                "& table": {
                    width: "100%",
                    borderSpacing: "6px"
                },
                "& td": {
                    whiteSpace: "nowrap",
                },
                "& td:first-child": {
                    width: "0.1%",
                },
                "& td:nth-child(2)": {
                    padding: "4px 6px",
                    borderRadius: "4px",
                    backgroundColor: "rgba(0,0,0,0.05)",
                }
            }}
        >
            <Label label="StudentPackage.tsx" offsetLeft={10} />
            {/* @ts-ignore */}
            <ContextMenuTrigger id={packageId}>
                <div onClick={selectHandler}>
                    <div style={{ padding: 10, display: "flex", justifyContent: "center", fontWeight: 600 }}>
                        {course?.course_name}
                    </div>
                    <Sep />
                    <Spacer height={5} />
                    <table>
                        <tbody>

                            <tr>
                                <td>Duration</td><td>{min}</td>
                            </tr>
                            <tr>
                                <td>Start</td><td>{dayjs(start_date).format("YYYY-MM-DD")}</td>
                            </tr>
                            <tr>
                                <td>Expiry Day</td><td>{dayjs(official_end_date).format("YYYY-MM-DD")}</td>
                            </tr>
                            <tr>
                                <td>Classes</td><td>{`${assignedClasses}/${num_of_classes}`}</td>
                            </tr>
                            <tr>
                                <td>Payment Status</td><td>
                                    {isPaid && paidIcon()}
                                    {!isPaid && unpaidIcon()}
                                </td>

                            </tr>

                        </tbody>
                    </table>
                </div>
            </ContextMenuTrigger>
            {/* @ts-ignore */}
            <ContextMenu
                id={packageId}
                style={{
                    zIndex: 10 ** 7,
                    borderRadius: 8,
                    backgroundColor: "white",
                    // boxShadow: boxShadow.SHADOW_62,
                    border: "1px solid rgba(0,0,0,0.2)"
                }}
            >
                <Box
                    sx={{
                        "& .menu-item": {
                            zIndex: 10 ** 7,
                            border: "none",
                            padding: "10px",
                            cursor: "pointer",
                            "&:hover": {
                                "&:hover": {
                                    color: "rgb(64, 150, 255)",
                                },
                            },
                        },
                    }}
                >

                    {!isPaid && (
                        <>{/* @ts-ignore */}
                            <MenuItem
                                className="menu-item"
                                onClick={addPaymentDetail}
                            >
                                Add Payment Detail
                            </MenuItem>
                        </>
                    )}
                    {isPaid && (
                        <>{/* @ts-ignore */}
                            <MenuItem
                                className="menu-item"
                                onClick={markAsUnPaid}
                            >
                                Mark as Unpaid
                            </MenuItem>
                        </>
                    )}
                    <>{/* @ts-ignore */}
                        <MenuItem
                            className="menu-item"
                            onClick={deletePackage}
                        >
                            Delete package
                        </MenuItem>
                    </>
                </Box>
            </ContextMenu>
        </Box >
    )
}