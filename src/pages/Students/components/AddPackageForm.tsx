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
import { TimePicker } from "antd";
import { CreateStudentPackageRequest } from "../../../dto/dto";
import dayjs from "dayjs";
import AddPackageDialog from "./AddPackageDialog";
import { Classroom } from "../../../prismaTypes/types";
import { IoIosInformationCircle } from "react-icons/io";
import colors from "../../../constant/colors";

// Function to convert timestamp to the start of the day (midnight)
const toMidnight = (timestamp: number): number => {
    // Create a dayjs object from the timestamp
    const date = dayjs(timestamp);

    // Set the time to midnight
    const midnight = date.hour(0).minute(0).second(0).millisecond(0);

    // Return the Unix timestamp in milliseconds
    return midnight.valueOf();
};

export default (props: { studentId: string; studentName: string }) => {
    const { studentName, studentId } = props;
    const [error, _] = useState<Partial<CreateStudentPackageRequest>>({});
    const dispatch = useAppDispatch();
    const classes = useAppSelector((s) => s.class.courses);
    const formData = useRef<Partial<CreateStudentPackageRequest>>({});
    const updateFormData = (update: Partial<CreateStudentPackageRequest>) => {
        formData.current = { ...formData.current, ...update };
    };

    const submit = async () => {
        const { course_id, min, start_date, num_of_classes, start_time, default_classroom } = formData.current || {};
        console.log("submission data", course_id, min, start_date, num_of_classes, start_time, default_classroom);
        if (!(course_id != null && min != null && num_of_classes != null && default_classroom != null)) {
            return;
        }

        // Solve the issue of chosen start_time starts from today, not from the start_date
        const chosenStartTimeResolvingUndefinedIssue = start_time ? start_time : dayjs("09:00", "HH:mm").valueOf();
        const chosenStartDateResolvingUndefinedIssue = start_date ? start_date : toMidnight(new Date().getTime());
        const timestampToAdd = chosenStartTimeResolvingUndefinedIssue - toMidnight(start_time ? start_time : dayjs("09:00", "HH:mm").valueOf());
        const realStartTime = chosenStartDateResolvingUndefinedIssue + timestampToAdd;

        const reqBody: CreateStudentPackageRequest = {
            num_of_classes,
            course_id,
            min,
            start_date: chosenStartDateResolvingUndefinedIssue,
            start_time: realStartTime,
            default_classroom,
            expiry_date: dayjs(start_date).add(4, "months").valueOf(),
            student_id: studentId,
        };
        console.log("reqBody:", reqBody);
        AddPackageDialog.setOpen(false);
        await dispatch(StudentThunkAction.createStudentPackage(reqBody)).unwrap();
        dispatch(StudentThunkAction.getStudentPackages({ studentId })).unwrap();
        dispatch(StudentThunkAction.getStudentClassesForWeeklyTimetable({ studentId })).unwrap();
    };

    const disabledHours = () => {
        // Enable hours from 9 (09:00) to 19 (7 PM)
        const hours = Array.from({ length: 24 }, (_, i) => i);
        return hours.filter((hour) => hour < 9 || hour > 19);
    };

    useEffect(() => {
        dispatch(CourseThunkAction.getCourses());
    }, []);

    const allowedOptionsForNumberOfClasses = [1, 7, 15, 30, 50];

    const classroomOptions: Classroom[] = ["PRINCE_EDWARD", "CAUSEWAY_BAY"];

    return (
        <Box style={{ maxWidth: 400, width: 600, padding: "40px 80px", overflowY: "auto", paddingBottom: 60 }}>
            <Label label="AddPackageForm.tsx" offsetTop={0} offsetLeft={180} />
            <SectionTitle>Add Student Package for {studentName}</SectionTitle>
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
                disabledDate={(current) => {
                    // Can't select days before today
                    return current && current < dayjs().startOf('day');
                }}
                onChange={(val) => {
                    formData.current.start_date = val.valueOf();
                }}
                popupStyle={{ zIndex: 10 ** 7 }}
            // defaultValue={dayjs(new Date())}
            />
            <Spacer />
            <FormInputTitle>Start Time</FormInputTitle>
            <Spacer height={5} />
            <div style={{ display: "flex", alignItems: "center" }}>
                <TimePicker
                    onChange={(val) => {
                        formData.current.start_time = val.valueOf();
                    }}
                    minuteStep={15}
                    disabledHours={disabledHours}
                    // defaultValue={dayjs("09:00", "HH:mm")}
                    format={"HH:mm"}
                    popupStyle={{ zIndex: 10 ** 7 }}
                />
                <Spacer width={15} />
                <div style={{ color: colors.grey_deep, display: "flex", alignItems: "center" }}>
                    <IoIosInformationCircle size={20} />  <Spacer width={5} /> (double click to confirm)
                </div>
            </div>
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
                options={allowedOptionsForNumberOfClasses.map((value) => ({ value: value, label: `${value}` }))} // Map allowed options to Select options
            />
            <Spacer />
            <div style={{ display: "flex" }}>
                <FormInputTitle>Select Default Classroom</FormInputTitle>
            </div>
            <Spacer height={5} />
            <Select
                dropdownStyle={{ zIndex: 10 ** 4 }}
                style={{ width: "100%" }}
                onChange={(value) => {
                    updateFormData({ default_classroom: value });
                }}
                options={classroomOptions.map((value) => ({ value: value, label: `${value}` }))} // Map allowed options to Select options
            />
            <Spacer />
            <Spacer />
            <Button type="primary" block onClick={submit}>
                Submit
            </Button>
        </Box>
    );
};
