import { List } from './list';
import { getArray } from './utility-fucntions/getArray';

export { }

declare global { // to access the global type String
    interface Array<T> {
        /**
         * Projects each element of a sequence into a new form.
         */
        Select<TOut>(selector: (element: T, index: number) => TOut): List<TOut>;
    }
}

Array.prototype.Select = function <TOut, T>(
    selector: (element: T, index: number) => TOut
): List<TOut> {
    return new List<TOut>(getArray<T>(this).map(selector));
};
declare module './list' {
    interface List<T> {
        Select<TOut>(selector: (element: T, index: number) => TOut): List<TOut>;
    }
}

List.prototype.Select = function <TOut, T>(selector: (element: T, index: number) => TOut): List<TOut> {
    return this._array.Select(selector)
}
