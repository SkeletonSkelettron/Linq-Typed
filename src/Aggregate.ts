export { }

declare global { // to access the global type String
    interface Array<T> {
        /**
         * Applies an accumulator function over a sequence.
         */
        Aggregate<U>(accumulator: (accum: U, value?: T, index?: number, list?: T[]) => any, initialValue?: U): any;
    }
}

Array.prototype.Aggregate = function <U, T>(
    accumulator: (accum: U, value?: T, index?: number, list?: T[]) => any,
    initialValue?: U
): any {
    return this.reduce(accumulator, initialValue);
};
