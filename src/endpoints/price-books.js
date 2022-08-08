import CRUDExtend from '../extends/crud'
import PriceBookPricesEndpoint from './price-book-prices'
import PriceBookPriceModifiersEndpoint from './price-book-price-modifiers'

class PriceBooksEndpoint extends CRUDExtend {
  constructor(endpoint) {
    const config = { ...endpoint } // Need to clone config so it is only updated in PCM
    config.version = 'pcm'
    super(config)
    this.Prices = new PriceBookPricesEndpoint(config)
    this.PriceModifiers = new PriceBookPriceModifiersEndpoint(config)

    this.endpoint = 'pricebooks'
  }
}

export default PriceBooksEndpoint
