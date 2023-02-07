import throttleFetch from './throttle'

const resolveFetchMethod = ({ custom_fetch, throttleRequests }) => {
  const resolvedFetch = custom_fetch ?? fetch
  return throttleRequests ? throttleFetch(resolvedFetch) : resolvedFetch
}
export default resolveFetchMethod
