import throttledQueue from 'throttled-queue'

let throttle
export const createThrottleQueue = options => {
  throttle = throttledQueue(
    options.throttleLimit,
    options.throttleInterval,
    options.throttleStrict
  )
}

const wrapFetch = async (url, options) => {

  const { custom_fetch } = options

  const resolvedFetch = custom_fetch ?? globalThis.fetch

  const response = await throttle(async () => resolvedFetch(url, options))

  return response
}

const throttleFetch = async (url, options) => wrapFetch(url, options)
export default throttleFetch

