/*
This library is fork from   https://github.com/kutyel/linq.ts
https://www.npmjs.com/package/linqts
*/
"use strict";

import { sort as timsort } from "timsort";

declare global {
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
    Aggregate<U>(
      accumulator: (accum: U, value?: T, index?: number, list?: T[]) => any,
      initialValue?: U
    ): any;

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
    Average(
      transform?: (value: T, index: number, list?: T[]) => number
    ): number;

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
    ElementAtOrDefault(index: number): T | undefined;

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
    FirstOrDefault(
      predicate?: (value: T, index: number, list: T[]) => boolean
    ): T | undefined;

    /**
     * Performs the specified action on each element of the Array<T>.
     */
    ForEach(action: (value: T, index: number, list: T[]) => any): void;

    /**
     * Groups the elements of a sequence according to a specified key selector function.
     */
    GroupBy<TResult = T>(
      grouper: (key: T) => any,
      mapper?: (element: T) => TResult
    ): { [key: string]: TResult[] };

    /**
     * Correlates the elements of two sequences based on equality of keys and groups the results.
     * The default equality comparer is used to compare keys.
     */
    GroupJoin<T>(
      list: T[],
      key1: (k: T) => any,
      key2: (k: T) => any,
      result: (first: T, second: T[]) => any
    ): List<any>;

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
    Join<U>(
      list: Array<U>,
      key1: (key: T) => any,
      key2: (key: U) => any,
      result: (first: T, second: U) => any
    ): List<any>;

    /**
     * Returns the last element of a sequence.
     */
    Last(predicate?: (value: T, index: number, list: T[]) => boolean): T;

    /**
     * Returns the last element of a sequence, or a default value if the sequence contains no elements.
     */
    LastOrDefault(
      predicate?: (value: T, index: number, list: T[]) => boolean
    ): T | undefined;

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
    RemoveAll(
      predicate?: (value: T, index: number, list: T[]) => boolean
    ): List<T>;

    /**
     * Removes the element at the specified index of the List<T>.
     */
    RemoveAt(index: number): void;

    /*
     * Removes the element at the specified index of the List<T>.
     */
    RemoveRange(index: number, count: number): void;

    /**
     * Reverses the order of the elements in the entire List<T>, IN PLACE.
     *
     * This follows List<T>.Reverse() in .NET, which mutates the collection and
     * returns void - not Enumerable.Reverse(), which leaves the source alone and
     * returns a new sequence. .NET can offer both because the receiver type picks
     * one; here there is only one receiver, so the two cannot share a name.
     * Use Reversed() for the non-mutating LINQ operator.
     */
    Reverse(): void;

    /**
     * Returns a new sequence with the elements in reverse order, leaving the
     * source untouched. This is Enumerable.Reverse() in .NET. For the in-place
     * List<T>.Reverse() behaviour, use Reverse().
     */
    Reversed(): List<T>;

    /**
     * Projects each element of a sequence into a new form.
     */
    Select<TOut>(selector: (element: T, index: number) => TOut): List<TOut>;

    /**
     * Projects each element of a sequence to a List<any> and flattens the resulting sequences into one sequence.
     */
    SelectMany<TOut extends any[]>(
      selector: (element: T, index: number) => TOut
    ): TOut;

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
    SingleOrDefault(
      predicate?: (value: T, index: number, list: T[]) => boolean
    ): T | undefined;

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
    SkipWhile(
      predicate: (value: T, index?: number, list?: T[]) => boolean
    ): List<T>;

    /**
     * Computes the sum of the sequence of number values that are obtained by invoking
     * a transform function on each element of the input sequence.
     */
    Sum(transform?: (value: T, index: number, list?: T[]) => number): number;

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
    TakeWhile(
      predicate: (value: T, index?: number, list?: T[]) => boolean
    ): List<T>;

    /**
     * Copies the elements of the List<T> to a new array.
     */
    ToArray(): T[];

    /**
     * Creates a Dictionary<TKey, TValue> from a List<T> according to a specified key selector function.
     */
    ToDictionary<TKey, TValue>(
      key: (key: T) => TKey,
      value?: (value: T) => TValue
    ): List<{ Key: TKey; Value: T }>;

    /**
     * Creates a List<T> from an Enumerable.List<T>.
     */
    ToList(): List<T>;

    /**
     * Creates a Lookup<TKey, TElement> from an IEnumerable<T> according to specified key selector and element selector functions.
     */
    ToLookup(
      keySelector: (key: T) => any,
      elementSelector: (element: T) => any
    ): any;

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
    Zip<U, TOut>(list: U[], result: (first: T, second: U) => TOut): List<TOut>;
  }
}

