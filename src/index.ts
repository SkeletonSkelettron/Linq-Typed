/*
This library is fork from   https://github.com/kutyel/linq.ts
https://www.npmjs.com/package/linqts
*/
'use strict';

const TimSort = require('timsort');

interface Array<T> {
    /*
        Adds an object to the end of the List<T> or Array<T>.
    */
    Add(element: T): void;

    /**
     * Adds the elements of the specified collection to the end of the List<T>.
     */
    AddRange(elements: T[]): void;

    /**
     * Applies an accumulator function over a sequence.
     */
    Aggregate<U>(accumulator: (accum: U, value?: T, index?: number, list?: T[]) => any, initialValue?: U): any;

    /**
     * Determines whether all elements of a sequence satisfy a condition.
     */
    All(predicate: (value: T, index: number, list: T[]) => boolean): boolean;

    /**
     * Determines whether a sequence contains any elements.
     */
    Any(predicate?: (value: T, index: number, list: T[]) => boolean): boolean;

    /**
     * Appends a value to the end of the sequence and returns new sequence.
     */
    Append(value: T): List<T>;

    /**
     * Computes the average of a sequence of number values that are obtained by invoking
     * a transform function on each element of the input sequence.
     */
    Average(transform?: (value: T, index: number, list: T[]) => any): number;

    /**
     * Casts the elements of a sequence to the specified type.
     */
    Cast<T>(): List<T>;

    /**
     * Concatenates two sequences.
     */
    Concat(list: T[]): List<T>;

    /**
     * Determines whether an element is in the List<T>.
     */
    Contains(element: T): boolean;

    /**
     * Returns the number of elements in a sequence.
     */
    Count(predicate?: (value: T, index: number, list: T[]) => boolean): number;

    /**
     * Returns the elements of the specified sequence or the type parameter's default value
     * in a singleton collection if the sequence is empty.
     */
    DefaultIfEmpty(defaultValue?: T): List<T>;

    /**
     * Returns distinct elements from a sequence by using the default equality comparer to compare values.
     */
    Distinct(): List<T>;

    /**
     * Returns distinct elements from a sequence according to specified key selector.
     */
    DistinctBy(keySelector: (key: T) => any): List<T>;

    /**
     * Returns the element at a specified index in a sequence.
     */
    ElementAt(index: number): T;

    /**
     * Returns the element at a specified index in a sequence or a default value if the index is out of range.
     */
    ElementAtOrDefault(index: number): T;

    /**
     * Produces the set difference of two sequences by using the default equality comparer to compare values.
     */
    Except(source: T[]): List<T>;

    /**
     * Filters a sequence of values based on a predicate and returns new sequence
     */
    FindAll(predicate?: (value: T, index: number, list: T[]) => boolean): T[];

    /**
     * Returns the first element of a sequence.
     */
    First(predicate?: (value: T, index: number, list: T[]) => boolean): T;

    /**
     * Returns the first element of a sequence, or a default value if the sequence contains no elements.
     */
    FirstOrDefault(predicate?: (value: T, index: number, list: T[]) => boolean): T;

    /**
     * Performs the specified action on each element of the Array<T>.
     */
    ForEach(action: (value: T, index: number, list: T[]) => any): void;

    /**
     * Groups the elements of a sequence according to a specified key selector function.
     */
    GroupBy<TResult = T>(grouper: (key: T) => any, mapper: (element: T) => TResult): { [key: string]: TResult[] };

    /**
     * Correlates the elements of two sequences based on equality of keys and groups the results.
     * The default equality comparer is used to compare keys.
     */
    GroupJoin<T>(list: T[], key1: (k: T) => any, key2: (k: T) => any, result: (first: T, second: T[]) => any): List<any>;

    /*
    * Returns sub array of array
    */
    GetRange(index: number, count: number): List<T>;

    /**
     * Returns the index of the first occurence of an element in the List.
     */
    IndexOf(element: T): number;

