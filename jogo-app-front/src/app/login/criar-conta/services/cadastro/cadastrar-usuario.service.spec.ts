import { TestBed } from '@angular/core/testing';

import { CadastrarUsuarioService } from './cadastrar-usuario.service';

describe('CadastrarUsuarioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CadastrarUsuarioService = TestBed.get(CadastrarUsuarioService);
    expect(service).toBeTruthy();
  });
});
