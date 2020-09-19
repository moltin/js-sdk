import { BaseExtend } from './base';
import { Identifiable, Resource } from './core';
import Config from './config';
import { DEFINEME } from './helper';

/**
 * Core Job Base Interface
 * For custom flows, extend this interface
 * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/catalog/inventory/stock-transactions.html
 */
export interface JobBase {
  type: string;
  job_type: string;
  link: {
    href: string;
  };
  status: 'pending' | 'processing' | 'complete' | 'failed';
}

export interface Job extends Identifiable, JobBase {
  timestamps: {
    created_at: string;
    updated_at: string;
  };
}

export class Jobs extends BaseExtend<Job, never, never, never> {
  constructor(config: Config) {
    super(config);

    this.endpoint = 'jobs';
  }

  Create(body: DEFINEME): Promise<Resource<JobBase>> {
    return this.request.send(this.endpoint, 'POST', body);
  }
}
