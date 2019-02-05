import { List } from '../list';
import { getArray } from '../utility-fucntions/getArray';

export { }

declare global { // to access the global type String
    interface Array<T> {
        /**
         * Produces the set intersection of two sequences by using the default equality comparer to compare values.
         */
        Intersect(source: T[]): List<T>;
    }
}

Array.prototype.Intersect = function <T>(source: T[]): List<T> {
    const th = getArray<T>(this)
    return new List<T>(th.Where(x => source.Contains(x))._array);
};

declare module '../list' {
    interface List<T> {
        Intersect(source: T[]): List<T>;
    }
}

List.prototype.Intersect = function <T>(source: T[]): List<T> {
    return this._array.Intersect(source);
}
