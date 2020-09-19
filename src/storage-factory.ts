
export interface StorageFactory {
  set(key: string, value: any): void;
  get(key: string): any;
  delete(key: string): void;
}
