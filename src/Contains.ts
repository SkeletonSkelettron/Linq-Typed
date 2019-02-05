import { getArray } from "./utility-functions/getArray";
import { List } from './list';

export { }

declare global {
    interface Array<T> {
        /**
         * Determines whether an element is in the List<T>.
         */
        Contains(element: T): boolean;
    }
}

Array.prototype.Contains = function <T>(element: T): boolean {
    return getArray<T>(this).some(x => x === element);
};

declare module './list' {
    interface List<T> {
        Contains(element: T): boolean;
    }
}

List.prototype.Contains = function <T>(element: T) {
    return this._array.Contains(element);
}