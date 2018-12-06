import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

import { DateTime } from '../models/dateTime';

/**
 * Сервис для получения времени.
 */
@Injectable({
  providedIn: 'root',
})
export class TimeService {
  private restTimeApiUrl = 'http://worldclockapi.com/api/json/utc/now';

  /**
  * Создает сервис.
  *
  */
  constructor(private http: HttpClient) {
  }

  /**
  * Возвращает дату начала чемпионата.
  *
  */
  getDate(): Observable<Date> {
    return of(new Date('November 21, 2022 00:00:00'));
  }

  /**
  * Возвращает текущее время сервера.
  *
  */
  getNow(): Observable<DateTime> {
    return this.http.get<DateTime>(this.restTimeApiUrl)
      .pipe(
        catchError(this.handleError(<DateTime>{ currentDateTime: new Date().toString() }))
      );
  }

  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
