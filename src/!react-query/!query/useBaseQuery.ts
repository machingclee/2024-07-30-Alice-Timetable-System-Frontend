import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

export default <T, R = T>(props: {
    queryKey: string[];

    queryFn: () => Promise<T>;
    onDataChanged?: (data: R) => void;
    gcTime?: number;
    enabled?: boolean;
    staleTime?: number;
    select?: (data: T) => R;
}) => {
    const {
        queryFn,
        queryKey,
        gcTime = 100,
        staleTime = 100,
        onDataChanged,
        enabled = true,
        select = (data: T): R => data as unknown as R,
    } = props;
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
        select,
    });

    const invalidation = async () => await queryClient.invalidateQueries({ queryKey });

    useEffect(() => {
        if (query.data) {
            onDataChanged?.(query.data);
        }
    }, [query.data]);

    return { query, invalidation };
};
