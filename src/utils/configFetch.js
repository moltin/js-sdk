import throttleFetch, { createThrottledQueue } from './throttle'

const resolveFetchMethod = options => {
  createThrottledQueue(options)
  const { custom_fetch, throttleEnabled } = options
  const isCustomFetch = custom_fetch ?? fetch
  return throttleEnabled ? throttleFetch(isCustomFetch) : isCustomFetch
}
export default resolveFetchMethod
