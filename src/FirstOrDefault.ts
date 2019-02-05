import { List } from './list';

export { }

declare global { // to access the global type String
    interface Array<T> {
        /**
         * Returns the first element of a sequence, or a default value if the sequence contains no elements.
         */
        FirstOrDefault(predicate?: (value: T, index: number, list: T[]) => boolean): T;
    }
}

Array.prototype.FirstOrDefault = function <T>(
    predicate?: (value: T, index: number, list: T[]) => boolean
): T {
    return this.Count(predicate) ? this.First(predicate) : undefined;
};

declare module './list' {
    interface List<T> {
        FirstOrDefault(predicate?: (value: T, index: number, list: T[]) => boolean): T;
    }
}

List.prototype.FirstOrDefault = function <T>(predicate?: (value: T, index: number, list: T[]) => boolean): T {
    return this._array.FirstOrDefault(predicate);
}
