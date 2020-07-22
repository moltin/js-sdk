import { singularize } from 'inflected'

import BaseExtend from './base'

class CRUDExtend extends BaseExtend {
  Create(body) {
    console.log('creating!')
    console.log(singularize(this.endpoint))
    return this.request.send(this.endpoint, 'POST', {
      ...body,
      type: singularize(this.endpoint)
    })
  }

  Delete(id) {
    return this.request.send(`${this.endpoint}/${id}`, 'DELETE')
  }

  Update(id, body, token = null) {
    return this.request.send(
      `${this.endpoint}/${id}`,
      'PUT',
      {
        ...body,
        type: singularize(this.endpoint)
      },
      token
    )
  }
}

export default CRUDExtend
