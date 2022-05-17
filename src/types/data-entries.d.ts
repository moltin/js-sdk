
import { Identifiable, ResourcePage } from './core'

export interface DataEntryRecord extends Identifiable {
  type: 'related-data-entry';
  resource_id: string;
  resource_type: string;
}

export interface DataEntriesEndpoint {
  All(): Promise<ResourcePage<DataEntryRecord>>

  Filter(resourceType: string, resourceId: string): DataEntriesEndpoint

  Limit(value: number): DataEntriesEndpoint

  Offset(value: number): DataEntriesEndpoint
}
