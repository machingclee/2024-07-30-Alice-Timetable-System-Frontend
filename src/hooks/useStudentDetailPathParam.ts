import { useSearchParams } from 'react-router-dom';

type StudenDetailPathParam = {
    anchorTimestamp?: number;
    packageId?: string;
};

export default () => {
    const [searchParams, setSearchParam] = useSearchParams();
    const anchorTimestamp = searchParams.get('anchorTimestamp')
        ? Number(searchParams.get('anchorTimestamp'))
        : new Date().getTime();
    const packageId = searchParams.get('packageId');

    const setAnchorTimestamp = (timestamp: number) => {
        setSearchParam({ anchorTimestamp: timestamp + '' }, { replace: true });
    };

    const setPathParam = ({ anchorTimestamp, packageId }: StudenDetailPathParam) => {
        let param: { [key in keyof StudenDetailPathParam]: string } = {};
        if (anchorTimestamp) {
            param = { ...param, anchorTimestamp: anchorTimestamp + '' };
        }
        if (packageId) {
            param = { ...param, packageId };
        }
        setSearchParam(param, { replace: true });
    };

    return { anchorTimestamp, setURLAnchorTimestamp: setAnchorTimestamp, setPathParam, packageId };
};
