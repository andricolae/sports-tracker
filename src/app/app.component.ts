import { Component } from '@angular/core';
import { TimerComponent } from './components/timer/timer.component';
import { ScoreTrackerComponent } from './components/score/score.component';
import { HeaderComponent } from "./components/header/header.component";

@Component({
  selector: 'app-root',
  imports: [TimerComponent, ScoreTrackerComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'sports-tracker';
}
