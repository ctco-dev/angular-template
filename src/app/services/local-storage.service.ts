import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  constructor() {}

  setItem<T>(typePrefix: string, key: string, value: T): T | null {
    try {
      const jsonValue = JSON.stringify(value);
      localStorage.setItem(`${typePrefix}_${key}`, jsonValue);
      return value;
    } catch (error) {
      console.error('Error saving to local storage', error);
      return null;
    }
  }

  getItem<T extends Object>(typePrefix: string, key: string): T | null {
    try {
      const value = localStorage.getItem(`${typePrefix}_${key}`);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error('Error reading from local storage', error);
      return null;
    }
  }

  getAllItems<T extends Object>(typePrefix: string): T[] {
    try {
      const fullTypePrefix = `${typePrefix}_`;
      let result: T[] = new Array<T>();
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if(key.startsWith(fullTypePrefix)){
          result.push(JSON.parse(localStorage.getItem(key) ?? '') as T);
        }
      });
      return result;
    } catch (error) {
      console.error('Error reading from local storage', error);
      return new Array<T>();
    }
  }

  removeItem<T extends Object>(typePrefix: string, key: string): void {
    localStorage.removeItem(`${typePrefix}_${key}`);
  }

  clear(): void {
    localStorage.clear();
  }
}
