import { ReactNode } from "react"

export default (props: { children: ReactNode }) => {
    return <div style={{ fontSize: 24 }}>{props.children}</div>
}