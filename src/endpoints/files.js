import FormData from 'form-data'
import BaseExtend from '../extends/base'
import { isNode } from '../utils/helpers'

class Files extends BaseExtend {
  constructor(endpoint) {
    super(endpoint)

    this.endpoint = 'files'
  }

  Create(body, contentType = null) {
    const additionalHeaders = {}

    // Allows users to specify content type, useful if using Node and an
    // implementation of FormData
    if (contentType) {
      additionalHeaders['Content-Type'] = contentType
    }

    return this.request.send(
      `${this.endpoint}`,
      'POST',
      body,
      undefined,
      undefined,
      false,
      undefined,
      additionalHeaders
    )
  }

  Link(href) {
    const form = new FormData()
    form.append('file_location', href)

    // Headers only need to be explicitly passed in a node environment.
    // Browsers will handle FormData headers natively
    const contentType = isNode() ? form.getHeaders()['content-type'] : null

    return this.Create(form, contentType)
  }

  Delete(id) {
    return this.request.send(`${this.endpoint}/${id}`, 'DELETE')
  }
}

export default Files
