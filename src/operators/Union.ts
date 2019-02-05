import { List } from '../list';

export { }

declare global { // to access the global type String
    interface Array<T> {
        /**
         * Produces the set union of two sequences by using the default equality comparer.
         */
        Union(list: T[]): List<T>;
    }
}

Array.prototype.Union = function <T>(list: T[]): List<T> {
    return this.Concat(list).Distinct();
};

declare module '../list' {
    interface List<T> {
        Union(list: T[]): List<T>;
    }
}

List.prototype.Union = function <T>(list: T[]): List<T> {
    return this._array.Union(list)
}
