/**
 * Returns array of well-defined keys of the given object.
 * @param obj
 * @returns Typed string Array
 * @see https://stackoverflow.com/a/55012175/16036824
 */
export const keys = <T extends object>(obj: T) => {
  return Object.keys(obj) as (keyof T)[];
};

type ValueOf<T> = T[keyof T];

export function getEnumKeyByEnumValue<R extends string | number, T extends { [key: string]: R }>(
  myEnum: T,
  enumValue: ValueOf<T>
): string {
  const keys = Object.keys(myEnum).filter((x) => myEnum[x] == enumValue);
  return keys.length > 0 ? keys[0] : "";
}
