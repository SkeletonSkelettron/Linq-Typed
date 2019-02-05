import { List } from '../list';

export { }

declare global { // to access the global type String
    interface Array<T> {
        /**
         * Creates a Lookup<TKey, TElement> from an IEnumerable<T> according to specified key selector and element selector functions.
         */
        ToLookup(keySelector: (key: T) => any, elementSelector: (element: T) => any): any;
    }
}

Array.prototype.ToLookup = function <T>(
    keySelector: (key: T) => any,
    elementSelector: (element: T) => any
): any {
    return this.GroupBy(keySelector, elementSelector);
};

declare module '../list' {
    interface List<T> {
        ToLookup(keySelector: (key: T) => any, elementSelector: (element: T) => any): any;
    }
}

List.prototype.ToLookup = function <T>(keySelector: (key: T) => any, elementSelector: (element: T) => any): any {
    return this._array.ToLookup(keySelector, elementSelector)
}
