import { IoPrint } from 'react-icons/io5';
import { useAppSelector } from '../redux/hooks';
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';

export type PrintHandler = {
    setPrintTarget: (div: HTMLDivElement | null) => void;
};

// eslint-disable-next-line
export default forwardRef<PrintHandler, {}>((_, ref) => {
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
        console.log('print target setted', div);
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
        <div style={{ paddingLeft: 10, paddingRight: 30 }}>
            <IoPrint
                size={40}
                style={{
                    padding: '8px',
                    borderRadius: '100%',
                    border: '1px solid black',
                    cursor: 'pointer',
                }}
                onClick={handlePrint}
            />
        </div>
    );
});
