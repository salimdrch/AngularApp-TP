import { TestBed } from '@angular/core/testing';

import { AvionsService } from './avions.service';

describe('AvionsService', () => {
  let service: AvionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AvionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