    /**
     * Inserts an element into the List<T> at the specified index.
     */
    Insert(index: number, element: T): void | Error;

    /**
     * Inserts an element into the List<T> at the specified index.
     */
    InsertRange(index: number, array: T[]): void | Error;

    /**
     * Produces the set intersection of two sequences by using the default equality comparer to compare values.
     */
    Intersect(source: T[]): List<T>;

    /**
     * Correlates the elements of two sequences based on matching keys. The default equality comparer is used to compare keys.
     */
    Join<U>(list: Array<U>, key1: (key: T) => any, key2: (key: U) => any, result: (first: T, second: U) => any): List<any>;

    /**
     * Returns the last element of a sequence.
     */
    Last(predicate?: (value: T, index: number, list: T[]) => boolean): T;

    /**
     * Returns the last element of a sequence, or a default value if the sequence contains no elements.
     */
    LastOrDefault(predicate?: (value: T, index: number, list: T[]) => boolean): T;

    /**
     * Returns the maximum value in a generic sequence.
     */
    Max(selector?: (value: T, index: number, array: T[]) => number): number;

    /**
     * Returns the element with maximum value in a generic sequence.
     */
    MaxBy(keySelector: (key: T) => any): T;

    /**
     * Returns the minimum value in a generic sequence.
     */
    Min(selector?: (value: T, index: number, array: T[]) => number): number;

    /**
     * Returns the element with minimum value in a generic sequence.
     */
    MinBy(keySelector: (key: T) => any): T;

    /**
    * Filters the elements of a sequence based on a specified type.
    */
    OfType<T>(type: any): List<T>;

    /**
     * Sorts the elements of a sequence in ascending order according to a key.
     */
    OrderBy(keySelector: (key: T) => any, keyComparer?: Function): List<T>;

    /**
     * Sorts the elements of a sequence in descending order according to a key.
     */
    OrderByDescending(keySelector: (key: T) => any): List<T>;

    /**
     * Prepends a value to the end of the sequence and returns new sequence.
     */
    Prepend(value: T): List<T>;

    /**
     * Performs a subsequent ordering of the elements in a sequence in ascending order according to a key.
     */
    ThenBy(keySelector: (key: T) => any): List<T>;

    /**
     * Performs a subsequent ordering of the elements in a sequence in descending order, according to a key.
     */
    ThenByDescending(keySelector: (key: T) => any): List<T>;

    /**
     * Removes the first occurrence of a specific object from the List<T>.
     */
    Remove(element: T): boolean;

    /**
     * Removes all the elements that match the conditions defined by the specified predicate.
     */
    RemoveAll(predicate?: (value: T, index: number, list: T[]) => boolean): List<T>;

    /**
     * Removes the element at the specified index of the List<T>.
     */
    RemoveAt(index: number): void;

    /*
     * Removes the element at the specified index of the List<T>.
     */
    RemoveRange(index: number, count: number): void;

    /**
     * Reverses the order of the elements in the entire List<T>.
     */
    Reverse(): List<T>;

    /**
     * Projects each element of a sequence into a new form.
     */
    Select<TOut>(selector: (element: T, index: number) => TOut): List<TOut>;

    /**
     * Projects each element of a sequence to a List<any> and flattens the resulting sequences into one sequence.
     */
    SelectMany<TOut extends any[]>(selector: (element: T, index: number) => TOut): TOut;

    /**
     * Determines whether two sequences are equal by comparing the elements by using the default equality comparer for their type.
     */
    SequenceEqual(list: T[]): boolean;

    /**
     * Returns the only element of a sequence, or a default value if the sequence is empty;
     * this method throws an exception if there is more than one element in the sequence.
     */
    Single(predicate?: (value: T, index: number, list: T[]) => boolean): T;

    /**
     * Returns the only element of a sequence, and throws an exception if there is not exactly one element in the sequence.
     */
    SingleOrDefault(predicate?: (value: T, index: number, list: T[]) => boolean): T;

