import { List } from './list';
import { getArray } from './utility-fucntions/getArray';

export { }

declare global { // to access the global type String
    interface Array<T> {
        /**
         * Inserts an element into the List<T> at the specified index.
         */
        Insert(index: number, element: T): void | Error;
    }
}

Array.prototype.Insert = function <T>(index: number, element: T): void | Error {
    let th = getArray<T>(this)
    if (index < 0 || index > th.length) {
        throw new Error('Index is out of range.');
    }

    th.splice(index, 0, element);
};

declare module './list' {
    interface List<T> {
        Insert(index: number, element: T): void | Error;
    }
}

List.prototype.Insert = function <T>(index: number, element: T): void | Error {
    return this._array.Insert(index, element);
}
