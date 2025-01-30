import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectManagementDialogComponent } from './project-management-dialog.component';

describe('ProjectManagementDialogComponent', () => {
  let component: ProjectManagementDialogComponent;
  let fixture: ComponentFixture<ProjectManagementDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectManagementDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectManagementDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
