import { Box } from '@mui/material';
import dayjs from 'dayjs';
import { eventApi } from '@/!rtk-query/api/eventApi';
import { useRef, useState } from 'react';
import React from 'react';
import CustomPagination from '@/components/CustomPagination';
import Spacer from '@/components/Spacer';
import { OverlayScrollbarsComponent, OverlayScrollbarsComponentRef } from 'overlayscrollbars-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import LoadingOverlay from '@/components/LoadingOverlay';

const LIMIT = 50;

// Tooltip styling constants
const TOOLTIP_STYLES = {
    backgroundColor: 'rgba(0,0,0,0.5)',
    backdropFilter: 'blur(25px)',
    maxHeight: '400px',
};

const TOOLTIP_CLASS_SMALL = 'max-w-[500px] max-h-[400px] p-0';
const TOOLTIP_CLASS_LARGE = 'max-w-[1000px] max-h-[400px] p-0';

// Reusable tooltip content component
function TooltipScrollContent({ children, isLarge = false }: { children: React.ReactNode; isLarge?: boolean }) {
    return (
        <TooltipContent className={isLarge ? TOOLTIP_CLASS_LARGE : TOOLTIP_CLASS_SMALL} style={TOOLTIP_STYLES}>
            <OverlayScrollbarsComponent
                style={{
                    height: '100%',
                    width: '100%',
                    maxHeight: TOOLTIP_STYLES.maxHeight,
                }}
                options={{
                    scrollbars: { autoHide: 'scroll', autoHideDelay: 100 },
                }}
            >
                <div className="p-3 text-white">{children}</div>
            </OverlayScrollbarsComponent>
        </TooltipContent>
    );
}

export default function Logging() {
    const [page, setPage] = useState(0);
    const { data: loggings, isLoading } = eventApi.endpoints.getEvents.useQuery({ page, limit: LIMIT });
    const ref = useRef<OverlayScrollbarsComponentRef<'div'> | null>(null);

    return (
        <TooltipProvider>
            <div>
                <LoadingOverlay isLoading={isLoading}>
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
                            table: { borderCollapse: 'collapse' },
                            '& th': { textAlign: 'left', padding: '2px 10px' },
                            '& tr': {
                                fontFamily: 'Consolas, Monaco, "Andale Mono", monospace',
                                fontSize: 12,
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
                                    <th>User</th>
                                    <th>Action</th>
                                    <th>Time</th>
                                    <th>Data</th>
                                    <th>Failure Reason</th>
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
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <td>{requestUserEmail}</td>
                                                    </TooltipTrigger>
                                                    <TooltipScrollContent>
                                                        <p>User: {requestUserEmail}</p>
                                                    </TooltipScrollContent>
                                                </Tooltip>

                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <td>{eventType}</td>
                                                    </TooltipTrigger>
                                                    <TooltipScrollContent>
                                                        <p>Action: {eventType}</p>
                                                    </TooltipScrollContent>
                                                </Tooltip>

                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <td>{dayjs(createdAt).format('YYYY-MM-DD H:mm:ss')}</td>
                                                    </TooltipTrigger>
                                                    <TooltipScrollContent>
                                                        <p>
                                                            Full timestamp:{' '}
                                                            {dayjs(createdAt).format('YYYY-MM-DD HH:mm:ss.SSS')}
                                                        </p>
                                                    </TooltipScrollContent>
                                                </Tooltip>

                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <td>{JSON.stringify(event)}</td>
                                                    </TooltipTrigger>
                                                    <TooltipScrollContent>
                                                        <pre className="text-xs whitespace-pre-wrap">
                                                            {JSON.stringify(event, null, 2)}
                                                        </pre>
                                                    </TooltipScrollContent>
                                                </Tooltip>

                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <td>{failureReason}</td>
                                                    </TooltipTrigger>
                                                    <TooltipScrollContent isLarge>
                                                        <p>Failure reason: {failureReason || 'None'}</p>
                                                    </TooltipScrollContent>
                                                </Tooltip>

                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <td>{success ? 'Yes' : 'No'}</td>
                                                    </TooltipTrigger>
                                                    <TooltipScrollContent>
                                                        <p>Status: {success ? 'Success' : 'Failed'}</p>
                                                    </TooltipScrollContent>
                                                </Tooltip>

                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <td>{requestId}</td>
                                                    </TooltipTrigger>
                                                    <TooltipScrollContent>
                                                        <p>Request ID: {requestId}</p>
                                                    </TooltipScrollContent>
                                                </Tooltip>
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
