import { getArray } from "./utility-functions/getArray";
import { List } from './list';

export { }

declare global {
    interface Array<T> {
        /**
         * Applies an accumulator function over a sequence.
         */
        Aggregate<U>(accumulator: (accum: U, value?: T, index?: number, list?: T[]) => any, initialValue?: U): any;
    }
}

Array.prototype.Aggregate = function <U, T>(
    accumulator: (accum: U, value?: T, index?: number, list?: T[]) => any,
    initialValue?: U
): any {
    return getArray<T>(this).reduce(accumulator, initialValue);
};

declare module './list' {
    interface List<T> {
        Aggregate<U>(accumulator: (accum: U, value?: T, index?: number, list?: T[]) => any, initialValue?: U): any;
    }
}

List.prototype.Aggregate = function <U, T>(accumulator: (accum: U, value?: T, index?: number, list?: T[]) => any, initialValue?: U) {
    return this._array.Aggregate(accumulator, initialValue);
}