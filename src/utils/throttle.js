import https from 'node:https'
import throttledQueue from 'throttled-queue'

let httpsAgent
let throttle

export const configure = options => {
  throttle = throttledQueue(
    Number(options.throttleLimit),
    Number(options.throttleInterval),
    options.throttleStrict
  )

  httpsAgent = new https.Agent({
    keepAlive: options.httpKeepAlive,
    keepAliveMsecs: options.httpKeepAliveInterval
  })
}

const wrapFetch = async (url, options) => {
  const response = await throttle(async () => globalThis.fetch(url, options))
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
