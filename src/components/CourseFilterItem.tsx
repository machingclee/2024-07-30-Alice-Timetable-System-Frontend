import Checkbox from "@mui/material/Checkbox";
import Label from "./Label";
import { useAppSelector } from "../redux/hooks";
import { AppDispatch } from "../redux/store";
import { useDispatch } from "react-redux";
import studentSlice from "../redux/slices/studentSlice";
import { useState } from "react";

export default ({ id }: { id: number }) => {
    const dispatch = useDispatch<AppDispatch>();
    const filterCourseIds = useAppSelector((s) => s.student.massTimetablePage.filter.courseIds);
    const [checked, setChecked] = useState(filterCourseIds.includes(id) ? true : false);
    const course = useAppSelector((s) => s.class.courses.idToCourse?.[id]);

    const handleCourseFilterItemOnChange = (checked: boolean) => {
        if (checked) {
            dispatch(studentSlice.actions.addCourseFilterItem(id));
            setChecked(true);
        } else {
            dispatch(studentSlice.actions.dropCourseFilterItem(id));
            setChecked(false);
        }
    };

    return (
        <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
            <Checkbox
                onChange={(event) => {
                    handleCourseFilterItemOnChange(event.target.checked);
                }}
                checked={checked}
                {...Label}
            />
            {course?.course_name}
        </div>
    );
};
