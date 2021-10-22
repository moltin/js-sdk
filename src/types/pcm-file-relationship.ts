/**
 * Products file relationship
 */
import { Identifiable, ResourceList } from './core'

export interface PcmFileRelationship extends Identifiable {
  meta?: {
    created_at: string
    tags?: string[]
  }
  type: string
}

export type ProductFileRelationshipResource = string | { id: string; meta?: { tags: string[] } }

export interface PcmFileRelationshipEndpoint {
  endpoint: 'relationships/files'

  /**
   * Get all product file relationships
   * Description:
   * @param productId
   * @constructor
   */
  All(productId: string): Promise<ResourceList<PcmFileRelationship>>

  /**
   * Create a product file relationship
   * Description:
   * @param productId
   * @param resources
   * @constructor
   */
  Create(
    productId: string,
    resources?: string | ProductFileRelationshipResource[]
  ): Promise<void>

  /**
   * Delete a product file relationship
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
   * Update a product file relationship
   * Description:
   * @param productId
   * @param resources
   * @constructor
   */

  Update(
    productId: string,
    resources?: string | ProductFileRelationshipResource[]
  ): Promise<void>
}
