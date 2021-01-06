import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import type { Hero } from './hero';

export const heroesUrl = 'api/heroes'; // URL to web api

@Injectable()
export class HeroService {
  constructor(private http: HttpClient) {}

  /** GET heroes from the server */
  getHeroes(): Observable<Hero[] | undefined> {
    return this.http.get<Hero[] | undefined>(heroesUrl).pipe(catchError((err) => this.handleError(err, 'getHero')));
  }

  /** GET hero by id. Will 404 if id not found */
  getHero(id: number): Observable<Hero | undefined> {
    const params = new HttpParams().set('id', id.toString());

    return this.http
      .get<Hero>(heroesUrl, { params })
      .pipe(catchError((err) => this.handleError(err, 'getHero')));
  }

  handleError(error: HttpErrorResponse, methodName: string): Observable<undefined> {
    console.error(`${methodName} failed due to ${error.message}`);

    return of(undefined);
  }
}
