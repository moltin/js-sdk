/**
 * Settings
 * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/advanced/settings/index.html
 */
import { Resource } from './core';

interface Settings {
  type: 'settings',
  page_length: number,
  list_child_products: boolean,
  additional_languages: string[],
  calculation_method: string
}

export interface SettingsEndpoint {
  All(): Promise<Resource<Settings>>;

  Update(body: Partial<Settings>): Promise<Resource<Settings>>;
}
