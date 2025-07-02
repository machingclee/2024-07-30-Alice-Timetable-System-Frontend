import { PropsWithChildren } from 'react';
import LoadingContainer from './LoadingContainer';
import CircularProgress from '@mui/material/CircularProgress';

export default function LoadingOverlay({
    children,
    isLoading,
    size: _size = 60,
    defaultOffsetTop = 100,
    listLength = 1,
}: PropsWithChildren<{ isLoading: boolean; defaultOffsetTop?: number; size?: number; listLength?: number }>) {
    if (listLength === 0) {
        return (
            <LoadingContainer isLoading={isLoading} hideContentWhenLoading={true}>
                {children}
            </LoadingContainer>
        );
    }
    return (
        <div className="relative">
            {isLoading && (
                <div
                    className="w-full h-full absolute z-10 "
                    style={{ backgroundColor: 'rgba(255,255,255,0.7)', borderRadius: 10 }}
                >
                    <div style={{ transform: `translateY(${defaultOffsetTop}px)` }}>
                        <CircularProgress
                            color="inherit"
                            className={`absolute left-1/2 -translate-x-1/2 z-10`}
                            sx={{ color: 'rgba(0,0,0,0.35)' }}
                        />
                    </div>
                </div>
            )}
            {children}
        </div>
    );
}
