import { getArray } from "./utility-functions/getArray";
import { List } from './list';

export { }

declare global {
    interface Array<T> {
        /**
         * Determines whether a sequence contains any elements.
         */
        Any(predicate?: (value: T, index: number, list: T[]) => boolean): boolean;
    }
}

Array.prototype.Any = function <T>(
    predicate?: (value: T, index: number, list: T[]) => boolean
): boolean {
    return predicate ? getArray<T>(this).some(predicate) : getArray<T>(this).length > 0;
};

declare module './list' {
    interface List<T> {
        Any(predicate?: (value: T, index: number, list: T[]) => boolean): boolean
    }
}

List.prototype.Any = function <T>(predicate?: (value: T, index: number, list: T[]) => boolean) {
    return this._array.Any(predicate);
}