Array.prototype.Add = function<T>(e: T): void {
  getArray<T>(this).push(e);
};

Array.prototype.AddRange = function<T>(e: T[]): void {
  const t = getArray<T>(this);
  for (let i = 0; i < e.length; i++) {
    t.push(e[i]);
  }
};

Array.prototype.Aggregate = function<U, T>(
  accumulator: (accum: U, value?: T, index?: number, list?: T[]) => any,
  initialValue: U
): any {
  return getArray<T>(this).reduce(accumulator, initialValue);
};

Array.prototype.All = function<T>(
  predicate: (value: T, index: number, list: T[]) => boolean
): boolean {
  return getArray<T>(this).every(predicate);
};

Array.prototype.Any = function<T>(
  predicate?: (value: T, index: number, list: T[]) => boolean
): boolean {
  return predicate
    ? getArray<T>(this).some(predicate)
    : getArray<T>(this).length > 0;
};

Array.prototype.Append = function<T>(value: T): List<T> {
  const list = new List<T>();
  this.ForEach(item => {
    list._array.push(item);
  });
  list._array.push(value);
  return list;
};

Array.prototype.Average = function<T>(
  transform?: (value: T, index: number, list?: T[]) => number
): number {
  // The denominator must be the number of elements, not Count(transform).
  // Count's argument is a *predicate*, so passing the projection there filtered
  // by truthiness and silently dropped every element whose projection was 0,
  // "" or null - [0, 10].Average(x => x) returned 10 instead of 5, and adding
  // zero-valued elements could not change the average at all.
  return this.Sum(transform) / this.Count();
};

Array.prototype.Cast = function<T>(): List<T> {
  return new List<T>(getArray<T>(this) as any);
};

Array.prototype.Concat = function<T>(list: T[]): List<T> {
  return new List<T>(getArray<T>(this).concat(list));
};

Array.prototype.Contains = function<T>(element: T): boolean {
  return getArray<T>(this).some(x => x === element);
};

Array.prototype.Count = function<T>(
  predicate?: (value: T, index: number, list: T[]) => boolean
): number {
  const th = getArray<T>(this);
  if (!predicate) {
    return th.length;
  }
  // Counting loop rather than Where(predicate).Count(), which allocated a
  // filtered List and a copy of the matches only to read their length.
  let count = 0;
  for (let i = 0; i < th.length; i++) {
    if (predicate(th[i], i, th)) {
      count++;
    }
  }
  return count;
};

Array.prototype.DefaultIfEmpty = function<T>(defaultValue: T): List<T> {
  return this.Count() ? new List<T>(this) : new List<T>([defaultValue]);
};

Array.prototype.Distinct = function<T>(): List<T> {
  return this.Where(
    (value, index, iter) =>
      (isObj(value)
        ? iter.findIndex(obj => equal(obj, value))
        : iter.IndexOf(value)) === index
  );
};

Array.prototype.DistinctBy = function<T>(
  keySelector: (key: T) => any
): List<T> {
  const groups = this.GroupBy(keySelector);
  return Object.keys(groups).reduce((res, key) => {
    res.Add(groups[key][0]);
    return res;
  }, new List<T>());
};

Array.prototype.ElementAt = function<T>(index: number): T {
  let th = getArray<T>(this);
  if (index < th.length) {
    return th[index];
  } else {
    const MSG =
      "ArgumentOutOfRangeException: index is less than 0 or greater than or equal to the number of elements in source.";
    throw new Error(MSG);
  }
};

