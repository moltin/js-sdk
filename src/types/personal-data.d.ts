/**
 * Data Entries
 */
import {
  CrudQueryableResource,
  Identifiable,
  ResourceList,
} from "./core";


/**
 * The Data Entry object Interface
 */

export interface DataEntryBase extends Identifiable {
  type: string
  resource_id: string
  resource_type: string
}
export interface DataEntry extends DataEntryBase, Identifiable {
  meta: {}
  links: {}
}

/**
 * filter for related data entries
 */
export interface RelatedDataEntriesFilter {
  eq?: {
    resource_id: string
    resource_type: string
  }
}

/**
 * Personal Data Endpoint
 */
export interface PersonalDataEndpoint
    extends Omit<
        CrudQueryableResource<
            DataEntry,
            never,
            never,
            RelatedDataEntriesFilter,
            never,
            never
            >,
           'Filter'
        > {
  endpoint: 'personal-data'

  /**
   * Get Personal Data Related Data Entries
   */
  RelatedDataEntries(
      token?: string
  ): Promise<ResourceList<DataEntry>>

  Filter(filter: RelatedDataEntriesFilter): PersonalDataEndpoint
}
