export type WithOptional<T, K extends keyof T> = Omit<T, K> &
  Partial<Pick<T, K>>

export type WithRequired<T, K extends keyof T> = Pick<T, K> &
  Partial<Omit<T, K>>

/**
 * XOR using conditional types
 * https://github.com/Microsoft/TypeScript/issues/14094#issuecomment-373782604
 */
export type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never }
export type XOR<T, U> = T | U extends object
  ? (Without<T, U> & U) | (Without<U, T> & T)
  : T | U
