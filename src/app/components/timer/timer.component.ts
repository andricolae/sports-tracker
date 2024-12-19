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
  selectedSport: string = 'default';

  breakTime: number = 0;
  laps: string[] = [];
  quarter: number = 1;
  breakInterval: any;
  maxTimeouts: number = 7;
  usedTimeouts: number = 0;
  timeoutRunning: boolean = false;
  breakRunning: boolean = false;
  timeoutTime: number = 30;
  timeoutInterval: any;
  timeoutDurations: {[key: string]: number} = {
    Basketball: 75,
    Tennis: 180,
    Volleyball: 75,
  };

  constructor(private appDataService: AppDataService) {
    this.appDataService.sportChanged$.subscribe((newSport) => {
      this.selectedSport = newSport;
      this.updateTimeoutTime();
    });
  }

  updateTimeoutTime(): void {
    this.timeoutTime = this.timeoutDurations[this.selectedSport] || 30;

    if (this.selectedSport === 'Basketball') {
      this.time = 10 * 60;
    } else if (this.selectedSport === 'Volleyball' || this.selectedSport === 'Tennis') {
      this.time = 0;
    } else {
      this.time = 0;
    }
  }

  start(): void {
    if (!this.running && !this.breakRunning && !this.timeoutRunning) {
      this.running = true;
      this.appDataService.setTimerRunning(true);

      this.interval = setInterval(() => {
        if (this.selectedSport === 'Basketball') {
          this.time--;
          if (this.time <= 0) {
            this.endQuarter();
          }
        } else {
          this.time++;
        }
      }, 1000);
    }
  }

  pauseForTimeout(): void {
    if (this.running && this.usedTimeouts < this.maxTimeouts) {
      clearInterval(this.interval);
      this.running = false;
      this.usedTimeouts++;
      this.startTimeout();
      console.log(this.usedTimeouts);
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
    this.appDataService.setTimerRunning(false);
    this.updateTimeoutTime();
    clearInterval(this.interval);
    clearInterval(this.breakInterval);
    clearInterval(this.timeoutInterval);
    this.time = 10 * 60;
    this.breakTime = 0;
    this.timeoutTime = 60;
    this.quarter = 1;
    this.running = false;
    this.breakRunning = false;
    this.timeoutRunning = false;
    this.usedTimeouts = 0;
  }

  startTimeout(): void {
    this.timeoutRunning = true;
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
    this.updateTimeoutTime();
    this.start();
  }

  endQuarter(): void {
    clearInterval(this.interval);
    this.running = false;

    if (this.quarter === 2) {
      this.startBreak(15 * 60);
    } else if (this.quarter < 4) {
      this.startBreak(2 * 60);
    } else {
      console.log('Finish Game');
      return;
    }

    this.quarter++;
  }

  startBreak(duration: number): void {
    this.breakTime = duration;
    this.breakRunning = true;
    this.breakInterval = setInterval(() => {
      this.breakTime--;
      if (this.breakTime <= 0) {
        this.stopBreak();
      }
    }, 1000);
  }

  stopBreak(): void {
    clearInterval(this.breakInterval);
    this.breakRunning = false;
    this.time = 10 * 60;
    this.start();
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

  get formattedBreakTime(): string {
    const minutes = Math.floor(this.breakTime / 60);
    const seconds = this.breakTime % 60;
    return `${this.pad(minutes)}:${this.pad(seconds)}`;
  }

  private pad(value: number): string {
    return value < 10 ? `0${value}` : value.toString();
  }
}
