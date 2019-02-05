import { List } from './list';

export { }

declare global {
    interface Array<T> {
        /**
         * Correlates the elements of two sequences based on matching keys. The default equality comparer is used to compare keys.
         */
        Join<U>(list: Array<U>, key1: (key: T) => any, key2: (key: U) => any, result: (first: T, second: U) => any): List<any>;
    }
}

Array.prototype.Join = function <T, U>(
    list: U[],
    key1: (key: T) => any,
    key2: (key: U) => any,
    result: (first: T, second: U) => any
): List<any> {
    return new List<T>(this.SelectMany(x =>
        list.Where(y => key2(y) === key1(x)).Select(z => result(x, z)).ToArray()
    ))
};

declare module './list' {
    interface List<T> {
        Join<U>(list: Array<U>, key1: (key: T) => any, key2: (key: U) => any, result: (first: T, second: U) => any): List<any>;
    }
}

List.prototype.Join = function <T, U>(list: Array<U>, key1: (key: T) => any, key2: (key: U) => any, result: (first: T, second: U) => any) {
    return this._array.Join(list, key1, key2, result);
}
