import { List } from '../list';
import { getArray } from '../utility-fucntions/getArray';

export { }

declare global { // to access the global type String
    interface Array<T> {
        /**
         * Returns the minimum value in a generic sequence.
         */
        Min(selector?: (value: T, index: number, array: T[]) => number): number;
    }
}

Array.prototype.Min = function <T>(selector?: (value: T, index: number, array: T[]) => number): number {
    const id = x => x
    let th = getArray<T>(this)
    let min = selector ? selector(this[0], 0, this) : id(this[0])
    if (selector) {
        for (let i = 0; i < th.length; i++) {
            min = selector(th[i], i, th) < min ? min = selector(th[i], i, th) : min;
        }
    } else {
        for (let i = 0; i < th.length; i++) {
            min = id(th[i]) < min ? min = id(th[i]) : min;
        }
    }
    return min;
};

declare module '../list' {
    interface List<T> {
        Min(selector?: (value: T, index: number, array: T[]) => number): number;
    }
}

List.prototype.Min = function <T>(selector?: (value: T, index: number, array: T[]) => number): number {
    return this._array.Min(selector)
}
