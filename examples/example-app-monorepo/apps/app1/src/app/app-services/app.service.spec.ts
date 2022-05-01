import { TestBed } from '@angular/core/testing';

import { AppService } from './app.service';

// eslint-disable-next-line jest/no-disabled-tests
describe.skip('AppService', () => {
  let service: AppService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
