
import { LocalStorage } from 'node-localstorage';
import { StorageFactory } from './storage-factory';

export class LocalStorageFactory implements StorageFactory {
  localStorage: Storage;

  constructor() {
    if (typeof localStorage === 'undefined' || localStorage === null) {
      this.localStorage = new LocalStorage('./localStorage');
    } else {
      this.localStorage = window.localStorage;
    }
  }

  set(key: string, value: any) {
    return this.localStorage.setItem(key, value)
  }

  get(key: string) {
    return this.localStorage.getItem(key)
  }

  delete(key: string) {
    return this.localStorage.removeItem(key)
  }
}
