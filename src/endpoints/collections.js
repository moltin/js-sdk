import Abstract from '../abstract';

class CollectionsEndpoint extends Abstract {
  constructor(endpoint) {
    super(endpoint);

    this.endpoint = 'collections';
  }
}

export default CollectionsEndpoint;
