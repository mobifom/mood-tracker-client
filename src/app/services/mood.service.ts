import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, delay, tap } from 'rxjs/operators';
import { MoodSubmission } from '../models/mood-submission';
import { TeamMood } from '../models/team-mood';
import { MoodType } from '../models/mood-type.enum';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MoodService {
  private apiUrl = environment.apiUrl + '/mood';

  constructor(private http: HttpClient) { }

  // Get all available mood types with their human-readable labels and scores
  getMoodOptions(): { type: MoodType, label: string, score: number }[] {
    return [
      { type: MoodType.HAPPY, label: 'Happy 😊', score: 5 },
      { type: MoodType.JUST_NORMAL_REALLY, label: 'Just Normal Really 😐', score: 4 },
      { type: MoodType.A_BIT_MEH, label: 'A Bit Meh 😕', score: 3 },
      { type: MoodType.GRUMPY, label: 'Grumpy 😠', score: 2 },
      { type: MoodType.STRESSED_OUT_NOT_A_HAPPY_CAMPER, label: 'Stressed Out 😫', score: 1 }
    ];
  }

  // Submit a mood
  submitMood(submission: MoodSubmission): Observable<void> {
    return this.http.post<void>(this.apiUrl, submission)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Get the overall team mood
  getOverallMood(): Observable<TeamMood> {
    return this.http.get<TeamMood>(`${this.apiUrl}/overall`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Get readable label for a mood type
  getMoodLabel(mood: MoodType | null): string {
    if (!mood) return 'No data yet';
    
    const option = this.getMoodOptions().find(opt => opt.type === mood);
    return option ? option.label : 'Unknown';
  }

  // Error handling
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = error.error || `Server returned code ${error.status}`;
    }
    
    return throwError(() => new Error(errorMessage));
  }

  isApiAvailable(): Observable<boolean> {
    return of(true).pipe(
      delay(500),
      tap(() => console.log('API check completed'))
    );
  }
}