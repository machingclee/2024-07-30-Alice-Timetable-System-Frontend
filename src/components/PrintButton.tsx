import { IoPrint } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import Label from "./Label";
import { useReactToPrint } from "react-to-print"

export type PrintHandler = {
    setPrintTarget: (div: HTMLDivElement | null) => void
}

export default forwardRef<PrintHandler, {}>((_, ref) => {
    const dispatch = useAppDispatch();

    const [printOnPressed, setPrintOnPressed] = useState<boolean>(false);
    const { leftNavigatorCollapsed, rightColumnCollapsed } = useAppSelector((s) => s.app);
    const handlePrint = () => {
        reactToPrintFn();
    };
    const printTargetRef = useRef<HTMLDivElement | null>(null);
    useImperativeHandle(ref, () => ({
        setPrintTarget: setPrintTarget
    }))
    const setPrintTarget = (div: HTMLDivElement | null) => {
        console.log("print target setted", div)
        printTargetRef.current = div
    }
    const reactToPrintFn = useReactToPrint({
        contentRef: printTargetRef,
    });



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
        <div style={{ padding: 30 }} >
            <Label label="Print Timetable Button" offsetLeft={-60} />
            <IoPrint size={21} style={{ padding: "8px", borderRadius: "100%", border: "1px solid black", cursor: "pointer" }} onClick={handlePrint} />
        </div>
    );
})
