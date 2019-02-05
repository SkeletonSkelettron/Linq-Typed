import { List } from './list';

export { }

declare global { // to access the global type String
    interface Array<T> {
        /**
         * Returns the element with maximum value in a generic sequence.
         */
        MaxBy(keySelector: (key: T) => any): T;
    }
}

Array.prototype.MaxBy = function <T>(keySelector: (item: T) => any): T {
    return this.OrderByDescending(keySelector).FirstOrDefault();
};

declare module './list' {
    interface List<T> {
        MaxBy(keySelector: (key: T) => any): T;
    }
}

List.prototype.MaxBy = function <T>(keySelector: (key: T) => any): T {
    return this._array.MaxBy(keySelector);
}
