import { TestBed } from '@angular/core/testing';

import { ValidationFormService } from './validation.service';

describe('ValidationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ValidationFormService = TestBed.get(ValidationFormService);
    expect(service).toBeTruthy();
  });
});
