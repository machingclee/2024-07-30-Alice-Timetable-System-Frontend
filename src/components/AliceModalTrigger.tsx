import { Modal } from 'antd';
import { ReactNode, useRef, useState } from 'react';

export type SliceModalProps = {
    setOnOk: (action: Action) => void;
    setOkText: (text: string) => void;
};

type Action = () => void | Promise<void>;

const AliceModalTrigger = (props: {
    modalClassName?: string;
    modalContent: (props: SliceModalProps) => ReactNode;
    children: ReactNode;
}) => {
    const [open, setOpen] = useState(false);

    const modalRef = useRef<{
        okText: string;
        onOk: Action;
    }>({
        okText: 'Ok',
        onOk: () => {},
    });

    const setOkText = (text: string) => {
        modalRef.current.okText = text;
    };
    const setOnOk = (action: Action) => {
        modalRef.current.onOk = action;
    };

    return (
        <>
            <div style={{ display: 'inline-block' }} onClick={() => setOpen(true)}>
                {props.children}
            </div>
            <Modal
                open={open}
                className={props.modalClassName}
                centered
                closable={false}
                onCancel={() => {
                    setOpen(false);
                }}
                onClose={() => {
                    setOpen(false);
                }}
                okText={modalRef.current.okText}
                onOk={async () => {
                    await modalRef.current.onOk();
                    console.log('closing it');
                    setOpen(false);
                }}
            >
                {props.modalContent({
                    setOkText,
                    setOnOk,
                })}
            </Modal>
        </>
    );
};

export default AliceModalTrigger;
