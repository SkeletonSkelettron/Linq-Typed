import { List } from '../list';
import { getArray } from '../utility-functions/getArray';

export { }

declare global {
    interface Array<T> {
        /*
        * Returns sub array of array
        */
        GetRange(index: number, count: number): List<T>;
    }
}

Array.prototype.GetRange = function <T>(index: number, count: number): List<T> {
    const result: Array<T> = new Array<T>();
    for (let i = 0; i < count; i++) {
        result.push(getArray<T>(this)[index + i]);
    }
    return new List<T>(result);
};

declare module '../list' {
    interface List<T> {
        GetRange(index: number, count: number): List<T>;
    }
}

List.prototype.GetRange = function <T>(index: number, count: number): List<T> {
    return this._array.GetRange(index, count);
}
