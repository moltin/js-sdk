import { FormData } from 'formdata-node'
import {
  buildRequestBody,
  parseJSON,
  resetProps,
  tokenInvalid,
  getCredentials
} from '../utils/helpers'

const createAuthRequest = config => {
  if (!config.client_id) {
    throw new Error('You must have a client_id set')
  }

  if (!config.host) {
    throw new Error('You have not specified an API host')
  }

  const body = {
    grant_type: config.client_secret ? 'client_credentials' : 'implicit',
    client_id: config.client_id
  }

  if (config.client_secret) {
    body.client_secret = config.client_secret
  }

  return new Promise((resolve, reject) => {
    config.auth.fetch
      .bind()(`${config.protocol}://${config.host}/${config.auth.uri}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'X-MOLTIN-SDK-LANGUAGE': config.sdk.language,
          'X-MOLTIN-SDK-VERSION': config.sdk.version
        },
        body: Object.keys(body)
          .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(body[k])}`)
          .join('&')
      })
      .then(parseJSON)
      .then(response => {
        if (response.ok) {
          resolve(response.json)
        }

        reject(response.json)
      })
      .catch(error => reject(error))
  })
}

class RequestFactory {
  constructor(config) {
    this.config = config
    this.storage = config.storage
  }

  authenticate() {
    const { config, storage } = this

    const promise = config.custom_authenticator
      ? config.custom_authenticator()
      : createAuthRequest(config)

    promise
      .then(({ access_token, refresh_token, expires }) => {
        const credentials = {
          client_id: config.client_id,
          access_token,
          expires,
          ...(refresh_token && { refresh_token })
        }

        storage.set('moltinCredentials', JSON.stringify(credentials))
      })
      .catch(() => {})

    return promise
  }

  send(
    uri,
    method,
    body = undefined,
    token = undefined,
    instance = undefined,
    wrapBody = true,
    version = null,
    additionalHeaders = undefined
  ) {
    const { config, storage } = this

    const promise = new Promise((resolve, reject) => {
      const credentials = getCredentials(storage)

      const req = cred => {
        const access_token = cred ? cred.access_token : null
        const isFormData = body instanceof FormData

        const headers = {
          'X-MOLTIN-SDK-LANGUAGE': config.sdk.language,
          'X-MOLTIN-SDK-VERSION': config.sdk.version
        }

        if (!isFormData) {
          // For form-data requests, don't provide a content-type header. The browser will generate one for you
          headers['Content-Type'] = 'application/json'
        }

        if (access_token) {
          headers.Authorization = `Bearer ${access_token}`
        }

        if (config.store_id) {
          headers['X-MOLTIN-AUTH-STORE'] = config.store_id
        }

        headers['X-MOLTIN-APPLICATION'] = config.application
          ? config.application
          : 'epcc sdk'

        if (config.currency) {
          headers['X-MOLTIN-CURRENCY'] = config.currency
        }

        if (config.language) {
          headers['X-MOLTIN-LANGUAGE'] = config.language
        }

        if (token) {
          headers['X-MOLTIN-CUSTOMER-TOKEN'] = token
        }

        if (config.headers) {
          Object.assign(headers, config.headers)
        }

        if (additionalHeaders) {
          Object.assign(headers, additionalHeaders)
        }

        const requestBody = () => {
          // form-data body should be sent raw
          if (isFormData) return body

          return wrapBody ? buildRequestBody(body) : JSON.stringify(body)
        }

        config.auth.fetch
          .bind()(
            `${config.protocol}://${config.host}/${
              version || config.version ? `${version || config.version}/` : ''
            }${uri}`,
            {
              method: method.toUpperCase(),
              headers,
              body: requestBody()
            }
          )
          .then(parseJSON)
          .then(response => {
            if (response.ok) {
              resolve(response.json)
            }
            reject(response.json)
          })
          .catch(error => reject(error))
      }

      if (tokenInvalid(config) && config.reauth && !config.store_id) {
        return this.authenticate()
          .then(() => req(getCredentials(storage)))
          .catch(error => reject(error))
      }
      return req(credentials)
    })

    if (instance) resetProps(instance)

    return promise
  }
}

export default RequestFactory
