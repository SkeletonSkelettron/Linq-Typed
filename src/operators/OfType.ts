import { List } from '../list';
import { getArray } from '../utility-fucntions/getArray';

export { }

declare global { // to access the global type String
    interface Array<T> {
        /**
        * Filters the elements of a sequence based on a specified type.
        */
        OfType<T>(type: any): List<T>;
    }
}

Array.prototype.OfType = function <T>(type: any): List<T> {
    let typeName: string;
    let th = getArray<T>(this)
    switch (type) {
        case Number:
            typeName = typeof 0
            break
        case String:
            typeName = typeof ''
            break
        case Boolean:
            typeName = typeof true
            break
        case Function:
            typeName = typeof function () { }
            break
        default:
            typeName = null
            break
    }
    return typeName === null
        ? th.Where(x => x instanceof type).Cast()
        : th.Where(x => typeof x === typeName).Cast()
}
declare module '../list' {
    interface List<T> {
        OfType<T>(type: any): List<T>;
    }
}

List.prototype.OfType = function <T>(type: any) {
    return this._array.OfType(type)
}

