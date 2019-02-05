import { List } from '../list';
import { getArray } from '../utility-functions/getArray';

export { }

declare global {
    interface Array<T> {
        /**
         * Returns a specified number of contiguous elements from the start of a sequence.
         */
        Take(amount: number): List<T>;
    }
}

Array.prototype.Take = function <T>(amount: number): List<T> {
    return new List<T>(getArray<T>(this).slice(0, Math.max(0, amount)))
};

declare module '../list' {
    interface List<T> {
        Take(amount: number): List<T>;
    }
}

List.prototype.Take = function <T>(amount: number): List<T> {
    return this._array.Take(amount)
}
