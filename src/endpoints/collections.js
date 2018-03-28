import CRUDExtend from '../extends/crud'

class CollectionsEndpoint extends CRUDExtend {
  constructor(endpoint) {
    super(endpoint)

    this.endpoint = 'collections'
  }
}

export default CollectionsEndpoint
