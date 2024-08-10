import { PropsWithChildren } from "react";

export default ({ children }: PropsWithChildren) => {
    return <div style={{ color: "rgba(0,0,0,0.6)", fontWeight: 400, fontSize: 16, paddingLeft: 4 }}>{children}</div>;
};
