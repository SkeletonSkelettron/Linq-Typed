import { List } from './list';

export { }

declare global { // to access the global type String
    interface Array<T> {
        /**
         * Computes the average of a sequence of number values that are obtained by invoking
         * a transform function on each element of the input sequence.
         */
        Average(transform?: (value: T, index: number, list: T[]) => any): number;
    }
}

Array.prototype.Average = function <T>(
    transform?: (value: T, index: number, list: T[]) => any
): number {
    return this.Sum(transform) / this.Count(transform);
};


declare module './list' {
    interface List<T> {
        Average(transform?: (value: T, index: number, list: T[]) => any): number;
    }
}

List.prototype.Average = function<T>(transform?: (value: T, index: number, list: T[]) => any): number {
    return this._array.Average(transform);
}

