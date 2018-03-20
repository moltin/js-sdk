import { buildRequestBody, parseJSON } from '../utils/helpers';

class RequestFactory {
  constructor(config) {
    this.config = config;
  }

  authenticate() {
    const { config } = this;

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

    return promise;
  }

  send(uri, method, body = undefined, token = undefined) {
    const { config } = this;

    const promise = new Promise((resolve, reject) => {
      const req = (access_token) => {
        const headers = {
          Authorization: `Bearer: ${access_token}`,
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

      return this.authenticate()
      .then(({ access_token }) => req(access_token))
      .catch(error => reject(error));
    });

    return promise;
  }
}

export default RequestFactory;
