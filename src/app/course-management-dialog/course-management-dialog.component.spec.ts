import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseManagementDialogComponent } from './course-management-dialog.component';

describe('CourseManagementDialogComponent', () => {
  let component: CourseManagementDialogComponent;
  let fixture: ComponentFixture<CourseManagementDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CourseManagementDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseManagementDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
