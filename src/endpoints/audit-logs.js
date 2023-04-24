import { buildURL } from '../utils/helpers'
import BaseExtend from '../extends/base'

class AuditLogsEndpoint extends BaseExtend {
  constructor(endpoint) {
    super(endpoint)
    this.endpoint = 'audit/logs'
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
}

export default AuditLogsEndpoint
