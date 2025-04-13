import * as React from 'react';

import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import {
    DropdownMenuContentProps,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuPortal,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
} from '@radix-ui/react-dropdown-menu';

type Item = {
    item: React.ReactNode;
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
                        <DropdownMenuItem
                            disabled={disabled}
                            onClick={() => item.onClick?.()}
                            className="cursor-pointer hover:bg-gray-100 hover:outline-none px-2 py-1"
                        >
                            {item.item}
                        </DropdownMenuItem>
                    );
                } else {
                    return (
                        <DropdownMenuGroup>
                            <DropdownMenuSubTrigger>{item.item}</DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                                <DropdownMenuSubContent>{renderItems(item.subItems)}</DropdownMenuSubContent>
                            </DropdownMenuPortal>
                        </DropdownMenuGroup>
                    );
                }
            })}
        </>
    );
};

export function AliceDropdownMenu(
    props: {
        children: React.ReactNode;
        items: Item[];
        className?: string;
    } & DropdownMenuContentProps
) {
    const { children, items, className, ...dropContentProps } = props;
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
            <DropdownMenuContent {...dropContentProps} className={className}>
                {renderItems(items)}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
