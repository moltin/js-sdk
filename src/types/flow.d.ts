/**
 * Flows
 * Description: A Flow describes a collection of Fields. It is named after the internal entity type you wish to
 * associate it with. For example a Flow with a slug of products will be applied to all Product responses in your store.
 * DOCS: https://documentation.elasticpath.com/commerce-cloud/docs/api/advanced/custom-data/flows.html
 */

import { Identifiable, Resource, ResourcePage, Attributes } from './core';

/**
 * Core Flow Base Interface
 */
export interface FlowBase {
  slug: string
  type: string
  name: string
  description: string
  enabled: boolean
}

export interface Flow extends Identifiable, FlowBase { }

export interface FlowFilter {
  eq?: {
    template?: string
  }
 }

/**
 * Flow Endpoints
 */
export interface FlowEndpoint {
  endpoint: 'flow'

  All(token?: string): Promise<ResourcePage<Flow>>

  AllTemplates(template: string, token?: string): Promise<ResourcePage<Flow>>

  Get(id: string, token?: string): Promise<Resource<Flow>>

  Filter(filter: FlowFilter): FlowEndpoint

  Limit(value: number): FlowEndpoint

  Offset(value: number): FlowEndpoint

  Create(body: FlowBase): Promise<Resource<Flow>>

  Delete(id: string): Promise<{}>

  Update(
    id: string,
    body: Partial<FlowBase>,
    token?: string
  ): Promise<Resource<Flow>>

  GetEntries<T = any>(slug: string): Promise<T>

  GetEntry<T = any>(slug: string, entryId: string): Promise<T>

  GetFields<T = any>(slug: string): Promise<T>

  DeleteFlow(id: string): Promise<{}>

  CreateEntry<RequestBody = any, ResponseBody = any>(
    slug: string,
    body: RequestBody
  ): Promise<ResponseBody>

  UpdateEntry<RequestBody = any, ResponseBody = any>(
    slug: string,
    entryId: string,
    body: RequestBody
  ): Promise<ResponseBody>

  DeleteEntry<T = any>(slug: string, entryId: string): Promise<T>

  CreateEntryRelationship<RequestBody = any, ResponseBody = any>(
    flowSlug: string,
    entryId: string,
    fieldSlug: string,
    body?: RequestBody
  ): Promise<ResponseBody>

  UpdateEntryRelationship<RequestBody = any, ResponseBody = any>(
    flowSlug: string,
    entryId: string,
    fieldSlug: string,
    body?: RequestBody
  ): Promise<ResponseBody>

  DeleteEntryRelationship<ResponseBody = any>(
    flowSlug: string,
    entryId: string,
    fieldSlug: string
  ): Promise<ResponseBody>

  Attributes(token?: string): Promise<Attributes>

  GetFlowTypeAttributes(flowType: string, token?: string): Promise<Attributes>
}
