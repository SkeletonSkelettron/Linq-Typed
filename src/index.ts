/*
This library is fork from   https://github.com/kutyel/linq.ts
https://www.npmjs.com/package/linqts
*/
'use strict';

const TimSort = require('timsort');

interface Array<T> {
    ToList(): List<T>;
}
Array.prototype.ToList = function <T>(): List<T> {
    return new List<T>(this);
};
/**
 * Checks if the argument passed is an object
 */
const isObj = <T>(x: T): boolean => typeof x === 'object'

/**
 * Determine if two objects are equal
 */
const equal = <T, U>(a: T, b: U): boolean =>
    Object.keys(a).every(
        key => (isObj(a[key]) ? equal(b[key], a[key]) : b[key] === a[key])
    )

const compare = <T>(
    a: T,
    b: T,
    _keySelector: (key: T) => any,
    descending?: boolean
): number => {
    const sortKeyA = _keySelector(a)
    const sortKeyB = _keySelector(b)
    if (sortKeyA > sortKeyB) {
        return !descending ? 1 : -1
    } else if (sortKeyA < sortKeyB) {
        return !descending ? -1 : 1
    } else {
        return 0
    }
}


const keyComparer = <T>(
    _keySelector: (key: T) => any,
    descending?: boolean
): ((a: T, b: T) => number) => (a: T, b: T) =>
        compare(a, b, _keySelector, descending)

const composeComparers = <T>(
    previousComparer: (a: T, b: T) => number,
    currentComparer: (a: T, b: T) => number
): ((a: T, b: T) => number) => (a: T, b: T) =>
        previousComparer(a, b) || currentComparer(a, b)


class List<T> {

    public _array: T[] = [];
    // constructor(elements?: T[], private _comparer?: (a: T, b: T) => number) {
    //     if (elements) {
    //         this._array = elements;
    //     }
    //     if (this._comparer) {
    //         TimSort.sort(this._array, this._comparer)
    //     }
    // }
    constructor(elements: T[] = []) {
        this._array = elements
    }


    /*
    * Adds an object to the end of the List<T> or Array<T>.
    */
    Add(element: T): void {
        this._array.push(element);
    }
    /**
    * Adds the elements of the specified collection to the end of the List<T>.
    */
    AddRange(elements: T[]): void {
        for (let i = 0; i < elements.length; i++) {
            this._array.push(elements[i]);
        }
    };
    /**
     * Applies an accumulator function over a sequence.
     */
    Aggregate<U>(accumulator: (accum: U, value?: T, index?: number, list?: T[]) => any, initialValue?: U): any {
        return this._array.reduce(accumulator, initialValue);
    }

    /**
     * Determines whether all elements of a sequence satisfy a condition.
     */
    All(predicate: (value: T, index: number, list: T[]) => boolean): boolean {
        return this._array.every(predicate);
    }

    /**
     * Determines whether a sequence contains any elements.
     */
    Any(predicate?: (value: T, index: number, list: T[]) => boolean): boolean {
        return predicate ? this._array.some(predicate) : this._array.length > 0;
    }
    /**
     * Appends a value to the end of the sequence and returns new sequence.
     */
    Append(value: T): List<T> {
        const list = new List<T>();
        this.ForEach(item => {
            list._array.push(item)
        })
        list._array.push(value)
        return list;
    }
    /**
     * Computes the average of a sequence of number values that are obtained by invoking
     * a transform function on each element of the input sequence.
     */
    Average(transform?: (value: T, index: number, list: T[]) => any): number {
        return this.Sum(transform) / this.Count(transform);
    }

    /**
     * Casts the elements of a sequence to the specified type.
     */
    Cast<T>(): List<T> {
        return new List<T>(this._array as any);
    }

    /**
     * Concatenates two sequences.
     */
    Concat(list: T[]): List<T> {
        return new List<T>(this._array.concat(list));
    }

    /**
     * Determines whether an element is in the List<T>.
     */
    Contains(element: T): boolean {
        return this._array.some(x => x === element);
    }

    /**
     * Returns the number of elements in a sequence.
     */
    Count(predicate?: (value: T, index: number, list: T[]) => boolean) {
        return predicate ? this.Where(predicate)._array.length : this._array.length;
    }

