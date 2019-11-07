import { TestBed } from '@angular/core/testing';

import { VideoSanitizerService } from './video-sanitizer.service';

describe('VideoSanitizerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VideoSanitizerService = TestBed.get(VideoSanitizerService);
    expect(service).toBeTruthy();
  });
});
