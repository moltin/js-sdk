import CatalogueExtend from '../extends/catalogue';

class FlowsEndpoint extends CatalogueExtend {
  constructor(endpoint) {
    super(endpoint);

    this.endpoint = 'flows';
  }

  GetEntries(slug) {
    return this.request.send(`${this.endpoint}/${slug}/entries`, 'GET');
  }

  GetEntry(slug, entry) {
      return this.request.send(`${this.endpoint}/${slug}/entries/${entry}`, 'GET');
  }

  CreateEntry(slug, body) {
    return this.request.send(`${this.endpoint}/${slug}/entries`, 'POST', body);
  }

  UpdateEntry(slug, entry, body) {
    return this.request.send(`${this.endpoint}/${slug}/entries/${entry}`, 'PUT', body);
  }

  DeleteEntry(slug, entry) {
    return this.request.send(`${this.endpoint}/${slug}/entries/${entry}`, 'DELETE');
  }

}

export default FlowsEndpoint;
