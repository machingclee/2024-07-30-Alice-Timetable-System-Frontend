import { Button, Input } from "antd";
import boxShadow from "../../../constant/boxShadow";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { useCallback, useEffect, useRef, useState } from "react";
import Spacer from "../../../components/Spacer";
import { Course } from "../../../dto/dto";
import Label from "../../../components/Label";
import { CourseThunkAction } from "../../../redux/slices/courseSlice";
import { debounce } from "lodash";
import lodash from "lodash";

export default (props: { id: number }) => {
    const { id } = props;
    const dispatch = useAppDispatch();
    const class_ = useAppSelector(s => s.class.courses.idToObject?.[id]);
    if (!class_) {
        return null;
    }
    const [hasDistinction, setHasDistinction] = useState(false);

    const checkDataDistinction = useCallback(debounce(() => {
        const oldData = class_;
        const newData = formData.current;
        const hasDistinction_ = !lodash.isEqual(oldData, newData);
        console.log("oldData", oldData);
        console.log("newData", newData);
        setHasDistinction(hasDistinction_);
    }, 300), [class_])

    const [editing, setEditing] = useState(false);
    const formData = useRef(class_);
    const updateField = (update: Partial<Course>) => {
        formData.current = { ...formData.current, ...update };
        checkDataDistinction();
    }
    const { course_name } = class_ || {};
    const submitUpdate = async () => {
        const updatedClass = { ...class_, ...formData.current };
        await dispatch(CourseThunkAction.updateCourse(updatedClass));
        setEditing(false);
    }

    useEffect(() => {
        if (editing) {
            formData.current = class_;
        }
    }, [editing])

    useEffect(() => {
        checkDataDistinction()
    }, [editing])


    return (
        <div style={{
            boxShadow: boxShadow.SHADOW_62,
            padding: "20px 30px",
            borderRadius: "8px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "15px",
        }}>
            <div>
                <table>
                    <Label label="CourseRow.tsx" offsetTop={-20} />
                    <tbody>
                        <tr>
                            <td>Course Name:</td>
                            {!editing && <td>{course_name}</td>}
                            {editing && (
                                <td>
                                    <Input
                                        defaultValue={course_name}
                                        onChange={(e) => {
                                            updateField({ course_name: e.target.value })
                                        }}
                                    />
                                </td>
                            )}
                        </tr>
                    </tbody>
                </table>
            </div>
            <div style={{ display: "flex" }}>
                {editing && <>
                    <Button onClick={submitUpdate} disabled={!hasDistinction} >Update</Button>
                    <Spacer />
                </>}
                <Button onClick={() => {
                    setEditing(editing => {
                        if (editing) {
                            formData.current = class_;
                        }
                        return !editing
                    });
                }}>{editing ? "Cancel" : "Edit"}</Button>
            </div>
        </div>
    )
}