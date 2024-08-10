import dayjs from "dayjs";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import boxShadow from "../../../../constant/boxShadow";
import { Box } from "@mui/material";
import studentSlice from "../../../../redux/slices/studentSlice";

export default (props: { packageId: string }) => {
    const { packageId } = props;
    const dispatch = useAppDispatch();
    const selectedPackageId = useAppSelector(s => s.student.studentDetail.selectedPackageId);
    const package_ = useAppSelector(s => s.student.studentDetail.packages.idToObject?.[packageId]);
    const { course_id, created_at, min, official_end_date, start_date, student_id, num_of_classes } = package_ || {};
    if (!course_id) {
        return null;
    }
    const course = useAppSelector(s => s.class.courses?.idToObject?.[course_id])
    const isSelected = selectedPackageId === packageId
    const selectHandler = () => {
        dispatch(studentSlice.actions.setSelectedPackageId(packageId || ""))
    }
    return (
        <Box
            style={{
                boxShadow: boxShadow.SHADOW_62,
                margin: 10,
                borderRadius: 8,
                padding: 6
            }}
            sx={{
                cursor: "pointer",
                outline: isSelected ? "#4096ff solid 2px" : "",
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
            <div onClick={selectHandler}>
                <div style={{ padding: 10, display: "flex", justifyContent: "center", fontWeight: 600, fontSize: 17 }}>
                    {course?.course_name}
                </div>
                <table>
                    <tbody>

                        <tr>
                            <td>Duration</td><td>{min}</td>
                        </tr>
                        <tr>
                            <td>Start</td><td>{dayjs(start_date).format("YYYY-MM-DD")}</td>
                        </tr>
                        <tr>
                            <td>Official End</td><td>{dayjs(official_end_date).format("YYYY-MM-DD")}</td>
                        </tr>
                        <tr>
                            <td>classes</td><td>{num_of_classes}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Box>
    )
}