import { List } from './list';
import { getArray } from './utility-fucntions/getArray';
import { keyComparer } from './utility-fucntions/keyComparer';

export { }

declare global { // to access the global type String
    interface Array<T> {
        /**
         * Sorts the elements of a sequence in ascending order according to a key.
         */
        OrderBy(keySelector: (key: T) => any, keyComparer?: Function): List<T>;
    }
}

Array.prototype.OrderBy = function <T>(keySelector: (key: T) => any,
    comparer = keyComparer(keySelector, false)): List<T> {
    return new List<T>(getArray<T>(this), comparer)
};

declare module './list' {
    interface List<T> {
        OrderBy(keySelector: (key: T) => any, keyComparer?: Function): List<T>;
    }
}

List.prototype.OrderBy = function <T>(keySelector: (key: T) => any, keyComparer?: Function) {
    return this._array.OrderBy(keySelector, keyComparer)
}
