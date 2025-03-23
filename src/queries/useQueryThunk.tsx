import { AsyncThunk } from '@reduxjs/toolkit';
import useBaseQuery from './useBaseQuery';
import hashUtil from '../utils/hashUtil';
import { useAppDispatch } from '../redux/hooks';

/**
 * - This wrap a thunk into a useQuery call, the purpose is to debounce and make cache appropriately.
 * - By default each data change of useQuery will invoke the fulfilled method of each thunk,
 *   data transformation in reduxstore can fallback to usual practice.
 * - At the end it is simply calling useQuery({..., queryFn}), with queryFn being the dispatched thunk action.
 * - Default staleTime and gcTime is 1000.
 */
// eslint-disable-next-line, it is really any:
export default <ThunkInputParam, ReturnType>(param: {
        // eslint-disable-next-line, it is really any:
        thunk: AsyncThunk<ReturnType, ThunkInputParam, any>;
        staleTime?: number;
    }) =>
    (inputParam?: ThunkInputParam) => {
        const { thunk, staleTime = 1000 } = param;
        const dispatch = useAppDispatch();
        return useBaseQuery({
            queryKey: [thunk.typePrefix, hashUtil.hash(inputParam || {})],
            queryFn: async () => {
                // @ts-expect-error, don't try to handle the error
                const res = (await dispatch(inputParam ? thunk(inputParam) : thunk()).unwrap()) as ReturnType;
                return res;
            },
            onDataChanged: data => {
                const requestID = crypto.randomUUID() || Math.random() + '';
                // eslint-disable-next-line
                dispatch(thunk.fulfilled(data, requestID, inputParam as any));
            },
            gcTime: staleTime,
            staleTime: staleTime,
        });
    };
