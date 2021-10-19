/**
 * Products variation relationship
 */
import { Identifiable, ResourceList } from './core'

export interface PcmVariationsRelationships extends Identifiable {
  meta: {
    created_at: string
    tags?: string[]
  }
  type: string
}

export type PcmVariationsRelationshipResource = string | { id: string; meta: { tags: string[] } }

export interface PcmVariationsRelationshipsEndpoint {
  endpoint: 'relationships/variations'

  /**
   * Get all product variation relationships
   * Description:
   * @param productId
   * @constructor
   */
  All(productId: string): Promise<ResourceList<PcmVariationsRelationships>>

  /**
   * Create a product variation relationship
   * Description:
   * @param productId
   * @param resources
   * @constructor
   */
  Create(
    productId: string,
    resources?: string | PcmVariationsRelationshipResource[]
  ): Promise<void>

  /**
   * Delete a product variation relationship
   * Description:
   * @param productId
   * @param resources
   * @constructor
   */
  Delete(
    productId: string,
    resources?: string | string[]
  ): Promise<void>
  /**
   * Update a product variation relationship
   * Description:
   * @param productId
   * @param resources
   * @constructor
   */

  Update(
    productId: string,
    resources?: string | PcmVariationsRelationshipResource[]
  ): Promise<void>
}
