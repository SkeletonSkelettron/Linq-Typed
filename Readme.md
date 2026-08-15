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
result = arr.Where(x => x.title === 'value').ToArray();
....
```

This library contains following functions:

```javascript
    Add(element: T): void;
    AddRange(elements: T[]): void;
    Aggregate<U>(accumulator: (accum: U, value?: T, index?: number, list?: T[]) => any, initialValue?: U): any;
    All(predicate: (value: T, index: number, list: T[]) => boolean): boolean;
    Any(predicate?: (value: T, index: number, list: T[]) => boolean): boolean;
    Append(value: T): List<T>;
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
    FindAll(predicate?: (value: T, index: number, list: T[]) => boolean): T[];
    First(predicate?: (value: T, index: number, list: T[]) => boolean): T;
    FirstOrDefault(predicate?: (value: T, index: number, list: T[]) => boolean): T;
    ForEach(action: (value: T, index: number, list: T[]) => any): void;
    GroupBy<TResult = T>(grouper: (key: T) => any, mapper: (element: T) => TResult): { [key: string]: TResult[] };
    GroupJoin<T>(list: T[], key1: (k: T) => any, key2: (k: T) => any, result: (first: T, second: T[]) => any): List<any>;
    GetRange(index: number, count: number): List<T>;
    IndexOf(element: T): number;
    Insert(index: number, element: T): void | Error;
    InsertRange(index: number, array: T[]): void | Error;
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
    Prepend(value: T): List<T>;
    ThenBy(keySelector: (key: T) => any): List<T>;
    ThenByDescending(keySelector: (key: T) => any): List<T>;
    Remove(element: T): boolean;
    RemoveAll(predicate?: (value: T, index: number, list: T[]) => boolean): List<T>;
    RemoveAt(index: number): void;
    RemoveRange(index: number, count: number): void;
    Reverse(): void;
    Reversed(): List<T>;
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
    ToDictionary<TKey, TValue>(key: (key: T) => TKey, value?: (value: T) => TValue): List<{ Key: TKey; Value: T }>;
    ToList(): List<T>;
    ToLookup(keySelector: (key: T) => any, elementSelector: (element: T) => any): any;
    Union(list: T[]): List<T>;
    Where(predicate: (value: T, index: number, list: T[]) => boolean): List<T>;
    Zip<U, TOut>(list: U[], result: (first: T, second: U) => TOut): TOut[];