    /**
     * Bypasses a specified number of elements in a sequence and then returns the remaining elements.
     */
    Skip(amount: number): List<T>;

    /**
     * Bypasses a specified number of elements at the end of a sequence and then returns the remaining elements.
     */
    SkipLast(amount: number): List<T>;

    /**
     * Bypasses elements in a sequence as long as a specified condition is true and then returns the remaining elements.
     */
    SkipWhile(predicate: (value?: T, index?: number, list?: T[]) => boolean): List<T>;

    /**
     * Computes the sum of the sequence of number values that are obtained by invoking
     * a transform function on each element of the input sequence.
     */
    Sum(transform?: (value: T, index: number, list: T[]) => number): number;

    /**
     * Returns a specified number of contiguous elements from the start of a sequence.
     */
    Take(amount: number): List<T>;

    /**
     * Returns a specified number of contiguous elements from the end of a sequence.
     */
    TakeLast(amount: number): List<T>;

    /**
     * Returns elements from a sequence as long as a specified condition is true.
     */
    TakeWhile(predicate: (value: T, index?: number, list?: T[]) => boolean): List<T>;

    /**
     * Copies the elements of the List<T> to a new array.
     */
    ToArray(): T[];

    /**
     * Creates a Dictionary<TKey, TValue> from a List<T> according to a specified key selector function.
     */
    ToDictionary<TKey, TValue>(key: (key: T) => TKey, value?: (value: T) => TValue): List<{ Key: TKey; Value: T }>;

    /**
     * Creates a List<T> from an Enumerable.List<T>.
     */
    ToList(): List<T>;

    /**
     * Creates a Lookup<TKey, TElement> from an IEnumerable<T> according to specified key selector and element selector functions.
     */
    ToLookup(keySelector: (key: T) => any, elementSelector: (element: T) => any): any;

    /**
     * Produces the set union of two sequences by using the default equality comparer.
     */
    Union(list: T[]): List<T>;

    /**
     * Filters a sequence of values based on a predicate.
     */
    Where(predicate: (value: T, index: number, list: T[]) => boolean): List<T>;

    /**
     * Applies a specified function to the corresponding elements of two sequences, producing a sequence of the results.
     */
    Zip<U, TOut>(list: U[], result: (first: T, second: U) => TOut): TOut[];
}




Array.prototype.Add = function <T>(e: T): void {
    getArray<T>(this).push(e);
};


Array.prototype.AddRange = function <T>(e: T[]): void {
    const t = getArray<T>(this);
    for (let i = 0; i < e.length; i++) {
        t.push(e[i]);
    }
};

Array.prototype.Aggregate = function <U, T>(
    accumulator: (accum: U, value?: T, index?: number, list?: T[]) => any,
    initialValue?: U
): any {
    return getArray<T>(this).reduce(accumulator, initialValue);
};


Array.prototype.All = function <T>(
    predicate: (value: T, index: number, list: T[]) => boolean
): boolean {
    return getArray<T>(this).every(predicate);
};


Array.prototype.Any = function <T>(
    predicate?: (value: T, index: number, list: T[]) => boolean
): boolean {
    return predicate ? getArray<T>(this).some(predicate) : getArray<T>(this).length > 0;
};

Array.prototype.Append = function <T>(value: T): List<T> {
    const list = new List<T>();
    this.ForEach(item => {
        list._array.push(item)
    })
    list._array.push(value)
    return list
};

Array.prototype.Average = function <T>(
    transform?: (value: T, index: number, list: T[]) => any
): number {
    return this.Sum(transform) / this.Count(transform);
};

Array.prototype.Cast = function <T>(): List<T> {
    return new List<T>(getArray<T>(this) as any)
};

Array.prototype.Concat = function <T>(list: T[]): List<T> {
    return new List<T>(getArray<T>(this).concat(list));
};

