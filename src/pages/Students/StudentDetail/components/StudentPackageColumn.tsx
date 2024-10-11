import { Button } from "antd";
import Title from "../../../../components/Title";
import AddPackageForm from "../../components/AddPackageForm";
import AddPackageDialog from "../../components/AddPackageDialog";
import { useParams } from "react-router-dom";
import { LuPlusCircle } from "react-icons/lu";
import Spacer from "../../../../components/Spacer";
import Sep from "../../../../components/Sep";
import { Box, Switch } from "@mui/material";
import { FaAngleDoubleRight } from "react-icons/fa";
import CustomScrollbarContainer from "../../../../components/CustomScrollbarContainer";
import { useAppSelector } from "../../../../redux/hooks";
import StudentPackage from "./StudentPackage";
import Label from "../../../../components/Label";
import { useDispatch } from "react-redux";
import studentSlice from "../../../../redux/slices/studentSlice";

export default (props: { packagesOffsetY: number }) => {
    const { packagesOffsetY } = props;
    const packages = useAppSelector((s) => s.student.studentDetail.packages);
    const dispatch = useDispatch();
    const { studentId } = useParams<{ studentId: string }>();
    const studentDetail = useAppSelector((s) => s.student.studentDetail.detail);
    const { first_name, last_name } = studentDetail || {};
    const label = { inputProps: { "aria-label": "Switch demo" } };
    const handleShowAllClassesOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(studentSlice.actions.setShowAllClassesForOneStudent(event.target.checked));
    };

    return (
        <div style={{ width: "290px", display: "flex", flexDirection: "column" }}>
            <div style={{ height: "calc(100vh - 40px)", overflow: "hidden", display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Label label="StudentPackageColumn.tsx" offsetTop={-15} offsetLeft={20} />
                    <Title>Student Packages</Title>
                    <Button
                        style={{ width: 40, height: 40 }}
                        onClick={() => {
                            AddPackageDialog.setContent(() => () => <AddPackageForm studentId={studentId || ""} studentName={`${first_name} ${last_name}`} />);
                            AddPackageDialog.setOpen(true);
                        }}
                        shape="circle"
                    >
                        <LuPlusCircle size={30} />
                    </Button>
                </div>
                <Spacer height={5} />
                <Sep />
                <Spacer />
                {/* <Box
                    sx={{
                        flex: 1,
                        "& td": {
                            "& div": {
                                display: "flex",
                                alignItems: "center",
                                width: "100%",
                                height: "100%",
                            },
                        },
                    }}
                >
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <div>
                                        <FaAngleDoubleRight />
                                        <Spacer width={5} /> Next Class
                                    </div>
                                </td>
                                <td>???</td>
                            </tr>
                        </tbody>
                    </table>
                </Box> */}
                <div>
                    <div style={{ marginLeft: "10px" }}>Show All Classes</div>
                    <Switch
                        onChange={(event) => {
                            handleShowAllClassesOnChange(event);
                        }}
                        {...label}
                        defaultChecked
                    />
                </div>
                <CustomScrollbarContainer style={{ height: `calc(100vh - ${packagesOffsetY}px)`, width: "100%" }}>
                    <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
                        <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
                            {packages.ids?.map((id) => {
                                return <StudentPackage packageId={id} key={id} />;
                            })}
                        </div>
                    </div>
                </CustomScrollbarContainer>
            </div>
        </div>
    );
};
