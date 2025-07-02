import CircularProgress from '@mui/material/CircularProgress';
import { PropsWithChildren } from 'react';

export default function LoadingContainer({
    children,
    isLoading,
    hideContentWhenLoading = false,
}: PropsWithChildren<{ isLoading: boolean; hideContentWhenLoading?: boolean }>) {
    return (
        <>
            {isLoading && (
                <div className="flex justify-center w-full my-5">
                    <CircularProgress sx={{ color: 'rgba(0,0,0,0.35)' }} />
                </div>
            )}
            {isLoading && hideContentWhenLoading ? null : children}
        </>
    );
}
