import { buildURL } from '../utils/helpers'
import BaseExtend from '../extends/base'

class ErasureRequestsEndpoint extends BaseExtend {
  constructor(endpoint) {
    super(endpoint)
    this.endpoint = 'personal-data/erasure-requests'
  }

  All(token = null) {
    const { limit, offset, filter } = this

    const url = buildURL(this.endpoint, {
      limit,
      offset,
      filter
    })

    return this.request.send(url, 'GET', undefined, token, this)
  }

  Filter(resourceType, resourceId) {
    this.filter = {
      eq: {
        resource_type: resourceType,
        resource_id: resourceId
      }
    }

    return this
  }

  Create(resourceType, resourceId) {
    const body = {
      resource_type: resourceType,
      resource_id: resourceId,
      type: 'erasure_request'
    }

    return this.request.send(
      this.endpoint,
      'POST',
      body,
    )
  }
}

export default ErasureRequestsEndpoint
