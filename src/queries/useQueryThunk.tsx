import { AsyncThunk } from '@reduxjs/toolkit';
import useBaseQuery from './useBaseQuery';
import hashUtil from '../utils/hashUtil';
import { useAppDispatch } from '../redux/hooks';

/**
 * - This wrap a thunk into a useQuery call, the purpose is to debounce and make cache appropriately.
 * - By default each data change of useQuery will invoke the fulfilled method of each thunk
 *  to change the state in redux.
 * - At the end it is simply calling useQuery({..., queryFn}), with queryFn being the dispatched thunk action.
 * - Default staleTime and gcTime is 1000.
 */
// eslint-disable-next-line
export default <T,>(param: { thunk: AsyncThunk<any, T, any>; staleTime?: number }) =>
    (req?: T) => {
        const { thunk, staleTime = 1000 } = param;
        const dispatch = useAppDispatch();
        return useBaseQuery({
            queryKey: [thunk.typePrefix, hashUtil.hash(req || '')],
            queryFn: async () => {
                // @ts-expect-error, don't try to handle the error
                const res = await dispatch(req ? thunk(req) : thunk()).unwrap();
                return res;
            },
            onDataChanged: data => {
                // eslint-disable-next-line
                dispatch(thunk.fulfilled(data, Math.random() + '', (req || null) as any));
            },
            gcTime: staleTime,
            staleTime: staleTime,
        });
    };
