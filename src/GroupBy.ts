import { List } from './list';

export { }

declare global { // to access the global type String
    interface Array<T> {
        /**
         * Groups the elements of a sequence according to a specified key selector function.
         */
        GroupBy<TResult = T>(grouper: (key: T) => any, mapper: (element: T) => TResult): { [key: string]: TResult[] };

    }
}

Array.prototype.GroupBy = function <T, TResult = T>(grouper: (key: T) => string | number,
    mapper?: (element: T) => TResult): { [key: string]: TResult[] } {
    const initialValue: { [key: string]: TResult[] } = {}
    if (!mapper) {
        mapper = val => <TResult>(<any>val)
    }
    return this.Aggregate((ac, v) => {
        const key = grouper(v)
        const existingGroup = ac[key]
        const mappedValue = mapper(v)
        if (existingGroup) {
            existingGroup.push(mappedValue)
        } else {
            ac[key] = [mappedValue]
        }
        return ac
    }, initialValue)
};

declare module './list' {
    interface List<T> {
        GroupBy<TResult = T>(grouper: (key: T) => any, mapper: (element: T) => TResult): { [key: string]: TResult[] };
    }
}

List.prototype.GroupBy = function <T, TResult = T>(grouper: (key: T) => any, mapper: (element: T) => TResult) {
    return this._array.GroupBy(grouper, mapper);
}
