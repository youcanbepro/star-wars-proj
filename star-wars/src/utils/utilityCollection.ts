

/**
 * Returns array of well-defined keys of the given object.
 * @param obj
 * @returns Typed string Array
 * @see https://stackoverflow.com/a/55012175/16036824
 */
export const keys = <T extends object>(obj: T) => {
    return Object.keys(obj) as (keyof T)[]
  }