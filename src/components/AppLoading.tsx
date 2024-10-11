import useLoadingSpinner from "../hooks/useLoadingSpinner.tsx"
import { useAppSelector } from "../redux/hooks";
import { useEffect } from "react";

export default () => {
    const { Spinner, setLoading } = useLoadingSpinner();
    const loading = useAppSelector(s => s.app.loading);
    console.log("loadingloadingloading", loading);
    useEffect(() => {
        setLoading(loading);
    }, [loading])

    return <Spinner />
}