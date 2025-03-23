import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

export default <T>(props: {
    queryKey: string[];
    queryFn: () => Promise<T>;
    onDataChanged?: (data: T) => void;
    gcTime?: number;
    enabled: boolean;
    staleTime?: number;
}) => {
    const { queryFn, queryKey, gcTime = 100, staleTime = 100, onDataChanged, enabled } = props;
    const queryClient = useQueryClient();
    const query = useQuery({
        queryFn: async () => {
            return await queryFn();
        },
        queryKey,
        gcTime,
        staleTime,
        enabled,
        refetchOnWindowFocus: false,
    });

    const invalidation = async () => await queryClient.invalidateQueries({ queryKey });

    useEffect(() => {
        if (query.data) {
            onDataChanged?.(query.data);
        }
        // eslint-disable-next-line
    }, [query.data]);

    return { query, invalidation };
};
