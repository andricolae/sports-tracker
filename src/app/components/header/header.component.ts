import { Component, EventEmitter, Output } from '@angular/core';
import { AppDataService } from '../../services/app-data.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Output() sportChanged = new EventEmitter<string>();
  selectedSport: string = 'default';
  teamA: string = 'Team A';
  teamB: string = 'Team B';
  inputLocked: boolean = false;
  sportSelectorLocked: boolean = false;

  constructor(private appDataService: AppDataService) {}

  ngOnInit(): void {
    this.appDataService.sportChanged$.subscribe((sport) => {
      this.selectedSport = sport;
      this.inputLocked = sport !== 'default';
    });

    this.appDataService.timerRunning$.subscribe((isRunning) => {
      this.sportSelectorLocked = isRunning;
    });
  }

  onSportChange(newSport: string): void {
    if (!this.sportSelectorLocked) {
      this.appDataService.changeSport(newSport);
    }
    this.selectedSport = newSport;
    this.sportChanged.emit(newSport);
    this.appDataService.changeSport(newSport);
  }
}
