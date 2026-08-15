/**
 * timsort ships no type declarations and there is no @types/timsort.
 *
 * This has to live in its own .d.ts: a shorthand ambient module declaration is
 * only legal at the top level of a global script or a declaration file, and
 * src/index.ts is now a module (it has imports, which is what lets it use
 * `declare global`).
 */
declare module "timsort" {
  export function sort<T>(
    array: T[],
    compare?: (a: T, b: T) => number,
    lo?: number,
    hi?: number
  ): void;
}
