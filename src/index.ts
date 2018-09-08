/*
This library is fork from   https://github.com/kutyel/linq.ts
https://www.npmjs.com/package/linqts
*/

interface Array<T> {
    Add(element: T): void;
    AddRange(elements: T[]): void;
    Aggregate<U>(accumulator: (accum: U, value?: T, index?: number, list?: T[]) => any, initialValue?: U): any;
    All(predicate: (value: T, index: number, list: T[]) => boolean): boolean;
    Any(predicate?: (value: T, index: number, list: T[]) => boolean): boolean;
    Average(transform?: (value: T, index: number, list: T[]) => any): number;
    Cast(): any;
    Concat(list: T[]): T[];
    Contains(element: T): boolean;
    Count(predicate?: (value: T, index: number, list: T[]) => boolean): number;
    DefaultIfEmpty(defaultValue?: T): T[];
    Distinct(): T[];
    DistinctBy(keySelector: (key: T) => any): T[];
    ElementAt(index: number): T;
    ElementAtOrDefault(index: number): T;
    Except(source: T[]): T[];
    First(predicate?: (value: T, index: number, list: T[]) => boolean): T;
    FirstOrDefault(predicate?: (value: T, index: number, list: T[]) => boolean): T;
    ForEach(action: (value: T, index: number, list: T[]) => any): void;
    GroupBy(grouper: (key: T) => any, mapper: (element: T) => any): any;
    GroupJoin<U>(list: Array<U>, key1: (k: T) => any, key2: (k: U) => any, result: (first: T, second: U[]) => any): any[];
    GetRange(index: number, count: number): Array<T>;
    IndexOf(element: T): number;
    Insert(index: number, element: T): void | Error;
    Intersect(source: T[]): T[];
    Join<U>(list: Array<U>, key1: (key: T) => any, key2: (key: U) => any, result: (first: T, second: U) => any): any[];
    Last(predicate?: (value: T, index: number, list: T[]) => boolean): T;
    LastOrDefault(predicate?: (value: T, index: number, list: T[]) => boolean): T;
    Max(): T;
    MaxBy(keySelector: (key: T) => any): T;
    Min(): T;
    MinBy(keySelector: (key: T) => any): T;
    OrderBy(keySelector: (key: T) => any): T[];
    OrderByDescending(keySelector: (key: T) => any): T[];
    OrderByMany(propertyExpressions: [(item1: T) => any, (item2: T) => any]): T[];
    OrderByManyDescending(propertyExpressions: [(item1: T) => any, (item2: T) => any]): T[];
    ThenBy(keySelector: (key: T) => any): T[];
    ThenByDescending(keySelector: (key: T) => any): T[];
    Remove(element: T): boolean;
    RemoveAll(predicate?: (value: T, index: number, list: T[]) => boolean): boolean;
    RemoveAt(index: number): void;
    RemoveRange(index: number, count: number): void;
    Reverse(): T[];
    Select<TOut>(mapper: (value: T, index: number, list: T[]) => TOut): TOut[];
    SelectMany<TOut extends any[]>(mapper: (value: T, index: number, list: T[]) => TOut): TOut;
    SequenceEqual(list: T[]): boolean;
    Single(predicate?: (value: T, index: number, list: T[]) => boolean): T;
    SingleOrDefault(predicate?: (value: T, index: number, list: T[]) => boolean): T;
    Skip(amount: number): T[];
    SkipWhile(predicate: (value: T, index?: number, list?: T[]) => boolean): T[];
    Sum(transform?: (value: T, index: number, list: T[]) => number): number;
    Take(amount: number): T[];
    TakeWhile(predicate: (value: T, index?: number, list?: T[]) => boolean): T[];
    ToArray(): T[];
    ToDictionary<TKey, TValue>(key: (key: T) => TKey, value: (value: T) => TValue): { [id: string]: TValue | T };
    ToList(): T[];
    ToLookup(keySelector: (key: T) => any, elementSelector: (element: T) => any): any;
    Union(list: T[]): T[];
    Where(predicate: (value: T, index: number, list: T[]) => boolean): T[];
    Zip<U, TOut>(list: U[], result: (first: T, second: U) => TOut): TOut[];
    _negate(predicate: (value: T, index: number, list: T[]) => boolean): () => any;
}

