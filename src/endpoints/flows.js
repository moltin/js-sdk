import CatalogueExtend from '../extends/catalogue';

class FlowsEndpoint extends CatalogueExtend {
  constructor(endpoint) {
    super(endpoint);

    this.endpoint = 'flows';
  }

  GetEntries(slug) {
    return this.request.send(`${this.endpoint}/${slug}/entries`, 'GET');
  }

  GetEntry(slug, entryId) {
      return this.request.send(`${this.endpoint}/${slug}/entries/${entryId}`, 'GET');
  }

  CreateEntry(slug, body) {
    return this.request.send(`${this.endpoint}/${slug}/entries`, 'POST', body);
  }

  UpdateEntry(slug, entryId, body) {
    return this.request.send(`${this.endpoint}/${slug}/entries/${entryId}`, 'PUT', body);
  }

  DeleteEntry(slug, entryId) {
    return this.request.send(`${this.endpoint}/${slug}/entries/${entryId}`, 'DELETE');
  }
}

export default FlowsEndpoint;
