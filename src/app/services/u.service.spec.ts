import { TestBed } from '@angular/core/testing';

import { UService } from './u.service';

describe('UService', () => {
  let service: UService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
