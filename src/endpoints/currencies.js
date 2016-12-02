import Abstract from '../abstract';
import StorageFactory from '../factories/storage';

class CurrenciesEndpoint extends Abstract {
  constructor(endpoint) {
    super(endpoint);

    this.endpoint = 'currencies';
    this.storage = new StorageFactory();
  }

  Set(currency) {
    const storage = this.storage;
    const config = this.config;

    storage.set('mcurrency', currency);
    config.currency = currency;

    const promise = new Promise((resolve, reject) => {
      const request = storage.get('mcurrency');

      try {
        resolve(request);
      } catch(err) {
        reject(new Error(err));
      }
    });

    return promise;
  }

  Active() {
    const storage = this.storage;

    const promise = new Promise((resolve, reject) => {
      const request = storage.get('mcurrency');

      try {
        resolve(request);
      } catch(err) {
        reject(new Error(err));
      }
    });

    return promise;
  }
}

export default CurrenciesEndpoint;
