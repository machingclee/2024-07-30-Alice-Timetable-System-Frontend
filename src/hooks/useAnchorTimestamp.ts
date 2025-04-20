import { useSearchParams } from 'react-router-dom';

export default () => {
    const [searchParams, setSearchParam] = useSearchParams();
    const anchorTimestamp = searchParams.get('anchorTimestamp')
        ? Number(searchParams.get('anchorTimestamp'))
        : new Date().getTime();

    const setAnchorTimestamp = (timestamp: number) => {
        setSearchParam({ anchorTimestamp: timestamp + '' }, { replace: true });
    };

    return { anchorTimestamp, setURLAnchorTimestamp: setAnchorTimestamp };
};
