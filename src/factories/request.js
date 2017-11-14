import StorageFactory from './storage';
import { buildRequestBody, parseJSON } from '../utils/helpers';

class RequestFactory {
  constructor(config) {
    this.config = config;

    this.storage = new StorageFactory();
  }

  authenticate() {
    const { config, storage } = this;

    if (!config.client_id) {
      throw new Error('You must have a client_id set');
    }

    if (!config.host) {
      throw new Error('You have not specified an API host');
    }

    const body = {
      grant_type: config.client_secret ? 'client_credentials' : 'implicit',
      client_id: config.client_id,
    };

    if (config.client_secret) {
      body.client_secret = config.client_secret;
    }

    const promise = new Promise((resolve, reject) => {
      fetch(`${config.protocol}://${config.host}/${config.auth.uri}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: Object.keys(body).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(body[k])}`).join('&'),
      })
      .then(parseJSON)
      .then((response) => {
        if (response.ok) {
          resolve(response.json);
        }

        reject(response.json);
      })
      .catch(error => reject(error));
    });

    promise.then((response) => {
      storage.set('mtoken', response.access_token);
      storage.set('mexpires', response.expires);
    });

    return promise;
  }

  send(uri, method, body = undefined, token = undefined) {
    const { config, storage } = this;

    const promise = new Promise((resolve, reject) => {
      const req = () => {
        const headers = {
          Authorization: `Bearer: ${storage.get('mtoken')}`,
          'Content-Type': 'application/json',
          'X-MOLTIN-SDK-LANGUAGE': config.sdk.language,
          'X-MOLTIN-SDK-VERSION': config.sdk.version,
        };

        if (config.application) {
          headers['X-MOLTIN-APPLICATION'] = config.application;
        }

        if (config.currency) {
          headers['X-MOLTIN-CURRENCY'] = config.currency;
        }

        if (token) {
          headers['X-MOLTIN-CUSTOMER-TOKEN'] = token;
        }

        /* eslint no-undef: "off" */
        fetch(`${config.protocol}://${config.host}/${config.version}/${uri}`, {
          method: method.toUpperCase(),
          headers,
          body: buildRequestBody(body),
        })
        .then(parseJSON)
        .then((response) => {
          if (response.ok) {
            resolve(response.json);
          }

          reject(response.json);
        })
        .catch(error => reject(error));
      };

      if (!storage.get('mtoken') || Date.now().toString() >= storage.get('mexpires')) {
        return this.authenticate()
        .then(req)
        .catch(error => reject(error));
      }

      return req();
    });

    return promise;
  }
}

export default RequestFactory;
