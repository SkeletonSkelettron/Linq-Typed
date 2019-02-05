import { List } from '../list';

export { }

declare global {
    interface Array<T> {
        /**
         * Performs a subsequent ordering of the elements in a sequence in descending order, according to a key.
         */
        ThenByDescending(keySelector: (key: T) => any): List<T>;
    }
}

Array.prototype.ThenByDescending = function <T>(keySelector: (key: T) => any): List<T> {
    return this.OrderByDescending(keySelector);
};

