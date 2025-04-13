import { Box, Breakpoint, Dialog } from '@mui/material';
import { OverlayScrollbarsComponent, OverlayScrollbarsComponentRef } from 'overlayscrollbars-react';
import { useRef, useState } from 'react';

type GeneraDialogOption = {
    enableBackdrop: boolean;
};

export default class GeneralDialog {
    private option: GeneraDialogOption = { enableBackdrop: true };
    public setContent = (_: () => () => JSX.Element) => {};
    public setOpen: (open: boolean) => void = () => {};
    public setBackgroundColor: (bgColor: string) => void = () => {};
    public setWidth: (width: false | Breakpoint | undefined) => void = () => {};
    public open: () => void = () => {};
    public close: () => void = () => {};

    constructor(props?: Partial<GeneraDialogOption>) {
        this.option = { ...this.option, ...(props || {}) };
    }

    render = () => {
        const [content, setContent] = useState(() => () => <></>);
        const [open, setOpen] = useState(false);
        const [bgColor, setBgcolor] = useState('white');
        const [width, setWidth] = useState<false | Breakpoint | undefined>('md');
        const ref = useRef<OverlayScrollbarsComponentRef<'div'> | null>(null);

        this.setOpen = setOpen;
        this.setContent = setContent;
        this.setWidth = setWidth;
        this.open = () => setOpen(true);
        this.close = () => setOpen(false);
        this.setBackgroundColor = setBgcolor;
        const Content = content;

        return (
            <Dialog
                PaperProps={{
                    style: {
                        borderRadius: '7px',
                        backgroundColor: bgColor,
                        padding: '25px 25px',
                        zIndex: 10 ** 7 + 1,
                    },
                }}
                maxWidth={width}
                fullWidth={true}
                onClose={(_, reason) => {
                    if (this.option.enableBackdrop) {
                        setOpen(false);
                    } else {
                        if (reason != 'backdropClick') {
                            setOpen(false);
                        }
                    }
                }}
                open={open}
            >
                <Box
                    sx={{
                        '& .data-overlayscrollbars-contents': {
                            display: 'flex',

                            justifyContent: 'center',
                        },
                    }}
                >
                    <OverlayScrollbarsComponent
                        style={{
                            height: '100%',
                            width: '100%',
                            overflowY: 'auto',
                        }}
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
                </Box>
            </Dialog>
        );
    };
}
