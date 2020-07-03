/**
 * Jobs
 * Description:The jobs endpoint provides a programmatic way of running long running background tasks. An example job
 * would be exporting all orders from your store.
 * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/advanced/jobs/index.html
 */
import { core, Resource, ResourcePage } from './core'

export as namespace job

export namespace job {
  /**
   * Core Job Base Interface
   * For custom flows, extend this interface
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/catalog/inventory/stock-transactions.html
   */
  export interface JobBase {
    id?: string
    type: string
    job_type: string
    link: {
      href: string
    }
    status: 'pending' | 'processing' | 'complete' | 'failed'
    timestamps: {
      created_at: string
      updated_at: string
    }
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
    Create(
      body: JobBase
    ): Promise<Resource<JobBase>>

    /**
     * Title: Get All
     * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/advanced/jobs/get-all-jobs.html
     */
    All(): Promise<ResourcePage<JobBase>>

    /**
     * Title: Get
     * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/advanced/jobs/get-a-job.html
     */
    Get(id: string): Promise<JobBase>
  }
}