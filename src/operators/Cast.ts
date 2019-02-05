import { getArray } from "../utility-fucntions/getArray";
import { List } from '../list';

export { }

declare global { // to access the global type String
    interface Array<T> {
        /**
         * Casts the elements of a sequence to the specified type.
         */
        Cast<T>(): List<T>;
    }
}

Array.prototype.Cast = function <T>(): List<T> {
    return new List<T>(getArray<T>(this) as any)
};

declare module '../list' {
    interface List<T> {
        Cast<T>(): List<T>;
    }
}

List.prototype.Cast = function <T>() {
    return this._array.Cast()
}