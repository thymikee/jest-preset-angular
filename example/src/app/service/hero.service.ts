import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http'

import { Observable } from 'rxjs/Observable'
import { of } from 'rxjs/observable/of'
import { catchError } from 'rxjs/operators'
import { Hero } from './hero'

export const heroesUrl = 'api/heroes' // URL to web api

@Injectable()
export class HeroService {

  constructor(private http: HttpClient) {}

  /** GET hero by id. Will 404 if id not found */
  getHero(id: number): Observable<Hero> {
    const params = new HttpParams().set('id', id.toString())
    return this.http.get<Hero>(heroesUrl, { params })
      .pipe(
        catchError(err => this.handleError(err, 'getHero')),
      )
  }

  handleError(error: HttpErrorResponse, methodName: string): Observable<any> {
    console.error(`${methodName} failed due to ${error.message}`)

    return of(undefined)
  }
}
