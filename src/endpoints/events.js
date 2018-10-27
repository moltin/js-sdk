import CRUDExtend from '../extends/crud'

/* eslint-disable no-unused-vars */
class EventsEndpoint extends CRUDExtend {
  constructor(endpoint) {
    super(endpoint)

    this.endpoint = 'events'
  }
}

export default BrandsEndpoint
