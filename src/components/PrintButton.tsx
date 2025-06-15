import { IoPrint } from 'react-icons/io5';
import { useAppSelector } from '../redux/hooks';
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Button } from 'antd';

export type PrintHandler = {
    setPrintTarget: (div: HTMLDivElement | null) => void;
};

export const PrintButton = forwardRef<PrintHandler, object>((_, ref) => {
    const [printOnPressed, setPrintOnPressed] = useState<boolean>(false);
    const { leftNavigatorCollapsed } = useAppSelector(s => s.app);
    const handlePrint = () => {
        reactToPrintFn();
    };
    const printTargetRef = useRef<HTMLDivElement | null>(null);
    useImperativeHandle(ref, () => ({
        setPrintTarget: setPrintTarget,
    }));
    const setPrintTarget = (div: HTMLDivElement | null) => {
        printTargetRef.current = div;
    };
    const reactToPrintFn = useReactToPrint({
        contentRef: printTargetRef,
    });

    useEffect(() => {
        console.log('leftNavigatorCollapsed:', leftNavigatorCollapsed);
        console.log('printOnPressed:', printOnPressed);
        if (leftNavigatorCollapsed && printOnPressed) {
            window.print();
            setPrintOnPressed(false);
        }
    }, [leftNavigatorCollapsed, printOnPressed]);

    return (
        <Button type="primary" className="flex items-center" onClick={handlePrint}>
            <IoPrint
                size={20}
                style={{
                    cursor: 'pointer',
                }}
            />
            Print
        </Button>
    );
});

export default PrintButton;