Array.prototype.Contains = function <T>(element: T): boolean {
    return getArray<T>(this).some(x => x === element);
};

Array.prototype.Count = function <T>(
    predicate?: (value: T, index: number, list: T[]) => boolean
): number {
    return predicate ? this.Where(predicate).Count() : this.length;
};

Array.prototype.DefaultIfEmpty = function <T>(defaultValue?: T): List<T> {
    return this.Count() ? this : new List<T>([defaultValue]);
};

Array.prototype.Distinct = function <T>(): List<T> {
    return this.Where(
        (value, index, iter) =>
            (isObj(value)
                ? iter.findIndex(obj => equal(obj, value))
                : iter.IndexOf(value)) === index
    );
};

Array.prototype.DistinctBy = function <T>(keySelector: (key: T) => any): List<T> {
    const groups = this.GroupBy(keySelector, (obj: any) => obj);
    const results = new List<T>([]);
    for (const index in groups) {
        if (groups.hasOwnProperty(index)) {
            results._array.Add(groups[index][0]);
        }
    }
    return results;
};

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

Array.prototype.ElementAtOrDefault = function <T>(index: number): T {
    return this.ElementAt(index) || undefined;
};

Array.prototype.Except = function <T>(source: T[]): List<T> {
    return this.Where((x: any) => !source.Contains(x));
};

Array.prototype.FindAll = function <T>(
    predicate?: (value: T, index: number, list: T[]) => boolean
): T[] {
    let ret: T[] = [];
    getArray<T>(this).filter(predicate).forEach(item => {
        ret.push(item)
    });
    return ret;
};

Array.prototype.First = function <T>(
    predicate?: (value: T, index: number, list: T[]) => boolean
): T {
    if (this.Count()) {
        return predicate ? this.Where(predicate).ToArray()[0] : getArray<T>(this)[0];
    } else {
        throw new Error(
            'InvalidOperationException: The source sequence is empty.'
        );
    }
};

Array.prototype.FirstOrDefault = function <T>(
    predicate?: (value: T, index: number, list: T[]) => boolean
): T {
    return this.Count(predicate) ? this.First(predicate) : undefined;
};

Array.prototype.ForEach = function <T>(action: (value: T, index: number, list: T[]) => any): void {
    return getArray<T>(this).forEach(action);
};

Array.prototype.GroupBy = function <T, TResult = T>(grouper: (key: T) => string | number,
    mapper?: (element: T) => TResult): { [key: string]: TResult[] } {
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
    }, initialValue)
};

Array.prototype.GroupJoin = function <U, T>(
    list: U[],
    key1: (k: T) => any,
    key2: (k: U) => any,
    result: (first: T, second: U[]) => any
): List<any> {
    return this.Select((x, y) =>
        result(x, list.Where(z => key1(x) === key2(z)).ToArray())
    )
};

Array.prototype.GetRange = function <T>(index: number, count: number): List<T> {
    const result: Array<T> = new Array<T>();
    for (let i = 0; i < count; i++) {
        result.push(getArray<T>(this)[index + i]);
    }
    return new List<T>(result);
};

Array.prototype.IndexOf = function <T>(element: T): number {
    return getArray<T>(this).indexOf(element);
};

Array.prototype.Insert = function <T>(index: number, element: T): void | Error {
    let th = getArray<T>(this)
    if (index < 0 || index > th.length) {
        throw new Error('Index is out of range.');
    }

    th.splice(index, 0, element);
};

Array.prototype.InsertRange = function <T>(index: number, array: T[]): void | Error {
    let th = getArray<T>(this)
    if (index < 0 || index > th.length) {
        throw new Error('Index is out of range.');
    }
    for (let i = 0; i < array.length; i++) {
        th.splice(index + i, 0, array[i]);
    }
};

Array.prototype.Intersect = function <T>(source: T[]): List<T> {
    const th = getArray<T>(this)
    return new List<T>(th.Where(x => source.Contains(x))._array);
};

