export type StorageFactory = SyncStorageFactory | AsyncStorageFactory

export interface SyncStorageFactory {
  set(key: string, value: any): void
  get(key: string): string | null
  delete(key: string): void
}

export class AsyncStorageFactory {
  set(key: string, value: any): Promise<void>
  get(key: string): Promise<string | null>
  delete(key: string): Promise<void>
}

export class MemoryStorageFactory implements SyncStorageFactory {
  set(key: string, value: any): void
  get(key: string): string | null
  delete(key: string): void
}

export class LocalStorageFactory implements SyncStorageFactory {
  set(key: string, value: any): void
  get(key: string): string | null
  delete(key: string): void
}
