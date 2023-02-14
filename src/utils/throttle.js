import throttledQueue from 'throttled-queue'

/**
 * Cached throttle queue
 */
let throttleQueue

const createThrottledQueue = options => {
  const { throttleLimit, throttleInterval } = options
  return throttledQueue(throttleLimit || 3, throttleInterval || 125)
}

export const throttleFetch = resolveFetch => async (url, options) => {
  if (throttleQueue === undefined) {
    throttleQueue = createThrottledQueue(options)
  }
  return throttleQueue(() => resolveFetch(url, options))
}
