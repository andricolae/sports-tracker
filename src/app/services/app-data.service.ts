import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppDataService {
  private sportChanged = new Subject<string>();
  sportChanged$ = this.sportChanged.asObservable();

  changeSport(newSport: string): void {
    this.sportChanged.next(newSport);
  }
}
