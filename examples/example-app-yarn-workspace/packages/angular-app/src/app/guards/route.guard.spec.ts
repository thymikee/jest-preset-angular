import { TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { tap } from 'rxjs/operators';

import { RouteGuard } from './route.guard';

describe('RouteGuard', () => {
  let guard: RouteGuard;
  let router: Router;

  beforeEach(
    waitForAsync(() => {
      void TestBed.configureTestingModule({
        imports: [
          RouterTestingModule.withRoutes([
            {
              path: '',
              children: [],
            },
          ]),
        ],
        providers: [RouteGuard],
      })
        .compileComponents()
        .then(() => {
          guard = TestBed.inject(RouteGuard);
          router = TestBed.inject(Router);
        });
    }),
  );

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it(
    'should activate correctly',
    waitForAsync(() => {
      const routeSnapShot = new ActivatedRouteSnapshot();
      const stateSnapshot = router.routerState.snapshot;
      guard
        .canActivate(routeSnapShot, stateSnapshot)
        .pipe(
          tap((result) => {
            expect(result).toEqual(router.createUrlTree([stateSnapshot.url]));
          }),
        )
        .subscribe();
    }),
  );
});
