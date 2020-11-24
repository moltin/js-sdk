import { buildRequestBody, parseJSON, resetProps } from '../utils/helpers'

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

  send(uri, method, body = undefined, token = undefined, instance) {
    const { config, storage } = this

    const promise = new Promise((resolve, reject) => {
      const credentials = JSON.parse(storage.get('moltinCredentials'))
      const req = ({ access_token }) => {
        const headers = {
          Authorization: `Bearer: ${access_token}`,
          'Content-Type': 'application/json',
          'X-MOLTIN-SDK-LANGUAGE': config.sdk.language,
          'X-MOLTIN-SDK-VERSION': config.sdk.version
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

        const version = (instance && instance.version) || config.version

        fetch(`${config.protocol}://${config.host}/${version}/${uri}`, {
          method: method.toUpperCase(),
          headers,
          body: buildRequestBody(body)
        })
          .then(parseJSON)
          .then(response => {
            if (response.ok) {
              resolve(response.json)
            }

            reject(response.json)
          })
          .catch(error => reject(error))
      }

      if (
        !credentials ||
        !credentials.access_token ||
        credentials.client_id !== config.client_id ||
        Math.floor(Date.now() / 1000) >= credentials.expires
      ) {
        return this.authenticate()
          .then(() => req(JSON.parse(storage.get('moltinCredentials'))))
          .catch(error => reject(error))
      }
      return req(credentials)
    })

    if (instance) resetProps(instance)

    return promise
  }
}

export default RequestFactory
