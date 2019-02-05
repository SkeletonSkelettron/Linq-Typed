import { List } from '../list';

export { }

declare global { // to access the global type String
    interface Array<T> {
        /**
         * Projects each element of a sequence to a List<any> and flattens the resulting sequences into one sequence.
         */
        SelectMany<TOut extends any[]>(selector: (element: T, index: number) => TOut): TOut;
    }
}

Array.prototype.SelectMany = function <T, TOut extends any[]>(
    selector: (element: T, index: number) => TOut
): TOut {
    return this.Aggregate(
        (ac, v, i) => (
            ac.AddRange(
                this.Select(selector)
                    .ElementAt(i)
                    .ToArray()
            ),
            ac
        ),
        new Array<TOut>()
    )
};

declare module '../list' {
    interface List<T> {
        SelectMany<TOut extends any[]>(selector: (element: T, index: number) => TOut): TOut; Add(element: T): void;
    }
}

List.prototype.SelectMany = function <T, TOut extends any[]>(selector: (element: T, index: number) => TOut) {
    return this._array.SelectMany(selector)
}