import { lazy } from "react"
/**
 * A workaround, because React.lazy does not allow named exports
 * thanks @JLarky
 * @see https://github.com/facebook/react/issues/14603
 * @param loader @see
 * @returns
 */
export const lazily = <T extends {}, U extends keyof T>(loader: (x?: string) => Promise<T>) =>
  new Proxy({} as unknown as T, {
    get: (target, componentName: string | symbol) => {
      if (typeof componentName === "string") {
        return lazy(() =>
          loader(componentName).then((x) => ({
            default: x[componentName as U] as any as React.ComponentType<any>
          }))
        )
      }
    }
  })