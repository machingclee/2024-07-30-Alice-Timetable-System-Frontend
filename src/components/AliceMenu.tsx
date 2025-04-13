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
            {items.map(item => {
                const { disabled = false } = item;
                if (!item.subItems) {
                    return (
                        <ContextMenuItem
                            disabled={disabled}
                            inset
                            onClick={() => item.onClick?.()}
                            className="cursor-pointer"
                        >
                            {item.item}
                        </ContextMenuItem>
                    );
                } else {
                    return (
                        <ContextMenuSub>
                            <ContextMenuSubTrigger inset>{item.item}</ContextMenuSubTrigger>
                            <ContextMenuSubContent className="w-48">{renderItems(item.subItems)}</ContextMenuSubContent>
                        </ContextMenuSub>
                    );
                }
            })}
        </>
    );
};

export function AliceMenu(props: { children: ReactNode; items: Item[] }) {
    const { children, items } = props;
    return (
        <Box
            sx={{
                width: '100%',
                height: '100%',
                '& [data-slot="context-menu-trigger"]': {
                    border: 'none',
                },
            }}
        >
            <ContextMenu>
                <ContextMenuTrigger className="flex items-center justify-center rounded-md border border-dashed text-sm">
                    {children}
                </ContextMenuTrigger>
                <ContextMenuContent className="w-64">{renderItems(items)}</ContextMenuContent>
            </ContextMenu>
        </Box>
    );
}
