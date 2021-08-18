/**
 * Products templates relationship
 */
import { Identifiable, ResourceList } from './core'

export interface PcmTemplateRelationship extends Identifiable {
  meta: {
    created_at: string
    tags?: string[]
  }
  type: string
}

export type ProductTemplateRelationshipResource = string | { id: string; meta: { tags: string[] } }

export interface PcmTemplateRelationshipEndpoint {
  endpoint: 'relationships/templates'

  /**
   * Get all product template relationships
   * Description:
   * @param productId
   * @constructor
   */
  All(productId: string): Promise<ResourceList<PcmTemplateRelationship>>

  /**
   * Create a product template relationship
   * Description:
   * @param productId
   * @param resources
   * @constructor
   */
  Create(
    productId: string,
    resources?: string | ProductTemplateRelationshipResource[]
  ): Promise<void>

  /**
   * Delete a product template relationship
   * Description:
   * @param productId
   * @param resources
   * @constructor
   */
  Delete(
    productId: string,
    resources?: string | string[]
  ): Promise<void>
}
