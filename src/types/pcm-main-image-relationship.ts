/**
 * Products main image relationship
 */
import { Identifiable, Resource } from './core'

export interface PcmMainImageRelationship extends Identifiable {
  type: string
}

export interface PcmMainImageRelationshipEndpoint {
  endpoint: 'relationships/main_image'

  /**
   * Get product main image relationships
   * Description:
   * @param productId
   * @constructor
   */
  Get(productId: string): Promise<Resource<PcmMainImageRelationship>>

  /**
   * Create a product main image relationship
   * Description:
   * @param productId
   * @param fileId
   * @constructor
   */
  Create(
    productId: string,
    fileId: string
  ): Promise<void>

  /**
   * Delete a product main image relationship
   * Description:
   * @param productId
   * @param fileId
   * @constructor
   */
  Delete(
    productId: string,
    fileId: string
  ): Promise<void>

  /**
   * Update a product main image relationship
   * Description:
   * @param productId
   * @param fileId
   * @constructor
   */
  Update(
    productId: string,
    fileId: string
  ): Promise<void>
}
