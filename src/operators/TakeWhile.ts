import { List } from './list';

export default {}

declare global {
    interface Array<T> {
        /**
         * Returns elements from a sequence as long as a specified condition is true.
         */
        TakeWhile(predicate: (value: T, index?: number, list?: T[]) => boolean): List<T>;
    }
}

Array.prototype.TakeWhile = function <T>(
    predicate: (value: T, index?: number, list?: T[]) => boolean
): List<T> {
    return this.Take(
        this.Aggregate(
            (ac: any) => (predicate(this.ElementAt(ac)) ? ++ac : ac),
            0
        )
    );
};

declare module './list' {
    interface List<T> {
        TakeWhile(predicate: (value: T, index?: number, list?: T[]) => boolean): List<T>;
    }
}

List.prototype.TakeWhile = function <T>(predicate: (value: T, index?: number, list?: T[]) => boolean) {
    return this._array.TakeWhile(predicate)
}
