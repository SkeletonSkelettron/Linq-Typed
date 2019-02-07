import { getArray } from './utility-functions/getArray';
import { List } from './list';

export default {}

declare global {
    interface Array<T> {
        /**
         * Adds the elements of the specified collection to the end of the List<T>.
         */
        AddRange(elements: T[]): void;
    }
}

Array.prototype.AddRange = function <T>(e: T[]): void {
    const t = getArray<T>(this);
    for (let i = 0; i < e.length; i++) {
        t.push(e[i]);
    }
};

declare module './list' {
    interface List<T> {
        AddRange(element: T): void;
    }
}

List.prototype.AddRange = function <T>(elements: T[]) {
    return this._array.AddRange(elements);
};
