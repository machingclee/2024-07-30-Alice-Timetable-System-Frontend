import FadeIn from "../../../components/FadeIn";
import Label from "../../../components/Label";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import appSlice from "../../../redux/slices/appSlice";
import { FaAngleLeft } from "react-icons/fa6";
import { IoMenu } from "react-icons/io5";

export default function CloseLeftColumnButton() {
    const dispatch = useAppDispatch();
    const leftNavigatorCollapsed = useAppSelector((s) => s.app.leftNavigatorCollapsed);

    return (
        <>
            <Label label="CloseLeftColumnButton" />
            {leftNavigatorCollapsed && <FadeIn>
                <IoMenu
                    size={24}
                    onClick={() => {
                        dispatch(appSlice.actions.setleftNavigatorCollapsed(!leftNavigatorCollapsed));
                    }}
                    style={{
                        marginLeft: 20,
                        marginRight: 10,
                        cursor: "pointer",
                        transition: "transform 0.3s ease-out-in",
                        zIndex: 10 ** 100,
                        transform: leftNavigatorCollapsed ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                />
            </FadeIn>}
            {!leftNavigatorCollapsed && <FadeIn>
                <FaAngleLeft
                    onClick={() => {
                        dispatch(appSlice.actions.setleftNavigatorCollapsed(!leftNavigatorCollapsed));
                    }}
                    size={24}
                    style={{
                        marginLeft: 20,
                        marginRight: 20,
                        cursor: "pointer",
                        transition: "transform 0.3s ease-out-in",
                        zIndex: 10 ** 100,
                        transform: leftNavigatorCollapsed ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                />
            </FadeIn>}
        </>
    )
}