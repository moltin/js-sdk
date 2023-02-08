import throttleFetch from './throttle'

const resolveFetchMethod = ({ custom_fetch, throttleEnabled }) => {
  const resolvedFetch = custom_fetch ?? fetch
  return throttleEnabled ? throttleFetch(resolvedFetch) : resolvedFetch
}
export default resolveFetchMethod
