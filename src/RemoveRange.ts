import { List } from './list';
import { getArray } from './utility-functions/getArray';

export { }

declare global {
    interface Array<T> {
        /*
         * Removes the element at the specified index of the List<T>.
         */
        RemoveRange(index: number, count: number): void;
    }
}

Array.prototype.RemoveRange = function <T>(index: number, count: number): List<T> {
    return new List<T>(getArray<T>(this).splice(index, count));
};

declare module './list' {
    interface List<T> {
        RemoveRange(index: number, count: number): void;
    }
}

List.prototype.RemoveRange = function <T>(index: number, count: number): void {
    return this._array.RemoveRange(index, count)
}