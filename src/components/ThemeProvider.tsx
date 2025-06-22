import { Box } from '@mui/material';
import { ConfigProvider } from 'antd';
import { PropsWithChildren } from 'react';

export default function ThemeProvider(props: PropsWithChildren) {
    return (
        <Box
            sx={
                {
                    // '& .bg-teal-300': {
                    //     backgroundColor: '#a6c4d7e6',
                    // },
                    // '& .ant-btn-primary': {
                    //     backgroundColor: '#7d87c7',
                    // },
                    // '& .bg-teal-200': {
                    //     backgroundColor: '#f9fafb',
                    // },
                    // '& .border-emerald-400': {
                    //     borderColor: '#959bb6',
                    // },
                    // '& .bg-teal-100': {
                    //     backgroundColor: '#ccebf2',
                    // },
                    // '& .border-teal-400': {
                    //     borderColor: '#aac3c9',
                    // },
                    // '& .border-green-500': {
                    //     borderColor: '#aac3c9',
                    // },
                    // '& .bg-teal-50': {
                    //     backgroundColor: '#eaf3f7',
                    // },
                    // '& .bg-emerald-500': {
                    //     background: '#468fb0',
                    // },
                    // '& .text-emerald-500': {
                    //     color: '#468fb0',
                    // },
                    // '& .border-emerald-500': {
                    //     color: '#468fb0 !important',
                    // },
                }
            }
        >
            <ConfigProvider
                theme={{
                    components: {
                        Button: {
                            // defaultActiveBg: 'blue',
                        },
                    },
                    token: {
                        colorPrimary: '#3bc289',
                        colorBgTextHover: '#f9fff5',
                    },
                }}
            >
                {props.children}
            </ConfigProvider>
        </Box>
    );
}
