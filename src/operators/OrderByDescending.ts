import { List } from '../list';
import { keyComparer } from '../utility-functions/keyComparer';
import { getArray } from '../utility-functions/getArray';

export { }

declare global {
    interface Array<T> {
        /**
         * Sorts the elements of a sequence in descending order according to a key.
         */
        OrderByDescending(keySelector: (key: T) => any): List<T>;
    }
}

Array.prototype.OrderByDescending = function <T>(keySelector: (key: T) => any,
    comparer = keyComparer(keySelector, true)): List<T> {
    return new List<T>(getArray<T>(this), comparer)
};

declare module '../list' {
    interface List<T> {
        OrderByDescending(keySelector: (key: T) => any): List<T>;
    }
}

List.prototype.OrderByDescending = function <T>(keySelector: (key: T) => any) {
    return this._array.OrderByDescending(keySelector)
}
