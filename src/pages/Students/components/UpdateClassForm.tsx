import { Box } from "@mui/material"
import SectionTitle from "../../../components/SectionTitle"
import Label from "../../../components/Label"
import Spacer from "../../../components/Spacer";
import { useRef } from "react";
import { Button, Select } from "antd";
import durations from "../../../constant/durations";
import { useAppDispatch } from "../../../redux/hooks";
import { StudentThunkAction } from "../../../redux/slices/studentSlice";
import UpdateClassDialog from "./UpdateClassDialog";
import { Class } from "../../../prismaTypes/types";

export default (props: { classEvent: Class }) => {
    const { classEvent } = props;
    const { id, min, student_id } = classEvent;
    const formData = useRef({ min: min });
    const dispatch = useAppDispatch();

    return (
        <Box
            style={{ maxWidth: 400, width: 600, padding: "40px 80px", overflowY: "auto", paddingBottom: 60 }}>
            <Label label="UpdateClassForm.tsx" offsetTop={0} offsetLeft={180} />
            <SectionTitle>Update Class</SectionTitle>
            <Spacer />
            <Select
                dropdownStyle={{ zIndex: 10 ** 4 }}
                style={{ width: "100%" }}
                defaultValue={min}
                onChange={(value) => {
                    formData.current = { min: value };
                }}
                options={durations}
            />
            <Spacer />
            <Spacer />
            <Button type="primary" block onClick={async () => {
                await dispatch(StudentThunkAction.updateClass({ classId: id, min: formData.current.min })).unwrap();
                dispatch(StudentThunkAction.getStudentPackages({ studentId: student_id }))
                UpdateClassDialog.setOpen(false);
            }}>
                Submit
            </Button>
        </Box>
    )
}