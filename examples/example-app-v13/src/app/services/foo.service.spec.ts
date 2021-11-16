import { TestBed, TestModuleMetadata, waitForAsync } from '@angular/core/testing';

import { APP_ENVIRONMENT, AppEnvironment } from '../configs/environment.config';

import { FooService } from './foo.service';

describe('FooService', () => {
  const testBedMetadata: TestModuleMetadata = {
    providers: [
      FooService,
      {
        provide: APP_ENVIRONMENT,
        useFactory: () => new AppEnvironment(),
      },
    ],
  };

  let service: FooService;
  let env: AppEnvironment;

  beforeEach(
    waitForAsync(() => {
      void TestBed.configureTestingModule(testBedMetadata)
        .compileComponents()
        .then(() => {
          service = TestBed.inject(FooService);
          env = TestBed.inject(APP_ENVIRONMENT);
        });
    }),
  );

  it('should exist', () => {
    expect(service).toBeTruthy();
  });

  it('getFoo should return "foo" if env is production', () => {
    env.production = true;
    expect(service.getFoo()).toEqual('foo');
  });

  it('getFoo should return "bar" if env is not production', () => {
    env.production = false;
    expect(service.getFoo()).toEqual('bar');
  });
});
