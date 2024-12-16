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

  changeSport(newSport: string): void {
    this.sportChanged.next(newSport);
  }

  setTimerRunning(isRunning: boolean): void {
    this.timerRunning.next(isRunning);
  }
}
