import { TestBed } from '@angular/core/testing';

import { ResultsServiceService } from './results-service.service';

describe('ResultsServiceService', () => {
  let service: ResultsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResultsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
