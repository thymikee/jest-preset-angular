import { inject, TestBed } from '@angular/core/testing'
import { HttpClient, HttpClientModule, HttpRequest } from '@angular/common/http'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { heroesUrl, HeroService } from './hero.service'

describe('Service: GoogleBooks', () => {
  let service: HeroService
  let backend: HttpTestingController

  const expectedData = {
    id: 1,
    name: 'Test hero'
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
      ],
      providers: [
        HeroService,
      ],
    })

    spyOn(console, 'warn')
    spyOn(console, 'error')
  })

  beforeEach(inject([ HttpClient, HttpTestingController ],
    (_httpClient: HttpClient, _backend: HttpTestingController) => {

      backend = _backend
      service = new HeroService(_httpClient)
    }))

  afterEach(inject([ HttpTestingController ], (_backend: HttpTestingController) => {
    _backend.verify()
  }))

  it('should create an instance successfully', () => {
    expect(service).toBeDefined()
  })

  it('should call the GET hero api and return the result', () => {
    let actualData = {}

    service.getHero(1).subscribe(data => actualData = data)

    backend.expectOne((req: HttpRequest<any>) => {
      return req.url === `${heroesUrl}`
        && req.method === 'GET'
        && req.params.get('id') === '1'
    }, `GET hero data from ${heroesUrl}?id=1`)
      .flush(expectedData)

    expect(actualData).toEqual(expectedData)
    expect(console.warn).toHaveBeenCalledWith('HeroService: fetched hero id=1')
  })

  it('should send an expected GET request and throw error to console when an error occurs', () => {
    service.getHero(1).subscribe()

    const getHeroRequest = backend.expectOne((req: HttpRequest<any>) => {
      return req.url === `${heroesUrl}`
        && req.method === 'GET'
        && req.params.get('id') === '1'
    }, `GET hero data from ${heroesUrl}?id=1`)

    // Stimulate an error happens from the backend
    getHeroRequest.error(new ErrorEvent('ERROR_GET_HERO_DATA'))

    expect(console.error).toHaveBeenCalled()
  })
})
