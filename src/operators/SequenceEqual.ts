import { List } from './list';
import { getArray } from './utility-functions/getArray';

export default {}

declare global {
    interface Array<T> {
        /**
         * Determines whether two sequences are equal by comparing the elements by using the default equality comparer for their type.
         */
        SequenceEqual(list: T[]): boolean;
    }
}

Array.prototype.SequenceEqual = function <T>(list: T[]): boolean {
    return !!getArray<T>(this).reduce(
        (x: any, y: any, z: any) => (list[z] === y ? x : undefined)
    );
};

declare module './list' {
    interface List<T> {
        SequenceEqual(list: T[]): boolean;
    }
}

List.prototype.SequenceEqual = function <T>(list: T[]) {
    return this._array.SequenceEqual(list)
}