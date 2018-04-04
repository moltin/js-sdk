import CRUDExtend from '../extends/crud'

class BrandsEndpoint extends CRUDExtend {
  constructor(endpoint) {
    super(endpoint)

    this.endpoint = 'brands'
  }
}

export default BrandsEndpoint
