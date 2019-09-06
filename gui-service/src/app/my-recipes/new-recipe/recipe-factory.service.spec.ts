import { TestBed } from '@angular/core/testing';

import { RecipeFactoryService } from './recipe-factory.service';

describe('RecipeFactoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RecipeFactoryService = TestBed.get(RecipeFactoryService);
    expect(service).toBeTruthy();
  });
});
