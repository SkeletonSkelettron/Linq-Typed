import { List } from './list';

export { }

declare global {
    interface Array<T> {
        /**
         * Returns the last element of a sequence, or a default value if the sequence contains no elements.
         */
        LastOrDefault(predicate?: (value: T, index: number, list: T[]) => boolean): T;
    }
}

Array.prototype.LastOrDefault = function <T>(
    predicate?: (value: T, index: number, list: T[]) => boolean
): T {
    return this.Count(predicate) ? this.Last(predicate) : undefined;
};

declare module './list' {
    interface List<T> {
        LastOrDefault(predicate?: (value: T, index: number, list: T[]) => boolean): T;
    }
}

List.prototype.LastOrDefault = function <T>(predicate?: (value: T, index: number, list: T[]) => boolean): T {
    return this._array.LastOrDefault(predicate);
}
