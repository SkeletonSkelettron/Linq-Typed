import { List } from './list';

export { }

declare global {
    interface Array<T> {
        /**
         * Returns the element with minimum value in a generic sequence.
         */
        MinBy(keySelector: (key: T) => any): T;
    }
}

Array.prototype.MinBy = function <T>(keySelector: (item: T) => any): T {
    return this.OrderBy(keySelector).FirstOrDefault();
};

declare module './list' {
    interface List<T> {
        MinBy(keySelector: (key: T) => any): T;
    }
}

List.prototype.MinBy = function <T>(keySelector: (key: T) => any) {
    return this._array.MinBy(keySelector)
}