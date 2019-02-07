import { List } from './list';

export default {}

declare global {
    interface Array<T> {
        /**
         * Returns the elements of the specified sequence or the type parameter's default value
         * in a singleton collection if the sequence is empty.
         */
        DefaultIfEmpty(defaultValue?: T): List<T>;
    }
}

Array.prototype.DefaultIfEmpty = function <T>(defaultValue?: T): List<T> {
    return this.Count() ? this : new List<T>([defaultValue]);
};

declare module './list' {
    interface List<T> {
        DefaultIfEmpty(defaultValue?: T): List<T>;
    }
}

List.prototype.DefaultIfEmpty = function <T>(defaultValue?: T) {
    return this._array.DefaultIfEmpty(defaultValue);
}