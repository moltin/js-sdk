import CRUDExtend from '../extends/crud'
import { buildURL } from '../utils/helpers'

class ApplicationKeysEndpoint extends CRUDExtend {
  constructor(endpoint) {
      super(endpoint)
      this.endpoint = 'application-keys'
  }

  Create(body) {
      return this.request.send(this.endpoint, 'POST', body)
  }

  Update(applicationKeyId, body, token = null) {
    return this.request.send(
      `${this.endpoint}/${applicationKeyId}`,
      `PUT`,
      body,
      token
    )
  }

  All(token = null, headers = {}) {
    const { limit, offset, filter } = this

    this.call = this.request.send(
      buildURL(this.endpoint, {
        limit,
        offset,
        filter
      }),
      'GET',
      undefined,
      token,
      this,
      headers
    )

    return this.call
  }

  Delete(id) {
    return this.request.send(`${this.endpoint}/${id}`, 'DELETE')
  }
}

export default ApplicationKeysEndpoint
