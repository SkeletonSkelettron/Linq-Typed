import { List } from './list';

export { }

declare global {
    interface Array<T> {
        /**
         * Returns the element at a specified index in a sequence or a default value if the index is out of range.
         */
        ElementAtOrDefault(index: number): T;
    }
}

Array.prototype.ElementAtOrDefault = function <T>(index: number): T {
    return this.ElementAt(index) || undefined;
};

declare module './list' {
    interface List<T> {
        ElementAtOrDefault(index: number): T;
    }
}

List.prototype.ElementAtOrDefault = function <T>(index: number): T {
    return this._array.ElementAtOrDefault(index);
}
