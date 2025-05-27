import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  constructor() {}

  private getEntryPrefix(obj: any): string {
    return obj.constructor.name;
  }

  setItem<T>(key: string, value: T): T | null {
    try {
      const typePrefix = this.getEntryPrefix(value);
      const jsonValue = JSON.stringify(value);
      localStorage.setItem(`${typePrefix}_${key}`, jsonValue);
      return value;
    } catch (error) {
      console.error('Error saving to local storage', error);
      return null;
    }
  }

  getItem<T>(key: string): T | null {
    try {
      const typePrefix = this.getEntryPrefix({} as T);
      const value = localStorage.getItem(`${typePrefix}_${key}`);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error('Error reading from local storage', error);
      return null;
    }
  }

  getAllItems<T>(): T[] {
    try {
      const typePrefix = `${this.getEntryPrefix({} as T)}_`;
      let result: T[] = new Array<T>();
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if(key.startsWith(typePrefix)){
          result.push(JSON.parse(localStorage.getItem(key) ?? '') as T);
        }
      });
      return result;
    } catch (error) {
      console.error('Error reading from local storage', error);
      return new Array<T>();
    }
  }

  removeItem<T>(key: string): void {
    const typePrefix = this.getEntryPrefix({} as T);
    localStorage.removeItem(`${typePrefix}_${key}`);
  }

  clear(): void {
    localStorage.clear();
  }
}
