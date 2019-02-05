import { List } from './list';

export { }

declare global { // to access the global type String
    interface Array<T> {
        /**
         * Returns the only element of a sequence, or a default value if the sequence is empty;
         * this method throws an exception if there is more than one element in the sequence.
         */
        Single(predicate?: (value: T, index: number, list: T[]) => boolean): T;
    }
}

Array.prototype.Single = function <T>(
    predicate?: (value: T, index: number, list: T[]) => boolean
): T {
    if (this.Count(predicate) !== 1) {
        console.log('Single - ' + 'The collection does not contain exactly one element.');
        throw new Error('The collection does not contain exactly one element.');
    } else {
        return this.First(predicate);
    }
};

declare module './list' {
    interface List<T> {
        Single(predicate?: (value: T, index: number, list: T[]) => boolean): T;
    }
}

List.prototype.Single = function <T>(predicate?: (value: T, index: number, list: T[]) => boolean): T {
    return this._array.Single(predicate)
}
