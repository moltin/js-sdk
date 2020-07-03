/**
 * Integrations
 */
import { core } from './core'

export as namespace integration

export namespace integration {
  /**
   * Core Integration Base Interface
   */
export interface IntegrationBase {
    id?: string
  }

export interface IntegrationFilter {
  }

  type IntegrationSort = ''

  type IntegrationInclude = ''

  /**
   * Integration Endpoints
   */
export interface IntegrationEndpoint extends core.CrudQueryableResource<IntegrationBase, IntegrationFilter, IntegrationSort, IntegrationInclude> {
    endpoint: 'integration'
  }
}