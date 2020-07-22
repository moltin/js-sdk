export as namespace realms

export namespace realms {
  /**
   * Core Product Base Interface
   * For custom flows, extend this interface
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/catalog/products/index.html
   */
  export interface RealmsBase {
    meta?: {}
    data:{}
    links:{}
  }
}