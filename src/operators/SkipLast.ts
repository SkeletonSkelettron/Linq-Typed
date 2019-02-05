import { List } from '../list';
import { getArray } from '../utility-functions/getArray';

export { }

declare global {
    interface Array<T> {
        /**
         * Bypasses a specified number of elements at the end of a sequence and then returns the remaining elements.
         */
        SkipLast(amount: number): List<T>;
    }
}

Array.prototype.SkipLast = function <T>(amount: number): List<T> {
    return new List<T>(getArray<T>(this).slice(0, Math.max(0, getArray<T>(this).length - amount)))
};
declare module '../list' {
    interface List<T> {
        SkipLast(amount: number): List<T>;
    }
}

List.prototype.SkipLast = function <T>(amount: number): List<T> {
    return this._array.SkipLast(amount)
}
