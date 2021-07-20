/**
 * Fields
 * Description: A Field represents a single Field of data (for example a Product Rating) to be applied to an entity. All
 * Fields have a field_type (string, integer, boolean, date or relationship), a default value and an optional set of
 * validation rules.
 * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/advanced/custom-data/fields.html
 */
import { Identifiable, Relationship, CrudQueryableResource } from './core'

/**
 * Core Field Base Interface
 * For custom flows, extend this interface
 * DOCS:
 */
export interface FieldBase {
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
  omit_null: boolean
}

export interface Field extends Identifiable, FieldBase {
  relationships: {
    addresses?: Relationship<'addresses'>
    products?: Relationship<'products'>
    brands?: Relationship<'brands'>
    collections?: Relationship<'collections'>
    categories?: Relationship<'categories'>
    customers?: Relationship<'customers'>
    cart_items?: Relationship<'cart_items'>
    orders?: Relationship<'orders'>
    order_items?: Relationship<'order_items'>
    promotions?: Relationship<'promotions'>
    flow?: Relationship<'flow'>
  }
}

export interface FieldsEndpoint
  extends CrudQueryableResource<
      Field,
      FieldBase,
      Partial<FieldBase>,
      never,
      never,
      never
    > {
  endpoint: 'fields'
}
