import BaseExtend from '../extends/base'
import { formatQueryParams } from '../utils/helpers'

class MetricsEndpoint extends BaseExtend {
  constructor(endpoint) {
    super(endpoint)

    this.endpoint = 'metrics'
  }

  TotalOrders(query) {
    const formattedString = formatQueryParams(query)
    return this.request.send(
      `${this.endpoint}/orders/total?${formattedString}`,
      'GET'
    )
  }

  TotalValue(query) {
    const formattedString = formatQueryParams(query)
    return this.request.send(
      `${this.endpoint}/orders/value?${formattedString}`,
      'GET'
    )
  }
}

export default MetricsEndpoint
