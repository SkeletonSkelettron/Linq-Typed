/*
This library is fork from   https://github.com/kutyel/linq.ts
https://www.npmjs.com/package/linqts
*/
'use strict';

const TimSort = require('timsort');

interface Array<T> {
    toList(): List<T>;
}
Array.prototype.toList = function <T>(): List<T> {
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
    add(element: T): void {
        this._array.push(element);
    }
    /**
    * Adds the elements of the specified collection to the end of the List<T>.
    */
    addRange(elements: T[]): void {
        for (let i = 0; i < elements.length; i++) {
            this._array.push(elements[i]);
        }
    };
    /**
     * Applies an accumulator function over a sequence.
     */
    aggregate<U>(accumulator: (accum: U, value?: T, index?: number, list?: T[]) => any, initialValue?: U): any {
        return this._array.reduce(accumulator, initialValue);
    }

    /**
     * Determines whether all elements of a sequence satisfy a condition.
     */
    all(predicate: (value: T, index: number, list: T[]) => boolean): boolean {
        return this._array.every(predicate);
    }

    /**
     * Determines whether a sequence contains any elements.
     */
    any(predicate?: (value: T, index: number, list: T[]) => boolean): boolean {
        return predicate ? this._array.some(predicate) : this._array.length > 0;
    }
    /**
     * Appends a value to the end of the sequence and returns new sequence.
     */
    append(value: T): List<T> {
        const list = new List<T>();
        this.forEach(item => {
            list._array.push(item)
        })
        list._array.push(value)
        return list;
    }
    /**
     * Computes the average of a sequence of number values that are obtained by invoking
     * a transform function on each element of the input sequence.
     */
    average(transform?: (value: T, index: number, list: T[]) => any): number {
        return this.sum(transform) / this.count(transform);
    }

    /**
     * Casts the elements of a sequence to the specified type.
     */
    cast<T>(): List<T> {
        return new List<T>(this._array as any);
    }

    /**
     * Concatenates two sequences.
     */
    concat(list: T[]): List<T> {
        return new List<T>(this._array.concat(list));
    }

    /**
     * Determines whether an element is in the List<T>.
     */
    contains(element: T): boolean {
        return this._array.some(x => x === element);
    }

    /**
     * Returns the number of elements in a sequence.
     */
    count(predicate?: (value: T, index: number, list: T[]) => boolean) {
        return predicate ? this.where(predicate).count() : this._array.length;
    }

    /**
     * Returns the elements of the specified sequence or the type parameter's default value
     * in a singleton collection if the sequence is empty.
     */
    defaultIfEmpty(defaultValue?: T): List<T> {
        return this.count() ? this : new List<T>([defaultValue]);
    }

    /**
     * Returns distinct elements from a sequence by using the default equality comparer to compare values.
     */
    distinct(): List<T> {
        return this.where(
            (value, index, iter) =>
                (isObj(value)
                    ? iter.findIndex(obj => equal(obj, value))
                    : iter.indexOf(value)) === index
        );
    }

    /**
     * Returns distinct elements from a sequence according to specified key selector.
     */
    distinctBy(keySelector: (key: T) => any): List<T> {
        const groups = this.groupBy(keySelector, (obj: any) => obj);
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
    elementAt(index: number): T {
        if (index < this.count()) {
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
    elementAtOrDefault(index: number): T {
        return this.elementAt(index) || undefined;
    }

    /**
     * Produces the set difference of two sequences by using the default equality comparer to compare values.
     */
    except(source: T[]): List<T> {
        return this.where((x: any) => !source.toList().contains(x));
    }

    /**
     * Filters a sequence of values based on a predicate and returns new sequence
     */
    findAll(predicate?: (value: T, index: number, list: T[]) => boolean): List<T> {
        let ret: T[] = [];
        this._array.filter(predicate).forEach(item => {
            ret.push(item)
        });
        return new List<T>(ret);
    }

    /**
     * Returns the first element of a sequence.
     */
    first(predicate?: (value: T, index: number, list: T[]) => boolean): T {
        if (this.count()) {
            return predicate ? this.where(predicate).toArray()[0] : this._array[0];
        } else {
            throw new Error(
                'InvalidOperationException: The source sequence is empty.'
            );
        }
    }

    /**
     * Returns the first element of a sequence, or a default value if the sequence contains no elements.
     */
    firstOrDefault(predicate?: (value: T, index: number, list: T[]) => boolean): T {
        return this.count(predicate) ? this.first(predicate) : undefined;
    }

    /**
     * Performs the specified action on each element of the Array<T>.
     */
    forEach(action: (value: T, index: number, list: T[]) => any): void {
        return this._array.forEach(action);
    }

    /**
     * Groups the elements of a sequence according to a specified key selector function.
     */
    groupBy<TResult = T>(grouper: (key: T) => any, mapper: (element: T) => TResult): { [key: string]: TResult[] } {
        const initialValue: { [key: string]: TResult[] } = {}
        if (!mapper) {
            mapper = val => <TResult>(<any>val)
        }
        return this.aggregate((ac, v) => {
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
    public groupJoin<U>(
        list: List<U>,
        key1: (k: T) => any,
        key2: (k: U) => any,
        result: (first: T, second: List<U>) => any
    ): List<any> {
        return this.select((x, y) =>
            result(x, list.where(z => key1(x) === key2(z)))
        )
    }

    /*
    * Returns sub array of array
    */
    getRange(index: number, count: number): List<T> {
        const result: Array<T> = new Array<T>();
        for (let i = 0; i < count; i++) {
            result.push(this._array[index + i]);
        }
        return new List<T>(result);
    }

    /**
     * Returns the index of the first occurence of an element in the List.
     */
    indexOf(element: T) {
        return this._array.indexOf(element);
    }

    /**
     * Inserts an element into the List<T> at the specified index.
     */
    insert(index: number, element: T): void | Error {
        if (index < 0 || index > this._array.length) {
            throw new Error('Index is out of range.');
        }
        this._array.splice(index, 0, element);
    }

    /**
     * Inserts an element into the List<T> at the specified index.
     */
    insertRange(index: number, array: T[]): void | Error {
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
    intersect(source: T[]): List<T> {
        const th = this._array;
        return new List<T>(th.toList().where(x => source.toList().contains(x))._array);
    }

    /**
     * Correlates the elements of two sequences based on matching keys. The default equality comparer is used to compare keys.
     */
    join<U>(list: Array<U>, key1: (key: T) => any, key2: (key: U) => any, result: (first: T, second: U) => any): List<any> {
        return new List<T>(this.selectMany(x =>
            list.toList().where(y => key2(y) === key1(x)).select(z => result(x, z)).toArray()
        ))
    }

    /**
     * Returns the last element of a sequence.
     */
    last(predicate?: (value: T, index: number, list: T[]) => boolean): T {
        let th = this._array;
        if (this.count()) {
            return predicate ? th.toList().where(predicate).last() : th[th.length - 1];
        } else {
            console.log('Last  - ' + 'InvalidOperationException: The source sequence is empty.');
            throw Error('InvalidOperationException: The source sequence is empty.');
        }
    }

    /**
     * Returns the last element of a sequence, or a default value if the sequence contains no elements.
     */
    lastOrDefault(predicate?: (value: T, index: number, list: T[]) => boolean): T {
        return this.count(predicate) ? this.last(predicate) : undefined;
    }

    /**
     * Returns the maximum value in a generic sequence.
     */
    max(selector?: (value: T, index: number, array: T[]) => number): number {
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
    maxBy(keySelector: (key: T) => any): T {
        return this.orderByDescending(keySelector).firstOrDefault();
    }

    /**
     * Returns the minimum value in a generic sequence.
     */
    min(selector?: (value: T, index: number, array: T[]) => number): number {
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
    minBy(keySelector: (key: T) => any): T {
        return this.orderBy(keySelector).firstOrDefault();
    }

    /**
    * Filters the elements of a sequence based on a specified type.
    */
    ofType<T>(type: any): List<T> {
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
            ? th.toList().where(x => x instanceof type).cast()
            : th.toList().where(x => typeof x === typeName).cast()
    }

    /**
     * Sorts the elements of a sequence in ascending order according to a key.
     */
    orderBy(keySelector: (key: T) => any, comparer = keyComparer(keySelector, false)): List<T> {
        return new OrderedList<T>(this._array, comparer)
    }

    /**
     * Sorts the elements of a sequence in descending order according to a key.
     */
    orderByDescending(keySelector: (key: T) => any, comparer = keyComparer(keySelector, true)): List<T> {
        return new OrderedList<T>(this._array, comparer)
    }

    /**
     * Performs a subsequent ordering of the elements in a sequence in ascending order according to a key.
     */
    public thenBy(keySelector: (key: T) => any): List<T> {
        return this.orderBy(keySelector)
    }

    /**
     * Performs a subsequent ordering of the elements in a sequence in descending order, according to a key.
     */
    public thenByDescending(keySelector: (key: T) => any): List<T> {
        return this.orderByDescending(keySelector)
    }

    /**
     * Prepends a value to the end of the sequence and returns new sequence.
     */
    prepend(value: T): List<T> {
        const list = new List<T>();
        list._array.push(value)
        this.forEach(item => {
            list._array.push(item)
        })
        return list;
    }

    /**
     * Removes the first occurrence of a specific object from the List<T>.
     */
    remove(element: T): boolean {
        return this.indexOf(element) !== -1
            ? (this.removeAt(this.indexOf(element)), true)
            : false;
    }

    /**
     * Removes all the elements that match the conditions defined by the specified predicate.
     */
    removeAll(predicate?: (value?: T, index?: number, list?: T[]) => boolean): List<T> {
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
    removeAt(index: number): List<T> {
        return new List<T>(this._array.splice(index, 1));
    }

    /*
     * Removes the element at the specified index of the List<T>.
     */
    removeRange(index: number, count: number): List<T> {
        return new List<T>(this._array.splice(index, count));
    }

    /**
     * Reverses the order of the elements in the entire List<T>.
     */
    reverse(): List<T> {
        return new List<T>(this._array.reverse());
    }

    /**
     * Projects each element of a sequence into a new form.
     */
    select<TOut>(selector: (element: T, index: number) => TOut): List<TOut> {
        return new List<TOut>(this._array.map(selector));
    }

    /**
     * Projects each element of a sequence to a List<any> and flattens the resulting sequences into one sequence.
     */
    selectMany<TOut extends any[]>(selector: (element: T, index: number) => TOut): TOut {
        return this.aggregate(
            (ac, v, i) => (
                ac.toList().addRange(
                    this.select(selector)
                        .elementAt(i)
                        .toList()
                        .toArray()
                ),
                ac
            ),
            new Array<TOut>()
        );
    }

    /**
     * Determines whether two sequences are equal by comparing the elements by using the default equality comparer for their type.
     */
    sequenceEqual(list: T[]): boolean {
        return !!this._array.reduce(
            (x: any, y: any, z: any) => (list[z] === y ? x : undefined)
        );
    }

    /**
     * Returns the only element of a sequence, or a default value if the sequence is empty;
     * this method throws an exception if there is more than one element in the sequence.
     */
    single(predicate?: (value: T, index: number, list: T[]) => boolean): T {
        if (this.count(predicate) !== 1) {
            console.log('Single - ' + 'The collection does not contain exactly one element.');
            throw new Error('The collection does not contain exactly one element.');
        } else {
            return this.first(predicate);
        }
    }

    /**
     * Returns the only element of a sequence, and throws an exception if there is not exactly one element in the sequence.
     */
    singleOrDefault(predicate?: (value: T, index: number, list: T[]) => boolean): T {
        return this.count(predicate) ? this.single(predicate) : undefined;
    }

    /**
     * Bypasses a specified number of elements in a sequence and then returns the remaining elements.
     */
    skip(amount: number): List<T> {
        return new List<T>(this._array.slice(Math.max(0, amount)))
    }

    /**
     * Bypasses a specified number of elements at the end of a sequence and then returns the remaining elements.
     */
    skipLast(amount: number): List<T> {
        return new List<T>(this._array.slice(0, Math.max(0, this._array.length - amount)))
    }

    /**
     * Bypasses elements in a sequence as long as a specified condition is true and then returns the remaining elements.
     */
    skipWhile(predicate: (value?: T, index?: number, list?: T[]) => boolean): List<T> {
        return this.skip(
            this.aggregate(
                (ac, val) => (predicate(this.elementAt(ac)) ? ++ac : ac),
                0
            )
        )
    }

    /**
     * Computes the sum of the sequence of number values that are obtained by invoking
     * a transform function on each element of the input sequence.
     */
    sum(transform?: (value?: T, index?: number, list?: T[]) => number): number {
        return transform
            ? this.select(transform).sum()
            : this.aggregate((ac: any, v: any) => (ac += +v), 0);
    }

    /**
     * Returns a specified number of contiguous elements from the start of a sequence.
     */
    take(amount: number): List<T> {
        return new List<T>(this._array.slice(0, Math.max(0, amount)))
    }

    /**
     * Returns a specified number of contiguous elements from the end of a sequence.
     */
    takeLast(amount: number): List<T> {
        return new List<T>(this._array.slice(this._array.length - amount, this._array.length))
    }

    /**
     * Returns elements from a sequence as long as a specified condition is true.
     */
    takeWhile(predicate: (value: T, index?: number, list?: T[]) => boolean): List<T> {
        return this.take(
            this.aggregate(
                (ac: any) => (predicate(this.elementAt(ac)) ? ++ac : ac),
                0
            )
        );
    }

    /**
     * Copies the elements of the List<T> to a new array.
     */
    toArray() {
        return this._array;
    }

    /**
     * Creates a Dictionary<TKey, TValue> from a List<T> according to a specified key selector function.
     */
    toDictionary<TKey, TValue>(key: (key: T) => TKey, value?: (value: T) => TValue): List<{ Key: TKey; Value: T }>
    toDictionary<TKey, TValue>(key: (key: T) => TKey, value?: (value: T) => TValue): List<{ Key: TKey; Value: T }> | List<{ Key: TKey; Value: T | TValue }> {
        return this.aggregate((dicc, v, i) => {
            dicc[
                this.select(key)
                    .elementAt(i)
                    .toString()
            ] = value ? this.select(value).elementAt(i) : v
            dicc.add({
                Key: this.select(key).elementAt(i),
                Value: value ? this.select(value).elementAt(i) : v
            })
            return dicc
        }, new List<{ Key: TKey; Value: T | TValue }>())
    }

    /**
     * Creates a Lookup<TKey, TElement> from an IEnumerable<T> according to specified key selector and element selector functions.
     */
    toLookup(keySelector: (key: T) => any, elementSelector: (element: T) => any): any {
        return this.groupBy(keySelector, elementSelector);
    }

    /**
     * Produces the set union of two sequences by using the default equality comparer.
     */
    union(list: T[]): List<T> {
        return this.concat(list).distinct();
    }

    /**
     * Filters a sequence of values based on a predicate.
     */
    where(predicate: (value: T, index: number, list: T[]) => boolean): List<T> {
        return new List<T>(this._array.filter(predicate));
    }

    /**
     * Applies a specified function to the corresponding elements of two sequences, producing a sequence of the results.
     */
    zip<U, TOut>(list: U[], result: (first: T, second: U) => TOut): List<TOut> {
        return list.toList().count() < this.count()
            ? list.toList().select((x: any, y: any) => result(this.elementAt(y), x))
            : this.select((x: any, y: any) => result(x, list.toList().elementAt(y)));
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
    public thenBy(keySelector: (key: T) => any): List<T> {
      return new OrderedList(
        this._array,
        composeComparers(this._comparer, keyComparer(keySelector, false))
      )
    }
  
    /**
     * Performs a subsequent ordering of the elements in a sequence in descending order, according to a key.
     * @override
     */
    public thenByDescending(keySelector: (key: T) => any): List<T> {
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
            result.add(start++)
        }
        return result
    }

    /**
     * Generates a sequence that contains one repeated value.
     */
    public static Repeat<T>(element: T, count: number): List<T> {
        let result = new List<T>()
        while (count--) {
            result.add(element)
        }
        return result
    }
}