Array.prototype.ElementAtOrDefault = function<T>(index: number): T | undefined {
  let th = getArray<T>(this);
  if (index < th.length) {
    return th[index];
  } else {
    return undefined;
  }
};

Array.prototype.Except = function<T>(source: T[]): List<T> {
  return this.Where(x => !source.Contains(x));
};

Array.prototype.FindAll = function<T>(
  predicate: (value: T, index: number, list: T[]) => boolean
): T[] {
  return getArray<T>(this).filter(predicate);
};

Array.prototype.First = function<T>(
  predicate?: (value: T, index: number, list: T[]) => boolean
): T {
  const th = getArray<T>(this);
  if (!th.length) {
    throw new Error("InvalidOperationException: The source sequence is empty.");
  }
  if (!predicate) {
    return th[0];
  }
  // The guard used to be `if (this.Count())`, which asks whether the SOURCE is
  // non-empty rather than whether anything MATCHED - so a predicate that matched
  // nothing fell through to Where(predicate).ToArray()[0] and returned undefined
  // from a method declared to return T. It now throws, as .NET does, and returns
  // on the first match instead of filtering the whole sequence first.
  for (let i = 0; i < th.length; i++) {
    if (predicate(th[i], i, th)) {
      return th[i];
    }
  }
  throw new Error(
    "InvalidOperationException: The source sequence contains no matching element."
  );
};

Array.prototype.FirstOrDefault = function<T>(
  predicate?: (value: T, index: number, list: T[]) => boolean
): T | undefined {
  const th = getArray<T>(this);
  if (!predicate) {
    return th.length ? th[0] : undefined;
  }
  // One pass. This used to be Count(predicate) followed by First(predicate),
  // which walked the sequence twice and allocated twice.
  for (let i = 0; i < th.length; i++) {
    if (predicate(th[i], i, th)) {
      return th[i];
    }
  }
  return undefined;
};

Array.prototype.ForEach = function<T>(
  action: (value: T, index: number, list: T[]) => any
): void {
  return getArray<T>(this).forEach(action);
};

Array.prototype.GroupBy = function<T, TResult = T>(
  grouper: (key: T) => string | number,
  mapper?: (element: T) => TResult
): { [key: string]: TResult[] } {
  const initialValue: { [key: string]: TResult[] } = {};
  if (!mapper) {
    mapper = val => <TResult>(<any>val);
  }
  return this.Aggregate((ac, v) => {
    const key = grouper(v);
    const existingGroup = ac[key];
    const mappedValue = mapper(v);
    if (existingGroup) {
      existingGroup.push(mappedValue);
    } else {
      ac[key] = [mappedValue];
    }
    return ac;
  }, initialValue);
};

Array.prototype.GroupJoin = function<U, T>(
  list: U[],
  key1: (k: T) => any,
  key2: (k: U) => any,
  result: (first: T, second: U[]) => any
): List<any> {
  return this.Select((x, y) =>
    result(x, list.Where(z => key1(x) === key2(z)).ToArray())
  );
};

Array.prototype.GetRange = function<T>(index: number, count: number): List<T> {
  const result = new List<T>();
  for (let i = 0; i < count; i++) {
    result._array.push(getArray<T>(this)[index + i]);
  }
  return result;
};

Array.prototype.IndexOf = function<T>(element: T): number {
  return getArray<T>(this).indexOf(element);
};

Array.prototype.Insert = function<T>(index: number, element: T): void | Error {
  let th = getArray<T>(this);
  if (index < 0 || index > th.length) {
    throw new Error("Index is out of range.");
  }
  th.splice(index, 0, element);
};

Array.prototype.InsertRange = function<T>(
  index: number,
  array: T[]
): void | Error {
  let th = getArray<T>(this);
  if (index < 0 || index > th.length) {
    throw new Error("Index is out of range.");
  }
  for (let i = 0; i < array.length; i++) {
    th.splice(index + i, 0, array[i]);
  }
};

Array.prototype.Intersect = function<T>(source: T[]): List<T> {
  return this.Where(x => source.Contains(x));
};

