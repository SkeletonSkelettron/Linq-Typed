import { List } from '../list';

export { }

declare global { // to access the global type String
    interface Array<T> {
        /**
         * Bypasses elements in a sequence as long as a specified condition is true and then returns the remaining elements.
         */
        SkipWhile(predicate: (value?: T, index?: number, list?: T[]) => boolean): List<T>;
    }
}

Array.prototype.SkipWhile = function <T>(
    predicate: (value?: T, index?: number, list?: T[]) => boolean
): List<T> {
    return this.Skip(
        this.Aggregate(
            (ac, val) => (predicate(this.ElementAt(ac)) ? ++ac : ac),
            0
        )
    )
};
declare module '../list' {
    interface List<T> {
        SkipWhile(predicate: (value?: T, index?: number, list?: T[]) => boolean): List<T>;
    }
}

List.prototype.SkipWhile = function <T>(predicate: (value?: T, index?: number, list?: T[]) => boolean): List<T> {
    return this._array.SkipWhile(predicate)
}
