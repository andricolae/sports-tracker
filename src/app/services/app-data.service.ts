import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppDataService {
  private sportChanged = new Subject<string>();
  sportChanged$ = this.sportChanged.asObservable();

  private timerRunning = new BehaviorSubject<boolean>(false);
  timerRunning$ = this.timerRunning.asObservable();

  // private sportConfig = new BehaviorSubject<any>({});
  // sportConfig$ = this.sportConfig.asObservable();

  changeSport(newSport: string): void {
    this.sportChanged.next(newSport);

    // if (newSport === 'Basketball') {
    //   this.sportConfig.next({
    //     type: 'Basketball',
    //     quarters: 4,
    //     quarterTime: 10 * 60,
    //     breakTimes: [2 * 60, 15 * 60],
    //     maxTimeouts: 7,
    //   });
    // } else if (newSport === 'Volleyball') {
    //   this.sportConfig.next({
    //     type: 'Volleyball',
    //     setsToWin: 3,
    //     pointsToWinSet: 25,
    //   });
    // } else if (newSport === 'Tennis') {
    //   this.sportConfig.next({
    //     type: 'Tennis',
    //     setsToWin: 2,
    //     gamesToWinSet: 6,
    //   });
    // }
  }

  setTimerRunning(isRunning: boolean): void {
    this.timerRunning.next(isRunning);
  }
}
