import BaseExtend from '../extends/base';

class FilesEndpoint extends BaseExtend {
  constructor(endpoint) {
    super(endpoint);

    this.endpoint = 'files';
  }

  List() {
    return this.request.send(`${this.endpoint}`, 'GET');
  }

  Create(body) {
    return this.request.send(`${this.endpoint}`, 'POST', body);
  }

  Delete(id) {
    return this.request.send(`${this.endpoint}/${id}`, 'DELETE');
  }
}

export default FilesEndpoint;
