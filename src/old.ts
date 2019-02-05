/*
This library is fork from   https://github.com/kutyel/linq.ts
https://www.npmjs.com/package/linqts
*/
'use strict';

const TimSort = require('timsort');

interface Array<T> {





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