Array.prototype.Join = function <T, U>(
    list: U[],
    key1: (key: T) => any,
    key2: (key: U) => any,
    result: (first: T, second: U) => any
): List<any> {
    return new List<T>(this.SelectMany(x =>
        list.Where(y => key2(y) === key1(x)).Select(z => result(x, z)).ToArray()
    ))
};

Array.prototype.Last = function <T>(
    predicate?: (value: T, index: number, list: T[]) => boolean
): T {
    let th = getArray<T>(this)
    if (this.Count()) {
        return predicate ? th.Where(predicate).Last() : th[th.Count() - 1];
    } else {
        console.log('Last  - ' + 'InvalidOperationException: The source sequence is empty.');
        throw Error('InvalidOperationException: The source sequence is empty.');
    }
};

Array.prototype.LastOrDefault = function <T>(
    predicate?: (value: T, index: number, list: T[]) => boolean
): T {
    return this.Count(predicate) ? this.Last(predicate) : undefined;
};

Array.prototype.Max = function <T>(selector?: (value: T, index: number, array: T[]) => number): number {
    const id = x => x
    let th = getArray<T>(this)
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

Array.prototype.MaxBy = function <T>(keySelector: (item: T) => any): T {
    return this.OrderByDescending(keySelector).FirstOrDefault();
};

Array.prototype.Min = function <T>(selector?: (value: T, index: number, array: T[]) => number): number {
    const id = x => x
    let th = getArray<T>(this)
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

Array.prototype.MinBy = function <T>(keySelector: (item: T) => any): T {
    return this.OrderBy(keySelector).FirstOrDefault();
};

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

Array.prototype.OrderBy = function <T>(keySelector: (key: T) => any,
    comparer = keyComparer(keySelector, false)): List<T> {
    return new List<T>(getArray<T>(this), comparer)
};

Array.prototype.OrderByDescending = function <T>(keySelector: (key: T) => any,
    comparer = keyComparer(keySelector, true)): List<T> {
    return new List<T>(getArray<T>(this), comparer)
};

Array.prototype.Prepend = function <T>(value: T): List<T> {
    const list = new List<T>();
    list._array.push(value)
    this.ForEach(item => {
        list._array.push(item)
    })
    return list
};

Array.prototype.ThenBy = function <T>(keySelector: (key: T) => any): List<T> {
    return this.OrderBy(keySelector)
};

Array.prototype.ThenByDescending = function <T>(keySelector: (key: T) => any): List<T> {
    return this.OrderByDescending(keySelector);
};

Array.prototype.Remove = function <T>(element: T): boolean {
    return this.IndexOf(element) !== -1
        ? (this.RemoveAt(this.IndexOf(element)), true)
        : false;
};

Array.prototype.RemoveAll = function <T>(
    predicate?: (value?: T, index?: number, list?: T[]) => boolean
): List<T> {
    if (predicate) {
        const arr = getArray<T>(this);
         for (let i = 0; i < arr.length; i++) {
            if (predicate(arr[i])) {
                arr.splice(i, 1);
                i--;
            }
        }
        return new List<T>(arr);
    }
    return new List<T>();
};

Array.prototype.RemoveAt = function <T>(index: number): List<T> {
    return new List<T>(getArray<T>(this).splice(index, 1));
};

Array.prototype.RemoveRange = function <T>(index: number, count: number): List<T> {
    return new List<T>(getArray<T>(this).splice(index, count));
};

Array.prototype.Reverse = function <T>(): List<T> {
    return new List<T>(getArray<T>(this).reverse());
};

Array.prototype.Select = function <TOut, T>(
    selector: (element: T, index: number) => TOut
): List<TOut> {
    return new List<TOut>(getArray<T>(this).map(selector));
};

Array.prototype.SelectMany = function <T, TOut extends any[]>(
    selector: (element: T, index: number) => TOut
): TOut {
    return this.Aggregate(
        (ac, v, i) => (
            ac.AddRange(
                this.Select(selector)
                    .ElementAt(i)
                    .ToArray()
            ),
            ac
        ),
        new Array<TOut>()
    )
};

Array.prototype.SequenceEqual = function <T>(list: T[]): boolean {
    return !!getArray<T>(this).reduce(
        (x: any, y: any, z: any) => (list[z] === y ? x : undefined)
    );
};

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

Array.prototype.SingleOrDefault = function <T>(
    predicate?: (value: T, index: number, list: T[]) => boolean
): T {
    return this.Count(predicate) ? this.Single(predicate) : undefined;
};

Array.prototype.Skip = function <T>(amount: number): List<T> {
    return new List<T>(getArray<T>(this).slice(Math.max(0, amount)))
};

Array.prototype.SkipLast = function <T>(amount: number): List<T> {
    return new List<T>(getArray<T>(this).slice(0, Math.max(0, getArray<T>(this).length - amount)))
};

Array.prototype.SkipWhile = function <T>(
    predicate: (value?: T, index?: number, list?: T[]) => boolean
): List<T> {
    return this.Skip(
        this.Aggregate(
            (ac, val) => (predicate(this.ElementAt(ac)) ? ++ac : ac),
            0
        )
    )
};

Array.prototype.Sum = function <T>(
    transform?: (value?: T, index?: number, list?: T[]) => number
): number {
    return transform
        ? this.Select(transform).Sum()
        : this.Aggregate((ac: any, v: any) => (ac += +v), 0);
};

Array.prototype.Take = function <T>(amount: number): List<T> {
    return new List<T>(getArray<T>(this).slice(0, Math.max(0, amount)))
};

Array.prototype.TakeLast = function <T>(amount: number): List<T> {
    return new List<T>(getArray<T>(this).slice(getArray<T>(this).length - amount, getArray<T>(this).length))
};

Array.prototype.TakeWhile = function <T>(
    predicate: (value: T, index?: number, list?: T[]) => boolean
): List<T> {
    return this.Take(
        this.Aggregate(
            (ac: any) => (predicate(this.ElementAt(ac)) ? ++ac : ac),
            0
        )
    );
};

Array.prototype.ToArray = function <T>(): T[] {
    return getArray<T>(this);
};

Array.prototype.ToDictionary = function <TKey, TValue, T>(
    key: (key: T) => TKey,
    value?: (value: T) => TValue
): List<{ Key: TKey; Value: T }> | List<{ Key: TKey; Value: T | TValue }> {
    return new List<{ Key: TKey; Value: T | TValue }>(this.Aggregate((dicc, v, i) => {
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
    }, Array<{ Key: TKey; Value: T | TValue }>()))
}

Array.prototype.ToList = function <T>(): List<T> {
    return new List<T>(this);
};

Array.prototype.ToLookup = function <T>(
    keySelector: (key: T) => any,
    elementSelector: (element: T) => any
): any {
    return this.GroupBy(keySelector, elementSelector);
};

Array.prototype.Union = function <T>(list: T[]): List<T> {
    return this.Concat(list).Distinct();
};

Array.prototype.Where = function <T>(
    predicate: (value: T, index: number, list: T[]) => boolean
): List<T> {
    return new List<T>(getArray<T>(this).filter(predicate));
};

Array.prototype.Zip = function <T, U, TOut>(
    list: U[],
    result: (first: T, second: U) => TOut
): TOut[] {
    return list.Count() < this.Count()
        ? list.Select((x: any, y: any) => result(this.ElementAt(y), x))
        : this.Select((x: any, y: any) => result(x, list.ElementAt(y)));
};



/**
 * Checks if the argument passed is an object
 */
const isObj = <T>(x: T): boolean => typeof x === 'object'

const getArray = function <T>(
    obj: List<T> | T[]
): T[] {
    return (obj instanceof List ? (obj._array) : (obj))
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


class List<T> {

    public _array: T[] = [];
    constructor(elements?: T[], private _comparer?: (a: T, b: T) => number) {
        if (elements) {
            this._array = elements;
        }
        if (this._comparer) {
            TimSort.sort(this._array, this._comparer)
        }
    }

    /**
     * Performs a subsequent ordering of the elements in a sequence in ascending order according to a key.
     * @override
     */
    public ThenBy(keySelector: (key: T) => any): List<T> {
        return new List<T>(
            getArray<T>(this),
            composeComparers(this._comparer, keyComparer(keySelector, false))
        )
    }

    /**
     * Performs a subsequent ordering of the elements in a sequence in descending order, according to a key.
     * @override
     */
    public ThenByDescending(keySelector: (key: T) => any): List<T> {
        return new List<T>(
            getArray<T>(this),
            composeComparers(this._comparer, keyComparer(keySelector, true))
        )
    }

    Add(element: T) {
        return this._array.Add(element);
    }
    AddRange(elements: T[]) {
        return this._array.AddRange(elements);
    };
    Aggregate<U>(accumulator: (accum: U, value?: T, index?: number, list?: T[]) => any, initialValue?: U) {
        return this._array.Aggregate(accumulator, initialValue);
    }
    All(predicate: (value: T, index: number, list: T[]) => boolean) {
        return this._array.All(predicate);
    }
    Any(predicate?: (value: T, index: number, list: T[]) => boolean) {
        return this._array.Any(predicate);
    }
    Append(value: T) {
        return this._array.Append(value);
    }
    Average(transform?: (value: T, index: number, list: T[]) => any) {
        return this._array.Average(transform);
    }
    Cast<T>() {
        return this._array.Cast<T>()
    }
    Concat(list: T[]) {
        return this._array.Concat(list);
    }
    Contains(element: T) {
        return this._array.Contains(element);
    }
    Count(predicate?: (value: T, index: number, list: T[]) => boolean) {
        return this._array.Count(predicate);
    }
    DefaultIfEmpty(defaultValue?: T) {
        return this._array.DefaultIfEmpty(defaultValue);
    }
    Distinct() {
        return this._array.Distinct();
    }
    DistinctBy(keySelector: (key: T) => any) {
        return this._array.DistinctBy(keySelector);
    }
    ElementAt(index: number) {
        return this._array.ElementAt(index);
    }
    ElementAtOrDefault(index: number) {
        return this._array.ElementAtOrDefault(index);
    }
    Except(source: T[]) {
        return this._array.Except(source);
    }
    FindAll(predicate?: (value: T, index: number, list: T[]) => boolean) {
        return this._array.FindAll(predicate);
    }
    First(predicate?: (value: T, index: number, list: T[]) => boolean) {
        return this._array.First(predicate);
    }
    FirstOrDefault(predicate?: (value: T, index: number, list: T[]) => boolean) {
        return this._array.FirstOrDefault(predicate);
    }
    ForEach(action: (value: T, index: number, list: T[]) => any) {
        return this._array.ForEach(action);
    }
    GroupBy<TResult = T>(grouper: (key: T) => any, mapper: (element: T) => TResult) {
        return this._array.GroupBy(grouper, mapper);
    }
    GroupJoin<T>(list: T[], key1: (k: T) => any, key2: (k: T) => any, result: (first: T, second: T[]) => any) {
        return this._array.GroupJoin(list, key1, key2, result);
    }
    GetRange(index: number, count: number) {
        return this._array.GetRange(index, count);
    }
    IndexOf(element: T) {
        return this._array.IndexOf(element);
    }
    Insert(index: number, element: T) {
        return this._array.Insert(index, element);
    }
    InsertRange(index: number, array: T[]) {
        return this._array.InsertRange(index, array);
    }
    Intersect(source: T[]) {
        return this._array.Intersect(source);
    }
    Join<U>(list: Array<U>, key1: (key: T) => any, key2: (key: U) => any, result: (first: T, second: U) => any) {
        return this._array.Join(list, key1, key2, result);
    }
    Last(predicate?: (value: T, index: number, list: T[]) => boolean) {
        return this._array.Last(predicate);
    }
    LastOrDefault(predicate?: (value: T, index: number, list: T[]) => boolean) {
        return this._array.LastOrDefault(predicate);
    }
    Max(selector?: (value: T, index: number, array: T[]) => number) {
        return this._array.Max(selector);
    }
    MaxBy(keySelector: (key: T) => any) {
        return this._array.MaxBy(keySelector);
    }
    Min(selector?: (value: T, index: number, array: T[]) => number) {
        return this._array.Min(selector)
    }
    MinBy(keySelector: (key: T) => any) {
        return this._array.MinBy(keySelector)
    }
    OfType<T>(type: any) {
        return this._array.OfType(type)
    }
    OrderBy(keySelector: (key: T) => any, keyComparer?: Function) {
        return this._array.OrderBy(keySelector, keyComparer)
    }
    OrderByDescending(keySelector: (key: T) => any) {
        return this._array.OrderByDescending(keySelector)
    }
    Prepend(value: T) {
        return this._array.Prepend(value)
    }
    Remove(element: T) {
        return this._array.Remove(element)
    }
    RemoveAll(predicate?: (value: T, index: number, list: T[]) => boolean) {
        return this._array.RemoveAll(predicate)
    }
    RemoveAt(index: number) {
        return this._array.RemoveAt(index)
    }
    RemoveRange(index: number, count: number) {
        return this._array.RemoveRange(index, count)
    }
    Reverse() {
        return this._array.Reverse()
    }
    Select<TOut>(selector: (element: T, index: number) => TOut) {
        return this._array.Select(selector)
    }
    SelectMany<TOut extends any[]>(selector: (element: T, index: number) => TOut) {
        return this._array.SelectMany(selector)
    }
    SequenceEqual(list: T[]) {
        return this._array.SequenceEqual(list)
    }
    Single(predicate?: (value: T, index: number, list: T[]) => boolean) {
        return this._array.Single(predicate)
    }
    SingleOrDefault(predicate?: (value: T, index: number, list: T[]) => boolean) {
        return this._array.SingleOrDefault(predicate)
    }
    Skip(amount: number) {
        return this._array.Skip(amount)
    }
    SkipLast(amount: number) {
        return this._array.SkipLast(amount)
    }
    SkipWhile(predicate: (value?: T, index?: number, list?: T[]) => boolean) {
        return this._array.SkipWhile(predicate)
    }
    Sum(transform?: (value: T, index: number, list: T[]) => number) {
        return this._array.Sum(transform)
    }
    Take(amount: number) {
        return this._array.Take(amount)
    }
    TakeLast(amount: number) {
        return this._array.TakeLast(amount)
    }
    TakeWhile(predicate: (value: T, index?: number, list?: T[]) => boolean) {
        return this._array.TakeWhile(predicate)
    }
    ToArray() {
        return this._array;
    }
    ToDictionary<TKey, TValue>(key: (key: T) => TKey, value?: (value: T) => TValue) {
        return this._array.ToDictionary(key, value)
    }
    ToList() {
        return new List<T>(this._array);
    }
    ToLookup(keySelector: (key: T) => any, elementSelector: (element: T) => any) {
        return this._array.ToLookup(keySelector, elementSelector)
    }
    Union(list: T[]) {
        return this._array.Union(list)
    }
    Where(predicate: (value: T, index: number, list: T[]) => boolean) {
        return this._array.Where(predicate)
    }
    Zip<U, TOut>(list: U[], result: (first: T, second: U) => TOut) {
        return this._array.Zip(list, result)
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