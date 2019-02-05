import { List } from '../list';

export { }

declare global { // to access the global type String
    interface Array<T> {
        /**
         * Computes the sum of the sequence of number values that are obtained by invoking
         * a transform function on each element of the input sequence.
         */
        Sum(transform?: (value: T, index: number, list: T[]) => number): number;
    }
}

Array.prototype.Sum = function <T>(
    transform?: (value?: T, index?: number, list?: T[]) => number
): number {
    return transform
        ? this.Select(transform).Sum()
        : this.Aggregate((ac: any, v: any) => (ac += +v), 0);
};

declare module '../list' {
    interface List<T> {
        Sum(transform?: (value: T, index: number, list: T[]) => number): number;
    }
}

List.prototype.Sum = function <T>(transform?: (value: T, index: number, list: T[]) => number) {
    return this._array.Sum(transform)
}

