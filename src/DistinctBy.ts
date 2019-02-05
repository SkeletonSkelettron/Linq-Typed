import { getArray } from "./utility-functions/getArray";
import { List } from './list';

export { }

declare global {
    interface Array<T> {
        /**
         * Returns distinct elements from a sequence according to specified key selector.
         */
        DistinctBy(keySelector: (key: T) => any): List<T>;
    }
}

Array.prototype.DistinctBy = function <T>(keySelector: (key: T) => any): List<T> {
    const groups = this.GroupBy(keySelector, (obj: any) => obj);
    const results = new List<T>([]);
    for (const index in groups) {
        if (groups.hasOwnProperty(index)) {
            results._array.Add(groups[index][0]);
        }
    }
    return results;
};

declare module './list' {
    interface List<T> {
        DistinctBy(keySelector: (key: T) => any): List<T>;
    }
}

List.prototype.DistinctBy = function <T>(keySelector: (key: T) => any) {
    return this._array.DistinctBy(keySelector);
}