Array.prototype.Join = function<T, U>(
  list: U[],
  key1: (key: T) => any,
  key2: (key: U) => any,
  result: (first: T, second: U) => any
): List<any> {
  const result2 = this.SelectMany(x => {
    const dataList = list.Where(y => key2(y) === key1(x));
    const data = dataList.Select(z => result(x, z));
    return data.ToArray();
  });
  return new List(result2);
};

Array.prototype.Last = function<T>(
  predicate?: (value: T, index: number, list: T[]) => boolean
): T {
  const th = getArray<T>(this);
  if (!th.length) {
    throw new Error("InvalidOperationException: The source sequence is empty.");
  }
  if (!predicate) {
    return th[th.length - 1];
  }
  // Walks backwards and returns on the first match, the way .NET does for an
  // IList<T>. Previously this filtered the whole sequence and called Last() on
  // the result, so a predicate matching nothing reported "the source sequence
  // is empty" about a sequence that was not empty.
  for (let i = th.length - 1; i >= 0; i--) {
    if (predicate(th[i], i, th)) {
      return th[i];
    }
  }
  throw new Error(
    "InvalidOperationException: The source sequence contains no matching element."
  );
};

Array.prototype.LastOrDefault = function<T>(
  predicate?: (value: T, index: number, list: T[]) => boolean
): T | undefined {
  const th = getArray<T>(this);
  if (!predicate) {
    return th.length ? th[th.length - 1] : undefined;
  }
  for (let i = th.length - 1; i >= 0; i--) {
    if (predicate(th[i], i, th)) {
      return th[i];
    }
  }
  return undefined;
};

Array.prototype.Max = function<T>(
  selector?: (value: T, index: number, array: T[]) => number
): number {
  const th = getArray<T>(this);
  if (!th.length) {
    throw new Error("InvalidOperationException: The source sequence is empty.");
  }
  // The selector is evaluated once per element and the result reused; the old
  // form called it twice for every element it compared. The scan also starts at
  // 1, since element 0 is the seed and comparing it with itself is pointless.
  let max = selector ? selector(th[0], 0, th) : (th[0] as number);
  for (let i = 1; i < th.length; i++) {
    const value = selector ? selector(th[i], i, th) : (th[i] as number);
    if (value > max) {
      max = value;
    }
  }
  return max;
};

Array.prototype.MaxBy = function<T>(keySelector: (item: T) => any): T {
  const th = getArray<T>(this);
  if (!th.length) {
    throw new Error("InvalidOperationException: The source sequence is empty.");
  }
  // Single pass. This used to be OrderByDescending(keySelector).First(), which
  // sorted and copied the entire sequence just to read element [0].
  // Strict > keeps the FIRST element holding the maximum key, matching .NET and
  // the stable sort this replaces; >= would silently return the last one.
  let best = th[0];
  let bestKey = keySelector(th[0]);
  for (let i = 1; i < th.length; i++) {
    const key = keySelector(th[i]);
    if (key > bestKey) {
      best = th[i];
      bestKey = key;
    }
  }
  return best;
};

Array.prototype.Min = function<T>(
  selector?: (value: T, index: number, array: T[]) => number
): number {
  const th = getArray<T>(this);
  if (!th.length) {
    throw new Error("InvalidOperationException: The source sequence is empty.");
  }
  // See Max. The seed also now reads from `th` rather than `this`, which is
  // what Max always did - the two only coincided because the receiver of an
  // Array.prototype method is never a List.
  let min = selector ? selector(th[0], 0, th) : (th[0] as number);
  for (let i = 1; i < th.length; i++) {
    const value = selector ? selector(th[i], i, th) : (th[i] as number);
    if (value < min) {
      min = value;
    }
  }
  return min;
};

Array.prototype.MinBy = function<T>(keySelector: (item: T) => any): T {
  const th = getArray<T>(this);
  if (!th.length) {
    throw new Error("InvalidOperationException: The source sequence is empty.");
  }
  // Single pass - see MaxBy. Strict < keeps the FIRST element holding the
  // minimum key.
  let best = th[0];
  let bestKey = keySelector(th[0]);
  for (let i = 1; i < th.length; i++) {
    const key = keySelector(th[i]);
    if (key < bestKey) {
      best = th[i];
      bestKey = key;
    }
  }
  return best;
};

