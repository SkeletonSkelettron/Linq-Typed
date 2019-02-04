import { isObj } from "./isObj";

/**
 * Determine if two objects are equal
 */
export const equal = <T, U>(a: T, b: U): boolean =>
    Object.keys(a).every(
        key => (isObj(a[key]) ? equal(b[key], a[key]) : b[key] === a[key])
    )
