/**
 * Integrations
 */
import { CrudQueryableResource } from './core';

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
export interface IntegrationEndpoint extends CrudQueryableResource<IntegrationBase, IntegrationFilter, IntegrationSort, IntegrationInclude> {
  endpoint: 'integration'
}
