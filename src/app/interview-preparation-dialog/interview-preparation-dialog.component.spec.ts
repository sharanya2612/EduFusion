import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewPreparationDialogComponent } from './interview-preparation-dialog.component';

describe('InterviewPreparationDialogComponent', () => {
  let component: InterviewPreparationDialogComponent;
  let fixture: ComponentFixture<InterviewPreparationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InterviewPreparationDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterviewPreparationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
