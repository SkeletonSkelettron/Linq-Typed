import { List } from './list';
import { getArray } from './utility-functions/getArray';

export { }

declare global {
    interface Array<T> {
        /**
         * Returns the last element of a sequence.
         */
        Last(predicate?: (value: T, index: number, list: T[]) => boolean): T;
    }
}

Array.prototype.Last = function <T>(
    predicate?: (value: T, index: number, list: T[]) => boolean
): T {
    let th = getArray<T>(this)
    if (this.Count()) {
        return predicate ? th.Where(predicate).Last() : th[th.Count() - 1];
    } else {
        console.log('Last  - ' + 'InvalidOperationException: The source sequence is empty.');
        throw Error('InvalidOperationException: The source sequence is empty.');
    }
};

declare module './list' {
    interface List<T> {
        Last(predicate?: (value: T, index: number, list: T[]) => boolean): T;
    }
}

List.prototype.Last = function <T>(predicate?: (value: T, index: number, list: T[]) => boolean): T {
    return this._array.Last(predicate);
}
