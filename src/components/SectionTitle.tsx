import { HTMLAttributes, ReactNode } from 'react';

export default function SectionTitle({
    children,
    style,
    ...props
}: { children: ReactNode } & HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            style={{
                fontSize: 20,
                display: 'flex',
                alignItems: 'center',
                ...style,
            }}
            {...props}
        >
            {children}
        </div>
    );
}