Array.prototype.OfType = function<T>(type: any): List<T> {
  let typeName: string | null;
  switch (type) {
    case Number:
      typeName = typeof 0;
      break;
    case String:
      typeName = typeof "";
      break;
    case Boolean:
      typeName = typeof true;
      break;
    case Function:
      typeName = typeof function() {}; // tslint:disable-line no-empty
      break;
    default:
      typeName = null;
      break;
  }
  return typeName === null
    ? this.Where(x => x instanceof type).Cast<T>()
    : this.Where(x => typeof x === typeName).Cast<T>();
};

Array.prototype.OrderBy = function<T>(
  keySelector: (key: T) => any,
  comparer = keyComparer(keySelector, false)
): List<T> {
  const list: Array<T> = new Array();
  for (const item of getArray<T>(this)) {
    list.push(item);
  }
  return new List<T>(list, comparer);
};

Array.prototype.OrderByDescending = function<T>(
  keySelector: (key: T) => any,
  comparer = keyComparer(keySelector, true)
): List<T> {
  const list: Array<T> = new Array();
  for (const item of getArray<T>(this)) {
    list.push(item);
  }
  return new List<T>(list, comparer);
};

Array.prototype.Prepend = function<T>(value: T): List<T> {
  const list = new List<T>();
  list._array.push(value);
  this.ForEach(item => {
    list._array.push(item);
  });
  return list;
};

Array.prototype.ThenBy = function<T>(keySelector: (key: T) => any): List<T> {
  return this.OrderBy(keySelector);
};

Array.prototype.ThenByDescending = function<T>(
  keySelector: (key: T) => any
): List<T> {
  return this.OrderByDescending(keySelector);
};

Array.prototype.Remove = function<T>(element: T): boolean {
  return this.IndexOf(element) !== -1
    ? (this.RemoveAt(this.IndexOf(element)), true)
    : false;
};

Array.prototype.RemoveAll = function<T>(
  predicate?: (value: T, index: number, list: T[]) => boolean
): List<T> {
  if (predicate) {
    const arr = getArray<T>(this);
    for (let i = 0; i < arr.length; i++) {
      if (predicate(arr[i], i, arr)) {
        arr.splice(i, 1);
        i--;
      }
    }
    return new List<T>(arr);
  }
  return new List<T>();
};

Array.prototype.RemoveAt = function<T>(index: number): List<T> {
  return new List(getArray<T>(this).splice(index, 1));
};

Array.prototype.RemoveRange = function<T>(
  index: number,
  count: number
): List<T> {
  return new List(getArray<T>(this).splice(index, count));
};

Array.prototype.Reverse = function<T>(): void {
  getArray<T>(this).reverse();
};

Array.prototype.Reversed = function<T>(): List<T> {
  // slice() first - reverse() mutates, and the whole point of this operator is
  // that the source comes out unchanged.
  return new List<T>(
    getArray<T>(this)
      .slice()
      .reverse()
  );
};

Array.prototype.Select = function<TOut, T>(
  selector: (element: T, index: number) => TOut
): List<TOut> {
  return new List<TOut>(getArray<T>(this).map(selector));
};

Array.prototype.SelectMany = function<T, TOut extends any[]>(
  selector: (element: T, index: number) => TOut
): TOut {
  return this.Aggregate(
    (ac, _, i) => (
      ac.AddRange(
        this.Select(selector)
          .ElementAt(i as any)
          .ToArray()
      ),
      ac
    ),
    new List<TOut>()
  );
};

Array.prototype.SequenceEqual = function<T>(list: T[]): boolean {
  return JSON.stringify(this) === JSON.stringify(list);
};

