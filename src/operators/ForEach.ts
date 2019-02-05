import { List } from '../list';
import { getArray } from '../utility-fucntions/getArray';

export { }

declare global { // to access the global type String
    interface Array<T> {
        /**
         * Performs the specified action on each element of the Array<T>.
         */
        ForEach(action: (value: T, index: number, list: T[]) => any): void;
    }
}

Array.prototype.ForEach = function <T>(action: (value: T, index: number, list: T[]) => any): void {
    return getArray<T>(this).forEach(action);
};

declare module '../list' {
    interface List<T> {
        ForEach(action: (value: T, index: number, list: T[]) => any): void;
    }
}

List.prototype.ForEach = function <T>(action: (value: T, index: number, list: T[]) => any): void {
    return this._array.ForEach(action);
}
