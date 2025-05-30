import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class AvatarService {
  private readonly GRAVATAR_BASE_URL = 'https://www.gravatar.com/avatar/';
  
  getGravatarUrl(email: string): string {
    const hash = CryptoJS.MD5(email.toLowerCase()).toString();
    return `https://www.gravatar.com/avatar/${hash}?s=200`;
  }
}