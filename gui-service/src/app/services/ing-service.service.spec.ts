import { TestBed } from '@angular/core/testing';

import { IngService } from './ing.service';

describe('IngServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IngService = TestBed.get(IngService);
    expect(service).toBeTruthy();
  });
});
