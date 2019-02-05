import { List } from '../list';

export { }

declare global {
    interface Array<T> {
        /**
         * Creates a List<T> from an Enumerable.List<T>.
         */
        ToList(): List<T>;
    }
}

Array.prototype.ToList = function <T>(): List<T> {
    return new List<T>(this);
};

declare module '../list' {
    interface List<T> {
        ToList(): List<T>;
    }
}

List.prototype.ToList = function <T>(): List<T> {
    return new List<T>(this._array);
}
