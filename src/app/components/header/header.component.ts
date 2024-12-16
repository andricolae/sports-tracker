import { Component, EventEmitter, Output } from '@angular/core';
import { AppDataService } from '../../services/app-data.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Output() sportChanged = new EventEmitter<string>();
  selectedSport: string = 'default';
  teamA = 'Team A';
  teamB = 'Team B';

  constructor(private appDataService: AppDataService) {}

  ngOnInit(): void {
    this.appDataService.sportChanged$.subscribe((sport) => {
      this.selectedSport = sport;
    });
  }

  onSportChange(newSport: string): void {
    this.selectedSport = newSport;
    this.sportChanged.emit(newSport);
    this.appDataService.changeSport(newSport);
  }
}
