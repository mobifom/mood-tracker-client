import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TestComponent } from './test/test.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'test', component: TestComponent },
  { path: '**', redirectTo: '' }
];