import { List } from './list';

export default {}

declare global {
    interface Array<T> {
        /**
         * Correlates the elements of two sequences based on equality of keys and groups the results.
         * The default equality comparer is used to compare keys.
         */
        GroupJoin<T>(list: T[], key1: (k: T) => any, key2: (k: T) => any, result: (first: T, second: T[]) => any): List<any>;

    }
}

Array.prototype.GroupJoin = function <U, T>(
    list: U[],
    key1: (k: T) => any,
    key2: (k: U) => any,
    result: (first: T, second: U[]) => any
): List<any> {
    return this.Select((x, y) =>
        result(x, list.Where(z => key1(x) === key2(z)).ToArray())
    )
};

declare module './list' {
    interface List<T> {
        GroupJoin<T>(list: T[], key1: (k: T) => any, key2: (k: T) => any, result: (first: T, second: T[]) => any): List<any>;
    }
}

List.prototype.GroupJoin = function <T>(list: T[], key1: (k: T) => any, key2: (k: T) => any, result: (first: T, second: T[]) => any) {
    return this._array.GroupJoin(list, key1, key2, result);
}
