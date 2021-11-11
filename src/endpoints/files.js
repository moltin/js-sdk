import { FormData } from 'formdata-node'
import BaseExtend from '../extends/base'

class Files extends BaseExtend {
  constructor(endpoint) {
    super(endpoint)

    this.endpoint = 'files'
  }

  Create(body) {
    let requestBody = body

    if (!(body instanceof FormData) && body.file_location) {
      const formData = new FormData()
      formData.append('file_location', body.file_location)

      requestBody = formData
    }

    return this.request.send(
      `${this.endpoint}`,
      'POST',
      requestBody,
      undefined,
      undefined,
      false
    )
  }

  Delete(id) {
    return this.request.send(`${this.endpoint}/${id}`, 'DELETE')
  }
}

export default Files
