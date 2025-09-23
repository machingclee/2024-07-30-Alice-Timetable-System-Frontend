import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';

/**
 *  There are plenty of messy logic on determining how numbers are shown, can ignore it.
 */
const CustomPagination = (props: {
    consecutivePagesBlockSize: number;
    currentPageIndex: number;
    totalPages: number;
    onPageIndexChange: (page: number) => void;
}) => {
    const { consecutivePagesBlockSize, currentPageIndex, totalPages, onPageIndexChange } = props;
    const availablePageNumbers = Array.from({ length: totalPages }, (_, i) => i);
    const lastPageIndex = totalPages - 1;
    const consecutivePagesBlockStartIndex = Math.max(currentPageIndex - 1, 0);
    const approachesTheEnd = lastPageIndex - consecutivePagesBlockStartIndex <= consecutivePagesBlockSize - 1;
    const consecutivePagesBlock = availablePageNumbers.slice(
        approachesTheEnd ? lastPageIndex - (consecutivePagesBlockSize - 1) : consecutivePagesBlockStartIndex,
        consecutivePagesBlockStartIndex + consecutivePagesBlockSize
    );

    const forceDisplayPageOne = currentPageIndex >= consecutivePagesBlockSize - 1;
    const forceDisplayLast = lastPageIndex - currentPageIndex >= consecutivePagesBlockSize - 1;
    if (totalPages <= consecutivePagesBlockSize) {
        return (
            <>
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                href="#"
                                onClick={() => onPageIndexChange(Math.max(currentPageIndex - 1, 0))}
                            />
                        </PaginationItem>
                        {availablePageNumbers.map(page => {
                            const isActive = page === currentPageIndex;
                            return (
                                <PaginationItem onClick={() => onPageIndexChange(page)}>
                                    <PaginationLink href="#" isActive={isActive}>
                                        {page + 1}
                                    </PaginationLink>
                                </PaginationItem>
                            );
                        })}
                        <PaginationItem>
                            <PaginationNext
                                href="#"
                                onClick={() => onPageIndexChange(Math.min(currentPageIndex + 1, totalPages - 1))}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </>
        );
    } else {
        return (
            <>
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                href="#"
                                onClick={() => onPageIndexChange(Math.max(currentPageIndex - 1, 0))}
                            />
                        </PaginationItem>
                        {forceDisplayPageOne && (
                            <>
                                <PaginationItem onClick={() => onPageIndexChange(0)}>
                                    <PaginationLink href="#" isActive={currentPageIndex === 0}>
                                        1
                                    </PaginationLink>
                                </PaginationItem>
                                {currentPageIndex >= 3 && totalPages > consecutivePagesBlockSize + 1 && (
                                    <PaginationItem>
                                        <PaginationEllipsis />
                                    </PaginationItem>
                                )}
                            </>
                        )}
                        {consecutivePagesBlock.map(page => {
                            const isActive = page === currentPageIndex;
                            return (
                                <PaginationItem onClick={() => onPageIndexChange(page)}>
                                    <PaginationLink href="#" isActive={isActive}>
                                        {page + 1}
                                    </PaginationLink>
                                </PaginationItem>
                            );
                        })}
                        {lastPageIndex - currentPageIndex >= consecutivePagesBlockSize &&
                            totalPages > consecutivePagesBlockSize + 1 && (
                                <PaginationItem>
                                    <PaginationEllipsis />
                                </PaginationItem>
                            )}
                        {forceDisplayLast && (
                            <PaginationItem>
                                <PaginationLink
                                    href="#"
                                    isActive={currentPageIndex === lastPageIndex}
                                    onClick={() => onPageIndexChange(lastPageIndex)}
                                >
                                    {lastPageIndex + 1}
                                </PaginationLink>
                            </PaginationItem>
                        )}

                        <PaginationItem>
                            <PaginationNext
                                href="#"
                                onClick={() => onPageIndexChange(Math.min(currentPageIndex + 1, totalPages - 1))}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </>
        );
    }
};

export default CustomPagination;
