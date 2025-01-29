import { TestBed } from '@angular/core/testing';

import { TrainerService } from './trainers.service';

describe('TrainersService', () => {
  let service: TrainerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrainerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
