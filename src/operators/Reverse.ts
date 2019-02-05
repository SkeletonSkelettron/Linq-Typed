import { List } from '../list';
import { getArray } from '../utility-fucntions/getArray';

export { }

declare global { // to access the global type String
    interface Array<T> {
        /**
         * Reverses the order of the elements in the entire List<T>.
         */
        Reverse(): List<T>;
    }
}

Array.prototype.Reverse = function <T>(): List<T> {
    return new List<T>(getArray<T>(this).reverse());
};

declare module '../list' {
    interface List<T> {
        Reverse(): List<T>;
    }
}

List.prototype.Reverse = function <T>(): List<T> {
    return this._array.Reverse()
}
