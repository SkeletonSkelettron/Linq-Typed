import { getArray } from './utility-functions/getArray';
import { List } from './list';

export default {}

declare global {
    interface Array<T> {
        /**
         * Returns the first element of a sequence.
         */
        First(predicate?: (value: T, index: number, list: T[]) => boolean): T;
    }
}

Array.prototype.First = function <T>(
    predicate?: (value: T, index: number, list: T[]) => boolean
): T {
    if (this.Count()) {
        return predicate ? this.Where(predicate).ToArray()[0] : getArray<T>(this)[0];
    } else {
        throw new Error(
            'InvalidOperationException: The source sequence is empty.'
        );
    }
};

declare module './list' {
    interface List<T> {
        First(predicate?: (value: T, index: number, list: T[]) => boolean): T;
    }
}

List.prototype.First = function <T>(predicate?: (value: T, index: number, list: T[]) => boolean): T {
    return this._array.First(predicate);
}