(function () {


    /*
        Adds an object to the end of the List<T>.
    */
    Array.prototype.Add = function <T>(element: T): void {
        this.push(element);
    };

    /**
     * Adds the elements of the specified collection to the end of the List<T>.
     */
    Array.prototype.AddRange = function <T>(elements: T[]): void {
        this.push(...elements);
    };

    /**
     * Applies an accumulator function over a sequence.
     */
    Array.prototype.Aggregate = function <U, T>(
        accumulator: (accum: U, value?: T, index?: number, list?: T[]) => any,
        initialValue?: U
    ): any {
        return this.reduce(accumulator, initialValue);
    };

    /**
     * Determines whether all elements of a sequence satisfy a condition.
     */
    Array.prototype.All = function <T>(
        predicate: (value: T, index: number, list: T[]) => boolean
    ): boolean {
        return this.every(predicate);
    };

    /**
     * Determines whether a sequence contains any elements.
     */
    Array.prototype.Any = function <T>(
        predicate?: (value: T, index: number, list: T[]) => boolean
    ): boolean {
        return predicate ? this.some(predicate) : this.length > 0;
    };

    /**
     * Computes the average of a sequence of number values that are obtained by invoking
     * a transform function on each element of the input sequence.
     */
    Array.prototype.Average = function <T>(
        transform?: (value: T, index: number, list: T[]) => any
    ): number {
        return this.Sum(transform) / this.Count(transform);
    };

    /**
     * Casts the elements of a sequence to the specified type.
     */
    Array.prototype.Cast = function <U>(): Array<U> {
        return new Array<U>(this as any);
    };

    /**
     * Concatenates two sequences.
     */
    Array.prototype.Concat = function <T>(list: T[]): T[] {
        return new Array<T>(this.concat(list.ToArray()));
    };
    /**
     * Determines whether an element is in the List<T>.
     */
    Array.prototype.Contains = function <T>(element: T): boolean {
        return this.some((x: any) => x === element);
    };

    /**
     * Returns the number of elements in a sequence.
     */
    Array.prototype.Count = function <T>(
        predicate?: (value: T, index: number, list: T[]) => boolean
    ): number {
        return predicate ? this.Where(predicate).Count() : this.length;
    };

    /**
     * Returns the elements of the specified sequence or the type parameter's default value
     * in a singleton collection if the sequence is empty.
     */
    Array.prototype.DefaultIfEmpty = function <T>(defaultValue?: T): T[] {
        return this.Count() ? this : defaultValue ? new Array<T>(defaultValue) : new Array<T>();
    };

    /**
     * Returns distinct elements from a sequence by using the default equality comparer to compare values.
     */
    Array.prototype.Distinct = function <T>(): T[] {
        return this.Where((value: any, index: any, iter: any) => iter.indexOf(value) === index);
    };

    /**
     * Returns distinct elements from a sequence according to specified key selector.
     */
    Array.prototype.DistinctBy = function <T>(keySelector: (key: T) => any): T[] {
        const groups = this.GroupBy(keySelector, (obj: any) => obj);
        const results = new Array<T>();
        // tslint:disable-next-line:prefer-const
        for (let index in groups) {
            if (groups.hasOwnProperty(index)) {
                results.Add(groups[index][0]);
            }
        }
        return results;
    };

    /**
     * Returns the element at a specified index in a sequence.
     */
    Array.prototype.ElementAt = function <T>(index: number): T {
        if (index < this.Count()) {
            return this[index];
        } else {
            console.log();
            const MSG =
                'ArgumentOutOfRangeException: index is less than 0 or greater than or equal to the number of elements in source.';
            console.log('ElementAt - ' + MSG);
            throw new Error(MSG);
        }
    };

    /**
     * Returns the element at a specified index in a sequence or a default value if the index is out of range.
     */
    Array.prototype.ElementAtOrDefault = function <T>(index: number): T {
        return this.ElementAt(index) || undefined;
    };

    /**
     * Produces the set difference of two sequences by using the default equality comparer to compare values.
     */
    Array.prototype.Except = function <T>(source: T[]): T[] {
        return this.Where((x: any) => !source.Contains(x));
    };

    /**
     * Returns the first element of a sequence.
     */

    // Array.prototype.First(predicate: (value?: T, index?: number, list?: T[]) => boolean): T
    Array.prototype.First = function <T>(
        predicate?: (value: T, index: number, list: T[]) => boolean
    ): T {
        if (this.Count()) {
            return predicate ? this.Where(predicate)[0] : this[0];
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
        return this.Count(predicate) ? this.First(predicate) : undefined;
    };

    /**
     * Performs the specified action on each element of the List<T>.
     */
    Array.prototype.ForEach = function <T>(action: (value: T, index: number, list: T[]) => any): void {
        return this.forEach(action);
    };

    /**
     * Groups the elements of a sequence according to a specified key selector function.
     */
    Array.prototype.GroupBy = function <T>(grouper: (key: T) => any, mapper: (element: T) => any): any {
        return this.Aggregate(
            (ac: any, v: any) => (
                (ac as any)[grouper(v)]
                    ? (ac as any)[grouper(v)].push(mapper(v))
                    : ((ac as any)[grouper(v)] = [mapper(v)]),
                ac
            ),
            {}
        );
    };

    /**
     * Correlates the elements of two sequences based on equality of keys and groups the results.
     * The default equality comparer is used to compare keys.
     */
    Array.prototype.GroupJoin = function <U, T>(
        list: U[],
        key1: (k: T) => any,
        key2: (k: U) => any,
        result: (first: T, second: U[]) => any
    ): any[] {
        return this.Select((x: any) =>
            result(x, list.Where((z: U) => key1(x) === key2(z)))
        );
    };
    /*
    Returns sub range
    */

    Array.prototype.GetRange = function <T>(index: number, count: number): Array<T> {
        // tslint:disable-next-line:prefer-const
        let result: Array<T> = new Array<T>();
        for (let i = 0; i < count; i++) {
            result.push(this[index + i]);
        }
        return result;
    };

    /**
     * Returns the index of the first occurence of an element in the List.
     */
    Array.prototype.IndexOf = function <T>(element: T): number {
        return this.indexOf(element);
    };

    /**
     * Inserts an element into the List<T> at the specified index.
     */
    Array.prototype.Insert = function <T>(index: number, element: T): void | Error {
        if (index < 0 || index > this.length) {
            throw new Error('Index is out of range.');
        }

        this.splice(index, 0, element);
    };

    /**
     * Produces the set intersection of two sequences by using the default equality comparer to compare values.
     */
    Array.prototype.Intersect = function <T>(source: T[]): T[] {
        return this.Where((x: any) => source.Contains(x));
    };

    /**
     * Correlates the elements of two sequences based on matching keys. The default equality comparer is used to compare keys.
     */
    Array.prototype.Join = function <U, T>(
        list: U [],
        key1: (key: T) => any,
        key2: (key: U) => any,
        result: (first: T, second: U) => any
    ): any[] {
        return this.SelectMany((x: any) =>
            list.Where((y: U) => key2(y) === key1(x)).Select((z: U) => result(x, z))
        );
    };

    /**
     * Returns the last element of a sequence.
     */
    Array.prototype.Last = function <T>(
        predicate?: (value: T, index: number, list: T[]) => boolean
    ): T {
        if (this.Count()) {
            return predicate ? this.Where(predicate).Last() : this[this.Count() - 1];
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
        return this.Count(predicate) ? this.Last(predicate) : undefined;
    };

    /**
     * Returns the maximum value in a generic sequence.
     */
    Array.prototype.Max = function <T>(): T {
        return this.Aggregate((x: any, y: any) => (x > y ? x : y));
    };

    /**
     * Returns the element with maximum value in a generic sequence.
     */
    Array.prototype.MaxBy = function <T>(keySelector: (item: any) => any): T {
        return this.OrderByDescending(keySelector).FirstOrDefault();
    };

    /**
     * Returns the minimum value in a generic sequence.
     */
    Array.prototype.Min = function <T>(): T {
        return this.Aggregate((x: any, y: any) => (x < y ? x : y));
    };

    /**
     * Returns the element with minimum value in a generic sequence.
     */
    Array.prototype.MinBy = function <T>(keySelector: (item: any) => any): T {
        return this.OrderBy(keySelector).FirstOrDefault();
    };

    /**
     * Sorts the elements of a sequence in ascending order according to a key.
     */
    Array.prototype.OrderBy = function <T>(propertyExpression: (item: any) => any): Array<T> {
        const compareFunction = (item1: any, item2: any): number => {
            if (propertyExpression(item1) > propertyExpression(item2)) { return 1; }
            if (propertyExpression(item2) > propertyExpression(item1)) { return -1; }
            return 0;
        };
        return this.sort(compareFunction);
    };

    /**
     * Sorts the elements of a sequence in descending order according to a key.
     */
    Array.prototype.OrderByDescending = function <T>(propertyExpression: ((item: T) => any)): Array<T> {
        const compareFunction = (item1: any, item2: any): number => {
            if (propertyExpression(item1) > propertyExpression(item2)) { return -1; }
            if (propertyExpression(item2) > propertyExpression(item1)) { return 1; }
            return 0;
        };
        return (<Array<any>>this).sort(compareFunction);
    };
    /**
     * Sorts the elements of a sequence in descending order according to a several key.
     */
    Array.prototype.OrderByMany = function <T>(propertyExpressions: [(item1: T) => any, (item2: T) => any]) {
        const compareFunction = (item1: any, item2: any): number => {
            for (let i = 0; i < propertyExpressions.length; i++) {
                const propertyExpression = propertyExpressions[i];
                if (propertyExpression(item1) > propertyExpression(item2)) { return 1; }
                if (propertyExpression(item2) > propertyExpression(item1)) { return -1; }
            }
            return 0;
        };
        return (<Array<any>>this).sort(compareFunction);
    };
    /**
     * Sorts the elements of a sequence in descending order according to a key.
     */
    Array.prototype.OrderByManyDescending = function <T>(propertyExpressions: [(item1: T) => any, (item2: T) => any]) {
        const compareFunction = (item1: any, item2: any): number => {
            for (let i = 0; i < propertyExpressions.length; i++) {
                const propertyExpression = propertyExpressions[i];
                if (propertyExpression(item1) > propertyExpression(item2)) { return -1; }
                if (propertyExpression(item2) > propertyExpression(item1)) { return 1; }
            }
            return 0;
        };
        return (<Array<any>>this).sort(compareFunction);
    };
    /**
     * Performs a subsequent ordering of the elements in a sequence in ascending order according to a key.
     */
    Array.prototype.ThenBy = function <T>(keySelector: (key: T) => any): T[] {
        return this.OrderBy(keySelector);
    };

    /**
     * Performs a subsequent ordering of the elements in a sequence in descending order, according to a key.
     */
    Array.prototype.ThenByDescending = function <T>(keySelector: (key: T) => any): T[] {
        return this.OrderByDescending(keySelector);
    };

    /**
     * Removes the first occurrence of a specific object from the List<T>.
     */
    Array.prototype.Remove = function <T>(element: T): boolean {
        return this.IndexOf(element) !== -1
            ? (this.RemoveAt(this.IndexOf(element)), true)
            : false;
    };

    /**
     * Removes all the elements that match the conditions defined by the specified predicate.
     */
    Array.prototype.RemoveAll = function <T>(
        predicate: (value?: T, index?: number, list?: T[]) => boolean
    ): boolean {
        let retVal = false;
        // tslint:disable-next-line:prefer-const
        for (let item of this.Where(predicate)) {
            this.Remove(item);
            retVal = true;
        }
        return retVal;
    };

    /**
     * Removes the element at the specified index of the List<T>.
     */
    Array.prototype.RemoveAt = function <T>(index: number): Array<T> {
        return this.splice(index, 1);
    };

    /*
     * Removes the element at the specified index of the List<T>.
     */
    Array.prototype.RemoveRange = function <T>(index: number, count: number): Array<T> {
        return this.splice(index, count);
    };

    /**
     * Reverses the order of the elements in the entire List<T>.
     */
    Array.prototype.Reverse = function <T>(): T[] {
        return new Array<T>(this.reverse());
    };

    /**
     * Projects each element of a sequence into a new form.
     */
    Array.prototype.Select = function <TOut, T>(
        mapper: (value: T, index: any, list: T[]) => TOut
    ): T[] {
        return this.map(mapper);
    };

    /**
     * Projects each element of a sequence to a List<any> and flattens the resulting sequences into one sequence.
     */
    Array.prototype.SelectMany = function <TOut extends Array<any>, T>(
        mapper: (value: T, index: number, list: T[]) => TOut
    ): TOut {
        return this.Aggregate(
            (ac: any, v: any, i: any) => (
                ac.AddRange(
                    this.Select(mapper)
                        .ElementAt(i)
                        .ToArray()
                ),
                // tslint:disable-next-line:no-unused-expression
                ac,
                v
            ),
            new Array<TOut>()
        );
    };

    /**
     * Determines whether two sequences are equal by comparing the elements by using the default equality comparer for their type.
     */
    Array.prototype.SequenceEqual = function <T>(list: T[]): boolean {
        return !!this.reduce(
            (x: any, y: any, z: any) => (list[z] === y ? x : undefined)
        );
    };

    /**
     * Returns the only element of a sequence, and throws an exception if there is not exactly one element in the sequence.
     */
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

    /**
     * Returns the only element of a sequence, or a default value if the sequence is empty;
     * this method throws an exception if there is more than one element in the sequence.
     */
    Array.prototype.SingleOrDefault = function <T>(
        predicate?: (value: T, index: number, list: T[]) => boolean
    ): T {
        return this.Count(predicate) ? this.Single(predicate) : undefined;
    };

    /**
     * Bypasses a specified number of elements in a sequence and then returns the remaining elements.
     */
    Array.prototype.Skip = function <T>(amount: number): T[] {
        return this.slice(Math.max(0, amount));
    };

    /**
     * Bypasses elements in a sequence as long as a specified condition is true and then returns the remaining elements.
     */
    Array.prototype.SkipWhile = function <T>(
        predicate: (value: T, index?: number, list?: T[]) => boolean
    ): T[] {
        return this.Skip(
            this.Aggregate(
                (ac: any) => (predicate(this.ElementAt(ac)) ? ++ac : ac),
                0
            )
        );
    };

    /**
     * Computes the sum of the sequence of number values that are obtained by invoking
     * a transform function on each element of the input sequence.
     */
    Array.prototype.Sum = function <T>(
        transform?: (value: T, index: number, list: T[]) => number
    ): number {
        return transform
            ? this.Select(transform).Sum()
            : this.Aggregate((ac: any, v: any) => (ac += +v), 0);
    };

    /**
     * Returns a specified number of contiguous elements from the start of a sequence.
     */
    Array.prototype.Take = function <T>(amount: number): T[] {
        return this.slice(0, Math.max(0, amount));
    };

    /**
     * Returns elements from a sequence as long as a specified condition is true.
     */
    Array.prototype.TakeWhile = function <T>(
        predicate: (value: T, index?: number, list?: T[]) => boolean
    ): T[] {
        return this.Take(
            this.Aggregate(
                (ac: any) => (predicate(this.ElementAt(ac)) ? ++ac : ac),
                0
            )
        );
    };

    /**
     * Copies the elements of the List<T> to a new array.
     */
    Array.prototype.ToArray = function <T>(): T[] {
        return this;
    };

    /**
     * Creates a Dictionary<TKey, TValue> from a List<T> according to a specified key selector function.
     */
    Array.prototype.ToDictionary = function <TKey, TValue, T>(
        key: (key: T) => TKey,
        value?: (value: T) => TValue
    ): { [id: string]: TValue | T } {
        return this.Aggregate(
            (o: any, v: any, i: any) => (
                ((o as any)[
                    this.Select(key)
                        .ElementAt(i)
                        .toString()
                ] = value ? this.Select(value).ElementAt(i) : v),
                o
            ),
            {}
        );
    };

    /**
     * Creates a List<T> from an Enumerable.List<T>.
     */
    Array.prototype.ToList = function <T>(): T[] {
        return this;
    };

    /**
     * Creates a Lookup<TKey, TElement> from an IEnumerable<T> according to specified key selector and element selector functions.
     */
    Array.prototype.ToLookup = function <T>(
        keySelector: (key: T) => any,
        elementSelector: (element: T) => any
    ): any {
        return this.GroupBy(keySelector, elementSelector);
    };

    /**
     * Produces the set union of two sequences by using the default equality comparer.
     */
    Array.prototype.Union = function <T>(list: T[]): T[] {
        return this.Concat(list).Distinct();
    };

    /**
     * Filters a sequence of values based on a predicate.
     */
    Array.prototype.Where = function <T>(
        predicate: (value: T, index: any, list: T[]) => boolean
    ): T[] {
        return this.filter(predicate);
    };

    /**
     * Applies a specified function to the corresponding elements of two sequences, producing a sequence of the results.
     */
    Array.prototype.Zip = function <T, U, TOut>(
        list: U[],
        result: (first: T, second: U) => TOut
    ): TOut[] {
        return list.Count() < this.Count()
            ? list.Select((x: any, y: any) => result(this.ElementAt(y), x))
            : this.Select((x: any, y: any) => result(x, list.ElementAt(y)));
    };

    /**
     * Creates a function that negates the result of the predicate
     */
    Array.prototype._negate = function <T>(
        predicate: (value: T, index: number, list: T[]) => boolean
    ): () => any {
            return function (): any {
                return !predicate.apply(this, arguments);
            };
        };
    })();
