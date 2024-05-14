import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Hero } from './hero';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({ providedIn: 'root' })
export class HeroService {
  readonly heroesUrl = 'api/heroes';

  constructor(private http: HttpClient) {}

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl).pipe(catchError(this.handleError('getHeroes'))) as Observable<Hero[]>;
  }

  getHero(id: number | string): Observable<Hero | undefined> {
    if (typeof id === 'string') {
      id = parseInt(id, 10);
    }
    const url = `${this.heroesUrl}/?id=${id}`;

    return this.http.get<Hero[]>(url).pipe(
      map((heroes) => heroes[0]),
      catchError(this.handleError<Hero>(`getHero id=${id}`)),
    );
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, httpOptions).pipe(catchError(this.handleError<Hero>('addHero')));
  }

  deleteHero(hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, httpOptions).pipe(catchError(this.handleError<Hero>('deleteHero')));
  }

  updateHero(hero: Hero): Observable<unknown> {
    return this.http.put(this.heroesUrl, hero, httpOptions).pipe(catchError(this.handleError<unknown>('updateHero')));
  }

  private handleError<T>(operation = 'operation') {
    return (error: HttpErrorResponse): Observable<T> => {
      const message =
        error.error instanceof ErrorEvent
          ? error.error.message
          : `server returned code ${error.status} with body "${error.error}"`;

      throw new Error(`${operation} failed: ${message}`);
    };
  }
}
