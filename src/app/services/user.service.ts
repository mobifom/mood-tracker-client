import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly USER_ID_KEY = 'mood_tracker_user_id';
  private cachedUserId: string | null = null;
  private isBrowser: boolean;
  
  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    // Check if we're running in a browser environment
    this.isBrowser = isPlatformBrowser(platformId);
  }

  /**
   * Gets the current user ID from cache, cookies, or generates a new one if none exists
   * Uses internal caching to ensure the same ID is returned throughout the session
   */
  getUserId(): string {
    // If we already have a cached ID in memory, return it
    if (this.cachedUserId) {
      console.log('Using cached user ID:', this.cachedUserId);
      return this.cachedUserId;
    }
    
    // Try to get user ID from cookies
    if (this.isBrowser) {
      const cookieUserId = this.getCurrentUserId();
      
      if (cookieUserId) {
        // Store in memory cache and return
        this.cachedUserId = cookieUserId;
        console.log('Retrieved user ID from cookie:', cookieUserId);
        return cookieUserId;
      }
    }
    
    // If we get here, we need to generate a new ID
    console.log('No user ID found, generating new one');
    const newUserId = this.generateNewUserId();
    this.cachedUserId = newUserId;
    return newUserId;
  }
  
  /**
   * Generate a new user ID and store it in cookies
   */
  generateNewUserId(): string {
    const userId = uuidv4();
    console.log('Generated new user ID:', userId);
    
    if (this.isBrowser) {
      this.storeUserIdInCookie(userId);
    }
    
    return userId;
  }

  /**
   * Store the user ID in a cookie
   */
  private storeUserIdInCookie(userId: string): void {
    if (!this.isBrowser) return;
    
    try {
      // Set cookie to expire in 30 days
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 30);
      
      // Create cookie string with secure options
      const cookieString = `${this.USER_ID_KEY}=${userId}; expires=${expirationDate.toUTCString()}; path=/; SameSite=Strict`;
      
      // Set the cookie
      document.cookie = cookieString;
      console.log('Stored user ID in cookie:', userId);
    } catch (error) {
      console.error('Error storing user ID in cookie:', error);
    }
  }

  /**
   * Get the current user ID from cookies
   */
  getCurrentUserId(): string | null {
    if (!this.isBrowser) return null;
    
    try {
      const cookies = document.cookie.split(';');
      for (const cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === this.USER_ID_KEY && value) {
          return value;
        }
      }
    } catch (error) {
      console.error('Error retrieving user ID from cookie:', error);
    }
    
    return null;
  }

  /**
   * Clear the user ID from cookies and cache
   */
  clearUserId(): void {
    if (!this.isBrowser) return;
    
    try {
      document.cookie = `${this.USER_ID_KEY}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      this.cachedUserId = null;
      console.log('User ID cleared');
    } catch (error) {
      console.error('Error clearing user ID:', error);
    }
  }
}