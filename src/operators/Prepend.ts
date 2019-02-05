import { List } from '../list';

export { }

declare global {
    interface Array<T> {
        /**
         * Prepends a value to the end of the sequence and returns new sequence.
         */
        Prepend(value: T): List<T>;
    }
}

Array.prototype.Prepend = function <T>(value: T): List<T> {
    const list = new List<T>();
    list._array.push(value)
    this.ForEach(item => {
        list._array.push(item)
    })
    return list
};

declare module '../list' {
    interface List<T> {
        Prepend(value: T): List<T>;
    }
}

List.prototype.Prepend = function <T>(value: T) {
    return this._array.Prepend(value)
}

