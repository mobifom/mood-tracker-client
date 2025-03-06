// src/app/components/team-mood/team-mood.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoodService } from '../../services/mood.service';
import { TeamMood } from '../../models/team-mood';
import { interval } from 'rxjs';
import { switchMap, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-team-mood',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './team-mood.component.html',
  styleUrls: ['./team-mood.component.css']
})
export class TeamMoodComponent implements OnInit {
  // Initialize with default values
  teamMood: TeamMood = { overallMood: null, comments: [] };
  loading = true;
  error = '';
  
  constructor(private moodService: MoodService) { }

  ngOnInit(): void {
    // Fetch data initially and then every 30 seconds
    interval(30000)
      .pipe(
        startWith(0),
        switchMap(() => this.moodService.getOverallMood())
      )
      .subscribe({
        next: (data) => {
          this.teamMood = data;
          this.loading = false;
          this.error = '';
        },
        error: (err) => {
          this.error = err.message;
          this.loading = false;
        }
      });
  }
  
  getMoodLabel(): string {
    return this.moodService.getMoodLabel(this.teamMood?.overallMood || null);
  }
  
  getMoodClass(): string {
    if (!this.teamMood?.overallMood) return 'mood-unknown';
    
    switch (this.teamMood.overallMood) {
      case 'HAPPY': return 'mood-happy';
      case 'JUST_NORMAL_REALLY': return 'mood-normal';
      case 'A_BIT_MEH': return 'mood-meh';
      case 'GRUMPY': return 'mood-grumpy';
      case 'STRESSED_OUT_NOT_A_HAPPY_CAMPER': return 'mood-stressed';
      default: return 'mood-unknown';
    }
  }

  get hasComments(): boolean {
    return !!this.teamMood?.comments && this.teamMood.comments.length > 0;
  }
}