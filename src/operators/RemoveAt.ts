import { List } from '../list';
import { getArray } from '../utility-fucntions/getArray';

export { }

declare global { // to access the global type String
    interface Array<T> {
        /**
         * Removes the element at the specified index of the List<T>.
         */
        RemoveAt(index: number): void;
    }
}

Array.prototype.RemoveAt = function <T>(index: number): List<T> {
    return new List<T>(getArray<T>(this).splice(index, 1));
};

declare module '../list' {
    interface List<T> {
        RemoveAt(index: number): void;
    }
}

List.prototype.RemoveAt = function <T>(index: number): void {
    return this._array.RemoveAt(index)
}