/*
This library is fork from   https://github.com/kutyel/linq.ts
https://www.npmjs.com/package/linqts
*/
'use strict';

const TimSort = require('timsort');

interface Array<T> {
    Add(element: T): void;
    AddRange(elements: T[]): void;
    Aggregate<U>(accumulator: (accum: U, value?: T, index?: number, list?: T[]) => any, initialValue?: U): any;
    All(predicate: (value: T, index: number, list: T[]) => boolean): boolean;
    Any(predicate?: (value: T, index: number, list: T[]) => boolean): boolean;
    Average(transform?: (value: T, index: number, list: T[]) => any): number;
    Cast<T>(): List<T>;
    Concat(list: T[]): List<T>;
    Contains(element: T): boolean;
    Count(predicate?: (value: T, index: number, list: T[]) => boolean): number;
    DefaultIfEmpty(defaultValue?: T): List<T>;
    Distinct(): List<T>;
    DistinctBy(keySelector: (key: T) => any): List<T>;
    ElementAt(index: number): T;
    ElementAtOrDefault(index: number): T;
    Except(source: T[]): List<T>;
    First(predicate?: (value: T, index: number, list: T[]) => boolean): T;
    FirstOrDefault(predicate?: (value: T, index: number, list: T[]) => boolean): T;
    ForEach(action: (value: T, index: number, list: T[]) => any): void;
    GroupBy<TResult = T>(grouper: (key: T) => any, mapper: (element: T) => TResult): { [key: string]: TResult[] };
    GroupJoin<T>(list: T[], key1: (k: T) => any, key2: (k: T) => any, result: (first: T, second: T[]) => any): List<any>;
    GetRange(index: number, count: number): List<T>;
    IndexOf(element: T): number;
    Insert(index: number, element: T): void | Error;
    Intersect(source: T[]): List<T>;
    Join<U>(list: Array<U>, key1: (key: T) => any, key2: (key: U) => any, result: (first: T, second: U) => any): List<any>;
    Last(predicate?: (value: T, index: number, list: T[]) => boolean): T;
    LastOrDefault(predicate?: (value: T, index: number, list: T[]) => boolean): T;
    Max(selector?: (value: T, index: number, array: T[]) => number): number;
    MaxBy(keySelector: (key: T) => any): T;
    Min(selector?: (value: T, index: number, array: T[]) => number): number;
    MinBy(keySelector: (key: T) => any): T;
    OfType<T>(type: any): List<T>;
    OrderBy(keySelector: (key: T) => any, keyComparer?: Function): List<T>;
    OrderByDescending(keySelector: (key: T) => any): List<T>;
    OrderByMany(propertyExpressions: [(item: T) => any]): List<T>;
    OrderByManyDescending(propertyExpressions: [(item1: T) => any, (item2: T) => any]): List<T>;
    ThenBy(keySelector: (key: T) => any): List<T>;
    ThenByDescending(keySelector: (key: T) => any): List<T>;
    Remove(element: T): boolean;
    RemoveAll(predicate?: (value: T, index: number, list: T[]) => boolean): List<T>;
    RemoveAt(index: number): void;
    RemoveRange(index: number, count: number): void;
    Reverse(): List<T>;
    Select<TOut>(selector: (element: T, index: number) => TOut): TOut[];
    SelectMany<TOut extends any[]>(selector: (element: T, index: number) => TOut): TOut;
    SequenceEqual(list: T[]): boolean;
    Single(predicate?: (value: T, index: number, list: T[]) => boolean): T;
    SingleOrDefault(predicate?: (value: T, index: number, list: T[]) => boolean): T;
    Skip(amount: number): List<T>;
    SkipWhile(predicate: (value?: T, index?: number, list?: T[]) => boolean): List<T>;
    Sum(transform?: (value: T, index: number, list: T[]) => number): number;
    Take(amount: number): List<T>;
    TakeWhile(predicate: (value: T, index?: number, list?: T[]) => boolean): List<T>;
    ToArray(): T[];
    ToDictionary<TKey, TValue>(key: (key: T) => TKey, value?: (value: T) => TValue): { Key: TKey; Value: T | TValue }[];
    ToList(): List<T>;
    ToLookup(keySelector: (key: T) => any, elementSelector: (element: T) => any): any;
    Union(list: T[]): List<T>;
    Where(predicate: (value: T, index: number, list: T[]) => boolean): List<T>;
    Zip<U, TOut>(list: U[], result: (first: T, second: U) => TOut): TOut[];
}

