import { throttleFetch } from './throttle'

export const resolveFetchMethod = options => {
  const { custom_fetch, throttleEnabled, throttleLimit, throttleInterval } =
    options

  /**
   * Use custom fetch function if provided
   */
  const resolvedFetch = custom_fetch ?? fetch

  /**
   * Throttle the decided on fetch function if throttleEnabled option is true
   */
  return throttleEnabled
    ? throttleFetch(resolvedFetch, throttleLimit, throttleInterval)
    : resolvedFetch
}
