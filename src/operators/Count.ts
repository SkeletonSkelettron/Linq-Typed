import { getArray } from './utility-functions/getArray';
import { List } from './list';

export { }

declare global {
    interface Array<T> {
        /**
         * Returns the number of elements in a sequence.
         */
        Count(predicate?: (value: T, index: number, list: T[]) => boolean): number;

    }
}

Array.prototype.Count = function <T>(
    predicate?: (value: T, index: number, list: T[]) => boolean
): number {
    return predicate ? this.Where(predicate).Count() : this.length;
};

declare module './list' {
    interface List<T> {
        Count(predicate?: (value: T, index: number, list: T[]) => boolean): number;
    }
}

List.prototype.Count = function <T>(predicate?: (value: T, index: number, list: T[]) => boolean) {
    return this._array.Count(predicate);
}