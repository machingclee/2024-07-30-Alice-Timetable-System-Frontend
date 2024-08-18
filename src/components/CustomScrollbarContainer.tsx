import { OverlayScrollbarsComponent, OverlayScrollbarsComponentRef } from "overlayscrollbars-react";
import { HTMLAttributes, ReactNode, useRef } from "react";

export default (props: { children: ReactNode } & HTMLAttributes<HTMLDivElement>) => {
    const { children, ...props_ } = props;
    const ref = useRef<OverlayScrollbarsComponentRef<"div"> | null>(null);
    return (
        <div {...props_}>
            <OverlayScrollbarsComponent
                style={{ height: "100%", width: "100%", overflowY: "auto" }}
                ref={ref}
                options={{
                    scrollbars: {
                        autoHide: "scroll",
                        autoHideDelay: 100,
                    }
                }}
            >
                {props.children}
            </OverlayScrollbarsComponent>
        </div>
    )
}