    /**
     * Returns the elements of the specified sequence or the type parameter's default value
     * in a singleton collection if the sequence is empty.
     */
    DefaultIfEmpty(defaultValue?: T): List<T> {
        return this._array.length ? this : new List<T>([defaultValue]);
    }

    /**
     * Returns distinct elements from a sequence by using the default equality comparer to compare values.
     */
    Distinct(): List<T> {
        return this.Where(
            (value, index, iter) =>
                (isObj(value)
                    ? iter.findIndex(obj => equal(obj, value))
                    : iter.indexOf(value)) === index
        );
    }

    /**
     * Returns distinct elements from a sequence according to specified key selector.
     */
    DistinctBy(keySelector: (key: T) => any): List<T> {
        const groups = this.GroupBy(keySelector, (obj: any) => obj);
        const results = new List<T>([]);
        for (const index in groups) {
            if (groups.hasOwnProperty(index)) {
                results._array.push(groups[index][0]);
            }
        }
        return results;
    }

    /**
     * Returns the element at a specified index in a sequence.
     */
    ElementAt(index: number): T {
        if (index < this._array.length) {
            return this._array[index];
        } else {
            console.log();
            const MSG =
                'ArgumentOutOfRangeException: index is less than 0 or greater than or equal to the number of elements in source.';
            console.log('ElementAt - ' + MSG + ', index: ' + index.toString());
            throw new Error(MSG);
        }
    }

    /**
     * Returns the element at a specified index in a sequence or a default value if the index is out of range.
     */
    ElementAtOrDefault(index: number): T {
        return this.ElementAt(index) || undefined;
    }

    /**
     * Produces the set difference of two sequences by using the default equality comparer to compare values.
     */
    Except(source: T[]): List<T> {
        return this.Where((x: any) => !source.ToList().Contains(x));
    }

    /**
     * Returns the first element of a sequence.
     */
    First(predicate?: (value: T, index: number, list: T[]) => boolean): T {
        if (this._array.length) {
            return predicate ? this.Where(predicate).ToArray()[0] : this._array[0];
        } else {
            throw new Error(
                'InvalidOperationException: The source sequence is empty.'
            );
        }
    }

    /**
     * Returns the first element of a sequence, or a default value if the sequence contains no elements.
     */
    FirstOrDefault(predicate?: (value: T, index: number, list: T[]) => boolean): T {
        return this.Count(predicate) ? this.First(predicate) : undefined;
    }

    /**
     * Performs the specified action on each element of the Array<T>.
     */
    ForEach(action: (value: T, index: number, list: T[]) => any): void {
        return this._array.forEach(action);
    }

