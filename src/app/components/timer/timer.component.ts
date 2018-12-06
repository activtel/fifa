import { Component, OnInit } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';

import { TimerService } from 'src/app/services/timer.service';
import { TimeService } from 'src/app/services/time.service';

import { Time } from 'src/app/models/time';

/**
 * Компонент таймера обратного отсчета.
 */
@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {
  timer$: Observable<Time>;
  isLoading = true;

  constructor(private timerService: TimerService, private timeService: TimeService) { }

  ngOnInit() {
    this.timer$ = forkJoin(this.timeService.getDate(), this.timeService.getNow())
      .pipe(
        mergeMap((date) => this.timerService.timer(date[0], new Date(date[1].currentDateTime))),
        tap(() => this.isLoading = false)
      );
  }
}
