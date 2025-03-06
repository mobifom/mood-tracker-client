import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoodSubmissionComponent } from './mood-submission.component';

describe('MoodSubmissionComponent', () => {
  let component: MoodSubmissionComponent;
  let fixture: ComponentFixture<MoodSubmissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoodSubmissionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoodSubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
