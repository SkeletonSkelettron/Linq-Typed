import { List } from './list';
import { getArray } from './utility-functions/getArray';

export { }

declare global {
    interface Array<T> {
        /**
         * Returns a specified number of contiguous elements from the end of a sequence.
         */
        TakeLast(amount: number): List<T>;
    }
}

Array.prototype.TakeLast = function <T>(amount: number): List<T> {
    return new List<T>(getArray<T>(this).slice(getArray<T>(this).length - amount, getArray<T>(this).length))
};

declare module './list' {
    interface List<T> {
        TakeLast(amount: number): List<T>;
    }
}

List.prototype.TakeLast = function <T>(amount: number): List<T> {
    return this._array.TakeLast(amount)
}
