import { PropsWithChildren } from "react";

export default ({ children }: PropsWithChildren) => {
    return <div style={{ fontSize: 18, display: "flex", alignItems: "center" }}>{children}</div>
}