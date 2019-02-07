export { }

declare global { // to access the global type String
    interface Array<T> {
        /**
         * Adds the elements of the specified collection to the end of the List<T>.
         */
        AddRange(elements: T[]): void;
    }
}

Array.prototype.AddRange = function <T>(e: T[]): void {
    for (let i = 0; i < this.length; i++) {
        this.push(e[i]);
    }
};
