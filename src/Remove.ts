import { List } from './list';

export { }

declare global {
    interface Array<T> {
        /**
         * Removes the first occurrence of a specific object from the List<T>.
         */
        Remove(element: T): boolean;
    }
}

Array.prototype.Remove = function <T>(element: T): boolean {
    return this.IndexOf(element) !== -1
        ? (this.RemoveAt(this.IndexOf(element)), true)
        : false;
};

declare module './list' {
    interface List<T> {
        Remove(element: T): boolean;
    }
}

List.prototype.Remove = function <T>(element: T) {
    return this._array.Remove(element)
}
