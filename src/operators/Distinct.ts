import { getArray } from "../utility-fucntions/getArray";
import { List } from '../list';
import { isObj } from "../utility-fucntions/isObj";
import { equal } from "../utility-fucntions/equal";

export { }

declare global { // to access the global type String
    interface Array<T> {
        /**
         * Returns distinct elements from a sequence by using the default equality comparer to compare values.
         */
        Distinct(): List<T>;
    }
}

Array.prototype.Distinct = function <T>(): List<T> {
    return this.Where(
        (value, index, iter) =>
            (isObj(value)
                ? iter.findIndex(obj => equal(obj, value))
                : iter.IndexOf(value)) === index
    );
};

declare module '../list' {
    interface List<T> {
        Distinct(): List<T>;
    }
}

List.prototype.Distinct = function <T>() {
    return this._array.Distinct();
}