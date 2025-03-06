// src/app/components/mood-submission/mood-submission.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MoodService } from '../../services/mood.service';
import { MoodType } from '../../models/mood-type.enum';
import { MoodScore } from '../../models/mood-score';

@Component({
  selector: 'app-mood-submission',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './mood-submission.component.html',
  styleUrls: ['./mood-submission.component.css']
})
export class MoodSubmissionComponent {
  moodForm: FormGroup;
  moodOptions: MoodScore[];
  submitted = false;
  error = '';
  success = false;
  
  constructor(private fb: FormBuilder, private moodService: MoodService) {
    this.moodOptions = this.moodService.getMoodOptions();
    
    this.moodForm = this.fb.group({
      mood: ['', Validators.required],
      comment: ['', Validators.maxLength(350)]
    });
  }

  onSubmit(): void {
    this.submitted = true;
    this.error = '';
    this.success = false;
    
    if (this.moodForm.invalid) {
      return;
    }
    
    this.moodService.submitMood(this.moodForm.value).subscribe({
      next: () => {
        this.success = true;
        this.moodForm.reset();
        this.submitted = false;
      },
      error: (err) => {
        this.error = err.message;
      }
    });
  }
}