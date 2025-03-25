import { ReactNode } from 'react';

export default function Title(props: { children: ReactNode }) {
    return <div style={{ fontSize: 22, marginBottom: 10 }}>{props.children}</div>;
}
