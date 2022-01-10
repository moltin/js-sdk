import FormData from 'form-data'
import BaseExtend from '../extends/base'

class Files extends BaseExtend {
  constructor(endpoint) {
    super(endpoint)

    this.endpoint = 'files'
  }

  Create(body, contentType = '') {
    const additionalHeaders = {}

    // Allows users to specify content type, useful if using Node and an
    // implementation of FormData
    if (contentType !== '') {
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
      additionalHeaders,
    )
  }

  Link(href) {
    const form = new FormData()
    form.append('file_location', href)

    return this.request.send(
      `${this.endpoint}`,
      'POST',
      form,
      undefined,
      undefined,
      false,
      undefined,
      {
        // TODO: Replace when we go back to using formdata-node
        'Content-Type': form.getHeaders()['content-type'],
      },
    )
  }

  Delete(id) {
    return this.request.send(`${this.endpoint}/${id}`, 'DELETE')
  }
}

export default Files
