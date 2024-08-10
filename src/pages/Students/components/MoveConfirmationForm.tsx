import { Box } from "@mui/material"
import Spacer from "../../../components/Spacer";
import { Button, Select } from "antd";

import MoveConfirmationDialog from "./MoveConfirmationDialog";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { StudentThunkAction } from "../../../redux/slices/studentSlice";

export default (props: { moveClassesAction: () => Promise<void> }) => {
    const { moveClassesAction: moveClasses } = props;
    const dispatch = useAppDispatch();
    const studentId = useAppSelector(s => s.student.studentDetail.detail?.id) || "";
    return (
        <Box
            style={{ maxWidth: 400, width: 600, padding: "40px 80px", overflowY: "auto", paddingBottom: 60 }}>
            <div>This timeslot is within a group of duplicated classes, do you want to move all of them?</div>
            <Spacer />
            <div>If not, you may first detach this timeslot.</div>

            <Spacer />
            <Spacer />
            <div>
                <Button type="primary" block onClick={async () => {
                    await moveClasses();
                    MoveConfirmationDialog.setOpen(false);
                }}>
                    Confirm
                </Button>
                <Spacer height={5} />
                <Button type="text" block onClick={async () => {
                    dispatch(StudentThunkAction.getStudentClasses({ studentId }))
                    MoveConfirmationDialog.setOpen(false);
                }}>
                    Cancel
                </Button>
            </div>
        </Box>
    )
}