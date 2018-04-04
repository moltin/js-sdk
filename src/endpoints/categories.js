import CRUDExtend from '../extends/crud'

class CategoriesEndpoint extends CRUDExtend {
  constructor(endpoint) {
    super(endpoint)

    this.endpoint = 'categories'
  }

  Tree() {
    return this.request.send(`${this.endpoint}/tree`, 'GET')
  }
}

export default CategoriesEndpoint
