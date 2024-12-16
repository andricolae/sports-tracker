import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppDataService } from '../../services/app-data.service';

@Component({
  selector: 'app-score',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './score.component.html',
  styleUrl: './score.component.css',
})
export class ScoreTrackerComponent {
  sport: string = 'default';
  scores = { teamA: 0, teamB: 0 };
  quarters: number[] = [];

  constructor(private appDataService: AppDataService) {
    this.appDataService.sportChanged$.subscribe((newSport) => {
      this.sport = newSport;
      this.resetScores();
    });
  }

  addScore(team: 'teamA' | 'teamB'): void {
    this.scores[team]++;
  }

  endQuarter(): void {
    this.quarters.push(this.scores.teamA - this.scores.teamB);
    this.resetScores();
  }

  resetScores(): void {
    this.scores = { teamA: 0, teamB: 0 };
  }

  isLeading(team: 'teamA' | 'teamB'): boolean {
    return this.scores[team] > this.scores.teamA && this.scores[team] > this.scores.teamB;
  }
}
