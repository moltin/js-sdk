/**
 * Flows
 * Description: A Flow describes a collection of Fields. It is named after the internal entity type you wish to
 * associate it with. For example a Flow with a slug of products will be applied to all Product responses in your store.
 * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/advanced/custom-data/flows.html
 */
import { Identifiable, CrudQueryableResource } from './core';


/**
 * Core Flow Base Interface
 */
export interface FlowBase {
  slug: 'addresses' | 'products' | 'brands' | 'collections' | 'categories' | 'customers' | 'cart_items' | 'orders' | 'order_items' | 'promotions';
  type: string;
  name: string;
  description: string;
  enabled: boolean;
}

export interface Flow extends Identifiable, FlowBase {
}

export interface FlowFilter {
}

/**
 * Flow Endpoints
 */
export interface FlowEndpoint extends CrudQueryableResource<
  Flow,
  FlowBase,
  Partial<FlowBase>,
  FlowFilter,
  never,
  never
> {
  endpoint: 'flow';

  GetEntries<T = any>(slug: string): Promise<T>;

  GetEntry<T = any>(slug: string, entryId: string): Promise<T>;

  CreateEntry<RequestBody = any, ResponseBody = any>(
    slug: string,
    body: RequestBody
  ): Promise<ResponseBody>;

  UpdateEntry<RequestBody = any, ResponseBody = any>(
    slug: string,
    entryId: string,
    body: RequestBody
  ): Promise<ResponseBody>;

  DeleteEntry<T = any>(slug: string, entryId: string): Promise<T>;
}
