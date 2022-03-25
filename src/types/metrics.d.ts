import { ResourcePage } from './core'

export interface MetricsBase {
  value: number
  time: string
}

export interface MetricsQuery {
  currency?: string
  from: string
  to: string
  interval: string
}

export interface MetricsEndpoint {
  TotalOrders(query: MetricsQuery): Promise<ResourcePage<MetricsBase>>

  TotalValue(query: MetricsQuery): Promise<ResourcePage<MetricsBase>>
}
