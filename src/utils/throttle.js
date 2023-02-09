import throttledQueue from 'throttled-queue'

let throttledQ
const createThrottledQueue = ({
  throttleLimit = 3,
  throttleInterval = 125,
  throttleStrict = false
}) => {
  throttledQ = throttledQueue(throttleLimit, throttleInterval, throttleStrict)
  return throttledQ
}

const throttleFetch = async (url, options) => {
  const throttle = throttledQ ?? createThrottledQueue(options)
  const resolveFetch = options.custom_fetch ?? fetch
  return throttle(() => resolveFetch(url, options))
}
export default throttleFetch
