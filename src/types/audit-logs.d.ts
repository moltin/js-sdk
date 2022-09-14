
import { Identifiable, ResourcePage } from './core'

export interface AuditLogsRecord extends Identifiable {
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

export interface AuditLogsEndpoint {
    All(): Promise<ResourcePage<AuditLogsRecord>>

    Filter(resourceType: string, resourceId: string): AuditLogsEndpoint

    Limit(value: number): AuditLogsEndpoint

    Offset(value: number): AuditLogsEndpoint
}
