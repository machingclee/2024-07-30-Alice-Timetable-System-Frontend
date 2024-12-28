import { draggable } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
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
    } & HTMLAttributes<HTMLDivElement>
) => {
    const { children, data, canDrag, ..._props } = props;
    const ref = useRef(null);
    const [dragging, setDragging] = useState<boolean>(false);
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

    return (
        <div
            ref={ref}
            {..._props}
            style={{
                opacity: dragging ? 0.4 : 1,
                position: 'absolute',
                width: '100%',
                height: '100%',
                zIndex: 10 ** 7,
                top: 0,
                left: 0,
            }}
        >
            {children}
        </div>
    );
};
