import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAdminPassComponent } from './update-admin-pass.component';

describe('UpdateAdminPassComponent', () => {
  let component: UpdateAdminPassComponent;
  let fixture: ComponentFixture<UpdateAdminPassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateAdminPassComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateAdminPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
