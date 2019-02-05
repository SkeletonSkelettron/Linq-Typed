import { List } from '../list';
import { getArray } from '../utility-fucntions/getArray';

export { }

declare global { // to access the global type String
    interface Array<T> {
        /**
         * Returns the index of the first occurence of an element in the List.
         */
        IndexOf(element: T): number;
    }
}

Array.prototype.IndexOf = function <T>(element: T): number {
    return getArray<T>(this).indexOf(element);
};

declare module '../list' {
    interface List<T> {
        IndexOf(element: T): number;
    }
}

List.prototype.IndexOf = function <T>(element: T): number {
    return this._array.IndexOf(element);
}