(function () {


    /*
        Adds an object to the end of the List<T>.
    */
    Array.prototype.Add = function <T>(e: T): void {
        this instanceof List ? (this.array.push(e)) : (this.push(e));
    };

    /**
     * Adds the elements of the specified collection to the end of the List<T>.
     */
    Array.prototype.AddRange = function <T>(e: T[]): void {
        for (let i = 0; i < e.length; i++) {
            this instanceof List ? (this.array.push(e)) : (this.push(e[i]));
        }
    };

    /**
     * Applies an accumulator function over a sequence.
     */
    Array.prototype.Aggregate = function <U, T>(
        accumulator: (accum: U, value?: T, index?: number, list?: T[]) => any,
        initialValue?: U
    ): any {
        return getArray(this).reduce(accumulator, initialValue);
    };

    /**
     * Determines whether all elements of a sequence satisfy a condition.
     */
    Array.prototype.All = function <T>(
        predicate: (value: T, index: number, list: T[]) => boolean
    ): boolean {
        return getArray(this).every(predicate);
    };

    /**
     * Determines whether a sequence contains any elements.
     */
    Array.prototype.Any = function <T>(
        predicate?: (value: T, index: number, list: T[]) => boolean
    ): boolean {
        return predicate ? getArray(this).some(predicate) : getArray(this).length > 0;
    };

    /**
     * Computes the average of a sequence of number values that are obtained by invoking
     * a transform function on each element of the input sequence.
     */
    Array.prototype.Average = function <T>(
        transform?: (value: T, index: number, list: T[]) => any
    ): number {
        return getArray(this).Sum(transform) / getArray(this).Count(transform);
    };

    /**
     * Casts the elements of a sequence to the specified type.
     */
    Array.prototype.Cast = function <T>(): List<T> {
        return new List<T>(getArray(this) as any)
    };

    /**
     * Concatenates two sequences.
     */
    Array.prototype.Concat = function <T>(list: T[]): List<T> {
        return new List<T>(getArray(this).concat(list));
    };
    /**
     * Determines whether an element is in the List<T>.
     */
    Array.prototype.Contains = function <T>(element: T): boolean {
        return getArray(this).some(x => x === element);
    };

    /**
     * Returns the number of elements in a sequence.
     */
    Array.prototype.Count = function <T>(
        predicate?: (value: T, index: number, list: T[]) => boolean
    ): number {
        let th = getArray(this)
        return predicate ? th.Where(predicate).Count() : th.length;
    };

    /**
     * Returns the elements of the specified sequence or the type parameter's default value
     * in a singleton collection if the sequence is empty.
     */
    Array.prototype.DefaultIfEmpty = function <T>(defaultValue?: T): List<T> {
        let th = getArray(this)
        return th.Count() ? new List(th) : new List([defaultValue]);
    };

    /**
     * Returns distinct elements from a sequence by using the default equality comparer to compare values.
     */
    Array.prototype.Distinct = function <T>(): List<T> {
        return getArray(this).Where(
            (value, index, iter) =>
                (isObj(value)
                    ? findIndex(obj => equal(obj, value))(iter)
                    : iter.indexOf(value)) === index
        );
    };

    /**
     * Returns distinct elements from a sequence according to specified key selector.
     */
    Array.prototype.DistinctBy = function <T>(keySelector: (key: T) => any): List<T> {
        const groups = getArray(this).GroupBy(keySelector, (obj: any) => obj);
        const results = new List<T>([]);
        for (const index in groups) {
            if (groups.hasOwnProperty(index)) {
                results.array.Add(groups[index][0]);
            }
        }
        return results;
    };

    /**
     * Returns the element at a specified index in a sequence.
     */
    Array.prototype.ElementAt = function <T>(index: number): T {
        let th = getArray(this)
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

    /**
     * Returns the element at a specified index in a sequence or a default value if the index is out of range.
     */
    Array.prototype.ElementAtOrDefault = function <T>(index: number): T {
        return getArray(this).ElementAt(index) || undefined;
    };

    /**
     * Produces the set difference of two sequences by using the default equality comparer to compare values.
     */
    Array.prototype.Except = function <T>(source: T[]): List<T> {
        return getArray(this).Where((x: any) => !source.Contains(x));
    };

    /**
     * Returns the first element of a sequence.
     */

    // Array.prototype.First(predicate: (value?: T, index?: number, list?: T[]) => boolean): T
    Array.prototype.First = function <T>(
        predicate?: (value: T, index: number, list: T[]) => boolean
    ): T {
        let th = getArray(this)
        if (th.Count()) {
            return predicate ? th.Where(predicate).array[0] : th[0];
        } else {
            throw new Error(
                'InvalidOperationException: The source sequence is empty.'
            );
        }
    };

    /**
     * Returns the first element of a sequence, or a default value if the sequence contains no elements.
     */
    Array.prototype.FirstOrDefault = function <T>(
        predicate?: (value: T, index: number, list: T[]) => boolean
    ): T {
        let th = getArray(this)
        return th.Count(predicate) ? th.First(predicate) : undefined;
    };

    /**
     * Performs the specified action on each element of the List<T>.
     */
    Array.prototype.ForEach = function <T>(action: (value: T, index: number, list: T[]) => any): void {
        return getArray(this).forEach(action);
    };

    /**
     * Groups the elements of a sequence according to a specified key selector function.
     */
    Array.prototype.GroupBy = function <T, TResult = T>(grouper: (key: T) => string | number,
        mapper?: (element: T) => TResult): { [key: string]: TResult[] } {
        const initialValue: { [key: string]: TResult[] } = {}
        if (!mapper) {
            mapper = val => <TResult>(<any>val)
        }
        return getArray(this).Aggregate((ac, v) => {
            const key = grouper(v)
            const existingGroup = ac[key]
            const mappedValue = mapper(v)
            if (existingGroup) {
                existingGroup.push(mappedValue)
            } else {
                ac[key] = [mappedValue]
            }
            return ac
        }, initialValue)
    };

    /**
     * Correlates the elements of two sequences based on equality of keys and groups the results.
     * The default equality comparer is used to compare keys.
     */
    Array.prototype.GroupJoin = function <U, T>(
        list: List<U>,
        key1: (k: T) => any,
        key2: (k: U) => any,
        result: (first: T, second: List<U>) => any
    ): List<any> {
        return getArray(this).Select((x, y) =>
            result(x, list.Where(z => key1(x) === key2(z)))
        )
    };
    /*
    Returns sub range
    */

    Array.prototype.GetRange = function <T>(index: number, count: number): List<T> {
        // tslint:disable-next-line:prefer-const
        let result: Array<T> = new Array<T>();
        for (let i = 0; i < count; i++) {
            result.push(getArray(this)[index + i]);
        }
        return new List<T>(result);
    };

    /**
     * Returns the index of the first occurence of an element in the List.
     */
    Array.prototype.IndexOf = function <T>(element: T): number {
        return getArray(this).indexOf(element);
    };

    /**
     * Inserts an element into the List<T> at the specified index.
     */
    Array.prototype.Insert = function <T>(index: number, element: T): void | Error {
        let th = getArray(this)
        if (index < 0 || index > th.length) {
            throw new Error('Index is out of range.');
        }

        th.splice(index, 0, element);
    };

    /**
     * Produces the set intersection of two sequences by using the default equality comparer to compare values.
     */
    Array.prototype.Intersect = function <T>(source: List<T>): List<T> {
        return new List<T>(getArray(this).Where((x: any) => source.Contains(x)));
    };

    /**
     * Correlates the elements of two sequences based on matching keys. The default equality comparer is used to compare keys.
     */
    Array.prototype.Join = function <T, U>(
        list: U[],
        key1: (key: T) => any,
        key2: (key: U) => any,
        result: (first: T, second: U) => any
    ): List<any> {
        return new List<T>(getArray(this).SelectMany(x =>
            list.Where(y => key2(y) === key1(x)).Select(z => result(x, z))
        ))
    };

    /**
     * Returns the last element of a sequence.
     */
    Array.prototype.Last = function <T>(
        predicate?: (value: T, index: number, list: T[]) => boolean
    ): T {
        let th = getArray(this)
        if (this.Count()) {
            return predicate ? th.Where(predicate).Last() : th[th.Count() - 1];
        } else {
            console.log('Last  - ' + 'InvalidOperationException: The source sequence is empty.');
            throw Error('InvalidOperationException: The source sequence is empty.');
        }
    };

    /**
     * Returns the last element of a sequence, or a default value if the sequence contains no elements.
     */
    Array.prototype.LastOrDefault = function <T>(
        predicate?: (value: T, index: number, list: T[]) => boolean
    ): T {
        let th = getArray(this)
        return th.Count(predicate) ? th.Last(predicate) : undefined;
    };

    /**
     * Returns the maximum value in a generic sequence.
     */
    Array.prototype.Max = function <T>(selector?: (value: T, index: number, array: T[]) => number): number {
        const id = x => x
        let th = getArray(this)
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
    };

    /**
     * Returns the element with maximum value in a generic sequence.
     */
    Array.prototype.MaxBy = function <T>(keySelector: (item: T) => any): T {
        return getArray(this).OrderByDescending(keySelector).FirstOrDefault();
    };

    /**
     * Returns the minimum value in a generic sequence.
     */
    Array.prototype.Min = function <T>(selector?: (value: T, index: number, array: T[]) => number): number {
        const id = x => x
        let th = getArray(this)
        let min = selector ? selector(this[0], 0, this) : id(this[0])
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
    };

    /**
     * Returns the element with minimum value in a generic sequence.
     */
    Array.prototype.MinBy = function <T>(keySelector: (item: T) => any): T {
        return getArray(this).OrderBy(keySelector).ToArray().FirstOrDefault();
    };

    /**
    * Filters the elements of a sequence based on a specified type.
    */
    Array.prototype.OfType = function <T>(type: any): List<T> {
        let typeName: string;
        let th = getArray(this)
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
                typeName = typeof function () { } // tslint:disable-line no-empty
                break
            default:
                typeName = null
                break
        }
        return typeName === null
            ? th.Where(x => x instanceof type).Cast()
            : th.Where(x => typeof x === typeName).Cast()

    }

    /**
     * Sorts the elements of a sequence in ascending order according to a key.
     */
    Array.prototype.OrderBy = function <T>(keySelector: (key: T) => any,
        comparer = keyComparer(keySelector, false)): List<T> {
        return new List<T>(getArray(this), comparer)
    };

    /**
     * Sorts the elements of a sequence in descending order according to a key.
     */
    Array.prototype.OrderByDescending = function <T>(keySelector: (key: T) => any,
        comparer = keyComparer(keySelector, true)): List<T> {
        return new List<T>(getArray(this), comparer)
    };
    /**
     * Sorts the elements of a sequence in descending order according to a several key.
     */
    Array.prototype.OrderByMany = function <T>(keySelectors: [(item: T) => any]): List<T> {
        const compareFunction = (item1: any, item2: any): number => {
            for (let i = 0; i < keySelectors.length; i++) {
                const keySelector = keySelectors[i];
                if (keySelector(item1) > keySelector(item2)) { return 1; }
                if (keySelector(item1) == keySelector(item2)) { return 0; }
                if (keySelector(item1) < keySelector(item2)) { return -1; }
            }
        };
        return (<List<T>>getArray(this)).sort(compareFunction);
    };
    /**
     * Sorts the elements of a sequence in descending order according to a key.
     */
    Array.prototype.OrderByManyDescending = function <T>(propertyExpressions: [(item1: T) => any, (item2: T) => any]): List<T> {
        const compareFunction = (item1: any, item2: any): number => {
            for (let i = 0; i < propertyExpressions.length; i++) {
                const propertyExpression = propertyExpressions[i];
                if (propertyExpression(item1) > propertyExpression(item2)) { return -1; }
                if (propertyExpression(item1) == propertyExpression(item2)) { return 0; }
                if (propertyExpression(item1) < propertyExpression(item2)) { return 1; }
            }
        };
        return (<List<T>>getArray(this)).sort(compareFunction);
    };
    /**
     * Performs a subsequent ordering of the elements in a sequence in ascending order according to a key.
     */
    Array.prototype.ThenBy = function <T>(keySelector: (key: T) => any): List<T> {
        return getArray(this).OrderBy(keySelector)
    };

    /**
     * Performs a subsequent ordering of the elements in a sequence in descending order, according to a key.
     */
    Array.prototype.ThenByDescending = function <T>(keySelector: (key: T) => any): List<T> {
        return getArray(this).OrderByDescending(keySelector);
    };

    /**
     * Removes the first occurrence of a specific object from the List<T>.
     */
    Array.prototype.Remove = function <T>(element: T): boolean {
        let th = getArray(this)
        return th.IndexOf(element) !== -1
            ? (th.RemoveAt(th.IndexOf(element)), true)
            : false;
    };

    /**
     * Removes all the elements that match the conditions defined by the specified predicate.
     */
    Array.prototype.RemoveAll = function <T>(
        predicate: (value?: T, index?: number, list?: T[]) => boolean
    ): List<T> {
        return getArray(this).Where(negate(predicate))
    };

    /**
     * Removes the element at the specified index of the List<T>.
     */
    Array.prototype.RemoveAt = function <T>(index: number): List<T> {
        return new List<T>(getArray(this).splice(index, 1));
    };

    /*
     * Removes the element at the specified index of the List<T>.
     */
    Array.prototype.RemoveRange = function <T>(index: number, count: number): List<T> {
        return new List<T>(getArray(this).splice(index, count));
    };

    /**
     * Reverses the order of the elements in the entire List<T>.
     */
    Array.prototype.Reverse = function <T>(): List<T> {
        return new List<T>(getArray(this).reverse());
    };

    /**
     * Projects each element of a sequence into a new form.
     */
    Array.prototype.Select = function <TOut, T>(
        selector: (element: T, index: number) => TOut
    ): TOut[] {
        return getArray(this).map(selector);
    };

    /**
     * Projects each element of a sequence to a List<any> and flattens the resulting sequences into one sequence.
     */
    Array.prototype.SelectMany = function <T, TOut extends any[]>(
        selector: (element: T, index: number) => TOut
    ): TOut {
        let th = getArray(this)
        return th.Aggregate(
            (ac, v, i) => (
                ac.AddRange(
                    th.Select(selector)
                        .ElementAt(i)
                        .ToArray()
                ),
                ac
            ),
            new Array<TOut>()
        )
    };

    /**
     * Determines whether two sequences are equal by comparing the elements by using the default equality comparer for their type.
     */
    Array.prototype.SequenceEqual = function <T>(list: T[]): boolean {
        return !!getArray(this).reduce(
            (x: any, y: any, z: any) => (list[z] === y ? x : undefined)
        );
    };

    /**
     * Returns the only element of a sequence, and throws an exception if there is not exactly one element in the sequence.
     */
    Array.prototype.Single = function <T>(
        predicate?: (value: T, index: number, list: T[]) => boolean
    ): T {
        let th = getArray(this)
        if (th.Count(predicate) !== 1) {
            console.log('Single - ' + 'The collection does not contain exactly one element.');
            throw new Error('The collection does not contain exactly one element.');
        } else {
            return th.First(predicate);
        }
    };

    /**
     * Returns the only element of a sequence, or a default value if the sequence is empty;
     * this method throws an exception if there is more than one element in the sequence.
     */
    Array.prototype.SingleOrDefault = function <T>(
        predicate?: (value: T, index: number, list: T[]) => boolean
    ): T {
        let th = getArray(this)
        return th.Count(predicate) ? th.Single(predicate) : undefined;
    };

    /**
     * Bypasses a specified number of elements in a sequence and then returns the remaining elements.
     */
    Array.prototype.Skip = function <T>(amount: number): List<T> {
        return new List<T>(getArray(this).slice(Math.max(0, amount)))
    };

    /**
     * Bypasses elements in a sequence as long as a specified condition is true and then returns the remaining elements.
     */
    Array.prototype.SkipWhile = function <T>(
        predicate: (value?: T, index?: number, list?: T[]) => boolean
    ): List<T> {
        let th = getArray(this)
        return th.Skip(
            th.Aggregate(
                (ac, val) => (predicate(th.ElementAt(ac)) ? ++ac : ac),
                0
            )
        )
    };

    /**
     * Computes the sum of the sequence of number values that are obtained by invoking
     * a transform function on each element of the input sequence.
     */
    Array.prototype.Sum = function <T>(
        transform?: (value: T, index: number, list: T[]) => number
    ): number {
        let th = getArray(this)
        return transform
            ? th.Select(transform).Sum()
            : th.Aggregate((ac: any, v: any) => (ac += +v), 0);
    };

    /**
     * Returns a specified number of contiguous elements from the start of a sequence.
     */
    Array.prototype.Take = function <T>(amount: number): List<T> {
        return new List<T>(getArray(this).slice(0, Math.max(0, amount)))
    };

    /**
     * Returns elements from a sequence as long as a specified condition is true.
     */
    Array.prototype.TakeWhile = function <T>(
        predicate: (value: T, index?: number, list?: T[]) => boolean
    ): List<T> {
        let th = getArray(this)
        return th.Take(
            th.Aggregate(
                (ac: any) => (predicate(th.ElementAt(ac)) ? ++ac : ac),
                0
            )
        );
    };

    /**
     * Copies the elements of the List<T> to a new array.
     */
    Array.prototype.ToArray = function <T>(): T[] {
        return getArray(this);
    };

    /**
     * Creates a Dictionary<TKey, TValue> from a List<T> according to a specified key selector function.
     */
    Array.prototype.ToDictionary = function <TKey, TValue, T>(
        key: (key: T) => TKey,
        value?: (value: T) => TValue
    ): Array<{ Key: TKey; Value: T }> | Array<{ Key: TKey; Value: T | TValue }> | Array<{ Key: TKey; Value: T | TValue }> {
        let th = getArray(this)
        return th.Aggregate((dicc, v, i) => {
            dicc[
                th.Select(key)
                    .ElementAt(i)
                    .toString()
            ] = value ? th.Select(value).ElementAt(i) : v
            dicc.Add({
                Key: th.Select(key).ElementAt(i),
                Value: value ? th.Select(value).ElementAt(i) : v
            })
            return dicc
        }, new Array<{ Key: TKey; Value: T | TValue }>())
    }

    /**
     * Creates a List<T> from an Enumerable.List<T>.
     */
    Array.prototype.ToList = function <T>(): List<T> {
        return new List<T>(this);
    };

    /**
     * Creates a Lookup<TKey, TElement> from an IEnumerable<T> according to specified key selector and element selector functions.
     */
    Array.prototype.ToLookup = function <T>(
        keySelector: (key: T) => any,
        elementSelector: (element: T) => any
    ): any {
        return getArray(this).GroupBy(keySelector, elementSelector);
    };

    /**
     * Produces the set union of two sequences by using the default equality comparer.
     */
    Array.prototype.Union = function <T>(list: T[]): List<T> {
        return getArray(this).Concat(list).Distinct();
    };

    /**
     * Filters a sequence of values based on a predicate.
     */
    Array.prototype.Where = function <T>(
        predicate: (value: T, index: number, list: T[]) => boolean
    ): List<T> {
        // const t = getArray(this);
        // const g: T[] = [];
        // for (let i = 0; i++; i < t.length) {
        //     if (predicate(t[i], i, t) === true) {
        //         g.push(t[i])
        //     }
        // }
        // return new List<T>(g)
        return new List<T>(getArray(this).filter(predicate));
    };

    /**
     * Applies a specified function to the corresponding elements of two sequences, producing a sequence of the results.
     */
    Array.prototype.Zip = function <T, U, TOut>(
        list: U[],
        result: (first: T, second: U) => TOut
    ): TOut[] {
        let th = getArray(this)
        return list.Count() < this.Count()
            ? list.Select((x: any, y: any) => result(th.ElementAt(y), x))
            : th.Select((x: any, y: any) => result(x, list.ElementAt(y)));
    };

    /**
     * Creates a function that negates the result of the predicate
     */
})();



