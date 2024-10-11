import { Button, Select } from "antd";
import Spacer from "../../../components/Spacer";
import { useEffect, useRef, useState } from "react";
import { CreateStudentRequest, Gender, UpdateStudentRequest } from "../../../dto/dto";
import apiClient from "../../../axios/apiClient";
import apiRoutes from "../../../axios/apiRoutes";
import { CustomResponse } from "../../../axios/responseTypes";
import FormInputField from "../../../components/FormInputField";
import toastUtil from "../../../utils/toastUtil";
import SectionTitle from "../../../components/SectionTitle";
import AddUserDialog from "./AddStudentDialog";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { Box } from "@mui/material";
import FormInputTitle from "../../../components/FormInputTitle";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import studentSlice, { StudentThunkAction } from "../../../redux/slices/studentSlice";
import Label from "../../../components/Label";
import moment from "moment";
import EditStudentDialog from "./EditStudentDialog";

const initialDate = "2015-01-01";

export default ({ studentId }: { studentId: string }) => {
    const dispatch = useAppDispatch();
    const student = useAppSelector((s) => s.student.students.idToStudent?.[studentId]);
    if (!student) return;
    const formData = useRef<Partial<UpdateStudentRequest>>({
        id: studentId,
        first_name: student.first_name,
        last_name: student.last_name,
        chinese_first_name: student.chinese_first_name,
        chinese_last_name: student.chinese_last_name,
        gender: student.gender,
        grade: student.grade,
        birthdate: student.birthdate,
        parent_email: student.parent_email,
        school_name: student.school_name,
        phone_number: student.phone_number,
        wechat_id: student.wechat_id,
    });
    const [error, setError] = useState<Partial<UpdateStudentRequest>>({});
    const update = (update_: Partial<UpdateStudentRequest>) => {
        console.log("update_:", update_);
        formData.current = {
            ...formData.current, // Merge with existing values
            ...update_, // Override with new updates
        };
        console.log("formData.current:", formData.current);
    };

    const submit = async () => {
        console.log("formData.current:", formData.current);
        console.log("Hi!");
        dispatch(StudentThunkAction.updateStudent(formData.current))
            .unwrap()
            .then(() => {
                toastUtil.success("User Created");
                EditStudentDialog.setOpen(false);
                dispatch(studentSlice.actions.resetStudentDetail);
            });
    };

    const dateFormat = "YYYY-MM-DD";

    useEffect(() => {
        if (formData.current) {
            console.log("formData.current:", formData.current);
        }
    }, [formData.current]);

    return (
        <Box style={{ maxWidth: 400, width: 600, padding: "40px 80px", overflowY: "auto", paddingBottom: 60 }}>
            <Label label="EditStudentForm.tsx" offsetTop={-20} />
            <SectionTitle>Edit Student Info</SectionTitle>
            <Spacer />
            <FormInputField title="First Name" defaultValue={student.first_name} onChange={(t) => update({ first_name: t })} error={error?.["first_name"]} />
            <FormInputField title="Last Name" defaultValue={student.last_name} onChange={(t) => update({ last_name: t })} error={error?.["last_name"]} />
            <FormInputField
                title="Chinese First Name"
                defaultValue={student.chinese_first_name}
                onChange={(t) => update({ chinese_first_name: t })}
                error={error?.["chinese_first_name"]}
            />
            <FormInputField
                title="Chinese First Name"
                defaultValue={student.chinese_last_name}
                onChange={(t) => update({ chinese_last_name: t })}
                error={error?.["chinese_last_name"]}
            />
            <div style={{ display: "flex" }}>
                <div>
                    <FormInputTitle>Gender</FormInputTitle>
                    <Spacer height={5} />
                    <Select
                        dropdownStyle={{ zIndex: 10 ** 4 }}
                        defaultValue={student.gender}
                        style={{ width: 130 }}
                        onChange={(value) => {
                            update({ gender: value as Gender });
                        }}
                        options={[
                            { value: "MALE", label: "Male" },
                            { value: "FEMALE", label: "Female" },
                        ]}
                    />
                </div>
                <Spacer />
                <div>
                    <FormInputTitle>Date of Birth</FormInputTitle>
                    <Spacer height={5} />
                    <DatePicker
                        onChange={(val) => {
                            console.log("val.valueOf():", val.valueOf());
                            formData.current.birthdate = val.valueOf();
                        }}
                        popupStyle={{ zIndex: 10 ** 7 }}
                        defaultValue={dayjs(formData.current.birthdate)}
                    />
                </div>
            </div>
            <Spacer />
            <FormInputField title="Parent Email" defaultValue={student.parent_email} onChange={(t) => update({ parent_email: t })} error={error?.["parent_email"]} />
            <FormInputField title="School Name" defaultValue={student.school_name} onChange={(t) => update({ school_name: t })} error={error?.["school_name"]} />
            <FormInputField title="Grade" defaultValue={student.grade} onChange={(t) => update({ grade: t })} error={error?.["grade"]} />
            <FormInputField title="Phone Number" defaultValue={student.phone_number} onChange={(t) => update({ phone_number: t })} error={error?.["phone_number"]} />
            <FormInputField title="Wechat Id (Optional)" defaultValue={student.wechat_id} onChange={(t) => update({ wechat_id: t })} error={error?.["wechat_id"]} />
            <Spacer />
            <Spacer />
            <Button type="primary" block onClick={submit}>
                Submit
            </Button>
        </Box>
    );
};
