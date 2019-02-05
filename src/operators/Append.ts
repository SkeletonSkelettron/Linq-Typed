import { getArray } from "../utility-fucntions/getArray";
import { List } from '../list';

export { }

declare global { // to access the global type String
    interface Array<T> {
        /**
         * Appends a value to the end of the sequence and returns new sequence.
         */
        Append(value: T): List<T>;
    }
}

Array.prototype.Append = function <T>(value: T): List<T> {
    const list = new List<T>();
    this.ForEach(item => {
        list._array.push(item)
    })
    list._array.push(value)
    return list
};


declare module '../list' {
    interface List<T> {
        Append(element: T): void;
    }
}

List.prototype.Append = function <T>(value: T) {
    return this._array.Append(value);
}