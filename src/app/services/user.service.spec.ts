import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
    
    // Clear cookies before each test
    document.cookie.split(';').forEach(cookie => {
      const [name] = cookie.trim().split('=');
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should generate a new user ID when none exists', () => {
    const userId = service.getUserId();
    expect(userId).toBeTruthy();
    expect(userId.length).toBeGreaterThan(0);
    
    // UUID v4 should be in the format: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
    // where x is any hexadecimal digit and y is one of 8, 9, A, or B
    const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    expect(userId).toMatch(uuidPattern);
  });

  it('should retrieve the stored user ID', () => {
    const userId = service.getUserId();
    expect(service.getCurrentUserId()).toEqual(userId);
  });

  it('should return the same ID on subsequent calls', () => {
    const firstId = service.getUserId();
    const secondId = service.getUserId();
    
    expect(firstId).toEqual(secondId);
  });

  it('should clear the user ID from cookies', () => {
    service.getUserId(); // Ensure an ID exists
    service.clearUserId();
    expect(service.getCurrentUserId()).toBeNull();
  });

  it('should generate a new ID after clearing', () => {
    const firstId = service.getUserId();
    service.clearUserId();
    const secondId = service.getUserId();
    
    expect(firstId).not.toEqual(secondId);
  });
});