import { List } from './list';

export default {}

declare global {
    interface Array<T> {
        /**
         * Performs a subsequent ordering of the elements in a sequence in ascending order according to a key.
         */
        ThenBy(keySelector: (key: T) => any): List<T>;
    }
}

Array.prototype.ThenBy = function <T>(keySelector: (key: T) => any): List<T> {
    return this.OrderBy(keySelector)
};
