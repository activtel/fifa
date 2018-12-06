import { Injectable } from '@angular/core';
import { map } from 'rxjs/internal/operators';
import { interval, Observable } from 'rxjs';

import { Time } from '../models/time';

/**
 * Сервис таймера обратного отсчета.
 */
@Injectable({
  providedIn: 'root',
})
export class TimerService {

  /**
  * Инициализирует таймер обратного отсчета.
  *
  * @param date Дата, до которой отсчитывает таймер.
  * @param serverDate Текущая дата, полученная с сервера
  */
  timer(date: Date, serverDate: Date): Observable<Time> {
    const nowClient = new Date(); // получаем время на клиенте
    const timeDifference = nowClient.getTime() - serverDate.getTime(); // Находим разницу между клиентом и сервером в миллисекундах
    return interval(1000).pipe(
      map(() => this.createTimeObject(date, timeDifference))
    );
  }

  private createTimeObject(date: Date, timeDifference: number): Time {
    const distance = date.getTime() - new Date().getTime() + timeDifference; // Вычисляем оставшееся до события время

    const time: Time = { years: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
    time.years = this.leading0(this.getYeras(distance));
    time.days = this.leading0(this.getDays(distance));
    time.hours = this.leading0(this.getHours(distance));
    time.minutes = this.leading0(this.getMinutes(distance));
    time.seconds = this.leading0(this.getSeconds(distance));

    return time;
  }

  private getYeras(time) {
    return Math.floor(time / (1000 * 60 * 60 * 24 * 365));
  }

  private getDays(time) {
    return Math.floor(time / (1000 * 60 * 60 * 24) % 365);
  }

  private getHours(time) {
    return Math.floor((time / (1000 * 60 * 60)) % 24);
  }

  private getMinutes(time) {
    return Math.floor((time / 1000 / 60) % 60);
  }

  private getSeconds(time) {
    return Math.floor((time / 1000) % 60);
  }

  leading0(num) {
    return num < 10 ? '0' + num : num;
  }
}
