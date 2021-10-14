import { TestBed } from '@angular/core/testing';

import { ProfDashboardService } from '../services/prof-dashboard.service';

describe('ProfDashboardService', () => {
  let service: ProfDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
