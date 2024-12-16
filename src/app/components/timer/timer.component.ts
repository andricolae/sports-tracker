import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { AppDataService } from '../../services/app-data.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css'],
})
export class TimerComponent {
  time: number = 0;
  interval: any;
  running: boolean = false;
  laps: string[] = [];
  selectedSport: string = 'default';

  constructor(private appDataService: AppDataService) {}
  changeSport(newSport: string): void {
    this.appDataService.changeSport(newSport);
  }

  start(): void {
    if (!this.running) {
      this.running = true;
      this.interval = setInterval(() => {
        this.time++;
      }, 1000);
    }
  }

  pause(): void {
    if (this.running) {
      clearInterval(this.interval);
      this.running = false;
    }
  }

  reset(): void {
    clearInterval(this.interval);
    this.time = 0;
    this.running = false;
    this.laps = [];
    this.selectedSport = 'default';
    this.changeSport('default');
  }

  recordLap(): void {
    this.laps.push(this.formattedTime);
  }

  get formattedTime(): string {
    const hours = Math.floor(this.time / 3600);
    const minutes = Math.floor((this.time % 3600) / 60);
    const seconds = this.time % 60;
    return `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(seconds)}`;
  }

  private pad(value: number): string {
    return value < 10 ? `0${value}` : value.toString();
  }
}
