import { ReactNode } from 'react';

export default function Title(props: { className?: string; children: ReactNode }) {
    return (
        <div className={props.className} style={{ fontSize: 22, marginBottom: 10 }}>
            {props.children}
        </div>
    );
}
