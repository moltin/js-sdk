import throttleFetch from './throttle'

const resolveFetchMethod = options => {
  const { custom_fetch, throttleEnabled } = options
  const isCustomFetch = custom_fetch ?? fetch
  return throttleEnabled ? throttleFetch : isCustomFetch
}
export default resolveFetchMethod
