import { PropsWithChildren, useEffect } from "react";
import apiClient, { configApiClient } from "../axios/apiClient";
import { useAppSelector } from "../redux/hooks";

export default ({ children, store }: PropsWithChildren & { store: any }) => {
    configApiClient(apiClient, store);
    return <>{children}</>
}