import https from 'node:https'
import throttledQueue from 'throttled-queue'

let httpsAgent
let throttle

export const configure = options => {
  throttle = throttledQueue(
    Number(options.throttleLimit) || 6,
    Number(options.throttleInterval) || 250
  )

  httpsAgent = new https.Agent({
    keepAlive: options.httpKeepAlive,
    keepAliveMsecs: options.httpKeepAliveInterval || 10000
  })
}

async function debugFetch(url, options) {

  const response = await throttle(async () => globalThis.fetch(url, options))
  const responseBody = await response.text()

  response.text = () => Promise.resolve(responseBody)

  return response
}

async function keepAliveFetch(url, options) {
  // eslint-disable-next-line no-param-reassign
  options.agent = () => httpsAgent
  return debugFetch(url, options)
}

export async function throttleFetch(url, options) {
  return keepAliveFetch(url, options)
}

