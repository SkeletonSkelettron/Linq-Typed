import { List } from './list';
import { getArray } from './utility-functions/getArray';

export { }

declare global {
    interface Array<T> {
        /**
         * Filters a sequence of values based on a predicate.
         */
        Where(predicate: (value: T, index: number, list: T[]) => boolean): List<T>;
    }
}

Array.prototype.Where = function <T>(
    predicate: (value: T, index: number, list: T[]) => boolean
): List<T> {
    return new List<T>(getArray<T>(this).filter(predicate));
};
declare module './list' {
    interface List<T> {
        Where(predicate: (value: T, index: number, list: T[]) => boolean): List<T>;
    }
}

List.prototype.Where = function <T>(predicate: (value: T, index: number, list: T[]) => boolean): List<T> {
    return this._array.Where(predicate)
}
