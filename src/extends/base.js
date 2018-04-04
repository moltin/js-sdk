import RequestFactory from '../factories/request'
import { buildURL } from '../utils/helpers'

class BaseExtend {
  constructor(config) {
    this.request = new RequestFactory(config)

    this.config = config
  }

  All(token = null) {
    const { includes, sort, limit, offset, filter } = this

    this.call = this.request.send(
      buildURL(this.endpoint, {
        includes,
        sort,
        limit,
        offset,
        filter
      }),
      'GET',
      undefined,
      token
    )

    return this.call
  }

  Get(id, token = null) {
    this.call = this.request.send(
      buildURL(`${this.endpoint}/${id}`, {
        includes: this.includes
      }),
      'GET',
      undefined,
      token
    )

    return this.call
  }

  Filter(filter) {
    this.filter = filter

    return this
  }

  Limit(value) {
    this.limit = value

    return this
  }

  Offset(value) {
    this.offset = value

    return this
  }

  Sort(value) {
    this.sort = value

    return this
  }

  With(includes) {
    if (includes) this.includes = includes.toString().toLowerCase()

    return this
  }
}

export default BaseExtend
