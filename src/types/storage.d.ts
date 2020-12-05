export interface StorageFactory {
  set(key: string, value: any): void
  get(key: string): any
  delete(key: string): void
}

export class MemoryStorageFactory implements StorageFactory {
  set(key: string, value: any): void
  get(key: string): any
  delete(key: string): void
}

export class LocalStorageFactory implements StorageFactory {
  set(key: string, value: any): void
  get(key: string): any
  delete(key: string): void
}
