import { HTMLAttributes } from "react";

const Spacer = ({ height = 20, width = 20, ...props }: { height?: number, width?: number } & HTMLAttributes<HTMLDivElement>) => {
    const { style, ...props_ } = props;
    return <div style={{ height, width, ...style }} {...props_}></div>
}

export default Spacer