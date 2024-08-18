import { Box, Button } from "@mui/material";
import { Button as AntdButton } from "antd";
import boxShadow from "../../../constant/boxShadow";
import { useAppSelector } from "../../../redux/hooks";
import { useNavigate } from "react-router-dom";
import { RouteEnum } from "../../../router/router";
import { FaChevronRight } from "react-icons/fa";
import Label from "../../../components/Label";
import { RiTableFill } from "react-icons/ri";
import AddPackageForm from "./AddPackageForm";
import AddPackageDialog from "./AddPackageDialog";
import Spacer from "../../../components/Spacer";


export default (props: { id: string }) => {
    const { id } = props;
    const navigate = useNavigate();
    const student = useAppSelector(s => s.student.students?.idToStduent?.[id])
    const goDetailPage = () => {
        navigate(`${RouteEnum.DASHBOARD_STUDENTS}/${id}`)
    }

    if (!student) {
        return null;
    }
    const {
        first_name,
        parent_email,
        last_name,
    } = student;

    return (
        <div style={{ display: "flex", alignItems: "center" }}>
            <Box style={{
                flex: 1,
                boxShadow: boxShadow.SHADOW_62,
                padding: "20px 30px",
                marginBottom: "15px",
                borderRadius: "8px",
            }}
                sx={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    "& input": {
                        width: "100%",
                        backgroundColor: "rgba(255,255,255,0.7)",
                        flex: 1,
                        padding: "1.4px",
                        border: "none",
                        outline: "none"
                    },
                    "& td:nth-child(1)": {
                        verticalAlign: "middle",
                        width: "100px",
                        color: "rgb(150,150,150)"
                    },
                    "& td:nth-child(2), & td:nth-child(3)": {
                        display: "flex",
                        width: "300px",
                        borderRadius: "4px",
                        background: "rgb(240,240,240)",
                        padding: "5px"
                    },
                }}
            >
                <table>
                    <tbody>
                        <Label label="StudentRow.tsx" offsetTop={-20} />
                        <tr>
                            <td>Name:</td>
                            <td>{`${first_name} ${last_name}`}</td>
                        </tr>
                        <tr>
                            <td>Parent Email:</td>
                            <td>{parent_email}</td>
                        </tr>
                    </tbody>
                </table>
                <FaChevronRight size={26} color="rgb(100,100,100)" />
                <Button
                    onClick={goDetailPage}
                    style={{
                        width: "100%",
                        height: "100%",
                        position: "absolute",
                        top: 0,
                        left: 0
                    }} />
            </Box>
        </div >
    )
}
