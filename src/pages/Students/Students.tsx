import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import AddStudentDialog from "./components/AddStudentDialog";
import { Button } from "antd";
import AddStudentForm from "./components/AddStudentForm";
import Spacer from "../../components/Spacer";
import { Box } from "@mui/material";
import SectionTitle from "../../components/SectionTitle";
import StudentRow from "./components/StudentRow";
import { StudentThunkAction } from "../../redux/slices/studentSlice";

export default () => {
    const dispatch = useAppDispatch();
    const ids = useAppSelector(s => s.student.students.ids) || []
    const openAddUserDialog = () => {
        AddStudentDialog.setContent(() => () => <AddStudentForm />)
        AddStudentDialog.setOpen(true);
    }

    useEffect(() => {
        dispatch(StudentThunkAction.getStudents());
    }, [])
    return (
        <div>
            <SectionTitle>Students</SectionTitle>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button type="primary" onClick={openAddUserDialog}>Add Student</Button>
            </div>
            <Spacer />
            <Box >
                {ids.map(id => {
                    return <StudentRow id={id} key={id} />
                })}
            </Box>
            <AddStudentDialog.render />
        </div>
    )
}