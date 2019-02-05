import { List } from './list';
import { getArray } from './utility-fucntions/getArray';

export { }

declare global { // to access the global type String
    interface Array<T> {
        /**
         * Copies the elements of the List<T> to a new array.
         */
        ToArray(): T[];
    }
}

Array.prototype.ToArray = function <T>(): T[] {
    return getArray<T>(this);
};


declare module './list' {
    interface List<T> {
        ToArray(): T[];
    }
}

List.prototype.ToArray = function <T>() {
    return this._array;
}
