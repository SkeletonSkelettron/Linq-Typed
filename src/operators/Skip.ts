import { List } from './list';
import { getArray } from './utility-functions/getArray';

export { }

declare global {
    interface Array<T> {
        /**
         * Bypasses a specified number of elements in a sequence and then returns the remaining elements.
         */
        Skip(amount: number): List<T>;
    }
}

Array.prototype.Skip = function <T>(amount: number): List<T> {
    return new List<T>(getArray<T>(this).slice(Math.max(0, amount)))
};

declare module './list' {
    interface List<T> {
        Skip(amount: number): List<T>;
    }
}

List.prototype.Skip = function <T>(amount: number) {
    return this._array.Skip(amount)
}
