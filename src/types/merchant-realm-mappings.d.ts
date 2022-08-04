/**
 * Merchant Realm Mappings
 */
import { Resource } from './core'

export interface MerchantRealmMappings {
  type: 'merchant-realm-mappings'
  id: string
  realm_id: string
  store_id: string
  prefix: string
}

/**
 * Merchant Realm Mappings Endpoints
 */
export interface MerchantRealmMappingsEndpoint {
  endpoint: 'settings'

  /**
   * Get Merchant Realm Mappings
   */
  All(token?: string): Promise<Resource<MerchantRealmMappings>>

  /**
   * Update Merchant Realm Mappings
   */
  Update(
    id: string,
    body: Partial<MerchantRealmMappings>,
    token?: string
  ): Promise<Resource<MerchantRealmMappings>>

  /**
   * Get Merchant Realm Mappings by id
   */
  Get(id: string): Promise<Resource<MerchantRealmMappings>>
}
