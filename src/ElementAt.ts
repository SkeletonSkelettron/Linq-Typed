import { getArray } from "./utility-functions/getArray";
import { List } from './list';

export { }

declare global {
    interface Array<T> {
        /**
         * Returns the element at a specified index in a sequence.
         */
        ElementAt(index: number): T;
    }
}

Array.prototype.ElementAt = function <T>(index: number): T {
    let th = getArray<T>(this)
    if (index < th.Count()) {
        return th[index];
    } else {
        console.log();
        const MSG =
            'ArgumentOutOfRangeException: index is less than 0 or greater than or equal to the number of elements in source.';
        console.log('ElementAt - ' + MSG + ', index: ' + index.toString());
        throw new Error(MSG);
    }
};

declare module './list' {
    interface List<T> {
        ElementAt(index: number): T;
    }
}

List.prototype.ElementAt = function <T>(index: number): T {
    return this._array.ElementAt(index);
}
