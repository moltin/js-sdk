/**
 * Integrations
 */
import { Identifiable, CrudQueryableResource, ResourceList } from './core'

/**
 * Core Integration Base Interface
 */
export interface IntegrationBase {
  type: 'integration'
  name: string
  description: string
  enabled: boolean
  observes: string[]
  integration_type: string
  configuration: any
}

export interface Integration extends Identifiable, IntegrationBase {}

export interface IntegrationJob extends Identifiable {
  type: 'integration-job'
}

export interface IntegrationFilter {}

/**
 * Interface for an Integration contained within a Log
 */
export interface LogIntegration
  extends Identifiable,
    Pick<
      Integration,
      'type'
    > {}

export interface IntegrationLogMeta {
  timestamps: {
    created_at: string
  }
}

export interface IntegrationLog extends Identifiable {
  type: 'integration-log'
  succeeded: boolean
  attempt: number
  processing_time: number
  body: string
  status_code: number
  error_detail: string
  relationships: {
    integration: {
      data: LogIntegration
    }
    job: {
      data: IntegrationJob
    }
  }
  meta: {
    timestamps: IntegrationLogMeta
  }
}

/**
 * Interface for the expected response of Integration Logs endpoints
 */
export interface IntegrationLogsResponse extends ResourceList<IntegrationLog> {
  meta: {
    limit: number
    offset: number
    current: number
    total: number
  }
  results: {
    total: number
  }
}

export interface IntegrationJob extends Identifiable {
  type: 'integration-job'
}

type IntegrationSort = ''

type IntegrationInclude = ''

/**
 * Integration Endpoints
 */
export interface IntegrationEndpoint
  extends CrudQueryableResource<
      Integration,
      IntegrationBase,
      Partial<IntegrationBase>,
      IntegrationFilter,
      IntegrationSort,
      IntegrationInclude
    > {
  endpoint: 'integrations'

  /**
   * Gets all integration logs
   * @docs https://documentation.elasticpath.com/commerce-cloud/docs/api/advanced/integrations/get-integration-logs.html#get-get-all-logs
   */
  GetAllLogs(): Promise<IntegrationLogsResponse>

  /**
   * Gets the logs for an integration
   * @param id the ID for the integration
   * @docs https://documentation.elasticpath.com/commerce-cloud/docs/api/advanced/integrations/get-integration-logs.html#get-get-logs-for-an-integration
   */
  GetLogs(id: string): Promise<IntegrationLogsResponse>

  /**
   * Gets the jobs of an integration
   * @param id The ID for the integration
   * @docs https://documentation.elasticpath.com/commerce-cloud/docs/api/advanced/integrations/get-integration-logs.html#get-get-jobs-for-an-integration
   */
  GetJobs(id: string): Promise<ResourceList<IntegrationJob>>

  /**
   * Gets all logs for an integration's job
   * @param integrationId The ID for the integration
   * @param integrationJobId The ID for the integration's job
   * @docs https://documentation.elasticpath.com/commerce-cloud/docs/api/advanced/integrations/get-integration-logs.html#get-get-all-logs-for-a-job
   */
  GetAllLogsForJob(
    integrationID: string,
    integrationJobId: string
  ): Promise<IntegrationLogsResponse>
}
