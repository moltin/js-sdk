import throttledQueue from 'throttled-queue'

let throttledQ
const createThrottledQueue = ({
  throttleLimit = 3,
  throttleInterval = 125
}) => {
  throttledQ = throttledQueue(throttleLimit, throttleInterval)
  return throttledQ
}

const throttleFetch = async (url, options) => {
  const throttle = throttledQ ?? createThrottledQueue(options)
  const resolveFetch = options.custom_fetch ?? fetch
  return throttle(() => resolveFetch(url, options))
}
export default throttleFetch
