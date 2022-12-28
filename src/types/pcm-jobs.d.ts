/**
 * PCM Jobs
 */
import { Identifiable, Resource, ResourceList } from './core'
import { PcmJob } from './pcm';

/**
 * PCM Job Base Interface
 */
export interface PcmJobBase {
  attributes: {
    created_at: string
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

export interface PcmJobsEndpoint {
  endpoint: 'jobs'

  /**
   * Get all PCM Jobs
   */
  All(): Promise<ResourceList<PcmJob>>

  /**
   * Get a PCM job by ID
   * @param jobId
   */
  Get(jobId: string): Promise<Resource<PcmJob>>

  /**
   * Gets all job errors for a PCM Job
   */
  GetJobErrors(jobId: string): Promise<ResourceList<PcmJobError>>
}
