import { getArray } from "./utility-functions/getArray";
import { List } from './list';

export { }

declare global {
    interface Array<T> {
        /**
         * Filters a sequence of values based on a predicate and returns new sequence
         */
        FindAll(predicate?: (value: T, index: number, list: T[]) => boolean): T[];
    }
}

Array.prototype.FindAll = function <T>(
    predicate?: (value: T, index: number, list: T[]) => boolean
): T[] {
    let ret: T[] = [];
    getArray<T>(this).filter(predicate).forEach(item => {
        ret.push(item)
    });
    return ret;
};

declare module './list' {
    interface List<T> {
        FindAll(predicate?: (value: T, index: number, list: T[]) => boolean): T[];
    }
}

List.prototype.FindAll = function <T>(predicate?: (value: T, index: number, list: T[]) => boolean): T[] {
    return this._array.FindAll(predicate);
}
