import { HTMLAttributes } from "react";

export default ({ thickness = 1, style, ...props }: {
    thickness?: number
} &
    HTMLAttributes<HTMLDivElement>
) => {
    return (<div style={{
        borderTop: `${thickness}px solid rgba(0,0,0,0.1)`,
        ...style
    }} {...props} />)
}
