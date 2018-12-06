import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

import { Сountry } from '../models/country';

/**
 * Сервис для получения списка стран.
 */
@Injectable({
  providedIn: 'root',
})
export class CountiesService {
  private restCountriesApiUrl = 'https://restcountries.eu/rest/v2/all';

  /**
  * Создает сервис.
  *
  */
  constructor(private http: HttpClient) {
  }

  /**
  * Возвращает список стран.
  *
  */
  getСountries(): Observable<Сountry[]> {
    return this.http.get<Сountry[]>(this.restCountriesApiUrl)
      .pipe(
        catchError(this.handleError([]))
      );
  }

  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
