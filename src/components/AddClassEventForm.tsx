import { Button, Select } from "antd";
import Spacer from "../components/Spacer";
import { useEffect, useRef, useState } from "react";
import SectionTitle from "../components/SectionTitle";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { Box } from "@mui/material";
import FormInputTitle from "../components/FormInputTitle";
import Label from "../components/Label";
import { CourseThunkAction } from "../redux/slices/courseSlice";
import { StudentThunkAction } from "../redux/slices/studentSlice";
import apiClient from "../axios/apiClient";
import apiRoutes from "../axios/apiRoutes";
import toastUtil from "../utils/toastUtil";
import AddClassEventDialog from "../components/AddClassEventDialog";
import { CustomResponse } from "../axios/responseTypes";
import { CreateClassRequest } from "../dto/dto";
import durations from "../constant/durations";
import dayjs from "dayjs";
import range from "../utils/range";
import { Classroom } from "../prismaTypes/types";

export default (props: { dayUnixTimestamp: number; hourUnixTimestamp: number; studentId: string }) => {
    const { dayUnixTimestamp, hourUnixTimestamp, studentId } = props;
    const [error, setError] = useState<Partial<CreateClassRequest>>({});
    const selectedPackageId = useAppSelector((s) => s.student.studentDetail.selectedPackageId);
    const defaultClassroom = useAppSelector((s) => s.student.studentDetail.packages.idToPackage?.[selectedPackageId]?.default_classroom);
    const defaultCourseId = useAppSelector((s) => s.student.studentDetail.packages.idToPackage?.[selectedPackageId]?.course_id || 0);
    const defaultMin = useAppSelector((s) => s.student.studentDetail.packages.idToPackage?.[selectedPackageId]?.min || 0);
    const defaultNumOfClasses = useAppSelector((s) => s.student.studentDetail.packages.idToPackage?.[selectedPackageId]?.num_of_classes || 1);
    const dispatch = useAppDispatch();
    const courses = useAppSelector((s) => s.class.courses);
    const formData = useRef<Partial<CreateClassRequest>>({
        day_unix_timestamp: dayUnixTimestamp,
        hour_unix_timestamp: hourUnixTimestamp,
        student_id: studentId,
        student_package_id: Number(selectedPackageId || "0"),
        course_id: defaultCourseId,
        min: defaultMin,
        num_of_classes: defaultNumOfClasses,
        actual_classroom: defaultClassroom,
    });
    const updateFormData = (update: Partial<CreateClassRequest>) => {
        formData.current = {
            ...formData.current,
            ...update,
        };
    };

    const submit = async () => {
        const res = await apiClient.post<CustomResponse<undefined>>(apiRoutes.POST_CREATE_STUDENT_CLASS, formData.current);
        if (!res.data.success) {
            const errorMessage = res.data?.errorMessage;
            const errorObject = res.data?.errorObject;
            if (errorMessage) {
                toastUtil.error(errorMessage);
            }
            if (errorObject) {
                setError(errorObject);
            }
        } else {
            toastUtil.success("Event Created");
            AddClassEventDialog.setOpen(false);
            dispatch(StudentThunkAction.getStudentClassesForWeeklyTimetable({ studentId }));
            dispatch(StudentThunkAction.getStudentPackages({ studentId }));
        }
    };

    useEffect(() => {
        dispatch(CourseThunkAction.getCourses());
    }, []);

    const allowedOptionsForNumberOfClasses = [1, 7, 15, 30, 50];

    const classroomOptions: Classroom[] = ["PRINCE_EDWARD", "CAUSEWAY_BAY"];

    return (
        <Box style={{ maxWidth: 400, width: 600, padding: "40px 80px", overflowY: "auto", paddingBottom: 60 }}>
            <Label label="AddClassEventForm.tsx" offsetTop={0} offsetLeft={180} />
            <SectionTitle>Add Class at {dayjs(hourUnixTimestamp).format("HH:mm")}</SectionTitle>
            <Spacer />
            <div style={{ display: "flex" }}>
                <FormInputTitle>Course </FormInputTitle>
                <Spacer />
                {error.course_id && <div>{error.course_id}</div>}
            </div>
            <Select
                disabled={true}
                dropdownStyle={{ zIndex: 10 ** 4 }}
                style={{ width: "100%" }}
                defaultValue={defaultCourseId}
                onChange={(value) => {
                    updateFormData({ course_id: value });
                }}
                options={courses.ids?.map((id_) => {
                    const { course_name, id } = courses.idToCourse?.[id_] || {};
                    return {
                        value: id || 0,
                        label: course_name || "",
                    };
                })}
            />
            <Spacer />
            <div style={{ display: "flex" }}>
                <FormInputTitle>Classroom</FormInputTitle>
                <Spacer />
                {error.actual_classroom && <div>{error.actual_classroom}</div>}
            </div>
            <Spacer height={5} />
            <Select
                dropdownStyle={{ zIndex: 10 ** 4 }}
                style={{ width: "100%" }}
                defaultValue={defaultClassroom}
                onChange={(value) => {
                    updateFormData({ actual_classroom: value });
                }}
                options={classroomOptions.map((classroom) => {
                    return {
                        value: classroom,
                        label: classroom,
                    };
                })}
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
                defaultValue={defaultMin}
                style={{ width: "100%" }}
                onChange={(value) => {
                    updateFormData({ min: value });
                }}
                options={durations}
            />
            <Spacer />
            <div style={{ display: "flex" }}>
                <FormInputTitle>Number of Lessons</FormInputTitle>
                <Spacer />
                {error.num_of_classes && <div>{error.num_of_classes}</div>}
            </div>
            <Spacer height={5} />
            <Select
                dropdownStyle={{ zIndex: 10 ** 4 }}
                defaultValue={defaultNumOfClasses}
                style={{ width: "100%" }}
                onChange={(value) => {
                    updateFormData({ num_of_classes: value });
                }}
                options={range({ from: 1, to: 100 }).map((i) => ({ value: i, label: i + "" }))}
            />
            <Spacer />
            <Spacer />
            <Button type="primary" block onClick={submit}>
                Submit
            </Button>
        </Box>
    );
};
