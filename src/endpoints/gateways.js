import BaseExtend from '../extends/base';

class GatewaysEndpoint extends BaseExtend {
  constructor(endpoint) {
    super(endpoint);

    this.endpoint = 'gateways';
  }

  List() {
    return this.request.send(`${this.endpoint}`, 'GET');
  }

  Update(slug, body) {
    return this.request.send(`${this.endpoint}/${slug}`, 'PUT', body);
  }

  Enabled(slug, enabled) {
    return this.request.send(`${this.endpoint}/${slug}`, 'PUT', {
      type: 'gateway',
      enabled: enabled
    });
  }
}

export default GatewaysEndpoint;
