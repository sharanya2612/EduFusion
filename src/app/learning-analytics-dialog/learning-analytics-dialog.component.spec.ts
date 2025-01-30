import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningAnalyticsDialogComponent } from './learning-analytics-dialog.component';

describe('LearningAnalyticsDialogComponent', () => {
  let component: LearningAnalyticsDialogComponent;
  let fixture: ComponentFixture<LearningAnalyticsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LearningAnalyticsDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LearningAnalyticsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
