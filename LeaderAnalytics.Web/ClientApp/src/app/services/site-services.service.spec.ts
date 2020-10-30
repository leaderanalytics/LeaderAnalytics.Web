import { TestBed } from '@angular/core/testing';

import { SiteServicesService } from './site-services.service';

describe('SiteServicesService', () => {
  let service: SiteServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SiteServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
