import StorageFactory from './storage'
import { buildRequestBody, parseJSON } from '../utils/helpers'

class Credentials {
  constructor(client_id, access_token, expires) {
    this.client_id = client_id
    this.access_token = access_token
    this.expires = expires
  }

  toObject() {
    return {
      client_id: this.client_id,
      access_token: this.access_token,
      expires: this.expires
    }
  }
}

class RequestFactory {
  constructor(config) {
    this.config = config

    this.storage = new StorageFactory()
  }

  authenticate() {
    const { config, storage } = this

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

    const promise = new Promise((resolve, reject) => {
      fetch(`${config.protocol}://${config.host}/${config.auth.uri}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
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

    promise.then(response => {
      const credentials = new Credentials(
        config.client_id,
        response.access_token,
        response.expires
      )
      storage.set('moltinCredentials', JSON.stringify(credentials))
    })

    return promise
  }

  send(uri, method, body = undefined, token = undefined) {
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

        if (config.application) {
          headers['X-MOLTIN-APPLICATION'] = config.application
        }

        if (config.currency) {
          headers['X-MOLTIN-CURRENCY'] = config.currency
        }

        if (token) {
          headers['X-MOLTIN-CUSTOMER-TOKEN'] = token
        }

        fetch(`${config.protocol}://${config.host}/${config.version}/${uri}`, {
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

    return promise
  }
}

export default RequestFactory
