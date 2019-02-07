import { List } from './list';

export default {}

declare global {
    interface Array<T> {
        /**
         * Creates a Dictionary<TKey, TValue> from a List<T> according to a specified key selector function.
         */
        ToDictionary<TKey, TValue>(key: (key: T) => TKey, value?: (value: T) => TValue): List<{ Key: TKey; Value: T }>;
    }
}

Array.prototype.ToDictionary = function <TKey, TValue, T>(
    key: (key: T) => TKey,
    value?: (value: T) => TValue
): List<{ Key: TKey; Value: T }> | List<{ Key: TKey; Value: T | TValue }> {
    return new List<{ Key: TKey; Value: T | TValue }>(this.Aggregate((dicc, v, i) => {
        dicc[
            this.Select(key)
                .ElementAt(i)
                .toString()
        ] = value ? this.Select(value).ElementAt(i) : v
        dicc.Add({
            Key: this.Select(key).ElementAt(i),
            Value: value ? this.Select(value).ElementAt(i) : v
        })
        return dicc
    }, Array<{ Key: TKey; Value: T | TValue }>()))
}

declare module './list' {
    interface List<T> {
        ToDictionary<TKey, TValue>(key: (key: T) => TKey, value?: (value: T) => TValue): List<{ Key: TKey; Value: T }>;
    }
}

List.prototype.ToDictionary = function <TKey, TValue, T>(key: (key: T) => TKey, value?: (value: T) => TValue) {
    return this._array.ToDictionary(key, value)
}

