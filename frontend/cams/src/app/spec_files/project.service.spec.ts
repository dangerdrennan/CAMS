import { TestBed } from '@angular/core/testing';

import { ProjectServiceService } from '../services/project.service';

describe('ProjectServiceService', () => {
  let service: ProjectServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
