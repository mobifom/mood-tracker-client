// src/app/components/home/home.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoodService } from '../../services/mood.service';
import { MoodSubmissionComponent } from '../mood-submission/mood-submission.component';
import { TeamMoodComponent } from '../team-mood/team-mood.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MoodSubmissionComponent, TeamMoodComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  apiReady = false;
  
  constructor(private moodService: MoodService) {}
  
  ngOnInit() {
    this.moodService.isApiAvailable().subscribe({
      next: () => {
        this.apiReady = true;
        console.log('API is ready');
      },
      error: (err) => console.error('API check failed', err)
    });
  }
}