```
## New in version 2.0.0
### Breaking changes

* `First(predicate)` and `Last(predicate)` now throw when nothing matches. Previously `First` returned `undefined` from a method declared to return `T`, because the guard tested whether the *source* was empty rather than whether anything *matched*. Use `FirstOrDefault` / `LastOrDefault` at call sites where no match is possible.
* `Max()` and `Min()` now throw on an empty sequence instead of returning `undefined` from a method declared to return `number`.
* Exception messages now follow .NET and distinguish an empty source from an unmatched predicate: `The source sequence is empty.`, `The source sequence contains no matching element.`, `The source sequence contains more than one element.`, `The source sequence contains more than one matching element.`. `Single` previously reported a single generic message for all four cases, and `Last(predicate)` reported an empty sequence when the sequence was not empty.
* `Average`'s transform parameter is typed `(value, index, list) => number` instead of `=> any`, so the compiler now rejects passing a predicate where a projection is expected.

### New functions

* `Reversed()` — returns a new sequence with the elements in reverse order, leaving the source untouched. This is `Enumerable.Reverse()` from LINQ, and unlike `Reverse()` it can be chained: `list.Reversed().Select(x => x * 2)`. .NET has both `List<T>.Reverse()` (mutates in place, returns void) and `Enumerable.Reverse()` (returns a new sequence) and tells them apart by the receiver type; this library has only one receiver, so the non-mutating operator needed its own name. **`Reverse()` is unchanged** and still reverses in place — existing code keeps working.

### Packaging

* The published package now actually contains the compiled output. `dist` is listed in `.gitignore`, and with no `.npmignore` present npm used `.gitignore` as the ignore list, so the build was stripped from the tarball. A `files` whitelist now controls what ships.
* `main` points at `dist/index.js` and a `types` field was added. `main` previously pointed at `index.ts`, a file that does not exist; it worked only because Node fell back to `index.js` in the package root.
* **Working ESM build.** `module` and `umd:main` previously pointed at filenames microbundle never emitted, and the bundle they should have pointed at could not load anyway: `src/index.ts` was a script rather than a module, so it pulled in timsort with `require()`, which microbundle copied verbatim into the ESM output where `require` is not defined. The source now wraps its `interface Array<T>` in `declare global` and imports timsort with `import { sort } from "timsort"`, so the file is a real module, the global augmentation still applies, and the emitted `.mjs` contains no `require()`. An `exports` map now routes `import` to the ESM bundle and `require` to the CommonJS build.
* `List` is now exported, so it can be referenced by name: `import type { List } from "linq-typed"`. It used to be an implicit global.
* **Install is 350x smaller.** `microbundle` was listed in `dependencies` rather than `devDependencies`, so every consumer installed the full bundler toolchain — Babel, Rollup, PostCSS and the rest. Installing this package pulled **338 packages and 144 MB** for a 25 KB library. It now pulls **2 packages and 408 KB**: itself and `timsort`. The unused `tslib` was dropped from `dependencies` as well (`importHelpers` is not enabled, so it was never referenced), and the duplicate `timsort` entry was removed from `devDependencies`.

### Bug fixes

* `Average(transform)` divided by the count of *truthy* projections rather than the number of elements, because the projection was passed to `Count`, whose argument is a predicate. Elements projecting to `0`, `""` or `null` were dropped from the denominator but not the numerator: `[0, 10].Average(x => x)` returned `10` instead of `5`, and adding zero-valued elements to a set could not change its average at all.
* Library methods were attached as **enumerable** properties, leaking all 65 names into `for...in` over every array in the process, including arrays belonging to code that never imported this library. `for (const i in [1,2,3])` produced 68 iterations instead of 3. They are now non-enumerable, matching the built-in array methods.
* `Min` read its seed value from `this` while `Max` read from the unwrapped array.
* Removed unreachable `instanceof List` branches from `OrderBy`, `OrderByDescending`, `RemoveAt`, `RemoveRange`, `Reverse`, `ToList` and `Where`.

### Performance

* `First(predicate)` returns on the first match instead of filtering the whole sequence into a new array first. On a 100,000-element array with a match at index 0: 1 predicate call instead of 100,000.
* `FirstOrDefault`, `LastOrDefault` and `SingleOrDefault` make one pass instead of calling `Count(predicate)` and then re-scanning. `Last` and `LastOrDefault` walk backwards.
* `MaxBy` and `MinBy` use a single O(n) pass instead of sorting the entire sequence to read one element. On 200,000 elements: 156ms and 6.4M key-selector calls, down to 7ms and 200,000. Ties still resolve to the first element holding the extreme key, as .NET does.
* `Max` and `Min` evaluate the selector once per element instead of twice.
* `Count(predicate)` counts in a loop instead of allocating a filtered list to read its length.
* `Single` stops at the second match instead of counting every match first.

## New in version 1.3.5

* Fixed security issue. Updated  semantic-release>= ^17.2.3. 

## New in version 1.3.3

* Fix ElementAtOrDefault to return undefined instead of error when index is out of range

## New in version 1.3.2

* Bugfix in TakeLast

## New in version 1.3.1

* Updated readme. No update is necessary

## New in version 1.3.0

* Bug fixes and performance improvements

## New in version 1.2.6

* Bug fixes in RemoveAll() function

## New in version 1.2.5

* Bug fixes

## New in version 1.2.4

* Breaking changes. Now all array functions require .ToArray() for getting results, just like in c#. + Added new functions, Append, InserRange, SkipLast, TakeLast. Bug fixes, performance  impovements. TimSort is default sorting algorithm now. Upgrade strictly recommended.

## New in version 1.1.1

* Bug fixes, performance  impovements. Upgrade strictly recommended