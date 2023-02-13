import throttleFetch, { createThrottledQueue } from './throttle'

const resolveFetchMethod = options => {
  const { custom_fetch, throttleEnabled } = options
  if (throttleEnabled) {
    createThrottledQueue(options)
  }
  const isCustomFetch = custom_fetch ?? fetch
  return throttleEnabled ? throttleFetch(isCustomFetch) : isCustomFetch
}
export default resolveFetchMethod
