import sha256 from 'crypto-js/sha256';

const hash = (jsonObj: object) => {
    const sortedJsonStr = JSON.stringify(jsonObj, Object.keys(jsonObj).sort());
    return sha256(sortedJsonStr).toString();
};

export default {
    hash,
};
