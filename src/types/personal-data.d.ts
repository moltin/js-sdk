
import { Identifiable, ResourcePage } from './core'

export interface PersonalDataRecord extends Identifiable {
  store_id: string;
  type: string;
  initiator: {
    "access-token-email": string;
    "access-token-id": string;
    "access-token-name": string;
    "access-token-store-id": string;
    "access-token-type": string;
  }
  time: string;
  event_type: string;
  delta: Record<string, any>;
  resource_type: string;
  relationships: Record<string, any>;
  links: Record<string, string>;
}

export interface PersonalDataEndpoint {
  All(): Promise<ResourcePage<PersonalDataRecord>>

  Filter(resourceType: string, resourceId: string): PersonalDataEndpoint

  Limit(value: number): PersonalDataEndpoint

  Offset(value: number): PersonalDataEndpoint
}
