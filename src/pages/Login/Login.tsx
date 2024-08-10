import { Button } from "antd";
import FormInputField from "../../components/FormInputField";
import Spacer from "../../components/Spacer";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useNavigate } from "react-router-dom";
import { AuthThunkAction } from "../../redux/slices/authSlice";
import { RouteEnum } from "../../router/router";
import LoginImage from "../../assets/login-image.svg";

export default () => {
    const dispatch = useAppDispatch();
    const reduxEmail = useAppSelector((s) => s.auth.user?.company_email);
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = async () => {
        await dispatch(
            AuthThunkAction.userLogin({
                email,
                password,
            })
        ).unwrap();

        navigate(RouteEnum.DASHBOARD_STUDENTS);
    };
    useEffect(() => {
        if (reduxEmail) {
            setEmail(reduxEmail);
        }
    }, [reduxEmail]);

    return (
        <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
            <div>
                <img style={{ height: "50%", width: "50%", objectFit: "cover" }} src={LoginImage} alt="login-image" />
            </div>
            <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ display: "flex", alignItems: "center", height: "100%", justifyContent: "center", flexDirection: "column", margin: "10px" }}>
                    <div style={{ flex: 2 }} />
                    <div style={{ minWidth: 400, width: 400 }}>
                        <FormInputField
                            title="Email"
                            onChange={(t) => {
                                setEmail(t);
                            }}
                            inputProps={{ style: { minWidth: 400, fontSize: 20 } }}
                            value={email}
                        />
                        <FormInputField
                            title="Password"
                            onChange={(t) => {
                                setPassword(t);
                            }}
                            inputProps={{ style: { minWidth: 400, fontSize: 20 } }}
                            onEnter={login}
                        />
                        <Spacer />
                        <Spacer />
                        <Button type="primary" block onClick={login} style={{ minWidth: 400 }}>
                            Login
                        </Button>
                    </div>
                    <div style={{ flex: 6 }} />
                </div>
            </div>
        </div>
    );
};
