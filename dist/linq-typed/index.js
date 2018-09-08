/*
This library is fork from   https://github.com/kutyel/linq.ts
https://www.npmjs.com/package/linqts
*/
(function () {
    /*
        Adds an object to the end of the List<T>.
    */
    Array.prototype.Add = function (element) {
        this.push(element);
    };
    /**
     * Adds the elements of the specified collection to the end of the List<T>.
     */
    Array.prototype.AddRange = function (elements) {
        this.push.apply(this, elements);
    };
    /**
     * Applies an accumulator function over a sequence.
     */
    Array.prototype.Aggregate = function (accumulator, initialValue) {
        return this.reduce(accumulator, initialValue);
    };
    /**
     * Determines whether all elements of a sequence satisfy a condition.
     */
    Array.prototype.All = function (predicate) {
        return this.every(predicate);
    };
    /**
     * Determines whether a sequence contains any elements.
     */
    Array.prototype.Any = function (predicate) {
        return predicate ? this.some(predicate) : this.length > 0;
    };
    /**
     * Computes the average of a sequence of number values that are obtained by invoking
     * a transform function on each element of the input sequence.
     */
    Array.prototype.Average = function (transform) {
        return this.Sum(transform) / this.Count(transform);
    };
    /**
     * Casts the elements of a sequence to the specified type.
     */
    Array.prototype.Cast = function () {
        return new Array(this);
    };
    /**
     * Concatenates two sequences.
     */
    Array.prototype.Concat = function (list) {
        return new Array(this.concat(list.ToArray()));
    };
    /**
     * Determines whether an element is in the List<T>.
     */
    Array.prototype.Contains = function (element) {
        return this.some(function (x) { return x === element; });
    };
    /**
     * Returns the number of elements in a sequence.
     */
    Array.prototype.Count = function (predicate) {
        return predicate ? this.Where(predicate).Count() : this.length;
    };
    /**
     * Returns the elements of the specified sequence or the type parameter's default value
     * in a singleton collection if the sequence is empty.
     */
    Array.prototype.DefaultIfEmpty = function (defaultValue) {
        return this.Count() ? this : defaultValue ? new Array(defaultValue) : new Array();
    };
    /**
     * Returns distinct elements from a sequence by using the default equality comparer to compare values.
     */
    Array.prototype.Distinct = function () {
        return this.Where(function (value, index, iter) { return iter.indexOf(value) === index; });
    };
    /**
     * Returns distinct elements from a sequence according to specified key selector.
     */
    Array.prototype.DistinctBy = function (keySelector) {
        var groups = this.GroupBy(keySelector, function (obj) { return obj; });
        var results = new Array();
        // tslint:disable-next-line:prefer-const
        for (var index in groups) {
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
        if (index < this.Count()) {
            return this[index];
        }
        else {
            console.log();
            var MSG = 'ArgumentOutOfRangeException: index is less than 0 or greater than or equal to the number of elements in source.';
            console.log('ElementAt - ' + MSG);
            throw new Error(MSG);
        }
    };
    /**
     * Returns the element at a specified index in a sequence or a default value if the index is out of range.
     */
    Array.prototype.ElementAtOrDefault = function (index) {
        return this.ElementAt(index) || undefined;
    };
    /**
     * Produces the set difference of two sequences by using the default equality comparer to compare values.
     */
    Array.prototype.Except = function (source) {
        return this.Where(function (x) { return !source.Contains(x); });
    };
    /**
     * Returns the first element of a sequence.
     */
    // Array.prototype.First(predicate: (value?: T, index?: number, list?: T[]) => boolean): T
    Array.prototype.First = function (predicate) {
        if (this.Count()) {
            return predicate ? this.Where(predicate)[0] : this[0];
        }
        else {
            throw new Error('InvalidOperationException: The source sequence is empty.');
        }
    };
    /**
     * Returns the first element of a sequence, or a default value if the sequence contains no elements.
     */
    Array.prototype.FirstOrDefault = function (predicate) {
        return this.Count(predicate) ? this.First(predicate) : undefined;
    };
    /**
     * Performs the specified action on each element of the List<T>.
     */
    Array.prototype.ForEach = function (action) {
        return this.forEach(action);
    };
    /**
     * Groups the elements of a sequence according to a specified key selector function.
     */
    Array.prototype.GroupBy = function (grouper, mapper) {
        return this.Aggregate(function (ac, v) { return (ac[grouper(v)]
            ? ac[grouper(v)].push(mapper(v))
            : (ac[grouper(v)] = [mapper(v)]),
            ac); }, {});
    };
    /**
     * Correlates the elements of two sequences based on equality of keys and groups the results.
     * The default equality comparer is used to compare keys.
     */
    Array.prototype.GroupJoin = function (list, key1, key2, result) {
        return this.Select(function (x) {
            return result(x, list.Where(function (z) { return key1(x) === key2(z); }));
        });
    };
    /*
    Returns sub range
    */
    Array.prototype.GetRange = function (index, count) {
        // tslint:disable-next-line:prefer-const
        var result = new Array();
        for (var i = 0; i < count; i++) {
            result.push(this[index + i]);
        }
        return result;
    };
    /**
     * Returns the index of the first occurence of an element in the List.
     */
    Array.prototype.IndexOf = function (element) {
        return this.indexOf(element);
    };
    /**
     * Inserts an element into the List<T> at the specified index.
     */
    Array.prototype.Insert = function (index, element) {
        if (index < 0 || index > this.length) {
            throw new Error('Index is out of range.');
        }
        this.splice(index, 0, element);
    };
    /**
     * Produces the set intersection of two sequences by using the default equality comparer to compare values.
     */
    Array.prototype.Intersect = function (source) {
        return this.Where(function (x) { return source.Contains(x); });
    };
    /**
     * Correlates the elements of two sequences based on matching keys. The default equality comparer is used to compare keys.
     */
    Array.prototype.Join = function (list, key1, key2, result) {
        return this.SelectMany(function (x) {
            return list.Where(function (y) { return key2(y) === key1(x); }).Select(function (z) { return result(x, z); });
        });
    };
    /**
     * Returns the last element of a sequence.
     */
    Array.prototype.Last = function (predicate) {
        if (this.Count()) {
            return predicate ? this.Where(predicate).Last() : this[this.Count() - 1];
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
        return this.Count(predicate) ? this.Last(predicate) : undefined;
    };
    /**
     * Returns the maximum value in a generic sequence.
     */
    Array.prototype.Max = function () {
        return this.Aggregate(function (x, y) { return (x > y ? x : y); });
    };
    /**
     * Returns the element with maximum value in a generic sequence.
     */
    Array.prototype.MaxBy = function (keySelector) {
        return this.OrderByDescending(keySelector).FirstOrDefault();
    };
    /**
     * Returns the minimum value in a generic sequence.
     */
    Array.prototype.Min = function () {
        return this.Aggregate(function (x, y) { return (x < y ? x : y); });
    };
    /**
     * Returns the element with minimum value in a generic sequence.
     */
    Array.prototype.MinBy = function (keySelector) {
        return this.OrderBy(keySelector).FirstOrDefault();
    };
    /**
     * Sorts the elements of a sequence in ascending order according to a key.
     */
    Array.prototype.OrderBy = function (propertyExpression) {
        var compareFunction = function (item1, item2) {
            if (propertyExpression(item1) > propertyExpression(item2)) {
                return 1;
            }
            if (propertyExpression(item2) > propertyExpression(item1)) {
                return -1;
            }
            return 0;
        };
        return this.sort(compareFunction);
    };
    /**
     * Sorts the elements of a sequence in descending order according to a key.
     */
    Array.prototype.OrderByDescending = function (propertyExpression) {
        var compareFunction = function (item1, item2) {
            if (propertyExpression(item1) > propertyExpression(item2)) {
                return -1;
            }
            if (propertyExpression(item2) > propertyExpression(item1)) {
                return 1;
            }
            return 0;
        };
        return this.sort(compareFunction);
    };
    /**
     * Sorts the elements of a sequence in descending order according to a several key.
     */
    Array.prototype.OrderByMany = function (propertyExpressions) {
        var compareFunction = function (item1, item2) {
            for (var i = 0; i < propertyExpressions.length; i++) {
                var propertyExpression = propertyExpressions[i];
                if (propertyExpression(item1) > propertyExpression(item2)) {
                    return 1;
                }
                if (propertyExpression(item2) > propertyExpression(item1)) {
                    return -1;
                }
            }
            return 0;
        };
        return this.sort(compareFunction);
    };
    /**
     * Sorts the elements of a sequence in descending order according to a key.
     */
    Array.prototype.OrderByManyDescending = function (propertyExpressions) {
        var compareFunction = function (item1, item2) {
            for (var i = 0; i < propertyExpressions.length; i++) {
                var propertyExpression = propertyExpressions[i];
                if (propertyExpression(item1) > propertyExpression(item2)) {
                    return -1;
                }
                if (propertyExpression(item2) > propertyExpression(item1)) {
                    return 1;
                }
            }
            return 0;
        };
        return this.sort(compareFunction);
    };
    /**
     * Performs a subsequent ordering of the elements in a sequence in ascending order according to a key.
     */
    Array.prototype.ThenBy = function (keySelector) {
        return this.OrderBy(keySelector);
    };
    /**
     * Performs a subsequent ordering of the elements in a sequence in descending order, according to a key.
     */
    Array.prototype.ThenByDescending = function (keySelector) {
        return this.OrderByDescending(keySelector);
    };
    /**
     * Removes the first occurrence of a specific object from the List<T>.
     */
    Array.prototype.Remove = function (element) {
        return this.IndexOf(element) !== -1
            ? (this.RemoveAt(this.IndexOf(element)), true)
            : false;
    };
    /**
     * Removes all the elements that match the conditions defined by the specified predicate.
     */
    Array.prototype.RemoveAll = function (predicate) {
        var retVal = false;
        // tslint:disable-next-line:prefer-const
        for (var _i = 0, _a = this.Where(predicate); _i < _a.length; _i++) {
            var item = _a[_i];
            this.Remove(item);
            retVal = true;
        }
        return retVal;
    };
    /**
     * Removes the element at the specified index of the List<T>.
     */
    Array.prototype.RemoveAt = function (index) {
        return this.splice(index, 1);
    };
    /*
     * Removes the element at the specified index of the List<T>.
     */
    Array.prototype.RemoveRange = function (index, count) {
        return this.splice(index, count);
    };
    /**
     * Reverses the order of the elements in the entire List<T>.
     */
    Array.prototype.Reverse = function () {
        return new Array(this.reverse());
    };
    /**
     * Projects each element of a sequence into a new form.
     */
    Array.prototype.Select = function (mapper) {
        return this.map(mapper);
    };
    /**
     * Projects each element of a sequence to a List<any> and flattens the resulting sequences into one sequence.
     */
    Array.prototype.SelectMany = function (mapper) {
        var _this = this;
        return this.Aggregate(function (ac, v, i) { return (ac.AddRange(_this.Select(mapper)
            .ElementAt(i)
            .ToArray()),
            // tslint:disable-next-line:no-unused-expression
            ac,
            v); }, new Array());
    };
    /**
     * Determines whether two sequences are equal by comparing the elements by using the default equality comparer for their type.
     */
    Array.prototype.SequenceEqual = function (list) {
        return !!this.reduce(function (x, y, z) { return (list[z] === y ? x : undefined); });
    };
    /**
     * Returns the only element of a sequence, and throws an exception if there is not exactly one element in the sequence.
     */
    Array.prototype.Single = function (predicate) {
        if (this.Count(predicate) !== 1) {
            console.log('Single - ' + 'The collection does not contain exactly one element.');
            throw new Error('The collection does not contain exactly one element.');
        }
        else {
            return this.First(predicate);
        }
    };
    /**
     * Returns the only element of a sequence, or a default value if the sequence is empty;
     * this method throws an exception if there is more than one element in the sequence.
     */
    Array.prototype.SingleOrDefault = function (predicate) {
        return this.Count(predicate) ? this.Single(predicate) : undefined;
    };
    /**
     * Bypasses a specified number of elements in a sequence and then returns the remaining elements.
     */
    Array.prototype.Skip = function (amount) {
        return this.slice(Math.max(0, amount));
    };
    /**
     * Bypasses elements in a sequence as long as a specified condition is true and then returns the remaining elements.
     */
    Array.prototype.SkipWhile = function (predicate) {
        var _this = this;
        return this.Skip(this.Aggregate(function (ac) { return (predicate(_this.ElementAt(ac)) ? ++ac : ac); }, 0));
    };
    /**
     * Computes the sum of the sequence of number values that are obtained by invoking
     * a transform function on each element of the input sequence.
     */
    Array.prototype.Sum = function (transform) {
        return transform
            ? this.Select(transform).Sum()
            : this.Aggregate(function (ac, v) { return (ac += +v); }, 0);
    };
    /**
     * Returns a specified number of contiguous elements from the start of a sequence.
     */
    Array.prototype.Take = function (amount) {
        return this.slice(0, Math.max(0, amount));
    };
    /**
     * Returns elements from a sequence as long as a specified condition is true.
     */
    Array.prototype.TakeWhile = function (predicate) {
        var _this = this;
        return this.Take(this.Aggregate(function (ac) { return (predicate(_this.ElementAt(ac)) ? ++ac : ac); }, 0));
    };
    /**
     * Copies the elements of the List<T> to a new array.
     */
    Array.prototype.ToArray = function () {
        return this;
    };
    /**
     * Creates a Dictionary<TKey, TValue> from a List<T> according to a specified key selector function.
     */
    Array.prototype.ToDictionary = function (key, value) {
        var _this = this;
        return this.Aggregate(function (o, v, i) { return ((o[_this.Select(key)
            .ElementAt(i)
            .toString()] = value ? _this.Select(value).ElementAt(i) : v),
            o); }, {});
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
        return this.GroupBy(keySelector, elementSelector);
    };
    /**
     * Produces the set union of two sequences by using the default equality comparer.
     */
    Array.prototype.Union = function (list) {
        return this.Concat(list).Distinct();
    };
    /**
     * Filters a sequence of values based on a predicate.
     */
    Array.prototype.Where = function (predicate) {
        return this.filter(predicate);
    };
    /**
     * Applies a specified function to the corresponding elements of two sequences, producing a sequence of the results.
     */
    Array.prototype.Zip = function (list, result) {
        var _this = this;
        return list.Count() < this.Count()
            ? list.Select(function (x, y) { return result(_this.ElementAt(y), x); })
            : this.Select(function (x, y) { return result(x, list.ElementAt(y)); });
    };
    /**
     * Creates a function that negates the result of the predicate
     */
    Array.prototype._negate = function (predicate) {
        return function () {
            return !predicate.apply(this, arguments);
        };
    };
})();
