import throttledQueue from 'throttled-queue'

let throttle
export const createThrottledQueue = options => {
  const { throttleLimit, throttleInterval } = options
  throttle = throttledQueue(throttleLimit || 3, throttleInterval || 125)
}

const throttleFetch = resolveFetch => async (url, options) =>
  throttle(() => resolveFetch(url, options))
export default throttleFetch
