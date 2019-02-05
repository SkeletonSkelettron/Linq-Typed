import { List } from '../list';
import { getArray } from '../utility-fucntions/getArray';

export { }

declare global { // to access the global type String
    interface Array<T> {
        /**
         * Returns the maximum value in a generic sequence.
         */
        Max(selector?: (value: T, index: number, array: T[]) => number): number;
    }
}

Array.prototype.Max = function <T>(selector?: (value: T, index: number, array: T[]) => number): number {
    const id = x => x
    let th = getArray<T>(this)
    let max = selector ? selector(th[0], 0, th) : id(th[0])
    if (selector) {
        for (let i = 0; i < th.length; i++) {
            max = selector(th[i], i, th) > max ? max = selector(th[i], i, th) : max;
        }
    } else {
        for (let i = 0; i < th.length; i++) {
            max = id(th[i]) > max ? max = id(th[i]) : max;
        }
    }
    return max;
};

declare module '../list' {
    interface List<T> {
        Max(selector?: (value: T, index: number, array: T[]) => number): number;
    }
}

List.prototype.Max = function <T>(selector?: (value: T, index: number, array: T[]) => number): number {
    return this._array.Max(selector);
}

