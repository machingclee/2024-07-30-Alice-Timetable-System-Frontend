import { IoPrint } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import appSlice from "../redux/slices/appSlice";
import { useEffect, useRef, useState } from "react";

export default () => {
    const dispatch = useAppDispatch();
    const [printOnPressed, setPrintOnPressed] = useState<boolean>(false);
    const { leftNavigatorCollapsed, rightColumnCollapsed } = useAppSelector((s) => s.app);
    const handlePrint = () => {
        dispatch(appSlice.actions.setRightColumnCollapsed(true));
        dispatch(appSlice.actions.setleftNavigatorCollapsed(true));
        setPrintOnPressed(true);
    };

    useEffect(() => {
        console.log("leftNavigatorCollapsed:", leftNavigatorCollapsed);
        console.log("rightColumnCollapsed:", rightColumnCollapsed);
        console.log("printOnPressed:", printOnPressed);
        if (leftNavigatorCollapsed && rightColumnCollapsed && printOnPressed) {
            window.print();
            setPrintOnPressed(false);
        }
    }, [leftNavigatorCollapsed, rightColumnCollapsed, printOnPressed]);

    return (
        <div style={{ padding: 30 }}>
            <IoPrint size={21} style={{ padding: "8px", borderRadius: "100%", border: "1px solid black", cursor: "pointer" }} onClick={handlePrint} />
        </div>
    );
};
