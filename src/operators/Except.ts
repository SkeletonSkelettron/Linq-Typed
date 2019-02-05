import { getArray } from "../utility-fucntions/getArray";
import { List } from '../list';

export { }

declare global { // to access the global type String
    interface Array<T> {
        /**
         * Produces the set difference of two sequences by using the default equality comparer to compare values.
         */
        Except(source: T[]): List<T>;
    }
}

Array.prototype.Except = function <T>(source: T[]): List<T> {
    return this.Where((x: any) => !source.Contains(x));
};

declare module '../list' {
    interface List<T> {
        Except(source: T[]): List<T>;
    }
}

List.prototype.Except = function <T>(source: T[]): List<T> {
    return this._array.Except(source);
}