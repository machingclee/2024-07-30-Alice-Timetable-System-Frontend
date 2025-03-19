import { ReactNode } from 'react';

export default function Title(props: { children: ReactNode }) {
    return <div style={{ fontSize: 24 }}>{props.children}</div>;
}
