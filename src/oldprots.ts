







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
