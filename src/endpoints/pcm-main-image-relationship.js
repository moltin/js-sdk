import RequestFactory from '../factories/request'

class PCMMainImageRelationshipEndpoint {
  constructor(endpoint) {
    const config = { ...endpoint }
    this.request = new RequestFactory(config)
    config.version = 'pcm'
    this.endpoint = 'relationships/main_image'
  }

  Get(productId) {
    return this.request.send(`products/${productId}/${this.endpoint}`, 'GET')
  }

  Create(productId, fileId) {
    return this.request.send(`products/${productId}/${this.endpoint}`, 'POST', {
      type: 'file',
      id: fileId
    })
  }

  Delete(productId, fileId) {
    return this.request.send(
      `products/${productId}/${this.endpoint}`,
      'DELETE',
      {
        type: 'file',
        id: fileId
      }
    )
  }

  Update(productId, fileId) {
    return this.request.send(`products/${productId}/${this.endpoint}`, 'PUT', {
      type: 'file',
      id: fileId
    })
  }
}

export default PCMMainImageRelationshipEndpoint