Array.prototype.Single = function<T>(
  predicate?: (value: T, index: number, list: T[]) => boolean
): T {
  const th = getArray<T>(this);
  if (!th.length) {
    throw new Error("InvalidOperationException: The source sequence is empty.");
  }
  if (!predicate) {
    if (th.length > 1) {
      throw new Error(
        "InvalidOperationException: The source sequence contains more than one element."
      );
    }
    return th[0];
  }
  // .NET distinguishes four cases here, and stops as soon as a second match is
  // found rather than counting every match first.
  let found: T | undefined;
  let seen = false;
  for (let i = 0; i < th.length; i++) {
    if (predicate(th[i], i, th)) {
      if (seen) {
        throw new Error(
          "InvalidOperationException: The source sequence contains more than one matching element."
        );
      }
      found = th[i];
      seen = true;
    }
  }
  if (!seen) {
    throw new Error(
      "InvalidOperationException: The source sequence contains no matching element."
    );
  }
  return found as T;
};

Array.prototype.SingleOrDefault = function<T>(
  predicate?: (value: T, index: number, list: T[]) => boolean
): T | undefined {
  const th = getArray<T>(this);
  if (!th.length) {
    return undefined;
  }
  if (!predicate) {
    if (th.length > 1) {
      throw new Error(
        "InvalidOperationException: The source sequence contains more than one element."
      );
    }
    return th[0];
  }
  let found: T | undefined;
  let seen = false;
  for (let i = 0; i < th.length; i++) {
    if (predicate(th[i], i, th)) {
      if (seen) {
        throw new Error(
          "InvalidOperationException: The source sequence contains more than one matching element."
        );
      }
      found = th[i];
      seen = true;
    }
  }
  return seen ? found : undefined;
};

Array.prototype.Skip = function<T>(amount: number): List<T> {
  return new List<T>(getArray<T>(this).slice(Math.max(0, amount)));
};

Array.prototype.SkipLast = function<T>(amount: number): List<T> {
  return new List<T>(
    getArray<T>(this).slice(0, Math.max(0, getArray<T>(this).length - amount))
  );
};

Array.prototype.SkipWhile = function<T>(
  predicate: (value: T, index?: number, list?: T[]) => boolean
): List<T> {
  return this.Skip(
    this.Aggregate(ac => (predicate(this.ElementAt(ac)) ? ++ac : ac), 0)
  );
};

Array.prototype.Sum = function<T>(
  transform?: (value: T, index: number, list?: T[]) => number
): number {
  return transform
    ? this.Select(transform).Sum()
    : this.Aggregate((ac, v) => (ac += +v), 0);
};

Array.prototype.Take = function<T>(amount: number): List<T> {
  return new List<T>(getArray<T>(this).slice(0, Math.max(0, amount)));
};

Array.prototype.TakeLast = function<T>(amount: number): List<T> {
  const len = getArray<T>(this).length;
  return new List<T>(
    getArray<T>(this).slice(len > amount ? len - amount : 0, len)
  );
};

Array.prototype.TakeWhile = function<T>(
  predicate: (value: T, index?: number, list?: T[]) => boolean
): List<T> {
  return this.Take(
    this.Aggregate(ac => (predicate(this.ElementAt(ac)) ? ++ac : ac), 0)
  );
};

Array.prototype.ToArray = function<T>(): T[] {
  return getArray<T>(this);
};

Array.prototype.ToDictionary = function<TKey, TValue, T>(
  key: (key: T) => TKey,
  value?: (value: T) => TValue
): List<{ Key: TKey; Value: T }> | List<{ Key: TKey; Value: T | TValue }> {
  const data = new List<{ Key: TKey; Value: T | TValue }>(
    this.Aggregate((dicc, v, i) => {
      const ky = this.Select(key).ElementAt(i!);
      dicc[
        //@ts-ignore
        ky.toString()
      ] = value ? this.Select(value).ElementAt(i!) : v;
      dicc.Add({
        Key: this.Select(key).ElementAt(i!),
        Value: value ? this.Select(value).ElementAt(i!) : v
      });
      return dicc;
    }, Array<{ Key: TKey; Value: T | TValue }>())
  );
  return data;
};

Array.prototype.ToList = function<T>(): List<T> {
  return new List<T>(getArray<T>(this));
};

Array.prototype.ToLookup = function<T>(
  keySelector: (key: T) => any,
  elementSelector: (element: T) => any
): any {
  return this.GroupBy(keySelector, elementSelector);
};

Array.prototype.Union = function<T>(list: T[]): List<T> {
  return this.Concat(list).Distinct();
};

