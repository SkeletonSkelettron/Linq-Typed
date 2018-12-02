# Linq-Typed

This library is fork from Flavio Corpa's great linqts library (https://github.com/kutyel/linq.ts).
It is Linq implementation for Typescript by array prototyping, added some functions and rewrote some.

Usage - just import the file anywhere you need

```javascript
import 'linq-typed'

....
let arr: anyType[];
......
......
result = arr.Where(x => x.title === 'value');
....
```

This library contains following functions:

```javascript
    Add(element: T): void;
    AddRange(elements: T[]): void;
    Aggregate<U>(accumulator: (accum: U, value?: T, index?: number, list?: T[]) => any, initialValue?: U): any;
    Append(value: T): List<T>;
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
    GroupJoin<U>(list: U[], key1: (k: T) => any, key2: (k: U) => any, result: (first: T, second: U[]) => any): any[];
    GetRange(index: number, count: number): List<T>;
    IndexOf(element: T): number;
    Insert(index: number, element: T): void | Error;
    InsertRange(index: number, array: T[]): void | Error;
    Intersect(source: T[]): List<T>;
    Join<U>(list: Array<U>, key1: (key: T) => any, key2: (key: U) => any, result: (first: T, second: U) => any): any[];
    Last(predicate?: (value: T, index: number, list: T[]) => boolean): T;
    LastOrDefault(predicate?: (value: T, index: number, list: T[]) => boolean): T;
    Max(selector?: (value: T, index: number, array: T[]) => number): number;
    MaxBy(keySelector: (key: T) => any): T;
    Min(selector?: (value: T, index: number, array: T[]) => number): number;
    MinBy(keySelector: (key: T) => any): T;
    OfType<T>(type: any): List<T>;
    OrderBy(keySelector: (key: T) => any): List<T>;
    OrderByDescending(keySelector: (key: T) => any): List<T>;
    ThenBy(keySelector: (key: T) => any): T[];
    ThenByDescending(keySelector: (key: T) => any): List<T>;
    Remove(element: T): boolean;
    RemoveAll(predicate?: (value: T, index: number, list: T[]) => boolean): List<T>;
    RemoveAt(index: number): void;
    RemoveRange(index: number, count: number): void;
    Reverse(): List<T>;
    Select<TOut>(selector: (element: T, index: number) => TOut): List<TOut>;
    SelectMany<TOut extends any[]>(selector: (element: T, index: number) => TOut): TOut;
    SequenceEqual(list: T[]): boolean;
    Single(predicate?: (value: T, index: number, list: T[]) => boolean): T;
    SingleOrDefault(predicate?: (value: T, index: number, list: T[]) => boolean): T;
    Skip(amount: number): List<T>;
    SkipLast(amount: number): List<T>;
    SkipWhile(predicate: (value?: T, index?: number, list?: T[]) => boolean): List<T>;
    Sum(transform?: (value: T, index: number, list: T[]) => number): number;
    Take(amount: number): List<T>;
    TakeLast(amount: number): List<T>;
    TakeWhile(predicate: (value: T, index?: number, list?: T[]) => boolean): List<T>;
    ToArray(): T[];
    ToDictionary<TKey, TValue>(key: (key: T) => TKey, value?: (value: T) => TValue): { Key: TKey; Value: T | TValue }[];
    ToList(): T[];
    ToLookup(keySelector: (key: T) => any, elementSelector: (element: T) => any): any;
    Union(list: T[]): List<T>;
    Where(predicate: (value: T, index: number, list: T[]) => boolean): List<T>;
    Zip<U, TOut>(list: U[], result: (first: T, second: U) => TOut): TOut[];
```

## New in version 1.2.5

* Bug fixes

## New in version 1.2.4

* Breaking changes. Now all array functions require .ToArray() for getting results, just like in c#. + Added new functions, Append, InserRange, SkipLast, TakeLast. Bug fixes, performance  impovements. TimSort is default sorting algorithm now. Upgrade strictly recommended.

## New in version 1.1.1

* Bug fixes, performance  impovements. Upgrade strictly recommended