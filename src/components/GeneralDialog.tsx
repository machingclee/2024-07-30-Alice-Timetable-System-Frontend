import { Dialog } from '@mui/material';
import { OverlayScrollbarsComponent, OverlayScrollbarsComponentRef } from 'overlayscrollbars-react';
import { useRef, useState } from 'react';

export default class GeneralDialog {
    public setContent = (_: () => () => JSX.Element) => {};
    public setOpen: (open: boolean) => void = () => {};

    render = () => {
        const [content, setContent] = useState(() => () => <></>);
        const [open, setOpen] = useState(false);
        const ref = useRef<OverlayScrollbarsComponentRef<'div'> | null>(null);

        this.setOpen = setOpen;
        this.setContent = setContent;

        const Content = content;

        return (
            <Dialog
                onClose={() => {
                    setOpen(false);
                }}
                open={open}
            >
                <OverlayScrollbarsComponent
                    style={{ height: '100%', width: '100%', overflowY: 'auto' }}
                    ref={ref}
                    options={{
                        scrollbars: {
                            autoHide: 'leave',
                            autoHideDelay: 100,
                        },
                    }}
                >
                    <Content />
                </OverlayScrollbarsComponent>
            </Dialog>
        );
    };
}
