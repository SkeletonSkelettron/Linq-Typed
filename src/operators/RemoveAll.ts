import { List } from '../list';
import { getArray } from '../utility-functions/getArray';

export { }

declare global {
    interface Array<T> {
        /**
         * Removes all the elements that match the conditions defined by the specified predicate.
         */
        RemoveAll(predicate?: (value: T, index: number, list: T[]) => boolean): List<T>;
    }
}

Array.prototype.RemoveAll = function <T>(
    predicate?: (value?: T, index?: number, list?: T[]) => boolean
): List<T> {
    if (predicate) {
        const arr = getArray<T>(this);
        for (let i = 0; i < arr.length; i++) {
            if (predicate(arr[i])) {
                arr.splice(i, 1);
                i--;
            }
        }
        return new List<T>(arr);
    }
    return new List<T>();
};

declare module '../list' {
    interface List<T> {
        RemoveAll(predicate?: (value: T, index: number, list: T[]) => boolean): List<T>;
    }
}

List.prototype.RemoveAll = function <T>(predicate?: (value: T, index: number, list: T[]) => boolean) {
    return this._array.RemoveAll(predicate)
}
