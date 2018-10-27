import CRUDExtend from '../extends/crud'

class EventsEndpoint extends CRUDExtend {
  constructor(endpoint) {
    super(endpoint)

    this.endpoint = 'integrations'
  }
}

export default EventsEndpoint
