import { Button, Select } from "antd";
import Spacer from "../../../components/Spacer";
import { useRef, useState } from "react";
import { CreateUserRequest, RoleInSystem } from "../../../dto/dto";
import apiClient from "../../../axios/apiClient";
import apiRoutes from "../../../axios/apiRoutes";
import { CustomResponse } from "../../../axios/responseTypes";
import { toast } from "react-toastify";
import FormInputField from "../../../components/FormInputField";
import toastUtil from "../../../utils/toastUtil";
import SectionTitle from "../../../components/SectionTitle";
import AddUserDialog from "./AddUserDialog";
import { useAppDispatch } from "../../../redux/hooks";
import { UserThunkAction } from "../../../redux/slices/userSlice";
import { Box } from "@mui/material";
import FormInputTitle from "../../../components/FormInputTitle";

export default () => {
    const dispatch = useAppDispatch();
    const formData = useRef<Partial<CreateUserRequest>>({ role_in_system: "STAFF" });
    const [error, setError] = useState<Partial<CreateUserRequest>>({});
    const update = (update_: Partial<CreateUserRequest>) => {
        formData.current = { ...formData.current, ...update_ };
    };
    const handleChange = (value: string) => {
        update({ role_in_system: value as RoleInSystem });
    };

    const roleSelections: { value: RoleInSystem; label: string }[] = [
        { value: "STAFF", label: "Staff" },
        { value: "ADMIN", label: "Admin" },
        { value: "SUPER_ADMIN", label: "Super Admin" },
    ];

    const submit = async () => {
        const res = await apiClient.post<CustomResponse<undefined>>(apiRoutes.POST_CREATE_USER, formData.current);
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
            toast.success("User Created");
            AddUserDialog.setOpen(false);
            dispatch(UserThunkAction.getUsers());
        }
    };

    return (
        <Box style={{ maxWidth: 400, width: 600, padding: "40px 80px", overflowY: "auto", paddingBottom: 60 }}>
            <SectionTitle>Add User</SectionTitle>
            <Spacer />
            <FormInputField title="English First Name" onChange={(t) => update({ first_name: t })} error={error?.["first_name"]} />
            <FormInputField title="English Last Name" onChange={(t) => update({ last_name: t })} error={error?.["last_name"]} />
            <FormInputField title="Chinese First Name" onChange={(t) => update({ chinese_first_name: t })} error={error?.["chinese_first_name"]} />
            <FormInputField title="Chinese Last Name" onChange={(t) => update({ chinese_last_name: t })} error={error?.["chinese_last_name"]} />
            <FormInputField title="Company Email" onChange={(t) => update({ company_email: t })} error={error?.["company_email"]} />
            <FormInputField title="Password" onChange={(t) => update({ password: t })} error={error?.["password"]} />
            <FormInputField title="Phone Number" onChange={(t) => update({ mobile_number: t })} error={error?.["mobile_number"]} />
            <FormInputField title="Role In Company" onChange={(t) => update({ role_in_company: t })} error={error?.["role_in_company"]} />
            <FormInputTitle>Role in System</FormInputTitle>
            <Spacer height={5} />
            <Select dropdownStyle={{ zIndex: 10 ** 4 }} defaultValue="STAFF" style={{ width: 130 }} onChange={handleChange} options={roleSelections} />
            <Spacer />
            <Spacer />
            <Button type="primary" block onClick={submit}>
                Submit
            </Button>
        </Box>
    );
};
