/**
 * Products
 * Description: Products are the core resource to any Commerce Cloud project. They can be associated by category, collection, brands, and more.
 */
import {
  Identifiable,
  CrudQueryableResource
} from './core'

  /**
   * Core PCM Product Base Interface
   * For custom flows, extend this interface
   */
export interface RuleBase {
  type: 'catalog_rule'
  attributes: {
    name: string
    description?: string
    catalog_id: string
    customer_ids?: string[]
    channels?: string[]
    tags?: string[]
  }
}

export interface Rule extends Identifiable, RuleBase  {
  links: {
    self: string
  }
}

// Do Not have any relationships yet //TODO

export interface RuleFilter {
// TODO
}

type RuleSort = // TODO
| ''

type RuleInclude = // TODO
| ''

export interface RuleUpdateBody extends RuleBase {
  id: string
}

export interface CatalogsRulesEndpoint
extends CrudQueryableResource<Rule, RuleBase, RuleUpdateBody, RuleFilter, RuleSort, RuleInclude> {
  endpoint: 'rules'
  id: string
}


