type SerializableValue =
    | string
    | number
    | boolean
    | null
    | undefined
    | SerializableValue[]
    | { [key: string]: SerializableValue };

const createSortedKey = (obj: SerializableValue): string => {
    const sortedStringify = (value: SerializableValue): SerializableValue => {
        if (value === null || value === undefined || typeof value !== 'object') {
            return value;
        }

        if (Array.isArray(value)) {
            return value.map(sortedStringify);
        }

        const sortedObj: Record<string, SerializableValue> = {};
        Object.keys(value)
            .sort()
            .forEach(key => {
                sortedObj[key] = sortedStringify(value[key]);
            });

        return sortedObj;
    };

    return JSON.stringify(sortedStringify(obj));
};

export default createSortedKey;
