import { List } from '../list';
import { getArray } from '../utility-fucntions/getArray';

export { }

declare global { // to access the global type String
    interface Array<T> {
        /**
         * Inserts an element into the List<T> at the specified index.
         */
        InsertRange(index: number, array: T[]): void | Error;
    }
}

Array.prototype.InsertRange = function <T>(index: number, array: T[]): void | Error {
    let th = getArray<T>(this)
    if (index < 0 || index > th.length) {
        throw new Error('Index is out of range.');
    }
    for (let i = 0; i < array.length; i++) {
        th.splice(index + i, 0, array[i]);
    }
};

declare module '../list' {
    interface List<T> {
        InsertRange(index: number, array: T[]): void | Error;
    }
}

List.prototype.InsertRange = function <T>(index: number, array: T[]) {
    return this._array.InsertRange(index, array);
}
