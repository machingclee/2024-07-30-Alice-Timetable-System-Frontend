import { Box } from '@mui/material';
import dayjs from 'dayjs';
import { eventApi } from '@/!rtk-query/api/eventApi';
import { useRef, useState, useEffect, CSSProperties } from 'react';
import React from 'react';
import CustomPagination from '@/components/CustomPagination';
import Spacer from '@/components/Spacer';
import { OverlayScrollbarsComponent, OverlayScrollbarsComponentRef } from 'overlayscrollbars-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import LoadingOverlay from '@/components/LoadingOverlay';
import { Button } from '@/components/ui/button';
import { successToast } from '@/hooks/use-toast';
import { Copy } from 'lucide-react';
const LIMIT = 50;

// Tooltip styling constants
const TOOLTIP_STYLES: CSSProperties = {
    backgroundColor: 'rgba(0,0,0,0.7)',
    backdropFilter: 'blur(25px)',
    maxHeight: '500px',
    maxWidth: '1000px',
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
};

const TOOLTIP_CLASS_SMALL = 'max-w-[500px] max-h-[400px] p-0';
const TOOLTIP_CLASS_LARGE = 'max-w-[1000px] max-h-[400px] p-0';

export default function Logging() {
    const [page, setPage] = useState(0);
    const { data: loggings, isFetching } = eventApi.endpoints.getEvents.useQuery({ page, limit: LIMIT });
    const ref = useRef<OverlayScrollbarsComponentRef<'div'> | null>(null);

    return (
        <TooltipProvider>
            <div>
                <LoadingOverlay isLoading={isFetching}>
                    <CustomPagination
                        consecutivePagesBlockSize={3}
                        currentPageIndex={page}
                        totalPages={Math.ceil((loggings?.total || 0) / LIMIT)}
                        onPageIndexChange={page => {
                            setPage(page);
                        }}
                    />

                    <Spacer />

                    <Box
                        sx={{
                            height: 'calc(100vh - 100px)',
                            table: { borderCollapse: 'collapse', borderRadius: '10px', overflow: 'hidden' },
                            '& th': {
                                textAlign: 'center',
                                padding: '0px 10px',
                                fontWeight: 600,
                                fontSize: 15,
                                // borderRadius: '10px',
                                margin: '10px',
                                backgroundColor: 'rgba(0,0,0,0.2)',
                            },
                            '& tr': {
                                fontFamily: 'Consolas, Monaco, "Andale Mono", monospace',
                                fontSize: 12,
                            },
                            '& .user-column': {
                                maxWidth: 'unset !important',
                            },
                            '& .action-column': {
                                minWidth: '140px',
                                maxWidth: 'unset !important',
                            },
                            '& td': {
                                padding: '4px 10px',
                                maxWidth: '200px',
                                lineHeight: '1.2em',
                                maxHeight: '2.4em',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                            },

                            '& tr:nth-of-type(2n+1)': {
                                backgroundColor: 'rgba(0,0,0,0.05)',
                            },
                        }}
                    >
                        <OverlayScrollbarsComponent
                            style={{
                                height: '100%',
                                width: '100%',
                                overflowY: 'auto',
                            }}
                            ref={ref}
                            options={{
                                scrollbars: {
                                    autoHide: 'leave',
                                    autoHideDelay: 100,
                                },
                            }}
                        >
                            <table>
                                <thead>
                                    <th className="user-column">User</th>
                                    <th className="action-column">Action</th>
                                    <th>Time</th>
                                    <th>Data</th>
                                    <th>
                                        <div>
                                            <div>Failure</div>
                                            <div>Reason</div>
                                        </div>
                                    </th>
                                    <th>Success</th>
                                    <th>Request ID</th>
                                </thead>
                                <tbody>
                                    {loggings?.events.map(log => {
                                        const {
                                            id,
                                            event,
                                            eventType,
                                            failureReason,
                                            requestUserEmail,
                                            createdAt,
                                            requestId,
                                            success,
                                        } = log;

                                        return (
                                            <tr key={id}>
                                                <td>
                                                    <UncontrolledTooltip content={<p>{requestUserEmail}</p>}>
                                                        {requestUserEmail}
                                                    </UncontrolledTooltip>
                                                </td>
                                                <td className="action-column">
                                                    <UncontrolledTooltip content={<p>{eventType}</p>}>
                                                        {eventType}
                                                    </UncontrolledTooltip>
                                                </td>
                                                <td>
                                                    <UncontrolledTooltip
                                                        content={
                                                            <p>
                                                                Full timestamp:{' '}
                                                                {dayjs(createdAt).format('YYYY-MM-DD HH:mm:ss.SSS')}
                                                            </p>
                                                        }
                                                    >
                                                        {dayjs(createdAt).format('YYYY-MM-DD H:mm:ss')}
                                                    </UncontrolledTooltip>
                                                </td>
                                                <td>
                                                    <UncontrolledTooltip
                                                        content={
                                                            <pre className="text-xs whitespace-pre-wrap">
                                                                {JSON.stringify(event, null, 2)}
                                                            </pre>
                                                        }
                                                    >
                                                        <div className="text-ellipsis max-w-[120px] overflow-hidden">
                                                            {JSON.stringify(event)}
                                                        </div>
                                                    </UncontrolledTooltip>
                                                </td>
                                                <td>
                                                    <UncontrolledTooltip content={<p>{failureReason || 'None'}</p>}>
                                                        <div className="text-ellipsis max-w-[120px] overflow-hidden">
                                                            {failureReason}
                                                        </div>
                                                    </UncontrolledTooltip>
                                                </td>
                                                <td>
                                                    <UncontrolledTooltip
                                                        content={<p>{success ? 'Success' : 'Failed'}</p>}
                                                    >
                                                        {success ? 'Yes' : 'No'}
                                                    </UncontrolledTooltip>
                                                </td>
                                                <td>
                                                    <UncontrolledTooltip content={<p>{requestId}</p>}>
                                                        {requestId?.substring(0, 8) || ''}
                                                    </UncontrolledTooltip>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </OverlayScrollbarsComponent>
                    </Box>
                </LoadingOverlay>
            </div>
        </TooltipProvider>
    );
}

function UncontrolledTooltip({ children, content }: { children: React.ReactNode; content: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const tooltipRef = useRef<HTMLDivElement | null>(null);
    const divRef = useRef<HTMLDivElement | null>(null);
    const [isClicked, setIsClicked] = useState(false);

    const handleClickOutside = (event: MouseEvent) => {
        if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
        if (divRef.current && !divRef.current.contains(event.target as Node)) {
            setIsClicked(false);
        }
    };

    const handleClick = () => {
        setIsClicked(c => !c);
        setIsOpen(prev => !prev);
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <Tooltip open={isOpen && isClicked}>
            <TooltipTrigger asChild>
                <div className="cursor-pointer" onClick={handleClick} ref={divRef}>
                    {children}
                </div>
            </TooltipTrigger>
            <div ref={tooltipRef}>
                <TooltipScrollContent>{content}</TooltipScrollContent>
            </div>
        </Tooltip>
    );
}

function TooltipScrollContent({ children, isLarge = false }: { children: React.ReactNode; isLarge?: boolean }) {
    const handleCopy = () => {
        navigator.clipboard.writeText(children?.toString() || '');
        successToast('Content copied to clipboard!');
    };

    return (
        <TooltipContent className={isLarge ? TOOLTIP_CLASS_LARGE : TOOLTIP_CLASS_SMALL} style={TOOLTIP_STYLES}>
            <div className="flex justify-end !text-sm">
                <Button
                    variant="ghost"
                    onClick={handleCopy}
                    className="mb-2 cursor-pointer px-3 !py-[0px] text-xs bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.2)] hover:text-white h-7
                    "
                >
                    <Copy className="h-4 w-4" />
                </Button>
            </div>
            <OverlayScrollbarsComponent
                style={{
                    flex: 1,
                    height: '100%',
                    width: '100%',
                    maxHeight: TOOLTIP_STYLES.maxHeight,
                }}
                options={{
                    scrollbars: { autoHide: 'scroll', autoHideDelay: 100 },
                }}
            >
                <div className="text-white">{children}</div>
            </OverlayScrollbarsComponent>
        </TooltipContent>
    );
}
