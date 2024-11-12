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
import escapeStringRegexp from "escape-string-regexp";

export default () => {
    const dispatch = useAppDispatch();
    const ids = useAppSelector((s) => s.student.students.ids) || [];
    const [filter, setFilter] = useState("");
    const idToStudent = useAppSelector((s) => s.student.students.idToStudent);

    const openAddUserDialog = () => {
        AddStudentDialog.setContent(() => () => <AddStudentForm />);
        AddStudentDialog.setOpen(true);
    };

    useEffect(() => {
        dispatch(StudentThunkAction.getStudents());
    }, [dispatch]);

    const filterRegex = new RegExp(escapeStringRegexp(filter), "i");
    const filteredIds = ids.filter((id) => {
        const student = idToStudent?.[id];
        const {
            student_code = "",
            chinese_first_name = "",
            chinese_last_name = "",
            first_name = "",
            last_name = "",
            parent_email = "",
            school_name = "",
            phone_number = "",
        } = student || {};

        const sum = [
            student_code,
            chinese_first_name,
            chinese_last_name,
            `${chinese_last_name} ${chinese_first_name}`,
            `${first_name} ${last_name}`,
            first_name,
            last_name,
            parent_email,
            phone_number,
            school_name,
        ].reduce((acc, curr) => {
            const sum = acc + Number(filterRegex.test(curr));
            return sum;
        }, 0);

        return sum >= 1;
    });

    console.log("filteredIds", filteredIds);

    return (
        <div>
            <SectionTitle style={{ marginBottom: 20 }}>Students</SectionTitle>

            {/* Autocomplete for searching students */}
            <Autocomplete
                freeSolo // Allows arbitrary input not limited to the options
                options={filteredIds.map((id) => {
                    const student = idToStudent?.[id];
                    const searchDisplay = (() => {
                        let result = "";
                        if (student?.first_name) {
                            result += student.first_name;
                        }
                        if (student?.last_name) {
                            result += " " + student.last_name;
                        }
                        return result;
                    })();
                    return searchDisplay;
                })}
                onInputChange={(_, newValue) => {
                    console.log("newValuenewValuenewValue", newValue);
                    setFilter(newValue || "");
                }}
                renderInput={(params) => (
                    <TextField {...params} label="Find the student" placeholder="Chinese Name, English Name, School Name, Parent Email, etc." variant="outlined" />
                )}
            />

            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
                <Button type="primary" onClick={openAddUserDialog}>
                    Add Student
                </Button>
            </div>

            <Spacer />

            <Box>
                {filteredIds.map((id) => (
                    <StudentRow id={id} key={id} />
                ))}
            </Box>
            <AddStudentDialog.render />
            <EditStudentDialog.render />
        </div>
    );
};
