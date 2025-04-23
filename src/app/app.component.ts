import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ManageChallengeComponent } from './manage-challenge/manage-challenge.component';

@Component({
  selector: 'fsc-root',
  imports: [RouterOutlet, ManageChallengeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'fsc';
}
