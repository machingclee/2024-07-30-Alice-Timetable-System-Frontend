import { dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { ReactNode, HTMLAttributes, useRef, useState, useEffect } from 'react';
import invariant from 'tiny-invariant';
import toastUtil from '../../utils/toastUtil';
import { DraggableDropData } from './Draggable';
import { Box } from '@mui/material';

enum HoveredState {
    IDLE = 'IDLE',
    VALID_MOVE = 'VALID_MOVE',
    INVALID_MOVE = 'INVALID_MOVE',
}

// eslint-disable-next-line
export const Droppable = <T extends Record<string, any>>(
    props: {
        idleColor?: string;
        activeColor?: string;
        children: ReactNode;
        isValidMove: (data: T) => boolean;
        onValidDrop: (data: T) => void | Promise<void>;
    } & HTMLAttributes<HTMLDivElement>
) => {
    const {
        idleColor: idleColor = 'white',
        activeColor = 'yellow',
        children,
        isValidMove,
        onValidDrop,
        style,
        ..._props
    } = props;
    const ref = useRef(null);
    const [hoveredState, setHoveredState] = useState<HoveredState>(HoveredState.IDLE);
    const getColor = () => {
        if (hoveredState === HoveredState.IDLE) {
            return idleColor;
        } else if (hoveredState === HoveredState.INVALID_MOVE) {
            return 'red';
        } else if (hoveredState === HoveredState.VALID_MOVE) {
            return activeColor;
        }
    };

    useEffect(() => {
        const el = ref.current;
        invariant(el);

        return dropTargetForElements({
            element: el,
            onDragEnter: ({ source, location }) => {
                const { data } = source.data as DraggableDropData<T>;
                const destination = location.current.dropTargets[0];
                if (!destination) {
                    return;
                }
                const validMove = isValidMove(data);
                if (validMove) {
                    setHoveredState(HoveredState.VALID_MOVE);
                } else {
                    setHoveredState(HoveredState.INVALID_MOVE);
                }
            },
            onDragLeave: ({ source, location }) => {
                const destination = location.current.dropTargets[0];
                const { setDragging } = source.data as DraggableDropData<T>;
                if (!destination) {
                    setDragging(false);
                } else {
                    setDragging(true);
                }
                setHoveredState(HoveredState.IDLE);
            },
            canDrop: ({ source }) => {
                const { data } = source.data as DraggableDropData<T>;
                return isValidMove(data);
            },
            onDrop: async ({ source }) => {
                const { data, setDragging } = source.data as DraggableDropData<T>;
                try {
                    const validMove = isValidMove(data);
                    if (validMove) {
                        await onValidDrop(data);
                    }
                } catch (error) {
                    toastUtil.error(JSON.stringify(error));
                } finally {
                    setHoveredState(HoveredState.IDLE);
                    setDragging(false);
                }
            },
        });
    }, [isValidMove, onValidDrop]);

    return (
        <Box {..._props} style={{ ...style, backgroundColor: getColor() }} ref={ref}>
            {children}
        </Box>
    );
};
