
import { Identifiable, ResourcePage } from './core'

export interface ErasureRequestRecord extends Identifiable {
  type: 'erasure_request';
  id: string;
  resource_id: string;
  resource_type: string;
  initiator: Record<string, string>;
  status: string;
  status_description: string;
  created_at: string;
  updated_at: string;
}

export interface ErasureRequestsEndpoint {
  All(): Promise<ResourcePage<ErasureRequestRecord>>

  Filter(resourceType: string, resourceId: string): ErasureRequestsEndpoint

  Limit(value: number): ErasureRequestsEndpoint

  Offset(value: number): ErasureRequestsEndpoint

  Create(resourceType: string, resourceId: string): Promise<ErasureRequestRecord>
}
