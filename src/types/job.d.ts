/**
 * Jobs
 * Description:The jobs endpoint provides a programmatic way of running long running background tasks. An example job
 * would be exporting all orders from your store.
 * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/advanced/jobs/index.html
 */
import { Identifiable, Resource, ResourcePage } from './core'

/**
 * Core Job Base Interface
 * For custom flows, extend this interface
 * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/catalog/inventory/stock-transactions.html
 */
export interface JobBase {
  type: string
  job_type: string
  link: {
    href: string
  }
  status: 'pending' | 'processing' | 'complete' | 'failed'
}

export interface Job extends Identifiable, JobBase {
  timestamps: {
    created_at: string
    updated_at: string
  }
}

export interface FileHref {
  href: string
}

export interface createJob {
  filter: string
  job_type: string
  type?: string
}

/**
 * Job Endpoints
 * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/catalog/inventory/stock-transactions.html
 */
export interface JobEndpoint {
  endpoint: 'job'

  /**
   * Title: Create
   * Description: Currently, you can invoke the jobs service to export orders
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/advanced/jobs/get-a-job.html
   * @param body
   * @constructor
   */
  Create(body: createJob): Promise<Resource<Job>>

  /**
   * Title: Get All
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/advanced/jobs/get-all-jobs.html
   */
  All(): Promise<ResourcePage<Job>>

  /**
   * Title: Get
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/advanced/jobs/get-a-job.html
   */
  Get(id: string): Promise<Resource<Job>>

  GetFile(id: string): Promise<FileHref>
}
