import { useEffect } from "react"
import SectionTitle from "../../components/SectionTitle"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { CourseThunkAction } from "../../redux/slices/courseSlice";
import Spacer from "../../components/Spacer";
import ClassRow from "./components/CourseRow";
import { Button } from "antd";
import AddClassDialog from "./components/AddCourseDialog";
import AddClassForm from "./components/AddCourseForm";
import Label from "../../components/Label";

export default () => {
    const dispatch = useAppDispatch();

    const ids = useAppSelector(s => s.class.courses.ids) || [];

    const openAddClassDialog = () => {
        AddClassDialog.setContent(() => () => <AddClassForm />)
        AddClassDialog.setOpen(true);
    }

    useEffect(() => {
        dispatch(CourseThunkAction.getCourses());
    }, [])

    return (
        <div>
            <SectionTitle>Courses</SectionTitle>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button type="primary" onClick={openAddClassDialog}>
                    <Label label="add course button here" offsetTop={-30} />
                    Add Course
                </Button>
            </div>
            <Spacer />
            {ids.map(id => {
                return (
                    <ClassRow id={id} />
                )
            })}
            <AddClassDialog.render />
        </div>
    )
}