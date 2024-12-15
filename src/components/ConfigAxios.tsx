import { PropsWithChildren } from 'react';
import apiClient, { configApiClient } from '../axios/apiClient';
import type { ReduxToolkitStore } from '../redux/store';

export default function ConfigAxios({ children, store }: PropsWithChildren & { store: ReduxToolkitStore }) {
    configApiClient(apiClient, store);
    return <>{children}</>;
}
