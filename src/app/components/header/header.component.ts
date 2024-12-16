import { Component, EventEmitter, Output } from '@angular/core';
import { AppDataService } from '../../services/app-data.service';
<<<<<<< HEAD
import { FormsModule } from '@angular/forms';
=======
>>>>>>> 4df1f36c74e5acde3803951ea108b04cdd8371c7

@Component({
  selector: 'app-header',
  standalone: true,
<<<<<<< HEAD
  imports: [FormsModule],
=======
  imports: [],
>>>>>>> 4df1f36c74e5acde3803951ea108b04cdd8371c7
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Output() sportChanged = new EventEmitter<string>();
  selectedSport: string = 'default';
<<<<<<< HEAD
  teamA: string = 'Team A';
  teamB: string = 'Team B';
  inputLocked: boolean = false;
=======
  teamA = 'Team A';
  teamB = 'Team B';
>>>>>>> 4df1f36c74e5acde3803951ea108b04cdd8371c7

  constructor(private appDataService: AppDataService) {}

  ngOnInit(): void {
    this.appDataService.sportChanged$.subscribe((sport) => {
      this.selectedSport = sport;
<<<<<<< HEAD
      this.inputLocked = sport !== 'default';
=======
>>>>>>> 4df1f36c74e5acde3803951ea108b04cdd8371c7
    });
  }

  onSportChange(newSport: string): void {
    this.selectedSport = newSport;
    this.sportChanged.emit(newSport);
    this.appDataService.changeSport(newSport);
  }
}
