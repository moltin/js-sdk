import throttledQueue from 'throttled-queue'

const createThrottledQueue = ({
  throttleLimit = 3,
  throttleInterval = 125,
  throttleStrict = false
}) => {
  _throttledQueue = throttledQueue(
    throttleLimit,
    throttleInterval,
    throttleStrict
  )
  return _throttledQueue
}

const throttleFetch = fetch => async (url, options) => {
  const throttle = _throttledQueue ?? createThrottledQueue(options)
  return throttle(() => fetch(url, options))

}
export default throttleFetch

