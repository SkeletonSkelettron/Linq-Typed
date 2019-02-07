import { getArray } from './utility-functions/getArray';
import { List } from './list';

export { }

declare global {
    interface Array<T> {
        /**
         * Concatenates two sequences.
         */
        Concat(list: T[]): List<T>;
    }
}

Array.prototype.Concat = function <T>(list: T[]): List<T> {
    return new List<T>(getArray<T>(this).concat(list));
};

declare module './list' {
    interface List<T> {
        Concat(list: T[]): List<T>;
    }
}

List.prototype.Concat = function <T>(list: T[]) {
    return this._array.Concat(list);
}