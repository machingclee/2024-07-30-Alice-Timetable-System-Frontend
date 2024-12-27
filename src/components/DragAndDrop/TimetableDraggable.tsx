import { draggable } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { ReactNode, HTMLAttributes, useRef, useState, useEffect } from 'react';
import invariant from 'tiny-invariant';

// eslint-disable-next-line
export const TimetableDraggable = <T extends Record<string, any>>(
    props: {
        children: ReactNode;
        data: T;
    } & HTMLAttributes<HTMLDivElement>
) => {
    const { children, data, ..._props } = props;
    const ref = useRef(null);
    const [dragging, setDragging] = useState<boolean>(false);
    useEffect(() => {
        const el = ref.current;
        invariant(el);
        return draggable({
            element: el,
            getInitialData: () => data,
            onDragStart: () => setDragging(true),
            onDrop: () => setDragging(false),
        });
    }, [data]);
    return (
        <div ref={ref} {..._props} style={{ opacity: dragging ? 0.4 : 1 }}>
            {children}
        </div>
    );
};
