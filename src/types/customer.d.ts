import { core } from './core'

export as namespace customer

export namespace customer {

  export interface CustomersEndpoint extends core.CRUDExtend {
    endpoint: 'customers'
    Token<T = any>(email: string, password: string): Promise<T>
  }
}