/**
 * Creates a function that negates the result of the predicate
 */
const negate = <T>(
    predicate: (value?: T, index?: number, list?: T[]) => boolean
): any => (...args) => !predicate(...args)


/**
 * Checks if the argument passed is an object
 */
const isObj = <T>(x: T): boolean => typeof x === 'object'


/**
 * Returns the index of the first item matching the predicate
 */
const findIndex = f => xs => xs.reduceRight((x, y, i) => (f(y) ? i : x))


const getArray = (
    obj
)  => {
    return (obj instanceof List ? (obj.array) : (obj))
}

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


class List<T> extends Array<T> {
    public array: T[] = [];
    constructor(elements?: T[], private _comparer?: (a: T, b: T) => number) {
        super()
        this.array = elements;
        if (this._comparer) {
            TimSort.sort(this.array, this._comparer)
        }
    }

    /**
     * Performs a subsequent ordering of the elements in a sequence in ascending order according to a key.
     * @override
     */
    public ThenBy(keySelector: (key: T) => any): List<T> {
        return new List<T>(
            getArray(this),
            composeComparers(this._comparer, keyComparer(keySelector, false))
        )
    }

    /**
     * Performs a subsequent ordering of the elements in a sequence in descending order, according to a key.
     * @override
     */
    public ThenByDescending(keySelector: (key: T) => any): List<T> {
        return new List<T>(
            getArray(this),
            composeComparers(this._comparer, keyComparer(keySelector, true))
        )
    }
}