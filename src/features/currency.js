class Currency extends Abstract {
  constructor(endpoint) {
    super(endpoint);

    this.endpoint = 'currencies';
  }

  Set(currency) {
    this.m.Storage.set('mcurrency', currency);
    this.m.config.currency = currency;

    const promise = new Promise((resolve, reject) => {
      const request = this.m.Storage.get('mcurrency');

      try {
        resolve(request);
      } catch(err) {
        reject(new Error(err));
      }
    });

    return promise;
  }

  Active() {
    const promise = new Promise((resolve, reject) => {
      const request = this.m.Storage.get('mcurrency');

      try {
        resolve(request);
      } catch(err) {
        reject(new Error(err));
      }
    });

    return promise;
  }
}
