import { getArray } from "../utility-fucntions/getArray";
import { List } from '../list';

export { }

declare global { // to access the global type String
    interface Array<T> {
        /*
        *   Adds an object to the end of the List<T> or Array<T>.
        */
        Add(element: T): void;
    }
}

Array.prototype.Add = function <T>(e: T): void {
    getArray<T>(this).push(e);
};

declare module '../list' {
    interface List<T> {
        Add(element: T): void;
    }
}

List.prototype.Add = function <T>(element: T) {
    return this._array.Add(element);
}