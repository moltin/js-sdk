/**
 * Files
 * Description: The immutable files API is available via the multipart/form-data Content-Type for image uploads.
 * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/advanced/files/index.html
 */
import { core } from './core'

export as namespace file

export namespace file {
  /**
   * Core File Base Interface
   * For custom flows, extend this interface
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/advanced/files/index.html
   */
  export interface FileBase {
    id?: string
    type: string
    link: {
      href: string
    }
    file_name: string
    mime_type: string
    file_size: number
    public: boolean
    meta?: {
      timestamps: {
        created_at: string
      }
      dimensions: {
        width: number
        height: number
      }
    }
    links: {
      self: string
    }
  }

  /**
   * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/advanced/files/filtering.html
   */
  export interface FileFilter {
    eq?: {
      file_name?: string
      public?: boolean
    }
    like?: {
      file_name?: string
    }
    gt?: {
      width?: number
      height?: number
      file_size?: number
    }
    lt?: {
      width?: number
      height?: number
      file_size?: number
    }
    le?: {
      width?: number
      height?: number
      file_size?: number
    }
    ge?: {
      width?: number
      height?: number
      file_size?: number
    }

  }

  /**
   * File Endpoints
   * Get DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/advanced/files/get-a-file.html
   * Get All DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/advanced/files/get-all-files.html
   * Create DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/advanced/files/create-a-file.html
   * Delete DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/advanced/files/delete-a-file.html
   */
  export interface FileEndpoint extends core.CrudQueryableResource<FileBase, FileFilter, {}, {}> {
    endpoint: 'file'
  }
}