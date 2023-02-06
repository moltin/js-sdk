import throttleFetch, { createThrottleQueue }  from './throttle'

const configureFetch = (custom_fetch, throttleRequests, options) => {
    let fetchMethod
    if (custom_fetch && throttleRequests) {
      createThrottleQueue(options)
      fetchMethod = throttleFetch
    } else if (custom_fetch) {
      fetchMethod = custom_fetch
    } else if (throttleRequests) {
      createThrottleQueue(options)
      fetchMethod = throttleFetch
    } else {
      fetchMethod = fetch
    }
    return fetchMethod
  }

  export default configureFetch