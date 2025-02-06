import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceDescComponent } from './service-desc.component';

describe('ServiceDescComponent', () => {
  let component: ServiceDescComponent;
  let fixture: ComponentFixture<ServiceDescComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServiceDescComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceDescComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
