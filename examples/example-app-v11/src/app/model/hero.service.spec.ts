import { HttpClient, HttpResponse, HttpErrorResponse, HttpEventType, HttpEvent } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { jest } from '@jest/globals';
import { DoneFn } from '@jest/types/build/Global';
import { of, throwError } from 'rxjs';

import { Hero } from './hero';
import { HeroService } from './hero.service';

describe('HeroesService (with spies)', () => {
  const httpClient = new HttpClient({
    handle: () => of({} as HttpEvent<HttpEventType.Sent>),
  });
  const httpClientSpy = {
    get: jest.spyOn(httpClient, 'get'),
  };
  let heroService: HeroService;

  beforeEach(() => {
    heroService = new HeroService(httpClient);
  });

  // eslint-disable-next-line jest/no-done-callback
  it('should return expected heroes (HttpClient called once)', (done: DoneFn) => {
    const expectedHeroes: Hero[] = [
      { id: 1, name: 'A' },
      { id: 2, name: 'B' },
    ];

    httpClientSpy.get.mockReturnValue(of(expectedHeroes));

    heroService.getHeroes().subscribe(
      (heroes) => {
        expect(heroes).toEqual(expectedHeroes);
        done();
      },
      () => {
        throw new Error('Error getting heroes');
      },
    );
    expect(httpClientSpy.get.mock.calls.length).toBe(1);
  });

  // eslint-disable-next-line jest/no-done-callback
  it('should return an error when the server returns a 404', (done: DoneFn) => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404,
      statusText: 'Not Found',
    });

    httpClientSpy.get.mockReturnValue(throwError(errorResponse));

    heroService.getHeroes().subscribe(
      () => {
        throw new Error('expected an error, not heroes');
      },
      (error) => {
        expect(error.message).toContain('test 404 error');
        done();
      },
    );
  });
});

describe('HeroesService (with mocks)', () => {
  let httpTestingController: HttpTestingController;
  let heroService: HeroService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // Import the HttpClient mocking services
      imports: [HttpClientTestingModule],
      // Provide the service-under-test
      providers: [HeroService],
    });

    // Inject the http, test controller, and service-under-test
    // as they will be referenced by each test.
    httpTestingController = TestBed.inject(HttpTestingController);
    heroService = TestBed.inject(HeroService);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  /// HeroService method tests begin ///
  describe('#getHeroes', () => {
    let expectedHeroes: Hero[];

    beforeEach(() => {
      heroService = TestBed.inject(HeroService);
      expectedHeroes = [
        { id: 1, name: 'A' },
        { id: 2, name: 'B' },
      ] as Hero[];
    });

    it('should return expected heroes (called once)', () => {
      heroService.getHeroes().subscribe((heroes) => expect(heroes).toEqual(expectedHeroes));

      // HeroService should have made one request to GET heroes from expected URL
      const req = httpTestingController.expectOne(heroService.heroesUrl);
      expect(req.request.method).toEqual('GET');

      // Respond with the mock heroes
      req.flush(expectedHeroes);
    });

    it('should be OK returning no heroes', () => {
      heroService.getHeroes().subscribe((heroes) => expect(heroes.length).toEqual(0));

      const req = httpTestingController.expectOne(heroService.heroesUrl);
      req.flush([]); // Respond with no heroes
    });

    it('should turn 404 into a user-friendly error', () => {
      const msg = 'Deliberate 404';
      heroService.getHeroes().subscribe(
        () => {
          throw new Error('expected to fail');
        },
        (error) => expect(error.message).toContain(msg),
      );

      const req = httpTestingController.expectOne(heroService.heroesUrl);

      // respond with a 404 and the error message in the body
      req.flush(msg, { status: 404, statusText: 'Not Found' });
    });

    it('should return expected heroes (called multiple times)', () => {
      heroService.getHeroes().subscribe();
      heroService.getHeroes().subscribe();
      heroService.getHeroes().subscribe((heroes) => expect(heroes).toEqual(expectedHeroes));

      const requests = httpTestingController.match(heroService.heroesUrl);
      expect(requests.length).toEqual(3);

      // Respond to each request with different mock hero results
      requests[0].flush([]);
      requests[1].flush([{ id: 1, name: 'bob' }]);
      requests[2].flush(expectedHeroes);
    });
  });

  describe('#updateHero', () => {
    it('should update a hero and return it', () => {
      const updateHero: Hero = { id: 1, name: 'A' };

      heroService.updateHero(updateHero).subscribe((data) => expect(data).toEqual(updateHero));

      // HeroService should have made one request to PUT hero
      const req = httpTestingController.expectOne(heroService.heroesUrl);
      expect(req.request.method).toEqual('PUT');
      expect(req.request.body).toEqual(updateHero);

      // Expect server to return the hero after PUT
      const expectedResponse = new HttpResponse({ status: 200, statusText: 'OK', body: updateHero });
      req.event(expectedResponse);
    });

    it('should turn 404 error into user-facing error', () => {
      const msg = 'Deliberate 404';
      const updateHero: Hero = { id: 1, name: 'A' };
      heroService.updateHero(updateHero).subscribe(
        () => {
          throw new Error('expected to fail');
        },
        (error) => expect(error.message).toContain(msg),
      );

      const req = httpTestingController.expectOne(heroService.heroesUrl);

      // respond with a 404 and the error message in the body
      req.flush(msg, { status: 404, statusText: 'Not Found' });
    });

    it('should turn network error into user-facing error', () => {
      const emsg = 'simulated network error';

      const updateHero: Hero = { id: 1, name: 'A' };
      heroService.updateHero(updateHero).subscribe(
        () => {
          throw new Error('expected to fail');
        },
        (error) => expect(error.message).toContain(emsg),
      );

      const req = httpTestingController.expectOne(heroService.heroesUrl);

      // Create mock ErrorEvent, raised when something goes wrong at the network level.
      // Connection timeout, DNS error, offline, etc
      const errorEvent = new ErrorEvent('so sad', {
        message: emsg,
        // The rest of this is optional and not used.
        // Just showing that you could provide this too.
        filename: 'HeroService.ts',
        lineno: 42,
        colno: 21,
      });

      // Respond with mock error
      req.error(errorEvent);
    });
  });

  // TODO: test other HeroService methods
});

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
