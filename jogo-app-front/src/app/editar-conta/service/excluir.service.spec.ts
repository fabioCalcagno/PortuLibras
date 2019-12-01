import { TestBed } from '@angular/core/testing';

import { ExcluirService } from './excluir.service';

describe('ExcluirService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExcluirService = TestBed.get(ExcluirService);
    expect(service).toBeTruthy();
  });
});
