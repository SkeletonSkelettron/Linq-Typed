export { }

declare global { // to access the global type String
    interface Array<T> {
        /*
        *   Adds an object to the end of the List<T> or Array<T>.
        */
        Add(element: T): void;
    }
}

Array.prototype.Add = function <T>(e: T): void {
    this.push(e);
};
