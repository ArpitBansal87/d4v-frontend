import { TestBed } from '@angular/core/testing';

import { BloodReqeustService } from './blood-reqeust.service';

describe('BloodReqeustService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BloodReqeustService = TestBed.get(BloodReqeustService);
    expect(service).toBeTruthy();
  });
});
