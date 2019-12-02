import { TestBed } from '@angular/core/testing';

import { AuthTokenService } from './token.service';

describe('TokenService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthTokenService = TestBed.get(AuthTokenService);
    expect(service).toBeTruthy();
  });
});
