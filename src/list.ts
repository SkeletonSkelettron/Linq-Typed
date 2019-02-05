import { getArray } from "./utility-fucntions/getArray";
import { composeComparers } from "./utility-fucntions/composeComparers";
import { keyComparer } from "./utility-fucntions/keyComparer";
'use strict';

// import TimSort = require('timsort');
export class List<T> {

    public _array: T[] = [];
    constructor(elements?: T[], private _comparer?: (a: T, b: T) => number) {
        if (elements) {
            this._array = elements;
        }
        if (this._comparer) {
            // TimSort.sort(this._array, this._comparer)
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
}