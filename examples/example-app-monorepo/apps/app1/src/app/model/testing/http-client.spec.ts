import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

interface Data {
  name: string;
}

const testUrl = '/data';

describe('HttpClient testing', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('can test HttpClient.get', () => {
    const testData: Data = { name: 'Test Data' };

    httpClient.get<Data>(testUrl).subscribe((data) => expect(data).toEqual(testData));

    const req = httpTestingController.expectOne('/data');

    expect(req.request.method).toEqual('GET');

    req.flush(testData);

    httpTestingController.verify();
  });

  it('can test HttpClient.get with matching header', () => {
    const testData: Data = { name: 'Test Data' };

    httpClient
      .get<Data>(testUrl, {
        headers: new HttpHeaders({ Authorization: 'my-auth-token' }),
      })
      .subscribe((data) => expect(data).toEqual(testData));

    const req = httpTestingController.expectOne((request) => request.headers.has('Authorization'));
    req.flush(testData);
  });

  it('can test multiple requests', () => {
    const testData: Data[] = [{ name: 'bob' }, { name: 'carol' }, { name: 'ted' }, { name: 'alice' }];

    httpClient.get<Data[]>(testUrl).subscribe((d) => expect(d.length).toEqual(0));

    httpClient.get<Data[]>(testUrl).subscribe((d) => expect(d).toEqual([testData[0]]));

    httpClient.get<Data[]>(testUrl).subscribe((d) => expect(d).toEqual(testData));

    const requests = httpTestingController.match(testUrl);
    expect(requests.length).toEqual(3);

    requests[0].flush([]);
    requests[1].flush([testData[0]]);
    requests[2].flush(testData);
  });

  it('can test for 404 error', () => {
    const emsg = 'deliberate 404 error';

    httpClient.get<Data[]>(testUrl).subscribe({
      next: () => {
        throw new Error('should have failed with the 404 error');
      },
      error: (error: HttpErrorResponse) => {
        expect(error.status).toEqual(404);
        expect(error.error).toEqual(emsg);
      },
    });

    const req = httpTestingController.expectOne(testUrl);

    req.flush(emsg, { status: 404, statusText: 'Not Found' });
  });

  it('can test for network error', () => {
    const emsg = 'simulated network error';

    httpClient.get<Data[]>(testUrl).subscribe({
      next: () => {
        throw new Error('should have failed with the network error');
      },
      error: (error: HttpErrorResponse) => {
        expect(error.error.message).toEqual(emsg);
      },
    });

    const req = httpTestingController.expectOne(testUrl);

    const errorEvent = new ErrorEvent('so sad', {
      message: emsg,
      filename: 'HeroService.ts',
      lineno: 42,
      colno: 21,
    });

    req.error(errorEvent);
  });

  it('httpTestingController.verify should fail if HTTP response not simulated', () => {
    httpClient.get('some/api').subscribe();

    expect(() => httpTestingController.verify()).toThrow();

    const req = httpTestingController.expectOne('some/api');
    req.flush(null);
  });
});
