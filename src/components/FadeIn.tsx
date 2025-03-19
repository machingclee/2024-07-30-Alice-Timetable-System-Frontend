import { HTMLAttributes, ReactNode, useEffect, useState } from 'react';
import classnames from 'classnames';
import { tss } from 'tss-react/mui';
import { keyframes } from 'tss-react';

const useStyles = tss.create(() => ({
    customFadein: {
        '&.fade-in': {
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            animation: `${keyframes`
                0% {
                    opacity: 0;
                },
                100% {
                    opacity: 1;
                }
                `} 0.3s ease-in-out`,
        },
    },
}));

export default function FadeIn({
    children,
    delay = 0,
    dependencies = [],
    style,
    className,
    ...props
}: {
    children: ReactNode;
    delay?: number;
    // eslint-disable-next-line
    dependencies?: any[];
} & HTMLAttributes<HTMLDivElement>) {
    const [fadeIn, setFadeIn] = useState(false);
    const { classes } = useStyles();

    useEffect(() => {
        setFadeIn(false);
        setTimeout(() => {
            setFadeIn(true);
        }, 1 + delay);
        // eslint-disable-next-line
    }, [...dependencies]);

    return (
        <div style={{ opacity: fadeIn ? 1 : 0, ...style }} className={className} {...props}>
            <div className={classnames(classes.customFadein, fadeIn ? 'fade-in' : '')}>
                <>{children}</>
            </div>
        </div>
    );
}
