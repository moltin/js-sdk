/**
 * Fields
 * Description: A Field represents a single Field of data (for example a Product Rating) to be applied to an entity. All
 * Fields have a field_type (string, integer, boolean, date or relationship), a default value and an optional set of
 * validation rules.
 * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/advanced/custom-data/fields.html
 */
import { core, Relationship } from './core'

export as namespace field

export namespace field {
  /**
   * Core Field Base Interface
   * For custom flows, extend this interface
   * DOCS:
   */
  export interface FieldBase {
    id?: string
    type: string
    name: string
    slug: string
    field_type: string
    validation_rules: any[]
    description: string
    required: boolean
    default: any
    enabled: boolean
    order: number
    relationships: Relationship<'addresses' | 'products' | 'brands' | 'collections' | 'categories' | 'customers' |
      'cart_items' | 'orders' | 'order_items' | 'promotions' | 'flows'>
    omit_null: boolean
  }

  export interface FieldsEndpoint extends core.CrudQueryableResource<FieldBase, null, null, null> {
    endpoint: 'fields'
  }
}