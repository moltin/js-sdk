/**
 * Commerce Extensions
 * Description: Commerce Extensions allows for the creation of Custom APIs that can manage large, private data sets efficiently, offering both simple and complex multidimensional filtering options.
 * DOCS: https://elasticpath.dev/docs/commerce-cloud/commerce-extensions/overview
 */

import { Identifiable, Resource, ResourcePage } from './core';


export interface CustomApiBase {
  name: string
  description: string
  api_type: string
  type: string
  slug: string
}

export interface CustomApi extends Identifiable, CustomApiBase {
  links: {
    self: string
  }
  meta: {
    timestamps: {
      created_at: string
      updated_at: string
    }
  }
}

export type CustomFieldValidation = 
  | { string: { min_length?: number, max_length?: number, regex?: string, allow_null_values?: boolean } }
  | { integer: { min_value?: number, max_value?: number, allow_null_values?: boolean } }
  | { float: { min_value?: number, max_value?: number, allow_null_values?: boolean } }
  | { boolean: { allow_null_values?: boolean } }

export interface CustomApiFieldBase {
  name: string
  description: string
  field_type: string
  type: string
  slug: string
  validation?: CustomFieldValidation
}

export interface CustomApiField extends Identifiable, CustomApiFieldBase {
  links: {
    self: string
  }
  meta: {
    timestamps: {
      created_at: string
      updated_at: string
    }
  }
}

export interface CustomApisEndpoint {
  endpoint: 'settings/extensions/custom-apis'
  entriesEndpoint: 'extensions'

  All(token?: string): Promise<ResourcePage<CustomApi>>

  Get(id: string, token?: string): Promise<Resource<CustomApi>>

  Filter(filter: any): CustomApisEndpoint

  Limit(value: number): CustomApisEndpoint

  Offset(value: number): CustomApisEndpoint

  Sort(value: string): CustomApisEndpoint

  Create(body: CustomApiBase): Promise<Resource<CustomApi>>

  Update(
    id: string,
    body: Partial<CustomApiBase>,
    token?: string
  ): Promise<Resource<CustomApi>>

  Delete(id: string): Promise<{}>

  GetFields<T = any>(customApiId: string): Promise<T>
  
  GetField<T = any>(customApiId: string, customApiFieldId:string): Promise<T>

  CreateField<RequestBody = CustomApiFieldBase, ResponseBody = CustomApiField>(
    customApiId: string,
    body: RequestBody
  ): Promise<ResponseBody>

  UpdateField<RequestBody = CustomApiFieldBase, ResponseBody = CustomApiField>(
    customApiId: string,
    customApiFieldId: string,
    body: RequestBody
  ): Promise<ResponseBody>

  DeleteField<T = any>(customApiId: string, customApiFieldId: string): Promise<T>
  
  GetEntries<T = any>(customApiId: string): Promise<T>

  GetEntry<T = any>(customApiId: string, customApiEntryId: string): Promise<T>

  CreateEntry<RequestBody = any, ResponseBody = any>(
    customApiId: string,
    body: RequestBody
  ): Promise<ResponseBody>

  UpdateEntry<RequestBody = any, ResponseBody = any>(
    customApiId: string,
    customApiEntryId: string,
    body: RequestBody
  ): Promise<ResponseBody>

  DeleteEntry<T = any>(customApiId: string, customApiEntryId: string): Promise<T>

}
