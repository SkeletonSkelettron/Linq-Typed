import { List } from './list';

export default {}

declare global {
    interface Array<T> {
        /**
         * Returns the only element of a sequence, and throws an exception if there is not exactly one element in the sequence.
         */
        SingleOrDefault(predicate?: (value: T, index: number, list: T[]) => boolean): T;
    }
}

Array.prototype.SingleOrDefault = function <T>(
    predicate?: (value: T, index: number, list: T[]) => boolean
): T {
    return this.Count(predicate) ? this.Single(predicate) : undefined;
};
declare module './list' {
    interface List<T> {
        SingleOrDefault(predicate?: (value: T, index: number, list: T[]) => boolean): T;
    }
}

List.prototype.SingleOrDefault = function <T>(predicate?: (value: T, index: number, list: T[]) => boolean): T {
    return this._array.SingleOrDefault(predicate)
}
