import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'

import { Observable } from 'rxjs/Observable'
import { of } from 'rxjs/observable/of'
import { catchError, tap } from 'rxjs/operators'
import { Hero } from './hero'

export const heroesUrl = 'api/heroes' // URL to web api

@Injectable()
export class HeroService {

  constructor(private http: HttpClient) {
  }

  /** GET hero by id. Will 404 if id not found */
  getHero(id: number): Observable<Hero> {
    const params = new HttpParams().set('id', id.toString())
    return this.http.get<Hero>(heroesUrl, { params }).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`)),
    )
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error) // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`)

      // Let the app keep running by returning an empty result.
      return of(result as T)
    }
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.warn('HeroService: ' + message)
  }
}
