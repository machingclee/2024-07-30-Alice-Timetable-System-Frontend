import { OverlayScrollbarsComponent, OverlayScrollbarsComponentRef } from "overlayscrollbars-react";
import { HTMLAttributes, ReactNode, useRef } from "react";

export default (props: { children: ReactNode, setPrintContent?: (ref: HTMLDivElement | null) => void } & HTMLAttributes<HTMLDivElement>) => {
    const { children, setPrintContent, ...props_ } = props;
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
                <div ref={div => setPrintContent?.(div)}>
                    {children}
                </div>
            </OverlayScrollbarsComponent>
        </div>
    )
}