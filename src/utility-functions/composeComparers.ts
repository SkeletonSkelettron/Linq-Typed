export const composeComparers = <T>(
    previousComparer: (a: T, b: T) => number,
    currentComparer: (a: T, b: T) => number
): ((a: T, b: T) => number) => (a: T, b: T) =>
        previousComparer(a, b) || currentComparer(a, b)
