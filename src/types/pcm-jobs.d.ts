/**
 * PCM Jobs
 */
import { Identifiable, CrudQueryableResource } from './core'
import { PcmJob } from './pcm';
import { ResourcePage } from './core'

/**
 * PCM Job Base Interface
 */
export interface PcmJobBase {
  type: 'pim-job',
  attributes: {
    completed_at: string
    created_at: string
    started_at: string
    status: string
    type: string
    updated_at: string
  }
}

export interface PcmJobError extends Identifiable {
  type: 'pim-job-error'
  attributes: {
    message: string
  }
}

export interface PcmJobsEndpoint
  extends CrudQueryableResource<
      PcmJob,
      PcmJobBase,
      Partial<PcmJobBase>,
      undefined,
      undefined,
      undefined
      > {
  endpoint: 'jobs'

  /**
     * Gets all job errors for a PCM Job
     */
    GetJobErrors(jobId: string): Promise<ResourcePage<PcmJobError>>
}
