export interface Price {
  amount: number
  currency: string
  includes_tax: boolean
}

export interface FormattedPrice {
  amount: number
  currency: string
  formatted: string
}
