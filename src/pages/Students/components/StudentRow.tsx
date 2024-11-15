import { Box, Button } from "@mui/material";
import boxShadow from "../../../constant/boxShadow";
import { useAppSelector } from "../../../redux/hooks";
import { useNavigate } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";
import Label from "../../../components/Label";
import { ContextMenu, ContextMenuTrigger, MenuItem } from "react-contextmenu";
import EditStudentDialog from "./EditStudentDialog";
import EditStudentForm from "./EditStudentForm";
import RouteEnum from "../../../enum/RouteEnum";
import dayjs from "dayjs";

export default (props: { id: string }) => {
    const { id } = props;
    const navigate = useNavigate();
    const student = useAppSelector((s) => s.student.students?.idToStudent?.[id]);
    const goDetailPage = () => {
        navigate(`${RouteEnum.DASHBOARD_STUDENTS}/${id}/${dayjs(new Date()).unix() * 1000}`);
    };
    const contextMenuId = props.id;

    if (!student) {
        return null;
    }
    const {
        student_code = "",
        first_name = "",
        parent_email = "",
        last_name = "",
        chinese_first_name = "",
        chinese_last_name = "",
        gender = "",
        birthdate = "",
        grade = "",
        school_name = "",
        phone_number = "",
        wechat_id = "",
    } = student;

    const chineseName = (() => {
        let name = "";
        if (chinese_last_name) {
            name += chinese_last_name;
        }
        if (chinese_first_name) {
            name += chinese_first_name;
        }
        return name;
    })();

    return (
        <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
            <Box
                style={{
                    flex: 1,
                    boxShadow: boxShadow.SHADOW_62,
                    padding: "20px 30px",
                    marginBottom: "15px",
                    borderRadius: "0px",
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
                        outline: "none",
                    },
                    "& td": {
                        marginBottom: "4px",
                    },
                    "& td:nth-child(1)": {
                        verticalAlign: "top",
                        width: "120px",
                        color: "rgb(150,150,150)",
                    },
                    "& td:nth-child(2), & td:nth-child(3)": {
                        display: "flex",
                        width: "300px",
                        minHeight: "16px",

                        borderRadius: "4px",
                        background: "rgb(240,240,240)",
                        padding: "5px",
                    },
                }}
            >
                {/* @ts-ignore */}
                <ContextMenuTrigger id={contextMenuId}>
                    <div style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <table style={{ width: "100%" }}>
                            <tbody>
                                <Label label="StudentRow.tsx" offsetTop={-20} />
                                <tr>
                                    <td>Student Code:</td>
                                    <td>{student_code}</td>
                                </tr>
                                <tr>
                                    <td>Chinese Name:</td>
                                    <td>{chineseName}</td>
                                </tr>
                                <tr>
                                    <td>English Name:</td>
                                    <td>{`${first_name} ${last_name}`}</td>
                                </tr>
                                <tr>
                                    <td>Gender:</td>
                                    <td>{`${gender}`}</td>
                                </tr>
                                <tr>
                                    <td>School Name:</td>
                                    <td>{`${school_name}`}</td>
                                </tr>
                                <tr>
                                    <td>
                                        Grade: <span style={{ fontSize: 13, fontWeight: "bold" }}>{`(before ${dayjs(new Date()).format("YYYY")}-09-01)`}</span>
                                    </td>
                                    <td>{`${grade}`}</td>
                                </tr>
                                <tr>
                                    <td>phone number:</td>
                                    <td>{`${phone_number}`}</td>
                                </tr>
                                <tr>
                                    <td>Wechat ID:</td>
                                    <td>{`${wechat_id || ""}`}</td>
                                </tr>
                                <tr>
                                    <td>Parent Email:</td>
                                    <td>{parent_email}</td>
                                </tr>
                                <tr>
                                    <td>Birthday:</td>
                                    <td>{`${birthdate}`}</td>
                                </tr>
                            </tbody>
                        </table>
                        <Button
                            TouchRippleProps={{
                                style: {
                                    color: "rgba(0,0,0,0.5)",
                                },
                            }}
                            onClick={goDetailPage}
                            style={{
                                width: "100%",
                                height: "100%",
                                position: "absolute",
                                top: 0,
                                left: 0,
                            }}
                        />
                    </div>
                </ContextMenuTrigger>
                <FaChevronRight size={26} color="rgb(100,100,100)" />
            </Box>
            {/* @ts-ignore */}
            <ContextMenu id={contextMenuId} style={{ zIndex: 10 ** 7 }}>
                <Box
                    sx={{
                        backgroundColor: "white",
                        borderRadius: "8px",
                        boxShadow: boxShadow.SHADOW_62,
                        "& .menu-item": {
                            padding: "10px",
                            cursor: "pointer",
                            "&:hover": {
                                color: "rgb(64, 150, 255)",
                            },
                            "&.disabled": {
                                opacity: 0.3,
                                pointerEvents: "none",
                            },
                        },
                    }}
                >
                    {/* @ts-ignore */}
                    <MenuItem
                        className="menu-item"
                        onClick={() => {
                            EditStudentDialog.setContent(() => () => <EditStudentForm studentId={student.id} />);
                            EditStudentDialog.setOpen(true);
                        }}
                    >
                        Edit Student
                    </MenuItem>
                    {/* @ts-ignore */}
                    {/* <MenuItem
                        className="menu-item"
                        onClick={() => {
                            DeleteStudentDialog.setContent(() => () => <DeleteStudentForm studentId={student.id} />);
                            DeleteStudentDialog.setOpen(true);
                        }}
                    >
                        <span style={{ color: "red" }}>Delete Student</span>
                    </MenuItem> */}
                </Box>
            </ContextMenu>
        </div>
    );
};
