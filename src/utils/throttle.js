import throttledQueue from 'throttled-queue'

/**
 * Cached throttle queue
 */
let throttleQueue

export const throttleFetch =
  (resolveFetch, throttleLimit, throttleInterval) => async (url, options) => {
    if (throttleQueue === undefined) {
      throttleQueue = throttledQueue(throttleLimit, throttleInterval)
    }
    return throttleQueue(() => resolveFetch(url, options))
  }