    /**
     * Groups the elements of a sequence according to a specified key selector function.
     */
    GroupBy<TResult = T>(grouper: (key: T) => any, mapper: (element: T) => TResult): { [key: string]: TResult[] } {
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
        }, initialValue);
    }

    /**
     * Correlates the elements of two sequences based on equality of keys and groups the results.
     * The default equality comparer is used to compare keys.
     */
    GroupJoin<U>(
        list: List<U>,
        key1: (k: T) => any,
        key2: (k: U) => any,
        result: (first: T, second: List<U>) => any
    ): List<any> {
        return this.Select((x, y) =>
            result(x, list.Where(z => key1(x) === key2(z)))
        )
    }

    /*
    * Returns sub array of array
    */
    GetRange(index: number, count: number): List<T> {
        const result: Array<T> = new Array<T>();
        for (let i = 0; i < count; i++) {
            result.push(this._array[index + i]);
        }
        return new List<T>(result);
    }

    /**
     * Returns the index of the first occurence of an element in the List.
     */
    IndexOf(element: T) {
        return this._array.indexOf(element);
    }

    /**
     * Inserts an element into the List<T> at the specified index.
     */
    Insert(index: number, element: T): void | Error {
        if (index < 0 || index > this._array.length) {
            throw new Error('Index is out of range.');
        }
        this._array.splice(index, 0, element);
    }

    /**
     * Inserts an element into the List<T> at the specified index.
     */
    InsertRange(index: number, array: T[]): void | Error {
        if (index < 0 || index > this._array.length) {
            throw new Error('Index is out of range.');
        }
        for (let i = 0; i < array.length; i++) {
            this._array.splice(index + i, 0, array[i]);
        }
    }

    /**
     * Produces the set intersection of two sequences by using the default equality comparer to compare values.
     */
    Intersect(source: T[]): List<T> {
        const th = this._array;
        return new List<T>(th.ToList().Where(x => source.ToList().Contains(x))._array);
    }

    /**
     * Correlates the elements of two sequences based on matching keys. The default equality comparer is used to compare keys.
     */
    Join<U>(list: Array<U>, key1: (key: T) => any, key2: (key: U) => any, result: (first: T, second: U) => any): List<any> {
        return new List<T>(this.SelectMany(x =>
            list.ToList().Where(y => key2(y) === key1(x)).Select(z => result(x, z)).ToArray()
        ))
    }

    /**
     * Returns the last element of a sequence.
     */
    Last(predicate?: (value: T, index: number, list: T[]) => boolean): T {
        let th = this._array;
        if (this.Count()) {
            return predicate ? th.ToList().Where(predicate).Last() : th[th.length - 1];
        } else {
            console.log('Last  - ' + 'InvalidOperationException: The source sequence is empty.');
            throw Error('InvalidOperationException: The source sequence is empty.');
        }
    }

    /**
     * Returns the last element of a sequence, or a default value if the sequence contains no elements.
     */
    LastOrDefault(predicate?: (value: T, index: number, list: T[]) => boolean): T {
        return this.Count(predicate) ? this.Last(predicate) : undefined;
    }

    /**
     * Returns the maximum value in a generic sequence.
     */
    Max(selector?: (value: T, index: number, array: T[]) => number): number {
        const id = x => x
        let th = this._array;
        let max = selector ? selector(th[0], 0, th) : id(th[0])
        if (selector) {
            for (let i = 0; i < th.length; i++) {
                max = selector(th[i], i, th) > max ? max = selector(th[i], i, th) : max;
            }
        } else {
            for (let i = 0; i < th.length; i++) {
                max = id(th[i]) > max ? max = id(th[i]) : max;
            }
        }
        return max;
    }

    /**
     * Returns the element with maximum value in a generic sequence.
     */
    MaxBy(keySelector: (key: T) => any): T {
        return this.OrderByDescending(keySelector).FirstOrDefault();
    }

    /**
     * Returns the minimum value in a generic sequence.
     */
    Min(selector?: (value: T, index: number, array: T[]) => number): number {
        const id = x => x
        let th = this._array;
        let min = selector ? selector(this._array[0], 0, this._array) : id(this._array[0])
        if (selector) {
            for (let i = 0; i < th.length; i++) {
                min = selector(th[i], i, th) < min ? min = selector(th[i], i, th) : min;
            }
        } else {
            for (let i = 0; i < th.length; i++) {
                min = id(th[i]) < min ? min = id(th[i]) : min;
            }
        }
        return min;
    }

    /**
     * Returns the element with minimum value in a generic sequence.
     */
    MinBy(keySelector: (key: T) => any): T {
        return this.OrderBy(keySelector).FirstOrDefault();
    }

    /**
    * Filters the elements of a sequence based on a specified type.
    */
    OfType<T>(type: any): List<T> {
        let typeName: string;
        let th = this._array;
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
            ? th.ToList().Where(x => x instanceof type).Cast()
            : th.ToList().Where(x => typeof x === typeName).Cast()
    }

    /**
     * Sorts the elements of a sequence in ascending order according to a key.
     */
    OrderBy(keySelector: (key: T) => any, comparer = keyComparer(keySelector, false)): List<T> {
        return new OrderedList<T>(this._array, comparer)
    }

    /**
     * Sorts the elements of a sequence in descending order according to a key.
     */
    OrderByDescending(keySelector: (key: T) => any, comparer = keyComparer(keySelector, true)): List<T> {
        return new OrderedList<T>(this._array, comparer)
    }

    /**
     * Performs a subsequent ordering of the elements in a sequence in ascending order according to a key.
     */
    public ThenBy(keySelector: (key: T) => any): List<T> {
        return this.OrderBy(keySelector)
    }

    /**
     * Performs a subsequent ordering of the elements in a sequence in descending order, according to a key.
     */
    public ThenByDescending(keySelector: (key: T) => any): List<T> {
        return this.OrderByDescending(keySelector)
    }

    /**
     * Prepends a value to the end of the sequence and returns new sequence.
     */
    Prepend(value: T): List<T> {
        const list = new List<T>();
        list._array.push(value)
        this.ForEach(item => {
            list._array.push(item)
        })
        return list;
    }

    /**
     * Removes the first occurrence of a specific object from the List<T>.
     */
    Remove(element: T): boolean {
        return this.IndexOf(element) !== -1
            ? (this.RemoveAt(this.IndexOf(element)), true)
            : false;
    }

    /**
     * Removes all the elements that match the conditions defined by the specified predicate.
     */
    RemoveAll(predicate?: (value?: T, index?: number, list?: T[]) => boolean): List<T> {
        if (predicate) {
            const arr = this._array;
            for (let i = 0; i < arr.length; i++) {
                if (predicate(arr[i])) {
                    arr.splice(i, 1);
                    i--;
                }
            }
            return new List<T>(arr);
        }
        return new List<T>();
    }

    /**
     * Removes the element at the specified index of the List<T>.
     */
    RemoveAt(index: number): List<T> {
        return new List<T>(this._array.splice(index, 1));
    }

    /*
     * Removes the element at the specified index of the List<T>.
     */
    RemoveRange(index: number, count: number): List<T> {
        return new List<T>(this._array.splice(index, count));
    }

    /**
     * Reverses the order of the elements in the entire List<T>.
     */
    Reverse(): List<T> {
        return new List<T>(this._array.reverse());
    }

    /**
     * Projects each element of a sequence into a new form.
     */
    Select<TOut>(selector: (element: T, index: number) => TOut): List<TOut> {
        return new List<TOut>(this._array.map(selector));
    }

    /**
     * Projects each element of a sequence to a List<any> and flattens the resulting sequences into one sequence.
     */
    SelectMany<TOut extends any[]>(selector: (element: T, index: number) => TOut): TOut {
        return this.Aggregate(
            (ac, v, i) => (
                ac.ToList().AddRange(
                    this.Select(selector)
                        .ElementAt(i)
                        .ToList()
                        .ToArray()
                ),
                ac
            ),
            new Array<TOut>()
        );
    }

    /**
     * Determines whether two sequences are equal by comparing the elements by using the default equality comparer for their type.
     */
    SequenceEqual(list: T[]): boolean {
        return !!this._array.reduce(
            (x: any, y: any, z: any) => (list[z] === y ? x : undefined)
        );
    }

    /**
     * Returns the only element of a sequence, or a default value if the sequence is empty;
     * this method throws an exception if there is more than one element in the sequence.
     */
    Single(predicate?: (value: T, index: number, list: T[]) => boolean): T {
        if (this.Count(predicate) !== 1) {
            console.log('Single - ' + 'The collection does not contain exactly one element.');
            throw new Error('The collection does not contain exactly one element.');
        } else {
            return this.First(predicate);
        }
    }

    /**
     * Returns the only element of a sequence, and throws an exception if there is not exactly one element in the sequence.
     */
    SingleOrDefault(predicate?: (value: T, index: number, list: T[]) => boolean): T {
        return this.Count(predicate) ? this.Single(predicate) : undefined;
    }

    /**
     * Bypasses a specified number of elements in a sequence and then returns the remaining elements.
     */
    Skip(amount: number): List<T> {
        return new List<T>(this._array.slice(Math.max(0, amount)))
    }

    /**
     * Bypasses a specified number of elements at the end of a sequence and then returns the remaining elements.
     */
    SkipLast(amount: number): List<T> {
        return new List<T>(this._array.slice(0, Math.max(0, this._array.length - amount)))
    }

    /**
     * Bypasses elements in a sequence as long as a specified condition is true and then returns the remaining elements.
     */
    SkipWhile(predicate: (value?: T, index?: number, list?: T[]) => boolean): List<T> {
        return this.Skip(
            this.Aggregate(
                (ac, val) => (predicate(this.ElementAt(ac)) ? ++ac : ac),
                0
            )
        )
    }

    /**
     * Computes the sum of the sequence of number values that are obtained by invoking
     * a transform function on each element of the input sequence.
     */
    Sum(transform?: (value?: T, index?: number, list?: T[]) => number): number {
        return transform
            ? this.Select(transform).Sum()
            : this.Aggregate((ac: any, v: any) => (ac += +v), 0);
    }

    /**
     * Returns a specified number of contiguous elements from the start of a sequence.
     */
    Take(amount: number): List<T> {
        return new List<T>(this._array.slice(0, Math.max(0, amount)))
    }

    /**
     * Returns a specified number of contiguous elements from the end of a sequence.
     */
    TakeLast(amount: number): List<T> {
        return new List<T>(this._array.slice(this._array.length - amount, this._array.length))
    }

    /**
     * Returns elements from a sequence as long as a specified condition is true.
     */
    TakeWhile(predicate: (value: T, index?: number, list?: T[]) => boolean): List<T> {
        return this.Take(
            this.Aggregate(
                (ac: any) => (predicate(this.ElementAt(ac)) ? ++ac : ac),
                0
            )
        );
    }

    /**
     * Copies the elements of the List<T> to a new array.
     */
    ToArray() {
        return this._array;
    }

    /**
     * Creates a Dictionary<TKey, TValue> from a List<T> according to a specified key selector function.
     */
    ToDictionary<TKey, TValue>(key: (key: T) => TKey, value?: (value: T) => TValue): List<{ Key: TKey; Value: T }>
    ToDictionary<TKey, TValue>(key: (key: T) => TKey, value?: (value: T) => TValue): List<{ Key: TKey; Value: T }> | List<{ Key: TKey; Value: T | TValue }> {
        return this.Aggregate((dicc, v, i) => {
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
        }, new List<{ Key: TKey; Value: T | TValue }>())
    }

    /**
     * Creates a Lookup<TKey, TElement> from an IEnumerable<T> according to specified key selector and element selector functions.
     */
    ToLookup(keySelector: (key: T) => any, elementSelector: (element: T) => any): any {
        return this.GroupBy(keySelector, elementSelector);
    }

    /**
     * Produces the set union of two sequences by using the default equality comparer.
     */
    Union(list: T[]): List<T> {
        return this.Concat(list).Distinct();
    }

    /**
     * Filters a sequence of values based on a predicate.
     */
    Where(predicate: (value: T, index: number, list: T[]) => boolean): List<T> {
        return new List<T>(this._array.filter(predicate));
    }

    /**
     * Applies a specified function to the corresponding elements of two sequences, producing a sequence of the results.
     */
    Zip<U, TOut>(list: U[], result: (first: T, second: U) => TOut): List<TOut> {
        return list.ToList().Count() < this.Count()
            ? list.ToList().Select((x: any, y: any) => result(this.ElementAt(y), x))
            : this.Select((x: any, y: any) => result(x, list.ToList().ElementAt(y)));
    }
}
/**
 * Represents a sorted sequence. The methods of this class are implemented by using deferred execution.
 * The immediate return value is an object that stores all the information that is required to perform the action.
 * The query represented by this method is not executed until the object is enumerated either by
 * calling its ToDictionary, ToLookup, ToList or ToArray methods
 */
class OrderedList<T> extends List<T> {
    constructor(elements: T[], private _comparer: (a: T, b: T) => number) {
        super(elements)
        TimSort.sort(this._array, this._comparer)
    }

    /**
     * Performs a subsequent ordering of the elements in a sequence in ascending order according to a key.
     * @override
     */
    public ThenBy(keySelector: (key: T) => any): List<T> {
        return new OrderedList(
            this._array,
            composeComparers(this._comparer, keyComparer(keySelector, false))
        )
    }

    /**
     * Performs a subsequent ordering of the elements in a sequence in descending order, according to a key.
     * @override
     */
    public ThenByDescending(keySelector: (key: T) => any): List<T> {
        return new OrderedList(
            this._array,
            composeComparers(this._comparer, keyComparer(keySelector, true))
        )
    }
}
class Enumerable {
    /**
     * Generates a sequence of integral numbers within a specified range.
     */
    public static Range(start: number, count: number): List<number> {
        let result = new List<number>()
        while (count--) {
            result.Add(start++)
        }
        return result
    }

    /**
     * Generates a sequence that contains one repeated value.
     */
    public static Repeat<T>(element: T, count: number): List<T> {
        let result = new List<T>()
        while (count--) {
            result.Add(element)
        }
        return result
    }
}