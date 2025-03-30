import { draggable } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { Box } from '@mui/material';
import { ReactNode, HTMLAttributes, useRef, useState, useEffect } from 'react';
import invariant from 'tiny-invariant';

// eslint-disable-next-line
export type DraggableDropData<T extends Record<string, any>> = {
    data: T;
    setDragging: (dragging: boolean) => void;
};

// eslint-disable-next-line
export const Draggable = <T extends Record<string, any>>(
    props: {
        children: ReactNode;
        data: T;
        canDrag: boolean;
        dynamicalHeightSetter?: (height: number) => void;
    } & HTMLAttributes<HTMLDivElement>
) => {
    const { children, data, canDrag, style, dynamicalHeightSetter, ..._props } = props;
    const ref = useRef(null);
    const [dragging, setDragging] = useState<boolean>(false);
    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        invariant(el);
        return draggable({
            element: el,
            canDrag: () => canDrag,
            getInitialData: () => ({ data, setDragging }),
            onDragStart: () => setDragging(true),
            onDrop: () => {
                setDragging(false);
            },
        });
    }, [data, canDrag]);

    useEffect(() => {
        const resizeObserver = new ResizeObserver(entries => {
            for (const entry of entries) {
                const height = entry.contentRect.height;
                dynamicalHeightSetter?.(height);
            }
        });
        resizeObserver.observe(divRef.current as Element);
        return () => {
            resizeObserver.disconnect();
        };
    }, [dynamicalHeightSetter]);

    return (
        <Box
            sx={{
                zIndex: 1,
                '&:hover': { zIndex: 10 ** 7 },
            }}
            ref={ref}
            {..._props}
            style={{
                pointerEvents: dragging ? 'none' : 'auto',
                opacity: dragging ? 0.4 : 1,
                position: 'absolute',
                width: '100%',
                height: '100%',
                top: 0,
                left: 0,
                ...style,
            }}
        >
            <div
                ref={divRef}
                style={{
                    width: '100%',
                }}
            >
                {children}
            </div>
        </Box>
    );
};