Array.prototype.Where = function<T>(
  predicate: (value: T, index: number, list: T[]) => boolean
): List<T> {
  return new List<T>(getArray<T>(this).filter(predicate));
};

Array.prototype.Zip = function<T, U, TOut>(
  list: U[],
  result: (first: T, second: U) => TOut
): List<TOut> {
  return list.length < this.Count()
    ? list.Select((x, y) => result(this.ElementAt(y), x))
    : this.Select((x, y) => result(x, list.ElementAt(y)));
};

/**
 * Checks if the argument passed is an object
 */
const isObj = <T>(x: T): boolean => typeof x === "object";

const getArray = function<T>(obj: List<T> | T[]): T[] {
  return obj instanceof List ? obj._array : obj;
};

/**
 * Determine if two objects are equal
 */
const equal = (a: any, b: any): boolean =>
  Object.keys(a).every(key =>
    isObj(a[key]) ? equal(b[key], a[key]) : b[key] === a[key]
  );

const compare = <T>(
  a: T,
  b: T,
  _keySelector: (key: T) => any,
  descending?: boolean
): number => {
  const sortKeyA = _keySelector(a);
  const sortKeyB = _keySelector(b);
  if (sortKeyA > sortKeyB) {
    return !descending ? 1 : -1;
  } else if (sortKeyA < sortKeyB) {
    return !descending ? -1 : 1;
  } else {
    return 0;
  }
};

const keyComparer = <T>(
  _keySelector: (key: T) => any,
  descending?: boolean
): ((a: T, b: T) => number) => (a: T, b: T) =>
  compare(a, b, _keySelector, descending);

const composeComparers = <T>(
  previousComparer: (a: T, b: T) => number,
  currentComparer: (a: T, b: T) => number
): ((a: T, b: T) => number) => (a: T, b: T) =>
  previousComparer(a, b) || currentComparer(a, b);

export class List<T> {
  public _array: T[] = [];
  constructor(elements?: T[], private _comparer?: (a: T, b: T) => number) {
    if (elements) {
      this._array = elements;
    }
    if (this._comparer) {
      timsort(this._array, this._comparer);
    }
  }

  /**
   * Performs a subsequent ordering of the elements in a sequence in ascending order according to a key.
   * @override
   */
  public ThenBy(keySelector: (key: T) => any): List<T> {
    return new List<T>(
      getArray<T>(this),
      composeComparers(this._comparer!, keyComparer(keySelector, false))
    );
  }

  /**
   * Performs a subsequent ordering of the elements in a sequence in descending order, according to a key.
   * @override
   */
  public ThenByDescending(keySelector: (key: T) => any): List<T> {
    return new List<T>(
      getArray<T>(this),
      composeComparers(this._comparer!, keyComparer(keySelector, true))
    );
  }

