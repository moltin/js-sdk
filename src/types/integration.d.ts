/**
 * Integrations
 */
import { Identifiable, CrudQueryableResource } from './core';

/**
 * Core Integration Base Interface
 */
export interface IntegrationBase {
}

export interface Integration extends Identifiable, IntegrationBase {
}

export interface IntegrationFilter {
}

type IntegrationSort = ''

type IntegrationInclude = ''

/**
 * Integration Endpoints
 */
export interface IntegrationEndpoint extends CrudQueryableResource<
  Integration,
  IntegrationBase,
  Partial<IntegrationBase>,
  IntegrationFilter,
  IntegrationSort,
  IntegrationInclude
> {
  endpoint: 'integration';
}
