import { Button, Modal } from 'antd';
import { BaseButtonProps } from 'antd/es/button/button';
import { CSSProperties, ReactNode, useCallback, useRef, useState } from 'react';

export type AliceModalProps<T = any> = {
    context: T;
    setOnOk: (action: Action) => void;
    setOkText: (text: string) => void;
    setOpen: (open: boolean) => void;
};

type Action = () => void | Promise<void>;

const AliceModalTrigger = <T,>(props: {
    style?: CSSProperties;
    centered?: boolean;
    context?: T;
    modalClassName?: string;
    okButtonType?: BaseButtonProps['type'];
    modalContent: (props: AliceModalProps) => ReactNode;
    destroyOnClose?: boolean;
    children: ReactNode;
}) => {
    const { okButtonType = 'primary', style, destroyOnClose = true, centered = true } = props;
    const [loading, setLoading] = useState(false);
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

    const ModalContent = useCallback(
        () =>
            props.modalContent({
                setOkText,
                setOnOk,
                setOpen,
                context: props?.context || {},
            }),
        [props]
    );

    return (
        <>
            <div style={{ display: 'inline-block', ...style }} onClick={() => setOpen(true)}>
                {props.children}
            </div>
            <Modal
                destroyOnClose={destroyOnClose}
                maskClosable={false}
                styles={{
                    content: {
                        maxHeight: '80vh',
                        maxWidth: '60vw',
                        overflowY: 'scroll',
                    },
                }}
                open={open}
                className={props.modalClassName}
                centered={centered}
                closable={false}
                onCancel={() => {
                    setOpen(false);
                }}
                onClose={() => {
                    setOpen(false);
                }}
                okText={modalRef.current.okText}
                footer={[
                    <Button key="back" onClick={() => setOpen(false)}>
                        Cancel
                    </Button>,
                    <Button
                        key="submit"
                        type={okButtonType}
                        loading={loading}
                        onClick={async () => {
                            try {
                                setLoading(true);
                                await modalRef.current.onOk();
                                console.log('closing it');
                                setOpen(false);
                            } finally {
                                setLoading(false);
                            }
                        }}
                    >
                        {modalRef.current.okText}
                    </Button>,
                ]}
            >
                <ModalContent />
            </Modal>
        </>
    );
};

export default AliceModalTrigger;
