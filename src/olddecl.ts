










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


