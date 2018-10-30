/*
This library is fork from   https://github.com/kutyel/linq.ts
https://www.npmjs.com/package/linqts
*/
'use strict';
const TimSort = require('timsort');
(function () {
    /*
        Adds an object to the end of the List<T>.
    */
    Array.prototype.Add = function (e) {
        this instanceof OrderedList ? (this.array.push(e)) : (this.push(e));
    };
    /**
     * Adds the elements of the specified collection to the end of the List<T>.
     */
    Array.prototype.AddRange = function (e) {
        for (let i = 0; i < e.length; i++) {
            this instanceof OrderedList ? (this.array.push(e)) : (this.push(e[i]));
        }
    };
    /**
     * Applies an accumulator function over a sequence.
     */
    Array.prototype.Aggregate = function (accumulator, initialValue) {
        return (this instanceof OrderedList ? (this.array) : (this)).reduce(accumulator, initialValue);
    };
    /**
     * Determines whether all elements of a sequence satisfy a condition.
     */
    Array.prototype.All = function (predicate) {
        return (this instanceof OrderedList ? (this.array) : (this)).every(predicate);
    };
    /**
     * Determines whether a sequence contains any elements.
     */
    Array.prototype.Any = function (predicate) {
        return predicate ? (this instanceof OrderedList ? (this.array) : (this)).some(predicate) : (this instanceof OrderedList ? (this.array) : (this)).length > 0;
    };
    /**
     * Computes the average of a sequence of number values that are obtained by invoking
     * a transform function on each element of the input sequence.
     */
    Array.prototype.Average = function (transform) {
        return (this instanceof OrderedList ? (this.array) : (this)).Sum(transform) / (this instanceof OrderedList ? (this.array) : (this)).Count(transform);
    };
    /**
     * Casts the elements of a sequence to the specified type.
     */
    Array.prototype.Cast = function () {
        let arr = (this instanceof OrderedList ? (this.array) : (this));
        return arr;
    };
    /**
     * Concatenates two sequences.
     */
    Array.prototype.Concat = function (list) {
        return (this instanceof OrderedList ? (this.array) : (this)).concat(list.ToArray());
    };
    /**
     * Determines whether an element is in the List<T>.
     */
    Array.prototype.Contains = function (element) {
        return (this instanceof OrderedList ? (this.array) : (this)).some((x) => x === element);
    };
    /**
     * Returns the number of elements in a sequence.
     */
    Array.prototype.Count = function (predicate) {
        return predicate ? (this instanceof OrderedList ? (this.array) : (this)).Where(predicate).Count() : (this instanceof OrderedList ? (this.array) : (this)).length;
    };
    /**
     * Returns the elements of the specified sequence or the type parameter's default value
     * in a singleton collection if the sequence is empty.
     */
    Array.prototype.DefaultIfEmpty = function (defaultValue) {
        return (this instanceof OrderedList ? (this.array) : (this)).Count() ? (this instanceof OrderedList ? (this.array) : (this)) : [defaultValue];
    };
    /**
     * Returns distinct elements from a sequence by using the default equality comparer to compare values.
     */
    Array.prototype.Distinct = function () {
        return (this instanceof OrderedList ? (this.array) : (this)).Where((value, index, iter) => (isObj(value)
            ? findIndex(obj => equal(obj, value))(iter)
            : iter.indexOf(value)) === index);
    };
    /**
     * Returns distinct elements from a sequence according to specified key selector.
     */
    Array.prototype.DistinctBy = function (keySelector) {
        const groups = (this instanceof OrderedList ? (this.array) : (this)).GroupBy(keySelector, (obj) => obj);
        const results = new Array();
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
    Array.prototype.ElementAt = function (index) {
        let th = (this instanceof OrderedList ? (this.array) : (this));
        if (index < th.Count()) {
            return th[index];
        }
        else {
            console.log();
            const MSG = 'ArgumentOutOfRangeException: index is less than 0 or greater than or equal to the number of elements in source.';
            console.log('ElementAt - ' + MSG + ', index: ' + index.toString());
            throw new Error(MSG);
        }
    };
    /**
     * Returns the element at a specified index in a sequence or a default value if the index is out of range.
     */
    Array.prototype.ElementAtOrDefault = function (index) {
        return (this instanceof OrderedList ? (this.array) : (this)).ElementAt(index) || undefined;
    };
    /**
     * Produces the set difference of two sequences by using the default equality comparer to compare values.
     */
    Array.prototype.Except = function (source) {
        return (this instanceof OrderedList ? (this.array) : (this)).Where((x) => !source.Contains(x));
    };
    /**
     * Returns the first element of a sequence.
     */
    // Array.prototype.First(predicate: (value?: T, index?: number, list?: T[]) => boolean): T
    Array.prototype.First = function (predicate) {
        let th = (this instanceof OrderedList ? (this.array) : (this));
        if (th.Count()) {
            return predicate ? th.Where(predicate)[0] : th[0];
        }
        else {
            throw new Error('InvalidOperationException: The source sequence is empty.');
        }
    };
    /**
     * Returns the first element of a sequence, or a default value if the sequence contains no elements.
     */
    Array.prototype.FirstOrDefault = function (predicate) {
        let th = (this instanceof OrderedList ? (this.array) : (this));
        return th.Count(predicate) ? th.First(predicate) : undefined;
    };
    /**
     * Performs the specified action on each element of the List<T>.
     */
    Array.prototype.ForEach = function (action) {
        return (this instanceof OrderedList ? (this.array) : (this)).forEach(action);
    };
    /**
     * Groups the elements of a sequence according to a specified key selector function.
     */
    Array.prototype.GroupBy = function (grouper, mapper) {
        return (this instanceof OrderedList ? (this.array) : (this)).Aggregate((ac, v) => (ac[grouper(v)]
            ? ac[grouper(v)].push(mapper(v))
            : (ac[grouper(v)] = [mapper(v)]),
            ac), {});
    };
    /**
     * Correlates the elements of two sequences based on equality of keys and groups the results.
     * The default equality comparer is used to compare keys.
     */
    Array.prototype.GroupJoin = function (list, key1, key2, result) {
        return (this instanceof OrderedList ? (this.array) : (this)).Select((x, y) => result(x, list.Where(z => key1(x) === key2(z))));
    };
    /*
    Returns sub range
    */
    Array.prototype.GetRange = function (index, count) {
        // tslint:disable-next-line:prefer-const
        let result = new Array();
        for (let i = 0; i < count; i++) {
            result.push((this instanceof OrderedList ? (this.array) : (this))[index + i]);
        }
        return result;
    };
    /**
     * Returns the index of the first occurence of an element in the List.
     */
    Array.prototype.IndexOf = function (element) {
        return (this instanceof OrderedList ? (this.array) : (this)).indexOf(element);
    };
    /**
     * Inserts an element into the List<T> at the specified index.
     */
    Array.prototype.Insert = function (index, element) {
        let th = (this instanceof OrderedList ? (this.array) : (this));
        if (index < 0 || index > th.length) {
            throw new Error('Index is out of range.');
        }
        th.splice(index, 0, element);
    };
    /**
     * Produces the set intersection of two sequences by using the default equality comparer to compare values.
     */
    Array.prototype.Intersect = function (source) {
        return (this instanceof OrderedList ? (this.array) : (this)).Where((x) => source.Contains(x));
    };
    /**
     * Correlates the elements of two sequences based on matching keys. The default equality comparer is used to compare keys.
     */
    Array.prototype.Join = function (list, key1, key2, result) {
        return (this instanceof OrderedList ? (this.array) : (this)).SelectMany(x => list.Where(y => key2(y) === key1(x)).Select(z => result(x, z)));
    };
    /**
     * Returns the last element of a sequence.
     */
    Array.prototype.Last = function (predicate) {
        let th = (this instanceof OrderedList ? (this.array) : (this));
        if (this.Count()) {
            return predicate ? th.Where(predicate).Last() : th[th.Count() - 1];
        }
        else {
            console.log('Last  - ' + 'InvalidOperationException: The source sequence is empty.');
            throw Error('InvalidOperationException: The source sequence is empty.');
        }
    };
    /**
     * Returns the last element of a sequence, or a default value if the sequence contains no elements.
     */
    Array.prototype.LastOrDefault = function (predicate) {
        let th = (this instanceof OrderedList ? (this.array) : (this));
        return th.Count(predicate) ? th.Last(predicate) : undefined;
    };
    /**
     * Returns the maximum value in a generic sequence.
     */
    Array.prototype.Max = function (selector) {
        const id = x => x;
        let th = (this instanceof OrderedList ? (this.array) : (this));
        let max = selector ? selector(th[0], 0, th) : id(th[0]);
        if (selector) {
            for (let i = 0; i < th.length; i++) {
                max = selector(th[i], i, th) > max ? max = selector(th[i], i, th) : max;
            }
        }
        else {
            for (let i = 0; i < th.length; i++) {
                max = id(th[i]) > max ? max = id(th[i]) : max;
            }
        }
        return max;
    };
    /**
     * Returns the element with maximum value in a generic sequence.
     */
    Array.prototype.MaxBy = function (keySelector) {
        return (this instanceof OrderedList ? (this.array) : (this)).OrderByDescending(keySelector).FirstOrDefault();
    };
    /**
     * Returns the minimum value in a generic sequence.
     */
    Array.prototype.Min = function (selector) {
        const id = x => x;
        let th = (this instanceof OrderedList ? (this.array) : (this));
        let min = selector ? selector(this[0], 0, this) : id(this[0]);
        if (selector) {
            for (let i = 0; i < th.length; i++) {
                min = selector(th[i], i, th) < min ? min = selector(th[i], i, th) : min;
            }
        }
        else {
            for (let i = 0; i < th.length; i++) {
                min = id(th[i]) < min ? min = id(th[i]) : min;
            }
        }
        return min;
    };
    /**
     * Returns the element with minimum value in a generic sequence.
     */
    Array.prototype.MinBy = function (keySelector) {
        return (this instanceof OrderedList ? (this.array) : (this)).OrderBy(keySelector).ToArray().FirstOrDefault();
    };
    /**
    * Filters the elements of a sequence based on a specified type.
    */
    Array.prototype.OfType = function (type) {
        let typeName;
        let th = (this instanceof OrderedList ? (this.array) : (this));
        switch (type) {
            case Number:
                typeName = typeof 0;
                break;
            case String:
                typeName = typeof '';
                break;
            case Boolean:
                typeName = typeof true;
                break;
            case Function:
                typeName = typeof function () { }; // tslint:disable-line no-empty
                break;
            default:
                typeName = null;
                break;
        }
        return typeName === null
            ? th.Where(x => x instanceof type).Cast()
            : th.Where(x => typeof x === typeName).Cast();
    };
    /**
     * Sorts the elements of a sequence in ascending order according to a key.
     */
    Array.prototype.OrderBy = function (keySelector, comparer = keyComparer(keySelector, false)) {
        return new OrderedList((this instanceof OrderedList ? (this.array) : (this)), comparer);
    };
    /**
     * Sorts the elements of a sequence in descending order according to a key.
     */
    Array.prototype.OrderByDescending = function (keySelector, comparer = keyComparer(keySelector, true)) {
        return new OrderedList((this instanceof OrderedList ? (this.array) : (this)), comparer);
    };
    /**
     * Sorts the elements of a sequence in descending order according to a several key.
     */
    Array.prototype.OrderByMany = function (keySelectors) {
        const compareFunction = (item1, item2) => {
            for (let i = 0; i < keySelectors.length; i++) {
                const keySelector = keySelectors[i];
                if (keySelector(item1) > keySelector(item2)) {
                    return 1;
                }
                if (keySelector(item1) == keySelector(item2)) {
                    return 0;
                }
                if (keySelector(item2) > keySelector(item1)) {
                    return -1;
                }
            }
        };
        return (this instanceof OrderedList ? (this.array) : (this)).sort(compareFunction);
    };
    /**
     * Sorts the elements of a sequence in descending order according to a key.
     */
    Array.prototype.OrderByManyDescending = function (propertyExpressions) {
        const compareFunction = (item1, item2) => {
            for (let i = 0; i < propertyExpressions.length; i++) {
                const propertyExpression = propertyExpressions[i];
                if (propertyExpression(item1) > propertyExpression(item2)) {
                    return -1;
                }
                if (propertyExpression(item1) == propertyExpression(item2)) {
                    return 0;
                }
                if (propertyExpression(item1) < propertyExpression(item2)) {
                    return 1;
                }
            }
        };
        return (this instanceof OrderedList ? (this.array) : (this)).sort(compareFunction);
    };
    /**
     * Performs a subsequent ordering of the elements in a sequence in ascending order according to a key.
     */
    Array.prototype.ThenBy = function (keySelector) {
        return (this instanceof OrderedList ? (this.array) : (this)).OrderBy(keySelector);
    };
    /**
     * Performs a subsequent ordering of the elements in a sequence in descending order, according to a key.
     */
    Array.prototype.ThenByDescending = function (keySelector) {
        return (this instanceof OrderedList ? (this.array) : (this)).OrderByDescending(keySelector);
    };
    /**
     * Removes the first occurrence of a specific object from the List<T>.
     */
    Array.prototype.Remove = function (element) {
        let th = (this instanceof OrderedList ? (this.array) : (this));
        return th.IndexOf(element) !== -1
            ? (th.RemoveAt(th.IndexOf(element)), true)
            : false;
    };
    /**
     * Removes all the elements that match the conditions defined by the specified predicate.
     */
    Array.prototype.RemoveAll = function (predicate) {
        return (this instanceof OrderedList ? (this.array) : (this)).Where(negate(predicate));
    };
    /**
     * Removes the element at the specified index of the List<T>.
     */
    Array.prototype.RemoveAt = function (index) {
        return (this instanceof OrderedList ? (this.array) : (this)).splice(index, 1);
    };
    /*
     * Removes the element at the specified index of the List<T>.
     */
    Array.prototype.RemoveRange = function (index, count) {
        return (this instanceof OrderedList ? (this.array) : (this)).splice(index, count);
    };
    /**
     * Reverses the order of the elements in the entire List<T>.
     */
    Array.prototype.Reverse = function () {
        let retArr = [];
        retArr = (this instanceof OrderedList ? (this.array) : (this)).reverse();
        return retArr;
    };
    /**
     * Projects each element of a sequence into a new form.
     */
    Array.prototype.Select = function (selector) {
        return (this instanceof OrderedList ? (this.array) : (this)).map(selector);
        //return new Array<TOut>(this._elements.map(selector));
    };
    /**
     * Projects each element of a sequence to a List<any> and flattens the resulting sequences into one sequence.
     */
    Array.prototype.SelectMany = function (selector) {
        let th = (this instanceof OrderedList ? (this.array) : (this));
        return th.Aggregate((ac, v, i) => (ac.AddRange(th.Select(selector)
            .ElementAt(i)
            .ToArray()),
            ac), new Array());
    };
    /**
     * Determines whether two sequences are equal by comparing the elements by using the default equality comparer for their type.
     */
    Array.prototype.SequenceEqual = function (list) {
        return !!(this instanceof OrderedList ? (this.array) : (this)).reduce((x, y, z) => (list[z] === y ? x : undefined));
    };
    /**
     * Returns the only element of a sequence, and throws an exception if there is not exactly one element in the sequence.
     */
    Array.prototype.Single = function (predicate) {
        let th = (this instanceof OrderedList ? (this.array) : (this));
        if (th.Count(predicate) !== 1) {
            console.log('Single - ' + 'The collection does not contain exactly one element.');
            throw new Error('The collection does not contain exactly one element.');
        }
        else {
            return th.First(predicate);
        }
    };
    /**
     * Returns the only element of a sequence, or a default value if the sequence is empty;
     * this method throws an exception if there is more than one element in the sequence.
     */
    Array.prototype.SingleOrDefault = function (predicate) {
        let th = (this instanceof OrderedList ? (this.array) : (this));
        return th.Count(predicate) ? th.Single(predicate) : undefined;
    };
    /**
     * Bypasses a specified number of elements in a sequence and then returns the remaining elements.
     */
    Array.prototype.Skip = function (amount) {
        return (this instanceof OrderedList ? (this.array) : (this)).slice(Math.max(0, amount));
    };
    /**
     * Bypasses elements in a sequence as long as a specified condition is true and then returns the remaining elements.
     */
    Array.prototype.SkipWhile = function (predicate) {
        let th = (this instanceof OrderedList ? (this.array) : (this));
        return th.Skip(th.Aggregate((ac, val) => (predicate(th.ElementAt(ac)) ? ++ac : ac), 0));
    };
    /**
     * Computes the sum of the sequence of number values that are obtained by invoking
     * a transform function on each element of the input sequence.
     */
    Array.prototype.Sum = function (transform) {
        let th = (this instanceof OrderedList ? (this.array) : (this));
        return transform
            ? th.Select(transform).Sum()
            : th.Aggregate((ac, v) => (ac += +v), 0);
    };
    /**
     * Returns a specified number of contiguous elements from the start of a sequence.
     */
    Array.prototype.Take = function (amount) {
        return (this instanceof OrderedList ? (this.array) : (this)).slice(0, Math.max(0, amount));
    };
    /**
     * Returns elements from a sequence as long as a specified condition is true.
     */
    Array.prototype.TakeWhile = function (predicate) {
        let th = (this instanceof OrderedList ? (this.array) : (this));
        return th.Take(th.Aggregate((ac) => (predicate(th.ElementAt(ac)) ? ++ac : ac), 0));
    };
    /**
     * Copies the elements of the List<T> to a new array.
     */
    Array.prototype.ToArray = function () {
        return (this instanceof OrderedList ? (this.array) : (this));
    };
    /**
     * Creates a Dictionary<TKey, TValue> from a List<T> according to a specified key selector function.
     */
    Array.prototype.ToDictionary = function (key, value) {
        let th = (this instanceof OrderedList ? (this.array) : (this));
        return th.Aggregate((dicc, v, i) => {
            dicc[th.Select(key)
                .ElementAt(i)
                .toString()] = value ? th.Select(value).ElementAt(i) : v;
            dicc.Add({
                Key: th.Select(key).ElementAt(i),
                Value: value ? th.Select(value).ElementAt(i) : v
            });
            return dicc;
        }, new Array());
    };
    /**
     * Creates a List<T> from an Enumerable.List<T>.
     */
    Array.prototype.ToList = function () {
        return this;
    };
    /**
     * Creates a Lookup<TKey, TElement> from an IEnumerable<T> according to specified key selector and element selector functions.
     */
    Array.prototype.ToLookup = function (keySelector, elementSelector) {
        return (this instanceof OrderedList ? (this.array) : (this)).GroupBy(keySelector, elementSelector);
    };
    /**
     * Produces the set union of two sequences by using the default equality comparer.
     */
    Array.prototype.Union = function (list) {
        return (this instanceof OrderedList ? (this.array) : (this)).Concat(list).Distinct();
    };
    /**
     * Filters a sequence of values based on a predicate.
     */
    Array.prototype.Where = function (predicate) {
        return (this instanceof OrderedList ? (this.array) : (this)).filter(predicate);
    };
    /**
     * Applies a specified function to the corresponding elements of two sequences, producing a sequence of the results.
     */
    Array.prototype.Zip = function (list, result) {
        let th = (this instanceof OrderedList ? (this.array) : (this));
        return list.Count() < this.Count()
            ? list.Select((x, y) => result(th.ElementAt(y), x))
            : th.Select((x, y) => result(x, list.ElementAt(y)));
    };
    /**
     * Creates a function that negates the result of the predicate
     */
})();
/**
 * Creates a function that negates the result of the predicate
 */
const negate = (predicate) => (...args) => !predicate(...args);
/**
 * Checks if the argument passed is an object
 */
const isObj = (x) => typeof x === 'object';
/**
 * Returns the index of the first item matching the predicate
 */
const findIndex = f => xs => xs.reduceRight((x, y, i) => (f(y) ? i : x));
/**
 * Determine if two objects are equal
 */
const equal = (a, b) => Object.keys(a).every(key => (isObj(a[key]) ? equal(b[key], a[key]) : b[key] === a[key]));
const compare = (a, b, _keySelector, descending) => {
    const sortKeyA = _keySelector(a);
    const sortKeyB = _keySelector(b);
    if (sortKeyA > sortKeyB) {
        return !descending ? 1 : -1;
    }
    else if (sortKeyA < sortKeyB) {
        return !descending ? -1 : 1;
    }
    else {
        return 0;
    }
};
const keyComparer = (_keySelector, descending) => (a, b) => compare(a, b, _keySelector, descending);
const composeComparers = (previousComparer, currentComparer) => (a, b) => previousComparer(a, b) || currentComparer(a, b);
class OrderedList extends Array {
    constructor(elements, _comparer) {
        super();
        this._comparer = _comparer;
        this.array = [];
        this.array = elements;
        TimSort.sort(this.array, this._comparer);
    }
    /**
     * Performs a subsequent ordering of the elements in a sequence in ascending order according to a key.
     * @override
     */
    ThenBy(keySelector) {
        return new OrderedList(this.array, composeComparers(this._comparer, keyComparer(keySelector, false)));
    }
    /**
     * Performs a subsequent ordering of the elements in a sequence in descending order, according to a key.
     * @override
     */
    ThenByDescending(keySelector) {
        return new OrderedList(this.array, composeComparers(this._comparer, keyComparer(keySelector, true)));
    }
}
