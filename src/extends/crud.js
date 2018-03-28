import { singularize } from 'inflected'

import BaseExtend from './base'

class CRUDExtend extends BaseExtend {
  Create(body) {
    return this.request.send(this.endpoint, 'POST', {
      ...body,
      type: singularize(this.endpoint)
    })
  }

  Delete(id) {
    return this.request.send(`${this.endpoint}/${id}`, 'DELETE')
  }

  Update(id, body) {
    return this.request.send(`${this.endpoint}/${id}`, 'PUT', {
      ...body,
      type: singularize(this.endpoint)
    })
  }
}

export default CRUDExtend
