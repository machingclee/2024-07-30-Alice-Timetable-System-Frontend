import { draggable } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { ReactNode, HTMLAttributes, useRef, useState, useEffect } from 'react';
import invariant from 'tiny-invariant';

// eslint-disable-next-line
export const TimetableDraggable = <T extends Record<string, any>>(
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
            getInitialData: () => data,
            onDragStart: () => setDragging(true),
            onDrop: () => {
                setDragging(false);
            },
        });
    }, [data, canDrag]);
    return (
        <div ref={ref} {..._props} style={{ display: dragging ? 'none' : 'auto' }}>
            {children}
        </div>
    );
};
