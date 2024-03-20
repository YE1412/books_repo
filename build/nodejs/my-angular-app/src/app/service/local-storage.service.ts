import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})

export class LocalStorageService {
  isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: any) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  // Set a value in local storage
  set(key: string, value: string): void {
    if (this.isBrowser)
      localStorage.setItem(key, value);
  }

  // Get a value from local storage
  get(key: string): string | null {
    if (this.isBrowser)
      return localStorage.getItem(key);
    else
      return null;
  }

  // Remove a value from local storage
  remove(key: string): void {
    if (this.isBrowser)
      localStorage.removeItem(key);
  }

  // Clear all items from local storage
  clear(): void {
    if (this.isBrowser)
      localStorage.clear();
  }
}
