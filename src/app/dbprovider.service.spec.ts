import { TestBed } from '@angular/core/testing';

import { DBProviderService } from './dbprovider.service';

describe('DBProviderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DBProviderService = TestBed.get(DBProviderService);
    expect(service).toBeTruthy();
  });
});
