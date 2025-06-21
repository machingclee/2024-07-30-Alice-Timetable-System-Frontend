/* eslint-disable-file */
import { normalize as normalize_, schema } from 'normalizr';
const normalize = <T, ID = string>({ targetArr, idAttribute }: { targetArr: T[]; idAttribute: string }) => {
    const objectEntity = new schema.Entity<Selection>('object', undefined, {
        idAttribute,
    });
    const normalized = normalize_(targetArr || [], [objectEntity]);
    const idToObject = (normalized.entities['object'] as { [id: string]: T }) || {};
    const ids = (normalized['result'].map((r: any) => String(r)) as ID[]) || [];
    return { ids, idToObject };
};

export default { normalize };
