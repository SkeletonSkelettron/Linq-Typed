import { List } from '../list';

export { }

declare global { // to access the global type String
    interface Array<T> {
        /**
         * Applies a specified function to the corresponding elements of two sequences, producing a sequence of the results.
         */
        Zip<U, TOut>(list: U[], result: (first: T, second: U) => TOut): TOut[];
    }
}

Array.prototype.Zip = function <T, U, TOut>(
    list: U[],
    result: (first: T, second: U) => TOut
): TOut[] {
    return list.Count() < this.Count()
        ? list.Select((x: any, y: any) => result(this.ElementAt(y), x))
        : this.Select((x: any, y: any) => result(x, list.ElementAt(y)));
};

declare module '../list' {
    interface List<T> {
        Zip<U, TOut>(list: U[], result: (first: T, second: U) => TOut): TOut[];
    }
}

List.prototype.Zip = function <T, U, TOut>(list: U[], result: (first: T, second: U) => TOut) {
    return this._array.Zip(list, result)
}
