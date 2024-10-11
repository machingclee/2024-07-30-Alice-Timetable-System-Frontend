import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import AddStudentDialog from "./components/AddStudentDialog";
import { Button } from "antd";
import AddStudentForm from "./components/AddStudentForm";
import Spacer from "../../components/Spacer";
import { Box } from "@mui/material";
import SectionTitle from "../../components/SectionTitle";
import StudentRow from "./components/StudentRow";
import { StudentThunkAction } from "../../redux/slices/studentSlice";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import EditStudentDialog from "./components/EditStudentDialog";
import DeleteStudentDialog from "./components/DeleteStudentDialog";

export default () => {
    const dispatch = useAppDispatch();
    const ids = useAppSelector((s) => s.student.students.ids) || [];
    const [idSelected, setIdSelected] = useState<string[]>([]);
    const idToStduent = useAppSelector((s) => s.student.students.idToStudent);
    const openAddUserDialog = () => {
        AddStudentDialog.setContent(() => () => <AddStudentForm />);
        AddStudentDialog.setOpen(true);
    };

    const handleAutcompleteOnChange = (newValue: string | null) => {
        if (newValue === null) {
            setIdSelected([]);
        }
        if (!newValue || !idToStduent) return;
        const studentList: string[] = [];
        Object.values(idToStduent).forEach((student) => {
            if (student.first_name + " " + student.last_name === newValue) {
                studentList.push(student.id);
            }
        });
        setIdSelected(studentList);
    };

    useEffect(() => {
        dispatch(StudentThunkAction.getStudents());
    }, []);
    return (
        <div>
            <SectionTitle style={{ marginBottom: 20 }}>Students</SectionTitle>
            <Autocomplete
                freeSolo // Allows arbitrary input not limited to the options
                options={ids.map(
                    (id) =>
                        idToStduent?.[id].first_name + " " + idToStduent?.[id].last_name + " " + idToStduent?.[id].chinese_first_name + " " + idToStduent?.[id].chinese_last_name
                )}
                onChange={(event, newValue) => {
                    handleAutcompleteOnChange(newValue);
                }}
                renderInput={(params) => <TextField {...params} label="Find the student" variant="outlined" />}
            />
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
                <Button type="primary" onClick={openAddUserDialog}>
                    Add Student
                </Button>
            </div>
            <Spacer />
            <Box>
                {idSelected.length > 0
                    ? idSelected.map((id) => {
                          console.log(id);
                          return <StudentRow id={id} key={id} />;
                      })
                    : ids.map((id) => {
                          return <StudentRow id={id} key={id} />;
                      })}
            </Box>
            <AddStudentDialog.render />
            <EditStudentDialog.render />
            <DeleteStudentDialog.render />
        </div>
    );
};
