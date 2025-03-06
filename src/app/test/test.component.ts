import { Component } from '@angular/core';

@Component({
  selector: 'app-test',
  standalone: true,
  template: `<div style="padding: 20px; background-color: #f0f0f0; border-radius: 5px;">
    <h2>Test Component Working</h2>
    <p>If you can see this, your Angular app is running correctly!</p>
  </div>`,
  styles: []
})
export class TestComponent {}