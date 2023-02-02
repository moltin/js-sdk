import https from 'node:https'
import throttledQueue from 'throttled-queue'

let httpsAgent
let throttle
let customFetch
export const configure = options => {
  customFetch = options.custom_fetch

  throttle = throttledQueue(
    options.throttleLimit,
    options.throttleInterval,
    options.throttleStrict
  )

  httpsAgent = new https.Agent({
    keepAlive: options.httpKeepAlive,
    keepAliveMsecs: options.httpKeepAliveInterval
  })
}

const wrapFetch = async (url, options) => {
  let response
  if (customFetch) {
    response = await throttle(async () => customFetch(url, options))
  } else {
    response = await throttle(async () => globalThis.fetch(url, options))
  }
  const responseBody = await response.text()

  response.text = () => Promise.resolve(responseBody)

  return response
}

const keepAliveFetch = async (url, options) => {
  // eslint-disable-next-line no-param-reassign
  options.agent = () => httpsAgent
  return wrapFetch(url, options)
}

export const throttleFetch = async (url, options) =>
  keepAliveFetch(url, options)
