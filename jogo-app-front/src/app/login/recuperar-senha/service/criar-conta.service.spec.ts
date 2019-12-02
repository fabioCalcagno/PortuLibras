import { TestBed } from '@angular/core/testing';

import { CriarContaService } from './criar-conta.service';

describe('CriarContaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CriarContaService = TestBed.get(CriarContaService);
    expect(service).toBeTruthy();
  });
});
