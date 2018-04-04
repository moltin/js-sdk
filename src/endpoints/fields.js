import CRUDExtend from '../extends/crud'

class FieldsEndpoint extends CRUDExtend {
  constructor(endpoint) {
    super(endpoint)

    this.endpoint = 'fields'
  }
}

export default FieldsEndpoint
