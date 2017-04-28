import StorageFactory from './storage';

import { setHeaderContentType, buildRequestBody } from '../utils/helpers';

class RequestFactory {
  constructor(config) {
    this.config = config;

    this.storage = new StorageFactory();
  }

  authenticate() {
    const config = this.config;
    const storage = this.storage;

    if (!config.client_id) {
      throw new Error('You must have a client_id set');
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
      .then((response) => {
        if (response.status === 200) {
          const data = response.json();

          resolve(data);
        }
      })
      .then(null, error => reject(error));
    });

    promise.then((data) => {
      storage.set('mtoken', data.access_token);
      storage.set('mexpires', data.expires);
    });

    return promise;
  }

  send(uri, method, body) {
    const config = this.config;
    const storage = this.storage;

    const promise = new Promise((resolve, reject) => {
      const req = () => {
        const headers = {
          Authorization: `Bearer: ${storage.get('mtoken')}`,
          'Content-Type': setHeaderContentType(uri, method),
          'X-MOLTIN-SDK-LANGUAGE': config.sdk.language,
          'X-MOLTIN-SDK-VERSION': config.sdk.version,
        };

        if (config.currency) {
          headers['X-MOLTIN-CURRENCY'] = config.currency;
        }

        fetch(`${config.protocol}://${config.host}/${config.version}/${uri}`, {
          method: method.toUpperCase(),
          headers,
          body: buildRequestBody(method, body),
        })
        .then((response) => {
          resolve(response.json());
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
