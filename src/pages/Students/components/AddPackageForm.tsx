import { Button, DatePicker, Select } from "antd";
import Spacer from "../../../components/Spacer";
import { useEffect, useRef, useState } from "react";
import SectionTitle from "../../../components/SectionTitle";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { Box } from "@mui/material";
import FormInputTitle from "../../../components/FormInputTitle";
import Label from "../../../components/Label";
import { CourseThunkAction } from "../../../redux/slices/courseSlice";
import { StudentThunkAction } from "../../../redux/slices/studentSlice";
import { CreateClassRequest, CreateStudentPackageRequest } from "../../../dto/dto";
import dayjs from "dayjs";
import AddPackageDialog from "./AddPackageDialog";
import range from "../../../utils/range";

export default (props: { studentId: string; studentName: string }) => {
    const { studentName, studentId } = props;
    const [error, setError] = useState<Partial<CreateStudentPackageRequest>>({});
    const dispatch = useAppDispatch();
    const classes = useAppSelector((s) => s.class.courses);
    const formData = useRef<Partial<CreateStudentPackageRequest>>({});
    const updateFormData = (update: Partial<CreateStudentPackageRequest>) => {
        formData.current = { ...formData.current, ...update };
    };

    const submit = async () => {
        const { course_id, min, start_date, num_of_classes } = formData.current || {};
        console.log("formData.current:", formData.current);
        if (!(course_id != null && min != null && num_of_classes != null)) {
            return;
        }
        const date_to_start = start_date ? start_date : new Date().getTime();
        const reqBody: CreateStudentPackageRequest = {
            num_of_classes,
            course_id,
            min,
            start_date: date_to_start,
            expiry_date: dayjs(start_date).add(4, "months").valueOf(),
            student_id: studentId,
        };
        AddPackageDialog.setOpen(false);
        await dispatch(StudentThunkAction.createStudentPackage(reqBody)).unwrap();
        dispatch(StudentThunkAction.getStudentPackages({ studentId })).unwrap();
    };

    useEffect(() => {
        dispatch(CourseThunkAction.getCourses());
    }, []);

    return (
        <Box style={{ maxWidth: 400, width: 600, padding: "40px 80px", overflowY: "auto", paddingBottom: 60 }}>
            <Label label="AddPackageForm.tsx" offsetTop={0} offsetLeft={180} />
            <SectionTitle>Add Student Package to {studentName}</SectionTitle>
            <Spacer />
            <div style={{ display: "flex" }}>
                <FormInputTitle>Select a Course</FormInputTitle>
                <Spacer />
                {error.course_id && <div>{error.course_id}</div>}
            </div>
            <Spacer height={5} />
            <Select
                dropdownStyle={{ zIndex: 10 ** 4 }}
                style={{ width: "100%" }}
                onChange={(value) => {
                    updateFormData({ course_id: value });
                }}
                options={classes.ids?.map((id_) => {
                    const { course_name, id } = classes.idToCourse?.[id_] || {};
                    return {
                        value: id || 0,
                        label: course_name || "",
                    };
                })}
            />
            <Spacer />
            <FormInputTitle>Start Date</FormInputTitle>
            <Spacer height={5} />
            <DatePicker
                onChange={(val) => {
                    formData.current.start_date = val.valueOf();
                }}
                popupStyle={{ zIndex: 10 ** 7 }}
                defaultValue={dayjs(new Date())}
            />
            <Spacer />

            <div style={{ display: "flex" }}>
                <FormInputTitle>Select a Duration (in minutes)</FormInputTitle>
                <Spacer />
                {error.min && <div>{error.min}</div>}
            </div>
            <Spacer height={5} />
            <Select
                dropdownStyle={{ zIndex: 10 ** 4 }}
                style={{ width: "100%" }}
                onChange={(value) => {
                    updateFormData({ min: value });
                }}
                options={[
                    { value: 45, label: "45" },
                    { value: 60, label: "60" },
                    { value: 75, label: "75" },
                ]}
            />
            <Spacer />
            <div style={{ display: "flex" }}>
                <FormInputTitle>Select Number of Classes</FormInputTitle>
            </div>
            <Spacer height={5} />
            <Select
                dropdownStyle={{ zIndex: 10 ** 4 }}
                style={{ width: "100%" }}
                onChange={(value) => {
                    updateFormData({ num_of_classes: value });
                }}
                options={range({ from: 1, to: 100 }).map((value) => ({ value, label: value + "" }))}
            />

            <Spacer />
            <Spacer />
            <Button type="primary" block onClick={submit}>
                Submit
            </Button>
        </Box>
    );
};
