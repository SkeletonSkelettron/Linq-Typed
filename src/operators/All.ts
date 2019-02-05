import { getArray } from "../utility-fucntions/getArray";
import { List } from '../list';

export { }

declare global { // to access the global type String
    interface Array<T> {
        /**
         * Determines whether all elements of a sequence satisfy a condition.
         */
        All(predicate: (value: T, index: number, list: T[]) => boolean): boolean;
    }
}

Array.prototype.All = function <T>(
    predicate: (value: T, index: number, list: T[]) => boolean
): boolean {
    return getArray<T>(this).every(predicate);
};

declare module '../list' {
    interface List<T> {
        All(predicate: (value: T, index: number, list: T[]) => boolean): boolean;
    }
}

List.prototype.All = function <T>(predicate: (value: T, index: number, list: T[]) => boolean) {
    return this._array.All(predicate);
}