  Add(element: T) {
    return this._array.Add(element);
  }
  AddRange(elements: T[]) {
    return this._array.AddRange(elements);
  }
  Aggregate<U>(
    accumulator: (accum: U, value?: T, index?: number, list?: T[]) => any,
    initialValue?: U
  ) {
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
  Average(transform?: (value: T, index: number, list?: T[]) => number) {
    return this._array.Average(transform);
  }
  Cast<T>() {
    return this._array.Cast<T>();
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
  GroupBy<TResult = T>(
    grouper: (key: T) => any,
    mapper?: (element: T) => TResult
  ) {
    return mapper
      ? this._array.GroupBy(grouper, mapper)
      : this._array.GroupBy(grouper);
  }
  GroupJoin<T>(
    list: T[],
    key1: (k: T) => any,
    key2: (k: T) => any,
    result: (first: T, second: T[]) => any
  ) {
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
  Join<U>(
    list: Array<U>,
    key1: (key: T) => any,
    key2: (key: U) => any,
    result: (first: T, second: U) => any
  ) {
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
    return this._array.Min(selector);
  }
  MinBy(keySelector: (key: T) => any) {
    return this._array.MinBy(keySelector);
  }
  OfType<T>(type: any) {
    return this._array.OfType(type);
  }
  OrderBy(keySelector: (key: T) => any, keyComparer?: Function) {
    return this._array.OrderBy(keySelector, keyComparer);
  }
  OrderByDescending(keySelector: (key: T) => any) {
    return this._array.OrderByDescending(keySelector);
  }
  Prepend(value: T) {
    return this._array.Prepend(value);
  }
  Remove(element: T) {
    return this._array.Remove(element);
  }
  RemoveAll(predicate?: (value: T, index: number, list: T[]) => boolean) {
    return this._array.RemoveAll(predicate);
  }
  RemoveAt(index: number) {
    return this._array.RemoveAt(index);
  }
  RemoveRange(index: number, count: number) {
    return this._array.RemoveRange(index, count);
  }
  Reverse() {
    this._array.Reverse();
  }
  Reversed() {
    return this._array.Reversed();
  }
  Select<TOut>(selector: (element: T, index: number) => TOut) {
    return this._array.Select(selector);
  }
  SelectMany<TOut extends any[]>(
    selector: (element: T, index: number) => TOut
  ) {
    return this._array.SelectMany(selector);
  }
  SequenceEqual(list: T[]) {
    return this._array.SequenceEqual(list);
  }
  Single(predicate?: (value: T, index: number, list: T[]) => boolean) {
    return this._array.Single(predicate);
  }
  SingleOrDefault(predicate?: (value: T, index: number, list: T[]) => boolean) {
    return this._array.SingleOrDefault(predicate);
  }
  Skip(amount: number) {
    return this._array.Skip(amount);
  }
  SkipLast(amount: number) {
    return this._array.SkipLast(amount);
  }
  SkipWhile(predicate: (value: T, index?: number, list?: T[]) => boolean) {
    return this._array.SkipWhile(predicate);
  }
  Sum(transform?: (value: T, index: number, list?: T[]) => number) {
    return this._array.Sum(transform);
  }
  Take(amount: number) {
    return this._array.Take(amount);
  }
  TakeLast(amount: number) {
    return this._array.TakeLast(amount);
  }
  TakeWhile(predicate: (value: T, index?: number, list?: T[]) => boolean) {
    return this._array.TakeWhile(predicate);
  }
  ToArray() {
    return this._array;
  }
  ToDictionary<TKey, TValue>(
    key: (key: T) => TKey,
    value?: (value: T) => TValue
  ) {
    return this._array.ToDictionary(key, value);
  }
  ToList() {
    return new List<T>(this._array);
  }
  ToLookup(keySelector: (key: T) => any, elementSelector: (element: T) => any) {
    return this._array.ToLookup(keySelector, elementSelector);
  }
  Union(list: T[]) {
    return this._array.Union(list);
  }
  Where(predicate: (value: T, index: number, list: T[]) => boolean) {
    return this._array.Where(predicate);
  }
  Zip<U, TOut>(list: U[], result: (first: T, second: U) => TOut) {
    return this._array.Zip(list, result);
  }
}

class Enumerable {
  /**
   * Generates a sequence of integral numbers within a specified range.
   */
  public static Range(start: number, count: number): List<number> {
    let result = new List<number>();
    while (count--) {
      result.Add(start++);
    }
    return result;
  }

  /**
   * Generates a sequence that contains one repeated value.
   */
  public static Repeat<T>(element: T, count: number): List<T> {
    let result = new List<T>();
    while (count--) {
      result.Add(element);
    }
    return result;
  }
}

/**
 * Everything above was attached with `Array.prototype.X = ...`, which creates an
 * ENUMERABLE property. That leaks all 65 method names into `for...in` over any
 * array in the process - including arrays owned by code that never asked for this
 * library - turning `for (const i in [1,2,3])` into 68 iterations instead of 3.
 *
 * Object.keys() on a prototype returns only its enumerable own properties, and
 * the built-in Array methods are all non-enumerable, so this sees exactly the
 * names this module added. Passing only `enumerable` to defineProperty leaves
 * writable and configurable as they were.
 */
for (const name of Object.keys(Array.prototype)) {
  Object.defineProperty(Array.prototype, name, { enumerable: false });
}
