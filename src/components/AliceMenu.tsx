import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuSub,
    ContextMenuSubContent,
    ContextMenuSubTrigger,
    ContextMenuTrigger,
} from '@/components/ui/context-menu';
import { Box } from '@mui/material';
import { ReactNode } from 'react';

type Item = {
    item: ReactNode;
    disabled?: boolean;
    onClick?: () => void | Promise<void>;
    subItems?: Item[];
};

const renderItems = (items: Item[]) => {
    return (
        <>
            {items.map((item, index) => {
                const { disabled = false } = item;
                if (!item.subItems) {
                    return (
                        <ContextMenuItem
                            key={index}
                            disabled={disabled}
                            inset
                            onClick={() => item.onClick?.()}
                            className="cursor-pointer pr-8"
                        >
                            {item.item}
                        </ContextMenuItem>
                    );
                } else {
                    return (
                        <ContextMenuSub key={index}>
                            <ContextMenuSubTrigger inset>{item.item}</ContextMenuSubTrigger>
                            <ContextMenuSubContent>{renderItems(item.subItems)}</ContextMenuSubContent>
                        </ContextMenuSub>
                    );
                }
            })}
        </>
    );
};

export function AliceMenu(props: { className?: string; children: ReactNode; items: Item[] }) {
    const { children, items, className } = props;
    return (
        <Box
            sx={{
                width: '100%',
                height: '100%',
                '& [data-slot="context-menu-trigger"]': {
                    border: 'none',
                    '& > div': {
                        width: '100%',
                    },
                },
            }}
            className={className}
        >
            <ContextMenu>
                <ContextMenuTrigger className="flex items-center justify-center rounded-md border border-dashed text-sm">
                    {children}
                </ContextMenuTrigger>
                <ContextMenuContent>{renderItems(items)}</ContextMenuContent>
            </ContextMenu>
        </Box>
    );
}
