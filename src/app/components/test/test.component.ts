import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="padding: 20px; background-color: #f0f0f0; border-radius: 5px;">
      <h2>User ID Management Test</h2>
      <p>If you can see this, your Angular app is running correctly!</p>
      
      <div style="margin-top: 20px; padding: 15px; background-color: #e0e0e0; border-radius: 5px;">
        <h3>Current User ID</h3>
        <p>Current value in cookie: <strong>{{ currentUserId || 'None' }}</strong></p>
        <p>Note: This ID will change each time you make an API call.</p>
        
        <div style="margin-top: 15px;">
          <button 
            (click)="regenerateUserId()"
            style="padding: 8px 16px; background-color: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer; margin-right: 10px;">
            Generate New ID
          </button>
          
          <button 
            (click)="clearUserId()"
            style="padding: 8px 16px; background-color: #dc3545; color: white; border: none; border-radius: 4px; cursor: pointer;">
            Clear User ID
          </button>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class TestComponent implements OnInit {
  currentUserId: string | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.refreshUserId();
  }

  regenerateUserId(): void {
    this.userService.generateAndStoreUserId();
    this.refreshUserId();
  }

  clearUserId(): void {
    this.userService.clearUserId();
    this.refreshUserId();
  }

  private refreshUserId(): void {
    this.currentUserId = this.userService.getCurrentUserId();
  }
}