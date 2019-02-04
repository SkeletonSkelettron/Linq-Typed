import { List } from "../list";

export const getArray = function <T>(
    obj: List<T> | T[]
): T[] {
    return (obj instanceof List ? (obj._array) : (obj))
}
