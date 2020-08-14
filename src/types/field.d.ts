/**
 * Fields
 * Description: A Field represents a single Field of data (for example a Product Rating) to be applied to an entity. All
 * Fields have a field_type (string, integer, boolean, date or relationship), a default value and an optional set of
 * validation rules.
 * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/advanced/custom-data/fields.html
 */
import { Identifiable, Relationship, CrudQueryableResource } from './core';


/**
 * Core Field Base Interface
 * For custom flows, extend this interface
 * DOCS:
 */
export interface FieldBase {
  type: string;
  name: string;
  slug: string;
  field_type: string;
  validation_rules: any[];
  description: string;
  required: boolean;
  default: any;
  enabled: boolean;
  order: number;
  omit_null: boolean;
}

export interface Field extends Identifiable, FieldBase {
  relationships: Relationship<'addresses' | 'products' | 'brands' | 'collections' | 'categories' | 'customers' |
    'cart_items' | 'orders' | 'order_items' | 'promotions' | 'flows'>;
}

export interface FieldsEndpoint extends CrudQueryableResource<
  Field,
  FieldBase,
  Partial<FieldBase>,
  never,
  never,
  never
> {
  endpoint: 'fields';
}
