import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
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

  timeoutRunning: boolean = false;
  timeoutTime: number = 60;
  timeoutInterval: any;

  constructor(private appDataService: AppDataService) {
    this.appDataService.sportChanged$.subscribe((newSport) => {
      this.selectedSport = newSport;
    });
  }

  start(): void {
    if (!this.running) {
      this.running = true;
      this.appDataService.setTimerRunning(true);
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
    this.startTimeout();
  }

  reset(): void {
    clearInterval(this.interval);
    this.time = 0;
    this.running = false;
    this.laps = [];
    this.appDataService.setTimerRunning(false);
  }

  startTimeout(): void {
    this.timeoutRunning = true;
    this.timeoutTime = 60;

    this.timeoutInterval = setInterval(() => {
      this.timeoutTime--;
      if (this.timeoutTime <= 0) {
        this.stopTimeout();
      }
    }, 1000);
  }

  stopTimeout(): void {
    clearInterval(this.timeoutInterval);
    this.timeoutRunning = false;
    this.start(); // Resume the main timer
  }

  get formattedTime(): string {
    const hours = Math.floor(this.time / 3600);
    const minutes = Math.floor((this.time % 3600) / 60);
    const seconds = this.time % 60;
    return `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(seconds)}`;
  }

  get formattedTimeoutTime(): string {
    const minutes = Math.floor(this.timeoutTime / 60);
    const seconds = this.timeoutTime % 60;
    return `${this.pad(minutes)}:${this.pad(seconds)}`;
  }

  private pad(value: number): string {
    return value < 10 ? `0${value}` : value.toString();
  }

  /*        TIMEOUT
      basketball -> 75 sec
      tennis     -> 180 sec
      volleyball -> 75 sec
  */
}
