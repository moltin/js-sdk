import BaseExtend from '../extends/base'

class Files extends BaseExtend {
  constructor(endpoint) {
    super(endpoint)

    this.endpoint = 'files'
  }

  Delete(id) {
    return this.request.send(`${this.endpoint}/${id}`, 'DELETE')
  }
}

export default Files
