/**
 * Integrations
 * Description:
 * DOCS:
 */
import { core } from './core'

export as namespace integration

export namespace integration {
  /**
   * Core Integration Base Interface
   * For custom flows, extend this interface
   * DOCS:
   */
export interface IntegrationBase {
    id?: string
  }

  /**
   * DOCS:
   */
export interface IntegrationFilter {
  }

  type IntegrationSort = ''

  type IntegrationInclude = ''

  /**
   * Integration Endpoints
   * DOCS:
   * Get DOCS:
   * Get All DOCS:
   * Create DOCS:
   * Update DOCS:
   * Delete DOCS:
   */
export interface IntegrationEndpoint extends core.CrudQueryableResource<IntegrationBase, IntegrationFilter, IntegrationSort, IntegrationInclude> {
    endpoint: 'integration'
  }
}